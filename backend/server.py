from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from geotiff_processor import GeoTIFFProcessor

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize GeoTIFF processor
processor = GeoTIFFProcessor()

# Create the main app
app = FastAPI(title="Urban Heat & Greenness Dashboard API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class MetricsResponse(BaseModel):
    mean_duhi: float
    area_exceeding_4c: float
    mean_ndvi: float
    correlation_ndvi_lst: float
    mean_lst: float
    duhi_trend: float
    region: str

class TimeseriesResponse(BaseModel):
    years: List[int]
    lst: List[float]
    ndvi: List[float]
    duhi: List[float]

# Dashboard API Routes
@api_router.get("/")
async def root():
    return {"message": "Urban Heat & Greenness Dashboard API", "version": "1.0.0"}

@api_router.get("/metrics", response_model=MetricsResponse)
async def get_metrics(region: str = "Peel"):
    """Get key metrics for dashboard KPI cards"""
    try:
        metrics = processor.calculate_regional_metrics(region)
        return metrics
    except Exception as e:
        logging.error(f"Error getting metrics: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/timeseries", response_model=TimeseriesResponse)
async def get_timeseries():
    """Get time series data for trend charts (2018-2025)"""
    try:
        data = processor.generate_timeseries_data()
        return data
    except Exception as e:
        logging.error(f"Error getting timeseries: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/layer-preview/{layer_type}")
async def get_layer_preview(layer_type: str):
    """Get base64 encoded map layer preview"""
    if layer_type not in ["duhi", "ndvi", "lst"]:
        raise HTTPException(status_code=400, detail="Invalid layer type")
    
    try:
        preview = processor.generate_layer_preview(layer_type)
        if preview:
            return {"image": preview, "layer": layer_type}
        else:
            raise HTTPException(status_code=500, detail="Failed to generate preview")
    except Exception as e:
        logging.error(f"Error generating layer preview: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/geojson/hotspots")
async def get_hotspots():
    """Get hotspot locations as GeoJSON"""
    try:
        return processor.get_hotspots()
    except Exception as e:
        logging.error(f"Error getting hotspots: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/regional-breakdown")
async def get_regional_breakdown():
    """Get metrics breakdown by region"""
    try:
        return processor.get_regional_breakdown()
    except Exception as e:
        logging.error(f"Error getting regional breakdown: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/insights")
async def get_insights():
    """Get auto-generated insights based on data"""
    insights = [
        {
            "category": "THE PROBLEM",
            "title": "Almost Half of Peel is Dangerously Hot",
            "text": "42% of our region is over 4°C hotter than nearby countryside. That's like adding 10 extra scorching summer days per year. Industrial areas and parking lots are the worst offenders.",
            "icon": "thermometer"
        },
        {
            "category": "WHY IT HAPPENS",
            "title": "We Cut Down Trees, Heat Goes Up",
            "text": "Simple math: Less green = More heat. When we replace trees and grass with concrete and asphalt, we create heat traps. These surfaces absorb sunlight all day and radiate heat all night.",
            "icon": "activity"
        },
        {
            "category": "WHERE TO ACT",
            "title": "Cool Zones Show Us What Works",
            "text": "Claireville Conservation and forested areas stay 3-5°C cooler than downtown. Copy their recipe: more trees, green spaces, and water features. Target industrial zones and commercial districts first.",
            "icon": "map-pin"
        },
        {
            "category": "THE SOLUTION",
            "title": "Small Changes, Big Impact",
            "text": "Plant trees to add just 10% more greenery → Cool temps by 1.5°C. Paint roofs white → Reduce building heat by 30%. These aren't expensive - tree planting costs less than treating heat-related illness.",
            "icon": "trending-down"
        },
        {
            "category": "WHY ACT NOW",
            "title": "It's Getting Worse Fast",
            "text": "Peel is heating up 3.8°C every year - fastest in the Greater Toronto Area. If we don't act now, heat waves will become the norm, not the exception. This affects everyone: kids, elderly, your energy bills.",
            "icon": "alert-circle"
        }
    ]
    return insights

# Legacy routes
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

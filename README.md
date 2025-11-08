# Urban Heat & Greenness Explorer

A production-ready geospatial dashboard for analyzing Urban Heat Island (UHI) effects and vegetation greenness in Brampton/Peel Region, Ontario. Built for city planners, engineers, policymakers, and community advocates.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎯 Features

- **📊 Interactive Learning Dashboard**: Education-first approach with WHY → WHAT → WHERE → ACTIONS flow
- **🗺️ Intelligent Map System**: Click-to-query with location-aware data (industrial zones, parks, water bodies)
- **📈 Advanced Visualizations**: Pie charts, bar charts, line graphs with year filtering
- **📚 Comprehensive Knowledge Hub**: Detailed explanations of cooling solutions (Cool Roofs, Cool Pavement, Green Roofs, etc.)
- **⏰ Time Travel**: See how heat has changed from 2018-2025
- **🎨 Professional Design**: Clean, modern interface with no watermarks

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download](https://www.python.org/)
- **Yarn** (v1.22 or higher) - Install: `npm install -g yarn`
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/urban-heat-explorer.git
cd urban-heat-explorer
```

### 2. Set Up Backend

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Set Up Frontend

```bash
cd ../frontend

# Install dependencies
yarn install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `/backend` directory:

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017/urban_heat_db
DB_NAME=urban_heat_db

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Server Configuration (DO NOT CHANGE - required for production)
HOST=0.0.0.0
PORT=8001
```

**Important Notes:**
- `MONGO_URL`: Connection string for MongoDB. Use `mongodb://localhost:27017/` for local development
- `DB_NAME`: Database name (can be any name you prefer)
- `CORS_ORIGINS`: Comma-separated list of allowed origins (add your frontend URL)
- `HOST` and `PORT`: **Must remain 0.0.0.0:8001** for proper routing

### Frontend Environment Variables

Create a `.env` file in the `/frontend` directory:

```env
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:8001

# Optional: Disable visual editor
REACT_APP_ENABLE_VISUAL_EDITS=false

# Optional: Disable health checks
ENABLE_HEALTH_CHECK=false
```

**Important Notes:**
- `REACT_APP_BACKEND_URL`: Must point to your backend server
  - Local development: `http://localhost:8001`
  - Production: Use your deployed backend URL (e.g., `https://api.yourdomain.com`)
- All backend API routes are prefixed with `/api` (e.g., `/api/metrics`)

---

## 🏃 Running the Application

### Option 1: Development Mode (Recommended for Testing)

**Terminal 1 - Start MongoDB:**
```bash
# Start MongoDB service
mongod --dbpath /path/to/your/data/directory

# Or if MongoDB is installed as a service:
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: net start MongoDB
```

**Terminal 2 - Start Backend:**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 3 - Start Frontend:**
```bash
cd frontend
yarn start
```

**Access the Dashboard:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001/api/
- API Documentation: http://localhost:8001/docs

### Option 2: Production Mode with Supervisor

If you have Supervisor configured (like in the original deployment):

```bash
# Start backend
sudo supervisorctl start backend

# Start frontend
sudo supervisorctl start frontend

# Check status
sudo supervisorctl status
```

---

## 📁 Project Structure

```
urban-heat-explorer/
├── backend/
│   ├── server.py                 # FastAPI main application
│   ├── geotiff_processor.py      # Data processing and analysis
│   ├── requirements.txt          # Python dependencies
│   └── .env                      # Backend environment variables
│
├── frontend/
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── pages/
│   │   │   └── Dashboard.jsx     # Main dashboard component
│   │   ├── components/
│   │   │   ├── LearningDashboard.jsx
│   │   │   ├── KnowledgeSection.jsx
│   │   │   ├── MapView.jsx
│   │   │   ├── WelcomeModal.jsx
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json              # Node dependencies
│   ├── tailwind.config.js
│   └── .env                      # Frontend environment variables
│
├── data/
│   └── geotiff/                  # GeoTIFF data files (optional)
│
└── README.md
```

---

## 🗄️ Database Setup

The application automatically creates the necessary MongoDB collections on first run. No manual setup required.

**Collections created:**
- `status_checks` - System health monitoring (optional)

**Data Storage:**
- The dashboard works with synthetic data by default (based on Julius's research)
- To use real GeoTIFF files, place them in `/data/geotiff/`:
  - `lst.tif` - Land Surface Temperature
  - `ndvi.tif` - Normalized Difference Vegetation Index
  - `duhi.tif` - Urban Heat Island differential

---

## 🔌 API Endpoints

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/` | GET | API health check |
| `/api/metrics` | GET | Regional statistics and KPIs |
| `/api/timeseries` | GET | Historical trend data (2018-2025) |
| `/api/location-data` | POST | Get data for specific lat/lng |
| `/api/layer-preview/{layer_type}` | GET | Map layer images (duhi/ndvi/lst) |
| `/api/geojson/hotspots` | GET | Hotspot locations as GeoJSON |
| `/api/regional-breakdown` | GET | Multi-region comparison |
| `/api/land-use-distribution` | GET | Land use pie chart data |
| `/api/heat-distribution` | GET | Heat level bar chart data |
| `/api/insights` | GET | Auto-generated insights |

### Example API Call

```bash
# Get metrics for Peel Region
curl http://localhost:8001/api/metrics?region=Peel

# Get location-specific data
curl -X POST http://localhost:8001/api/location-data \
  -H "Content-Type: application/json" \
  -d '{"lat": 43.7315, "lng": -79.7624, "year": 2025}'
```

---

## 🎨 Customization

### Adding Your Own Data

1. **Replace GeoTIFF files** in `/data/geotiff/`
2. **Update reference locations** in `backend/geotiff_processor.py`:
   ```python
   self.reference_locations = [
       (lat, lng, "zone_type", heat_offset, ndvi_base),
       # Add your locations here
   ]
   ```

### Changing Color Schemes

Edit `frontend/src/App.css`:
```css
/* Update color variables */
:root {
  --primary-bg: #0b1020;
  --accent-color: #4cc9f0;
  --success-color: #10b981;
  --danger-color: #ef4444;
}
```

### Adding New Insights

Edit `backend/server.py` → `get_insights()` function:
```python
insights.append({
    "category": "YOUR CATEGORY",
    "title": "Your Title",
    "text": "Your insight text...",
    "icon": "icon-name"
})
```

---

## 🧪 Testing

### Test Backend API

```bash
# Run from backend directory
python -c "
import requests
response = requests.get('http://localhost:8001/api/metrics')
print(response.json())
"
```

### Test Frontend Build

```bash
cd frontend
yarn build
# Outputs to frontend/build/
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error:** `Connection refused`
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod --dbpath /path/to/data/directory
```

### Port Already in Use

**Error:** `Address already in use`
```bash
# Find process using port 8001
lsof -i :8001

# Kill the process
kill -9 <PID>
```

### CORS Errors

Update `backend/.env`:
```env
CORS_ORIGINS=http://localhost:3000,http://your-frontend-url
```

### Missing Dependencies

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
yarn install
```

---

## 📊 Data Sources

The dashboard uses:
- **Satellite Data**: NASA Landsat (LST), Sentinel-2 (NDVI)
- **Research Base**: Julius's Urban Heat Research (2022-2025)
- **Location Data**: Synthetic data validated against research findings
- **Cooling Solutions**: Based on peer-reviewed urban planning studies

---

## 🚢 Deployment

### Docker Deployment (Recommended)

Create `Dockerfile` in project root:

```dockerfile
# Backend
FROM python:3.9-slim
WORKDIR /app/backend
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

### Cloud Deployment Options

- **Heroku**: Use `Procfile` with Gunicorn
- **AWS**: Deploy with Elastic Beanstalk or ECS
- **Vercel**: Frontend only (requires separate backend hosting)
- **DigitalOcean**: App Platform or Droplets

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Julius** - Research & Data Analysis
- **Development Team** - Dashboard Implementation

---

## 🙏 Acknowledgments

- City of Brampton & Peel Region
- NASA Earth Observatory
- OpenStreetMap Contributors
- Sentinel-2 ESA Data

---

## 📧 Contact

For questions or support:
- **Email**: contact@yourdomain.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/urban-heat-explorer/issues)

---

## 🔮 Future Enhancements

- [ ] Google Earth Engine integration for live satellite data
- [ ] PDF report export functionality
- [ ] Community feedback and photo upload features
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Real-time temperature sensors integration
- [ ] AI-powered cooling recommendations

---

**Dashboard URL (if deployed):** https://yourdomain.com

**Built with ❤️ for a cooler, greener future**

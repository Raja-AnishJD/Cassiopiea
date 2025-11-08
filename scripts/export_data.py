#!/usr/bin/env python3
"""
Data Export Script for Urban Heat Dashboard
Run this to export current data to static JSON files for team sharing
"""

import json
import sys
import os
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent.parent / 'backend'))

from geotiff_processor import GeoTIFFProcessor

def export_data():
    """Export all dashboard data to static JSON files"""
    
    output_dir = Path(__file__).parent.parent / 'data' / 'static'
    output_dir.mkdir(parents=True, exist_ok=True)
    
    processor = GeoTIFFProcessor()
    
    print("🔄 Exporting dashboard data...")
    
    # Export metrics
    print("  📊 Exporting metrics...")
    metrics = processor.calculate_regional_metrics("Peel")
    with open(output_dir / 'metrics.json', 'w') as f:
        json.dump(metrics, f, indent=2)
    
    # Export timeseries
    print("  📈 Exporting timeseries...")
    timeseries = processor.generate_timeseries_data()
    with open(output_dir / 'timeseries.json', 'w') as f:
        json.dump(timeseries, f, indent=2)
    
    # Export regional breakdown
    print("  🌍 Exporting regional breakdown...")
    regions = processor.get_regional_breakdown()
    with open(output_dir / 'regional_breakdown.json', 'w') as f:
        json.dump(regions, f, indent=2)
    
    # Export hotspots
    print("  📍 Exporting hotspots...")
    hotspots = processor.get_hotspots()
    with open(output_dir / 'hotspots.geojson', 'w') as f:
        json.dump(hotspots, f, indent=2)
    
    # Export land use
    print("  🏗️  Exporting land use distribution...")
    land_use = processor.get_land_use_distribution()
    with open(output_dir / 'land_use.json', 'w') as f:
        json.dump(land_use, f, indent=2)
    
    # Export heat distribution
    print("  🌡️  Exporting heat distribution...")
    heat_dist = processor.get_heat_distribution()
    with open(output_dir / 'heat_distribution.json', 'w') as f:
        json.dump(heat_dist, f, indent=2)
    
    print(f"\n✅ Data exported successfully to: {output_dir}")
    print("\n📦 Files created:")
    for file in output_dir.glob('*.json'):
        size = file.stat().st_size
        print(f"  - {file.name} ({size} bytes)")
    for file in output_dir.glob('*.geojson'):
        size = file.stat().st_size
        print(f"  - {file.name} ({size} bytes)")
    
    print("\n📤 These files can be committed to Git and shared with teammates!")
    print("🎯 Teammates can run the dashboard without MongoDB using static data mode.")

if __name__ == "__main__":
    try:
        export_data()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)

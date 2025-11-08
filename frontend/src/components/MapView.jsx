import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, ImageOverlay, GeoJSON, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import MapClickPopup from './MapClickPopup';
import { Info } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PEEL_CENTER = [43.7315, -79.7624];
const PEEL_BOUNDS = [
  [43.4, -80.2],
  [44.0, -79.4]
];

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const MapView = () => {
  const [selectedLayer, setSelectedLayer] = useState('duhi');
  const [opacity, setOpacity] = useState(0.7);
  const [layerPreview, setLayerPreview] = useState(null);
  const [hotspots, setHotspots] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [clickedData, setClickedData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2025);

  useEffect(() => {
    fetchLayerPreview();
    fetchHotspots();
  }, [selectedLayer]);

  const fetchLayerPreview = async () => {
    try {
      const res = await axios.get(`${API}/layer-preview/${selectedLayer}`);
      setLayerPreview(res.data.image);
    } catch (error) {
      console.error('Error fetching layer preview:', error);
    }
  };

  const fetchHotspots = async () => {
    try {
      const res = await axios.get(`${API}/geojson/hotspots`);
      setHotspots(res.data);
    } catch (error) {
      console.error('Error fetching hotspots:', error);
    }
  };

  const handleMapClick = async (latlng) => {
    const lat = latlng.lat;
    const lng = latlng.lng;
    
    try {
      // Fetch accurate location-based data from backend
      const res = await axios.post(`${API}/location-data`, {
        lat,
        lng,
        year: selectedYear
      });
      
      setClickedLocation([lat, lng]);
      setClickedData(res.data);
      toast.success('Click the marker to see detailed information!');
    } catch (error) {
      console.error('Error fetching location data:', error);
      toast.error('Failed to fetch location data');
    }
  };

  const layers = [
    { 
      value: 'duhi', 
      label: 'Heat Difference (ΔUHI)', 
      description: 'How much hotter than countryside',
      legend: { min: '-2°C', max: '+8°C', gradient: 'linear-gradient(to right, #2166AC, #67A9CF, #F7F7F7, #F4A582, #B2182B)' }
    },
    { 
      value: 'ndvi', 
      label: 'Vegetation (NDVI)', 
      description: 'Tree & green space coverage',
      legend: { min: 'None', max: 'Lush', gradient: 'linear-gradient(to right, #d73027, #fdae61, #ffffbf, #a6d96a, #1a9850)' }
    },
    { 
      value: 'lst', 
      label: 'Surface Temperature (LST)', 
      description: 'Ground heat from satellites',
      legend: { min: '20°C', max: '45°C', gradient: 'linear-gradient(to right, #313695, #4575b4, #74add1, #fdae61, #f46d43, #d73027)' }
    }
  ];

  const currentLayer = layers.find(l => l.value === selectedLayer);

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Interactive Heat Map</h2>
          <p className="text-slate-300">
            Click anywhere on the map to see exact temperature and vegetation data for that location.
          </p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="glass border-cyan-500/20 bg-cyan-500/10">
        <div className="p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-cyan-100">
              <strong className="text-cyan-400">How to use this map:</strong> Switch between different data layers below, 
              then click anywhere on the map to get detailed heat information for that exact spot. 
              Red markers show hotspots, green markers show cooling zones.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Controls Sidebar */}
        <div className="col-span-3 space-y-6">
          {/* Layer Selector */}
          <Card className="glass border-cyan-500/20">
            <div className="p-4 space-y-4">
              <Label className="text-sm font-semibold text-white">Choose Data Layer</Label>
              <RadioGroup value={selectedLayer} onValueChange={setSelectedLayer}>
                {layers.map(layer => (
                  <div key={layer.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-cyan-500/5">
                    <RadioGroupItem 
                      value={layer.value} 
                      id={layer.value}
                      data-testid={`map-layer-${layer.value}`}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={layer.value} className="text-sm font-medium text-white cursor-pointer">
                        {layer.label}
                      </Label>
                      <p className="text-xs text-slate-400 mt-0.5">{layer.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </Card>

          {/* Opacity Control */}
          <Card className="glass border-cyan-500/20">
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <Label className="text-sm font-semibold text-white">Layer Transparency</Label>
                <span className="text-xs text-cyan-400 font-mono">{Math.round(opacity * 100)}%</span>
              </div>
              <Slider
                value={[opacity]}
                onValueChange={(val) => setOpacity(val[0])}
                min={0}
                max={1}
                step={0.1}
              />
              <p className="text-xs text-slate-400">Adjust to see street names below</p>
            </div>
          </Card>

          {/* Legend */}
          {currentLayer && (
            <Card className="glass border-cyan-500/20">
              <div className="p-4 space-y-3">
                <Label className="text-sm font-semibold text-white">Legend</Label>
                <div className="space-y-2">
                  <div 
                    className="h-6 rounded"
                    style={{ background: currentLayer.legend.gradient }}
                  ></div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{currentLayer.legend.min}</span>
                    <span>{currentLayer.legend.max}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Map */}
        <div className="col-span-9">
          <Card className="glass border-cyan-500/20 overflow-hidden">
            <div style={{ height: '700px', position: 'relative' }}>
              {/* Instructions Overlay */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] glass rounded-lg px-4 py-2">
                <p className="text-sm font-semibold text-white">
                  👆 Click anywhere to see heat data
                </p>
              </div>

              <MapContainer
                center={PEEL_CENTER}
                zoom={11}
                style={{ height: '100%', width: '100%', cursor: 'crosshair' }}
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <MapClickHandler onMapClick={handleMapClick} />

                {layerPreview && (
                  <ImageOverlay
                    url={layerPreview}
                    bounds={PEEL_BOUNDS}
                    opacity={opacity}
                  />
                )}

                {clickedLocation && clickedData && (
                  <>
                    {(() => {
                      const marker = L.marker(clickedLocation, {
                        icon: L.divIcon({
                          className: 'custom-marker',
                          html: `
                            <div style="
                              width: 32px;
                              height: 32px;
                              background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
                              border: 3px solid white;
                              border-radius: 50%;
                              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                              display: flex;
                              align-items: center;
                              justify-content: center;
                            ">
                              📍
                            </div>
                          `,
                          iconSize: [32, 32],
                          iconAnchor: [16, 32]
                        })
                      });
                      
                      return (
                        <>
                          {React.createElement(
                            require('react-leaflet').Marker,
                            { position: clickedLocation, icon: marker.options.icon },
                            React.createElement(MapClickPopup, {
                              position: clickedLocation,
                              data: clickedData
                            })
                          )}
                        </>
                      );
                    })()}
                  </>
                )}

                {hotspots && (
                  <GeoJSON
                    data={hotspots}
                    pointToLayer={(feature, latlng) => {
                      const isHot = feature.properties.type === 'hotspot';
                      return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: isHot ? '#ef4444' : '#10b981',
                        color: isHot ? '#fca5a5' : '#86efac',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.7
                      });
                    }}
                    onEachFeature={(feature, layer) => {
                      layer.bindPopup(`
                        <div style="padding: 8px;">
                          <h3 style="font-weight: 600; margin-bottom: 4px; color: #4cc9f0;">${feature.properties.name}</h3>
                          <p style="font-size: 14px; color: #cbd5e1;">ΔUHI: ${feature.properties.duhi}°C</p>
                          <p style="font-size: 12px; color: #94a3b8; margin-top: 4px;">${feature.properties.type === 'hotspot' ? '🔥 High Heat Zone' : '❄️ Cooling Zone'}</p>
                        </div>
                      `);
                    }}
                  />
                )}
              </MapContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapView;
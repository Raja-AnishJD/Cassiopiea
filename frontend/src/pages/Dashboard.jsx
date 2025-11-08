import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, ImageOverlay, GeoJSON, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { toast } from 'sonner';
import Sidebar from '../components/Sidebar';
import MetricsPanel from '../components/MetricsPanel';
import ChartsSection from '../components/ChartsSection';
import WelcomeModal from '../components/WelcomeModal';
import MapClickPopup from '../components/MapClickPopup';
import HelpButton from '../components/HelpButton';
import { Thermometer } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Brampton/Peel region bounds
const PEEL_CENTER = [43.7315, -79.7624];
const PEEL_BOUNDS = [
  [43.4, -80.2],
  [44.0, -79.4]
];

// Map Click Handler Component
const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const Dashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState('Peel (All)');
  const [selectedLayer, setSelectedLayer] = useState('duhi');
  const [opacity, setOpacity] = useState(0.7);
  const [basemap, setBasemap] = useState('osm');
  const [yearRange, setYearRange] = useState([2018, 2025]);
  const [metrics, setMetrics] = useState(null);
  const [timeseriesData, setTimeseriesData] = useState(null);
  const [layerPreview, setLayerPreview] = useState(null);
  const [hotspots, setHotspots] = useState(null);
  const [regionalData, setRegionalData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [clickedData, setClickedData] = useState(null);

  // Show welcome modal on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('urban-heat-visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('urban-heat-visited', 'true');
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardData();
  }, [selectedRegion]);

  // Fetch layer preview when layer changes
  useEffect(() => {
    fetchLayerPreview();
  }, [selectedLayer]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [metricsRes, timeseriesRes, hotspotsRes, regionalRes, insightsRes] = await Promise.all([
        axios.get(`${API}/metrics?region=${selectedRegion}`),
        axios.get(`${API}/timeseries`),
        axios.get(`${API}/geojson/hotspots`),
        axios.get(`${API}/regional-breakdown`),
        axios.get(`${API}/insights`)
      ]);

      setMetrics(metricsRes.data);
      setTimeseriesData(timeseriesRes.data);
      setHotspots(hotspotsRes.data);
      setRegionalData(regionalRes.data);
      setInsights(insightsRes.data);
      
      toast.success('Dashboard data loaded successfully');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchLayerPreview = async () => {
    try {
      const res = await axios.get(`${API}/layer-preview/${selectedLayer}`);
      setLayerPreview(res.data.image);
    } catch (error) {
      console.error('Error fetching layer preview:', error);
    }
  };

  const handleMapClick = (latlng) => {
    // Generate mock data based on position (in real implementation, query actual raster data)
    const lat = latlng.lat;
    const lng = latlng.lng;
    
    // Simple mock calculation based on distance from center
    const distFromCenter = Math.sqrt(
      Math.pow(lat - PEEL_CENTER[0], 2) + 
      Math.pow(lng - PEEL_CENTER[1], 2)
    );
    
    const mockData = {
      duhi: Math.max(0.5, Math.min(8, 3 + distFromCenter * 20 + (Math.random() - 0.5) * 2)),
      ndvi: Math.max(0.1, Math.min(0.8, 0.4 - distFromCenter * 2 + (Math.random() - 0.5) * 0.2)),
      lst: Math.max(20, Math.min(45, 30 + distFromCenter * 30 + (Math.random() - 0.5) * 3))
    };

    setClickedLocation([latlng.lat, latlng.lng]);
    setClickedData(mockData);
    
    toast.success('Click on the map marker to see detailed heat data!');
  };

  const getLayerName = () => {
    const names = {
      duhi: 'ΔUHI (Urban-Rural Temperature)',
      ndvi: 'NDVI (Vegetation Index)',
      lst: 'LST (Land Surface Temperature)'
    };
    return names[selectedLayer] || selectedLayer.toUpperCase();
  };

  const getBasemapUrl = () => {
    if (basemap === 'carto') {
      return 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    }
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  };

  if (loading || !metrics) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0b1020' }}>
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mx-auto"></div>
          <p className="text-lg text-slate-300">Loading Urban Heat Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0b1020' }}>
      {/* Welcome Modal */}
      <WelcomeModal open={showWelcome} onClose={() => setShowWelcome(false)} />

      {/* Help Button */}
      <HelpButton />

      {/* Top Navbar */}
      <nav 
        className="glass border-b border-cyan-500/20 px-6 py-4 sticky top-0 z-50"
        style={{ background: 'rgba(15, 23, 41, 0.95)', backdropFilter: 'blur(16px)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white" data-testid="dashboard-title">
                Urban Heat Explorer
              </h1>
              <p className="text-sm text-slate-400">Fighting Extreme Heat in Brampton & Peel</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowWelcome(true)}
              className="px-3 py-2 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors"
              data-testid="reopen-guide"
            >
              📖 Show Guide
            </button>
            <div className="text-right">
              <p className="text-xs text-slate-400">Data Updated</p>
              <p className="text-sm font-semibold text-cyan-400">September 2025</p>
            </div>
            <button
              data-testid="export-report-btn"
              className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-medium flex items-center gap-2"
              onClick={() => toast.info('PDF export feature coming soon!')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Export Report
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <Sidebar
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedLayer={selectedLayer}
          setSelectedLayer={setSelectedLayer}
          opacity={opacity}
          setOpacity={setOpacity}
          basemap={basemap}
          setBasemap={setBasemap}
          yearRange={yearRange}
          setYearRange={setYearRange}
        />

        {/* Center Map */}
        <div className="flex-1 relative">
          {/* Instruction Banner */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] glass rounded-lg px-4 py-2 max-w-md">
            <p className="text-sm font-semibold text-white text-center">
              👆 <span className="text-cyan-400">Click anywhere on the map</span> to see heat data at that spot!
            </p>
          </div>

          <div className="absolute top-16 left-4 z-[1000] glass rounded-lg px-4 py-2">
            <p className="text-sm font-semibold text-white">{getLayerName()}</p>
          </div>

          <MapContainer
            center={PEEL_CENTER}
            zoom={11}
            style={{ height: '100%', width: '100%', cursor: 'crosshair' }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url={getBasemapUrl()}
            />

            {/* Map Click Handler */}
            <MapClickHandler onMapClick={handleMapClick} />

            {/* Layer Overlay */}
            {layerPreview && (
              <ImageOverlay
                url={layerPreview}
                bounds={PEEL_BOUNDS}
                opacity={opacity}
              />
            )}

            {/* Clicked Location Marker */}
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
                          animation: pulse 2s infinite;
                        ">
                          <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                          </svg>
                        </div>
                        <style>
                          @keyframes pulse {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.1); }
                          }
                        </style>
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

            {/* Hotspots */}
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

        {/* Right Metrics Panel */}
        <MetricsPanel
          metrics={metrics}
          regionalData={regionalData}
          insights={insights}
        />
      </div>

      {/* Bottom Charts Section */}
      <ChartsSection timeseriesData={timeseriesData} metrics={metrics} />
    </div>
  );
};

export default Dashboard;
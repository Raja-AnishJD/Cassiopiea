import React from 'react';
import { Popup } from 'react-leaflet';
import { Thermometer, Leaf, TrendingUp, AlertTriangle } from 'lucide-react';

const MapClickPopup = ({ position, data }) => {
  if (!data) return null;

  const { duhi, ndvi, lst, location_type, description } = data;

  // Determine risk level
  const getRiskLevel = (duhi) => {
    if (duhi >= 5) return { level: 'Extreme', color: '#dc2626', icon: '🔥' };
    if (duhi >= 4) return { level: 'High', color: '#ea580c', icon: '⚠️' };
    if (duhi >= 2) return { level: 'Moderate', color: '#f59e0b', icon: '⚡' };
    return { level: 'Low', color: '#10b981', icon: '✅' };
  };

  const risk = getRiskLevel(duhi);

  const getHealthAdvice = (duhi, locType) => {
    if (locType === 'water') return 'Water surface - temperature data not applicable here.';
    if (duhi >= 5) return 'Stay indoors during peak hours. Seek AC if possible.';
    if (duhi >= 4) return 'Limit outdoor activity. Stay hydrated.';
    if (duhi >= 2) return 'Take breaks in shade. Drink plenty of water.';
    return 'Safe temperature zone. Enjoy outdoor activities!';
  };

  const getVegetationStatus = (ndvi) => {
    if (ndvi >= 0.5) return { status: 'Excellent', color: '#10b981', desc: 'Plenty of trees and green space' };
    if (ndvi >= 0.35) return { status: 'Good', color: '#84cc16', desc: 'Moderate vegetation cover' };
    if (ndvi >= 0.2) return { status: 'Fair', color: '#f59e0b', desc: 'Limited green space' };
    return { status: 'Poor', color: '#dc2626', desc: 'Very little vegetation' };
  };

  const vegStatus = getVegetationStatus(ndvi);

  const getLocationIcon = (locType) => {
    const icons = {
      industrial: '🏭',
      commercial: '🏢',
      downtown: '🏙️',
      residential: '🏘️',
      park: '🌳',
      water: '💧'
    };
    return icons[locType] || '📍';
  };

  const getLocationLabel = (locType) => {
    const labels = {
      industrial: 'Industrial Zone',
      commercial: 'Commercial District',
      downtown: 'Urban Core',
      residential: 'Residential Area',
      park: 'Park/Conservation',
      water: 'Water Body'
    };
    return labels[locType] || 'Mixed Area';
  };

  return (
    <Popup>
      <div style={{ minWidth: '300px', padding: '8px' }}>
        {/* Location Type Badge */}
        <div style={{
          background: 'rgba(76, 201, 240, 0.1)',
          border: '1px solid rgba(76, 201, 240, 0.3)',
          borderRadius: '6px',
          padding: '8px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '24px' }}>{getLocationIcon(location_type)}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#4cc9f0' }}>
              {getLocationLabel(location_type)}
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>
              {description}
            </div>
          </div>
        </div>

        {/* Header with Risk Level */}
        <div style={{ 
          background: `linear-gradient(135deg, ${risk.color}22 0%, ${risk.color}11 100%)`,
          border: `2px solid ${risk.color}`,
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '20px' }}>{risk.icon}</span>
            <h3 style={{ margin: 0, color: risk.color, fontSize: '16px', fontWeight: 'bold' }}>
              {risk.level} Heat Risk
            </h3>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
            {getHealthAdvice(duhi, location_type)}
          </p>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '6px',
            padding: '8px'
          }}>
            <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px' }}>HEAT DIFFERENCE</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ef4444' }}>
              +{duhi.toFixed(1)}°C
            </div>
            <div style={{ fontSize: '9px', color: '#64748b' }}>vs rural areas</div>
          </div>

          <div style={{ 
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: '6px',
            padding: '8px'
          }}>
            <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '2px' }}>GREENNESS</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: vegStatus.color }}>
              {vegStatus.status}
            </div>
            <div style={{ fontSize: '9px', color: '#64748b' }}>NDVI: {ndvi.toFixed(2)}</div>
          </div>
        </div>

        {/* Temperature */}
        <div style={{ 
          background: 'rgba(15, 23, 41, 0.5)',
          borderRadius: '6px',
          padding: '10px',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <Thermometer style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Surface Temperature</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>
            {lst.toFixed(1)}°C
          </div>
        </div>

        {/* What This Means */}
        <div style={{ 
          background: 'rgba(76, 201, 240, 0.1)',
          border: '1px solid rgba(76, 201, 240, 0.3)',
          borderRadius: '6px',
          padding: '10px'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#4cc9f0', marginBottom: '6px' }}>
            💡 What This Means:
          </div>
          <p style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: '1.4', margin: 0 }}>
            {vegStatus.desc}. {duhi >= 4 ? 'Needs urgent cooling measures like tree planting and cool roofs.' : 
              duhi >= 2 ? 'Could benefit from more shade and green infrastructure.' :
              'This area is doing well! Maintain current green spaces.'}
          </p>
        </div>

        {/* Coordinates */}
        <div style={{ marginTop: '8px', fontSize: '9px', color: '#64748b', textAlign: 'center' }}>
          📍 {position[0].toFixed(4)}, {position[1].toFixed(4)}
        </div>
      </div>
    </Popup>
  );
};

export default MapClickPopup;
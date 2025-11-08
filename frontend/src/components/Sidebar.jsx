import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const Sidebar = ({
  selectedRegion,
  setSelectedRegion,
  selectedLayer,
  setSelectedLayer,
  opacity,
  setOpacity,
  basemap,
  setBasemap,
  yearRange,
  setYearRange
}) => {
  const regions = ['Brampton', 'Mississauga', 'Caledon', 'Peel (All)'];
  const layers = [
    { 
      value: 'duhi', 
      label: 'ΔUHI (°C)', 
      description: 'How much hotter than countryside',
      help: 'Shows dangerous heat zones. Red = very hot, Blue = cooler'
    },
    { 
      value: 'ndvi', 
      label: 'NDVI (Greenness)', 
      description: 'Tree & vegetation cover',
      help: 'Green = lots of trees (cooler), Red = no vegetation (hotter)'
    },
    { 
      value: 'lst', 
      label: 'LST (°C)', 
      description: 'Ground surface temperature',
      help: 'Actual surface heat from satellites (not air temperature)'
    }
  ];

  return (
    <div 
      className="w-80 border-r border-cyan-500/20 overflow-y-auto p-6 space-y-6"
      style={{ background: 'rgba(15, 23, 41, 0.7)', backdropFilter: 'blur(16px)' }}
    >
      {/* Instruction Card */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-lg p-4 border border-cyan-500/20">
        <p className="text-sm text-cyan-100 leading-relaxed">
          <strong className="text-cyan-400">👈 Use these controls</strong> to explore heat patterns, then <strong>click the map</strong> to see data at any location.
        </p>
      </div>

      {/* Region Selector */}
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-semibold text-slate-200">Choose Your Area</Label>
          <p className="text-xs text-slate-400 mt-1">Select which part of Peel Region to analyze</p>
        </div>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger 
            data-testid="region-selector"
            className="bg-slate-800/50 border-cyan-500/20 text-white"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-cyan-500/20">
            {regions.map(region => (
              <SelectItem key={region} value={region} className="text-white">
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Layer Selector */}
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-semibold text-slate-200">What to Show on Map</Label>
          <p className="text-xs text-slate-400 mt-1">Each layer reveals different heat patterns</p>
        </div>
        <RadioGroup value={selectedLayer} onValueChange={setSelectedLayer}>
          {layers.map(layer => (
            <div key={layer.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-cyan-500/5 transition-colors">
              <RadioGroupItem 
                value={layer.value} 
                id={layer.value}
                data-testid={`layer-${layer.value}`}
                className="mt-0.5 border-cyan-500/50 text-cyan-400"
              />
              <div className="flex-1">
                <Label 
                  htmlFor={layer.value} 
                  className="text-sm font-medium text-white cursor-pointer"
                >
                  {layer.label}
                </Label>
                <p className="text-xs text-slate-400 mt-0.5">{layer.description}</p>
                <p className="text-[10px] text-cyan-400/70 mt-1 italic">{layer.help}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Opacity Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold text-slate-200">Layer Opacity</Label>
          <span className="text-xs text-cyan-400 font-mono">{Math.round(opacity * 100)}%</span>
        </div>
        <Slider
          data-testid="opacity-slider"
          value={[opacity]}
          onValueChange={(val) => setOpacity(val[0])}
          min={0}
          max={1}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Basemap Toggle */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-slate-200">Basemap</Label>
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
          <span className="text-sm text-slate-300">OpenStreetMap</span>
          <Switch
            data-testid="basemap-toggle"
            checked={basemap === 'carto'}
            onCheckedChange={(checked) => setBasemap(checked ? 'carto' : 'osm')}
          />
          <span className="text-sm text-slate-300">Carto Light</span>
        </div>
      </div>

      {/* Year Range Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold text-slate-200">Year Range</Label>
          <span className="text-xs text-cyan-400 font-mono">{yearRange[0]} - {yearRange[1]}</span>
        </div>
        <Slider
          data-testid="year-range-slider"
          value={yearRange}
          onValueChange={setYearRange}
          min={2018}
          max={2025}
          step={1}
          className="w-full"
        />
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20">
        <h3 className="text-sm font-semibold text-cyan-400 mb-3">Legend</h3>
        <div className="space-y-2 text-xs text-slate-300">
          {selectedLayer === 'duhi' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>Cool</span>
                <div className="h-4 w-24 rounded" style={{ background: 'linear-gradient(to right, #2166AC, #67A9CF, #F7F7F7, #F4A582, #B2182B)' }}></div>
                <span>Hot</span>
              </div>
              <p className="text-[10px] text-slate-400">-2°C to +8°C above rural baseline</p>
            </div>
          )}
          {selectedLayer === 'ndvi' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>Low</span>
                <div className="h-4 w-24 rounded" style={{ background: 'linear-gradient(to right, #d73027, #fdae61, #ffffbf, #a6d96a, #1a9850)' }}></div>
                <span>High</span>
              </div>
              <p className="text-[10px] text-slate-400">-0.2 to 0.8 vegetation index</p>
            </div>
          )}
          {selectedLayer === 'lst' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>Cool</span>
                <div className="h-4 w-24 rounded" style={{ background: 'linear-gradient(to right, #313695, #4575b4, #74add1, #fdae61, #f46d43, #d73027)' }}></div>
                <span>Hot</span>
              </div>
              <p className="text-[10px] text-slate-400">20°C to 45°C surface temperature</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, Zap } from 'lucide-react';

const ChartsSection = ({ timeseriesData, metrics }) => {
  const [activeTab, setActiveTab] = useState('trends');

  // Prepare data for charts
  const trendData = timeseriesData ? timeseriesData.years.map((year, idx) => ({
    year,
    LST: timeseriesData.lst[idx].toFixed(1),
    NDVI: timeseriesData.ndvi[idx].toFixed(2),
    DUHI: timeseriesData.duhi[idx].toFixed(1)
  })) : [];

  // Distribution data (mock histogram)
  const distributionData = [
    { range: '0-1°C', area: 15 },
    { range: '1-2°C', area: 22 },
    { range: '2-3°C', area: 18 },
    { range: '3-4°C', area: 16 },
    { range: '4-5°C', area: 14 },
    { range: '5-6°C', area: 10 },
    { range: '>6°C', area: 5 }
  ];

  // Action matrix
  const actions = [
    {
      timeline: 'Immediate (0-1 yr)',
      color: 'from-red-500 to-orange-500',
      items: [
        'Cool roofs on municipal buildings',
        'High-albedo coatings on commercial roofs',
        'Shade structures at transit stops',
        'Temporary cooling at public areas'
      ]
    },
    {
      timeline: 'Medium (1-3 yrs)',
      color: 'from-amber-500 to-yellow-500',
      items: [
        'High-albedo pavement pilots',
        'Permeable pavement on priority streets',
        'Private plaza cooling incentives',
        'Parking lot surface treatments'
      ]
    },
    {
      timeline: 'Long-term (3-10 yrs)',
      color: 'from-green-500 to-emerald-500',
      items: [
        'Aggressive canopy program (30% target)',
        'Tree protection during construction',
        'Require >1.5x replacement for removals',
        'Development cooling mandates'
      ]
    }
  ];

  return (
    <div className="border-t border-cyan-500/20 p-6" style={{ background: 'rgba(15, 23, 41, 0.5)' }}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-800/50 border border-cyan-500/20 mb-6">
          <TabsTrigger 
            value="trends" 
            data-testid="tab-trends"
            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Trends (2018-2025)
          </TabsTrigger>
          <TabsTrigger 
            value="distribution"
            data-testid="tab-distribution"
            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Distribution
          </TabsTrigger>
          <TabsTrigger 
            value="actions"
            data-testid="tab-actions"
            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
          >
            <Zap className="w-4 h-4 mr-2" />
            Cooling Actions
          </TabsTrigger>
        </TabsList>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="glass border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-base text-white">Land Surface Temperature (LST)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="year" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 23, 41, 0.95)', 
                        border: '1px solid rgba(76, 201, 240, 0.2)',
                        borderRadius: '8px',
                        color: '#e2e8f0'
                      }}
                    />
                    <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                    <Line type="monotone" dataKey="LST" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-base text-white">NDVI (Vegetation Index)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="year" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 23, 41, 0.95)', 
                        border: '1px solid rgba(76, 201, 240, 0.2)',
                        borderRadius: '8px',
                        color: '#e2e8f0'
                      }}
                    />
                    <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                    <Line type="monotone" dataKey="NDVI" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Distribution Tab */}
        <TabsContent value="distribution">
          <Card className="glass border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-base text-white">ΔUHI Distribution by Area</CardTitle>
              <p className="text-sm text-slate-400">Percentage of Peel region in each temperature range</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="range" stroke="#64748b" />
                  <YAxis stroke="#64748b" label={{ value: '% Area', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 23, 41, 0.95)', 
                      border: '1px solid rgba(76, 201, 240, 0.2)',
                      borderRadius: '8px',
                      color: '#e2e8f0'
                    }}
                  />
                  <Bar dataKey="area" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4cc9f0" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#4cc9f0" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Actions Tab */}
        <TabsContent value="actions">
          <div className="grid grid-cols-3 gap-6">
            {actions.map((action, idx) => (
              <Card key={idx} className="glass border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <CardHeader>
                  <div className={`w-full h-2 rounded-full bg-gradient-to-r ${action.color} mb-3`}></div>
                  <CardTitle className="text-base text-white">{action.timeline}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {action.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChartsSection;

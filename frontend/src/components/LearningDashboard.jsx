import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, Leaf, Thermometer, Target, ChevronRight, Info } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { EMBEDDED_DATA } from '../data/embeddedData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const USE_EMBEDDED_DATA = !BACKEND_URL || BACKEND_URL === 'EMBEDDED';

const LearningDashboard = ({ metrics, timeseriesData, regionalData, insights }) => {
  const [yearFilter, setYearFilter] = useState([2018, 2025]);
  const [landUseData, setLandUseData] = useState([]);
  const [heatDistData, setHeatDistData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      if (USE_EMBEDDED_DATA) {
        setLandUseData(EMBEDDED_DATA.landUseData);
        setHeatDistData(EMBEDDED_DATA.heatDistData);
        return;
      }

      const [landUseRes, heatDistRes] = await Promise.all([
        axios.get(`${API}/land-use-distribution`),
        axios.get(`${API}/heat-distribution`)
      ]);
      
      const landUse = Object.entries(landUseRes.data).map(([name, value]) => ({
        name,
        value
      }));
      setLandUseData(landUse);
      setHeatDistData(heatDistRes.data);
    } catch (error) {
      console.warn('Using embedded chart data');
      setLandUseData(EMBEDDED_DATA.landUseData);
      setHeatDistData(EMBEDDED_DATA.heatDistData);
    }
  };

  // Filter timeseries data based on year range
  const filteredTrendData = timeseriesData ? 
    timeseriesData.years
      .map((year, idx) => ({
        year,
        LST: parseFloat(timeseriesData.lst[idx]),
        NDVI: parseFloat(timeseriesData.ndvi[idx]),
        DUHI: parseFloat(timeseriesData.duhi[idx])
      }))
      .filter(d => d.year >= yearFilter[0] && d.year <= yearFilter[1])
    : [];

  const actions = [
    {
      timeline: 'Now (0-1 year)',
      icon: '🔴',
      color: 'from-red-500 to-orange-500',
      items: [
        { action: 'Paint roofs white', impact: 'Reduces building heat by 30%', learnMore: 'Cool Roofs' },
        { action: 'Add shade at bus stops', impact: 'Protects vulnerable people', learnMore: null },
        { action: 'Plant street trees', impact: 'Each tree cools 1-2°C', learnMore: 'Trees' },
      ]
    },
    {
      timeline: 'Soon (1-3 years)',
      icon: '🟡',
      color: 'from-amber-500 to-yellow-500',
      items: [
        { action: 'Use cool pavement', impact: 'Stays 10-15°C cooler', learnMore: 'Cool Pavement' },
        { action: 'Create green corridors', impact: 'Connects cool zones', learnMore: 'Green Corridors' },
        { action: 'Install water features', impact: 'Evaporative cooling', learnMore: 'Bioswales' },
      ]
    },
    {
      timeline: 'Future (3-10 years)',
      icon: '🟢',
      color: 'from-green-500 to-emerald-500',
      items: [
        { action: 'Achieve 30% tree cover', impact: 'City-wide cooling', learnMore: 'Trees' },
        { action: 'Mandate green roofs', impact: 'New buildings must cool', learnMore: 'Green Roofs' },
        { action: 'Build cooling parks', impact: 'Heat relief centers', learnMore: null },
      ]
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section - WHY */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/20 to-amber-500/20 border border-red-500/30 p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <h2 className="text-3xl font-bold text-white">Why This Matters</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-red-400 mb-2">The Crisis</h3>
              <p className="text-lg text-slate-200 leading-relaxed">
                <strong className="text-white">{metrics.area_exceeding_4c}%</strong> of Peel Region is now <strong className="text-white">{metrics.mean_duhi}°C hotter</strong> than nearby countryside. 
                That's like adding <strong className="text-white">10 extra heat wave days</strong> every summer.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-400 mb-2">Who's Affected</h3>
              <ul className="space-y-2 text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">→</span>
                  <span><strong>Elderly</strong> - Heat stroke risk increases 300%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">→</span>
                  <span><strong>Children</strong> - Can't regulate body temp as well</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">→</span>
                  <span><strong>Everyone</strong> - Higher energy bills, worse air quality</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT Section - Key Insights */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Info className="w-7 h-7 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">What the Data Shows</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {insights.map((insight, idx) => (
            <Card 
              key={idx}
              className="glass border-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer group"
              data-testid={`insight-card-${idx}`}
            >
              <CardContent className="p-6">
                <div className="text-3xl mb-3">
                  {insight.category === 'THE PROBLEM' && '🔥'}
                  {insight.category === 'WHY IT HAPPENS' && '🌳'}
                  {insight.category === 'WHERE TO ACT' && '📍'}
                  {insight.category === 'THE SOLUTION' && '💡'}
                  {insight.category === 'WHY ACT NOW' && '⏰'}
                </div>
                <h3 className="text-sm font-bold text-cyan-400 uppercase mb-2">{insight.category}</h3>
                <h4 className="text-base font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {insight.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{insight.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* WHERE Section - Interactive Trends */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Where We Stand: Trends Over Time</h2>
        </div>

        {/* Year Range Slider */}
        <Card className="glass border-cyan-500/20 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-white">Filter Years</label>
              <span className="text-sm text-cyan-400 font-mono">
                {yearFilter[0]} - {yearFilter[1]}
              </span>
            </div>
            <Slider
              data-testid="year-filter-slider"
              value={yearFilter}
              onValueChange={setYearFilter}
              min={2018}
              max={2025}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-slate-400 mt-2">
              Drag the slider to see how temperature and vegetation changed over specific years
            </p>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Land Use Pie Chart */}
          <Card className="glass border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Where Is The Heat Coming From?
              </CardTitle>
              <p className="text-xs text-slate-400">Land use breakdown - more industrial/commercial = more heat</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={landUseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {landUseData.map((entry, index) => {
                      const colors = ['#ef4444', '#f97316', '#3b82f6', '#10b981', '#6366f1', '#8b5cf6'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 41, 0.95)',
                      border: '1px solid rgba(76, 201, 240, 0.2)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-xs text-center text-slate-400 mt-2">
                🏭 <strong className="text-red-400">33%</strong> Industrial+Commercial zones create most heat
              </p>
            </CardContent>
          </Card>

          {/* Heat Distribution Bar Chart */}
          <Card className="glass border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-orange-400" />
                How Much Area Is Dangerously Hot?
              </CardTitle>
              <p className="text-xs text-slate-400">Heat level distribution across Peel Region</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={heatDistData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="range" type="category" stroke="#64748b" style={{ fontSize: '11px' }} width={120} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 41, 0.95)',
                      border: '1px solid rgba(76, 201, 240, 0.2)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="percentage" radius={[0, 8, 8, 0]}>
                    {heatDistData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-center text-slate-400 mt-2">
                ⚠️ <strong className="text-red-400">42%</strong> of area is in High or Extreme heat zones
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Line Charts - Temperature & Vegetation Trends */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="glass border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-orange-400" />
                Temperature Rising
              </CardTitle>
              <p className="text-xs text-slate-400">Surface temperature increasing each year</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={filteredTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="year" stroke="#64748b" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 23, 41, 0.95)', 
                      border: '1px solid rgba(76, 201, 240, 0.2)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="LST" 
                    stroke="#f97316" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#f97316' }}
                    name="Temperature (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-center text-slate-400 mt-2">
                📈 <strong className="text-red-400">+3.8°C per year</strong> - Peel is heating up fast!
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-400" />
                Vegetation Barely Growing
              </CardTitle>
              <p className="text-xs text-slate-400">Trees and green spaces not keeping up</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={filteredTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="year" stroke="#64748b" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '12px' }} domain={[0.25, 0.45]} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 23, 41, 0.95)', 
                      border: '1px solid rgba(76, 201, 240, 0.2)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="NDVI" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#10b981' }}
                    name="Greenness (NDVI)"
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-center text-slate-400 mt-2">
                🌱 Green growth is <strong className="text-amber-400">too slow</strong> to offset heat gains
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Regional Comparison */}
        <Card className="glass border-cyan-500/20 mt-6">
          <CardHeader>
            <CardTitle className="text-base text-white">Compare Neighborhoods</CardTitle>
            <p className="text-xs text-slate-400">See which areas are hottest and need help most</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full" data-testid="regional-comparison-table">
                <thead>
                  <tr className="border-b border-slate-700 text-left">
                    <th className="py-3 text-sm font-semibold text-slate-300">Area</th>
                    <th className="py-3 text-sm font-semibold text-slate-300">Greenness</th>
                    <th className="py-3 text-sm font-semibold text-slate-300">Temperature</th>
                    <th className="py-3 text-sm font-semibold text-slate-300">Heating Rate</th>
                    <th className="py-3 text-sm font-semibold text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalData.map((region, idx) => {
                    const isHot = region.duhi_trend > 3.5;
                    return (
                      <tr key={idx} className="border-b border-slate-800 hover:bg-cyan-500/5">
                        <td className="py-3 text-white font-medium">{region.name}</td>
                        <td className="py-3">
                          <span className={`text-sm ${
                            region.mean_ndvi >= 0.4 ? 'text-green-400' : 
                            region.mean_ndvi >= 0.3 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {region.mean_ndvi.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3 text-orange-400 text-sm">{region.mean_lst.toFixed(1)}°C</td>
                        <td className="py-3 text-red-400 text-sm font-semibold">+{region.duhi_trend}°C/yr</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            isHot ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {isHot ? '🔥 Urgent' : '✓ Watch'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ACTION Section */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">What YOU Can Do: Action Plan</h2>
        </div>
        <p className="text-slate-300 mb-6 text-lg">
          Real solutions that work. Each action below has been proven to cool cities.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {actions.map((timeframe, idx) => (
            <Card key={idx} className="glass border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <CardHeader>
                <div className={`h-2 rounded-full bg-gradient-to-r ${timeframe.color} mb-4`}></div>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <span className="text-2xl">{timeframe.icon}</span>
                  {timeframe.timeline}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeframe.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-slate-800/30 rounded-lg p-3 hover:bg-slate-800/50 transition-all">
                      <div className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white mb-1">{item.action}</p>
                          <p className="text-xs text-slate-400 mb-2">{item.impact}</p>
                          {item.learnMore && (
                            <button
                              onClick={() => {
                                // Scroll to Knowledge Hub and highlight section
                                const knowledgeTab = document.querySelector('[data-testid="tab-knowledge"]');
                                if (knowledgeTab) {
                                  knowledgeTab.click();
                                  setTimeout(() => {
                                    window.scrollTo({ top: 200, behavior: 'smooth' });
                                  }, 300);
                                }
                              }}
                              className="text-xs text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1"
                            >
                              📚 Learn more about {item.learnMore}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="glass border-cyan-500/30 mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Ready to Make a Difference?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Start with one action today. Plant a tree. Ask your city council about cooling programs. 
              Share this data with neighbors. Small steps by many people create big change.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors">
                Share This Dashboard
              </button>
              <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors border border-cyan-500/30">
                Download Action Guide
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningDashboard;
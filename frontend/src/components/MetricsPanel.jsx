import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Thermometer, Leaf, Activity, MapPin, AlertCircle } from 'lucide-react';

const MetricsPanel = ({ metrics, regionalData, insights }) => {
  const kpiCards = [
    {
      title: 'Mean ΔUHI',
      value: `${metrics.mean_duhi}°C`,
      trend: 'up',
      caption: 'Above rural baseline',
      icon: Thermometer,
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'High Heat Area',
      value: `${metrics.area_exceeding_4c}%`,
      trend: 'up',
      caption: 'Exceeds +4°C threshold',
      icon: Activity,
      color: 'from-orange-500 to-amber-500'
    },
    {
      title: 'Mean NDVI',
      value: metrics.mean_ndvi.toFixed(3),
      trend: metrics.mean_ndvi > 0.35 ? 'up' : 'down',
      caption: 'Vegetation index',
      icon: Leaf,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'NDVI-LST Correlation',
      value: metrics.correlation_ndvi_lst.toFixed(2),
      trend: 'down',
      caption: 'Inverse relationship',
      icon: Activity,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const iconMap = {
    thermometer: Thermometer,
    activity: Activity,
    'map-pin': MapPin,
    'trending-down': TrendingDown,
    'alert-circle': AlertCircle
  };

  return (
    <div 
      className="w-96 border-l border-cyan-500/20 overflow-y-auto p-6 space-y-6"
      style={{ background: 'rgba(15, 23, 41, 0.7)', backdropFilter: 'blur(16px)' }}
    >
      {/* KPI Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">Key Metrics</h2>
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card 
              key={idx}
              data-testid={`kpi-card-${idx}`}
              className="glass border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              style={{ animation: `fadeIn 0.5s ease-out ${idx * 0.1}s forwards`, opacity: 0 }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-1">{card.title}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white">{card.value}</span>
                      {card.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-red-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{card.caption}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} opacity-20 flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Regional Breakdown Table */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">Regional Summary</h2>
        <Card className="glass border-cyan-500/20">
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs" data-testid="regional-table">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 text-slate-400 font-medium">Region</th>
                    <th className="text-right py-2 text-slate-400 font-medium">NDVI</th>
                    <th className="text-right py-2 text-slate-400 font-medium">LST</th>
                    <th className="text-right py-2 text-slate-400 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalData.map((region, idx) => (
                    <tr key={idx} className="border-b border-slate-800 hover:bg-cyan-500/5 transition-colors">
                      <td className="py-2 text-white">{region.name}</td>
                      <td className="text-right py-2 text-slate-300">{region.mean_ndvi.toFixed(2)}</td>
                      <td className="text-right py-2 text-slate-300">{region.mean_lst.toFixed(1)}°C</td>
                      <td className="text-right py-2">
                        <span className="text-red-400">+{region.duhi_trend}°C/yr</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insight Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">Key Insights</h2>
        {insights.map((insight, idx) => {
          const Icon = iconMap[insight.icon] || AlertCircle;
          return (
            <Card 
              key={idx}
              data-testid={`insight-card-${idx}`}
              className="glass border-cyan-500/20 hover:border-cyan-500/40 transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{insight.category}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">{insight.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{insight.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MetricsPanel;

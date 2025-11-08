import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Map, Thermometer, BookOpen, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WelcomeModal from '../components/WelcomeModal';
import HelpButton from '../components/HelpButton';
import MapView from '../components/MapView';
import KnowledgeSection from '../components/KnowledgeSection';
import LearningDashboard from '../components/LearningDashboard';
import { EMBEDDED_DATA } from '../data/embeddedData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Flag to use embedded data (works offline!)
const USE_EMBEDDED_DATA = !BACKEND_URL || BACKEND_URL === 'EMBEDDED';

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [activeTab, setActiveTab] = useState('learn'); // learn, knowledge, map
  const [metrics, setMetrics] = useState(null);
  const [timeseriesData, setTimeseriesData] = useState(null);
  const [regionalData, setRegionalData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated] = useState('September 15, 2025'); // Will be dynamic with GEE

  // Show welcome modal on first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('urban-heat-visited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('urban-heat-visited', 'true');
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Try embedded data first (works offline!)
      if (USE_EMBEDDED_DATA) {
        console.log('📦 Using embedded data (offline mode)');
        setMetrics(EMBEDDED_DATA.metrics);
        setTimeseriesData(EMBEDDED_DATA.timeseries);
        setRegionalData(EMBEDDED_DATA.regionalData);
        setInsights(EMBEDDED_DATA.insights);
        toast.success('Dashboard loaded (offline mode)');
        setLoading(false);
        return;
      }

      // Try API with fallback to embedded data
      try {
        const [metricsRes, timeseriesRes, regionalRes, insightsRes] = await Promise.all([
          axios.get(`${API}/metrics?region=Peel (All)`),
          axios.get(`${API}/timeseries`),
          axios.get(`${API}/regional-breakdown`),
          axios.get(`${API}/insights`)
        ]);

        setMetrics(metricsRes.data);
        setTimeseriesData(timeseriesRes.data);
        setRegionalData(regionalRes.data);
        setInsights(insightsRes.data);
        
        toast.success('Dashboard data loaded successfully');
      } catch (apiError) {
        console.warn('API failed, using embedded data:', apiError.message);
        // Fallback to embedded data if API fails
        setMetrics(EMBEDDED_DATA.metrics);
        setTimeseriesData(EMBEDDED_DATA.timeseries);
        setRegionalData(EMBEDDED_DATA.regionalData);
        setInsights(EMBEDDED_DATA.insights);
        toast.info('Using offline data (API unavailable)');
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !metrics) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0b1020' }}>
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mx-auto"></div>
          <p className="text-lg text-slate-300">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0b1020' }}>
      <WelcomeModal open={showWelcome} onClose={() => setShowWelcome(false)} />
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
            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('learn')}
                data-testid="tab-learn"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'learn' 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Learn from Data
              </button>
              <button
                onClick={() => setActiveTab('knowledge')}
                data-testid="tab-knowledge"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'knowledge' 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Knowledge Hub
              </button>
              <button
                onClick={() => setActiveTab('map')}
                data-testid="tab-map"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'map' 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Map className="w-4 h-4 inline mr-2" />
                Explore Map
              </button>
            </div>

            {/* Data Freshness */}
            <div className="text-right border-l border-slate-700 pl-4">
              <p className="text-xs text-slate-500">Satellite Data</p>
              <p className="text-sm font-semibold text-cyan-400">
                Updated: {lastUpdated}
              </p>
            </div>

            <button
              onClick={() => setShowWelcome(true)}
              className="text-sm text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 px-3 py-2 rounded-lg transition-colors"
            >
              Show Guide
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'learn' && (
          <LearningDashboard 
            metrics={metrics}
            timeseriesData={timeseriesData}
            regionalData={regionalData}
            insights={insights}
          />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeSection />
        )}

        {activeTab === 'map' && (
          <MapView />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
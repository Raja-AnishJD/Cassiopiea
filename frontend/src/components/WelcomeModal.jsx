import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Thermometer, MapPin, Target, TrendingUp } from 'lucide-react';

const WelcomeModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-slate-900 border-cyan-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-400 mb-2">
            Welcome to Urban Heat Explorer
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-base">
            Your guide to understanding and fighting extreme heat in Brampton & Peel Region
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-lg p-4 border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">🎯 Our Mission</h3>
            <p className="text-slate-200 leading-relaxed">
              <strong>Help you understand where your city is dangerously hot</strong> and what can be done about it. 
              We use satellite data to show real heat patterns, not just weather forecasts.
            </p>
          </div>

          {/* Why This Matters */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Why This Matters to You:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-3 p-3 rounded-lg bg-slate-800/50">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <Thermometer className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white mb-1">Health & Safety</h4>
                  <p className="text-xs text-slate-400">Extreme heat causes illness, especially for elderly & children</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 rounded-lg bg-slate-800/50">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white mb-1">Know Your Risk</h4>
                  <p className="text-xs text-slate-400">Find out if your neighborhood is a hotspot</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 rounded-lg bg-slate-800/50">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white mb-1">Take Action</h4>
                  <p className="text-xs text-slate-400">See proven solutions: more trees, cool roofs, green spaces</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 rounded-lg bg-slate-800/50">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-white mb-1">Track Progress</h4>
                  <p className="text-xs text-slate-400">Watch how cooling efforts are working over time</p>
                </div>
              </div>
            </div>
          </div>

          {/* How to Use */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">How to Use This Dashboard:</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">1.</span>
                <p><strong className="text-white">Click anywhere on the map</strong> to see the temperature at that exact spot</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">2.</span>
                <p><strong className="text-white">Switch between layers</strong> (left panel) to see heat, vegetation, or temperature</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">3.</span>
                <p><strong className="text-white">Check the red/green markers</strong> - red = dangerous heat zones, green = cool spots</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">4.</span>
                <p><strong className="text-white">Scroll down</strong> to see charts and cooling action plans you can advocate for</p>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <p className="text-sm text-amber-200">
              <strong>💡 Quick Tip:</strong> Areas with more trees (high green values) are cooler. 
              Adding just 10% more tree cover can reduce temperature by 1-2°C!
            </p>
          </div>

          <Button
            onClick={onClose}
            data-testid="close-welcome-modal"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg"
          >
            Got It! Let's Explore →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
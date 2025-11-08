import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { HelpCircle, Map, Thermometer, Leaf, BarChart3, Target } from 'lucide-react';

const HelpButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        data-testid="help-button"
        variant="outline"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-600 border-none shadow-lg flex items-center justify-center"
      >
        <HelpCircle className="w-6 h-6 text-white" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-slate-900 border-cyan-500/30 text-white max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-cyan-400">Quick Help Guide</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Understanding the Data */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Map className="w-5 h-5 text-cyan-400" />
                Understanding the Map
              </h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <h4 className="font-semibold text-white mb-1">🔴 Red Areas = Dangerously Hot</h4>
                  <p>These zones are 4-8°C hotter than rural areas. Think: parking lots, industrial zones, areas with no trees.</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <h4 className="font-semibold text-white mb-1">🟢 Green Areas = Cooler & Safer</h4>
                  <p>Parks, forests, and tree-lined streets. These are natural cooling zones.</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <h4 className="font-semibold text-white mb-1">📍 Click Anywhere!</h4>
                  <p>Tap/click any spot on the map to see exact temperature and vegetation data for that location.</p>
                </div>
              </div>
            </div>

            {/* Understanding Metrics */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                What Do The Numbers Mean?
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3 p-2">
                  <Thermometer className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">ΔUHI (Delta UHI)</p>
                    <p className="text-slate-300">How much hotter a city spot is vs countryside. +4°C = dangerous, +8°C = extreme</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2">
                  <Leaf className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">NDVI (Greenness Index)</p>
                    <p className="text-slate-300">Measures vegetation. 0.2 = barren, 0.5 = lush. More trees = cooler temps!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2">
                  <Thermometer className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">LST (Surface Temperature)</p>
                    <p className="text-slate-300">Ground temperature from satellites. Can be 10-15°C hotter than air temperature!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What Can You Do */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                What Can YOU Do About Heat?
              </h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="font-semibold text-green-400 mb-1">🌳 Plant Trees!</p>
                  <p>Even one tree can cool your property by 1-2°C. Advocate for more street trees in your neighborhood.</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="font-semibold text-blue-400 mb-1">🏠 Cool Your Roof</p>
                  <p>White or reflective roofs can reduce surface temps by 20-30°C. Ask about city rebate programs!</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                  <p className="font-semibold text-purple-400 mb-1">📢 Advocate for Change</p>
                  <p>Use this data to push city council for cooling corridors, green infrastructure, and heat action plans.</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 text-center">
              <p className="text-sm text-slate-300">
                <strong className="text-cyan-400">Questions or found an issue?</strong><br/>
                This dashboard is powered by satellite data and local research to help Brampton/Peel stay cool.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HelpButton;
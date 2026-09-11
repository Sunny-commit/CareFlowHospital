import React, { useState, useEffect } from 'react';
import { simulationService, SimulationMode } from '../services/simulationService';
import { storageService } from '../services/storageService';
import { Sliders, Database, CheckCircle2, RotateCcw, ShieldAlert } from 'lucide-react';

export const SimulationBanner: React.FC = () => {
  const [mode, setMode] = useState<SimulationMode>(simulationService.getMode());
  const [isCloud, setIsCloud] = useState<boolean>(storageService.isCloudFirestoreActive());
  const [seedNotice, setSeedNotice] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setMode(simulationService.getMode());
    setIsCloud(storageService.isCloudFirestoreActive());
  }, []);

  const handleModeChange = (newMode: SimulationMode) => {
    simulationService.setMode(newMode);
    setMode(newMode);
    // Update URL parameter without reload
    const url = new URL(window.location.href);
    if (newMode === 'none') {
      url.searchParams.delete('simulate');
    } else {
      url.searchParams.set('simulate', newMode);
    }
    window.history.replaceState({}, '', url.toString());
  };

  const handleReseed = async () => {
    const result = await storageService.seedInitialDataIfNeeded(true);
    setSeedNotice(result.message);
    setTimeout(() => setSeedNotice(null), 4000);
    window.location.reload();
  };

  return (
    <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Simulated Hospital Demo
          </span>
          <span className="hidden sm:inline text-slate-400">
            For Playwright &amp; AI Agent Automation
          </span>
          <span className="inline-flex items-center gap-1 text-slate-300 font-mono">
            <Database className="w-3.5 h-3.5 text-teal-400" />
            {isCloud ? 'Firestore Connected' : 'Local Persistent Engine'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700"
          >
            <Sliders className="w-3.5 h-3.5 text-teal-400" />
            <span>Test Scenarios &amp; Simulation ({mode})</span>
          </button>

          <button
            type="button"
            onClick={handleReseed}
            title="Reset slots, doctors, and demo data"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-teal-900/60 hover:bg-teal-800 text-teal-200 transition border border-teal-700/50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {seedNotice && (
        <div className="bg-teal-950 text-teal-200 px-4 py-1.5 text-center flex items-center justify-center gap-2 border-t border-teal-800">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>{seedNotice}</span>
        </div>
      )}

      {isOpen && (
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-t border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Playwright Scenario Injector
              </div>
              <p className="text-slate-400 text-[11px]">
                Simulate realistic edge cases via URL query parameters like{' '}
                <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">?simulate=slot-conflict</code>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-medium">Active Mode:</span>
              {(['none', 'slot-conflict', 'database-error', 'slow-response'] as SimulationMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleModeChange(m)}
                  className={`px-2.5 py-1 rounded transition text-xs font-mono capitalize ${
                    mode === m
                      ? 'bg-teal-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {m.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

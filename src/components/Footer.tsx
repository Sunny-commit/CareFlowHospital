import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Phone, Mail, MapPin, Clock, AlertTriangle, ShieldCheck, Database } from 'lucide-react';
import { DatabaseViewerModal } from './DatabaseViewerModal';

export const Footer: React.FC = () => {
  const [showDbModal, setShowDbModal] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Emergency Disclaimer Banner */}
      <div className="bg-rose-900/90 text-rose-100 border-b border-rose-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-center gap-2.5 text-center text-xs sm:text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
          <span>
            <strong>Emergency Disclaimer:</strong> Online appointment scheduling is for non-urgent consultations only. If you are experiencing a life-threatening medical emergency, call 112 / 911 or visit your nearest emergency room immediately.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Fictional Note */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-md bg-teal-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span>CareFlow Hospital</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              CareFlow Hospital is a multi-specialty tertiary healthcare facility committed to ethical medicine, patient-centric treatment, and transparent outpatient scheduling.
            </p>
            <div className="p-2.5 rounded bg-slate-800/80 border border-slate-700/60 text-xs text-amber-300/90 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Simulation Environment:</strong> Fictional educational benchmark project for Playwright browser automation and AI agents.
              </span>
            </div>
          </div>

          {/* Col 2: Hospital Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-teal-400">Operating Hours</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">Emergency Care:</span>
                  <span className="text-xs text-slate-400">24 Hours / 7 Days a week</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">OPD Consultations:</span>
                  <span className="text-xs text-slate-400">Mon - Sat: 08:00 AM - 08:00 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium">Diagnostics &amp; Lab:</span>
                  <span className="text-xs text-slate-400">Mon - Sun: 07:00 AM - 09:00 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & RAG Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-teal-400">Patient Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/policies" className="hover:text-teal-400 transition">
                  Hospital Policies &amp; Guidelines
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-teal-400 transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-teal-400 transition">
                  Medical Departments (16)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-400 transition">
                  Services &amp; Facilities
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-teal-400 transition">
                  Doctor Directory (32+)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition">
                  About CareFlow Hospital
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-teal-400">Contact &amp; Location</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>CareFlow Medical Complex, Plot 14, Health Boulevard, Sector 44, Bengaluru 560034</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>+91 80 4000 0100 (Helpline)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>appointments@careflowhospital.test</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CareFlow Hospital. All fictional medical information, doctor profiles, and appointment records are generated strictly for test and browser automation purposes.
          </div>
          <button
            onClick={() => setShowDbModal(true)}
            id="btn-inspect-database"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-teal-200 border border-slate-700 transition font-mono shrink-0"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Inspect Database Records</span>
          </button>
        </div>
      </div>

      <DatabaseViewerModal isOpen={showDbModal} onClose={() => setShowDbModal(false)} />
    </footer>
  );
};

import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Hospital, Users, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Simulation Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-amber-950">Educational Simulation Project</strong>
          <span>
            CareFlow Hospital is a fictional educational demonstration platform built to showcase AI browser automation with Playwright and LangGraph. All doctors, appointments, and schedules are simulated test entities.
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-teal-700 text-sm font-semibold">
          <Hospital className="w-4 h-4" />
          <span>About CareFlow Hospital</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Excellence in Clinical Care &amp; Patient Service
        </h1>
        <p className="text-slate-600 leading-relaxed max-w-3xl">
          CareFlow Hospital is a premier multispecialty tertiary medical center dedicated to patient-centric outpatient care, precision diagnostics, and world-class surgical expertise.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Our Mission</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            To provide compassionate, evidence-based medical consultations with zero delays, deterministic scheduling, and transparent patient care.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Clinical Accreditations</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Accredited by National Healthcare Board (NABH-equivalent) and compliant with international outpatient ambulatory safety standards.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Patient Safety Guarantee</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strict infection control protocols, electronic health record tracking, and verified specialist credentials across all departments.
          </p>
        </div>
      </div>

      {/* Hospital Statistics */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-teal-400">6</div>
          <div className="text-xs text-slate-400">Clinical Specialties</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-teal-400">12+</div>
          <div className="text-xs text-slate-400">Certified Specialists</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-teal-400">50,000+</div>
          <div className="text-xs text-slate-400">Simulated Outpatients</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-teal-400">24/7</div>
          <div className="text-xs text-slate-400">Emergency &amp; Trauma Suite</div>
        </div>
      </div>

      {/* Facilities & Departments summary */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Our Outpatient Facilities</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Located in Metro Health Corridor, CareFlow Hospital features centralized digital registration desks, on-site pathology laboratories, MRI/CT imaging, pediatric play suites, and dedicated cardiology diagnostics labs.
        </p>
        <div className="pt-2">
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition"
          >
            <span>Explore All 6 Medical Departments</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

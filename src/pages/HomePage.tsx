import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Department } from '../types';
import {
  Calendar,
  Search,
  LogIn,
  HeartPulse,
  Clock,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Hospital
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const deps = await storageService.getDepartments();
        setDepartments(deps);
      } catch (err) {
        console.error('Error loading departments', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white border-b border-teal-100/60 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold">
                <HeartPulse className="w-3.5 h-3.5 text-teal-700" />
                CareFlow Hospital Healthcare Network
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Modern Healthcare, <span className="text-teal-700">Predictable Appointments.</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                CareFlow Hospital offers transparent, multi-specialty clinical care. Search board-certified specialists, verify real-time outpatient availability, and securely manage your consultations.
              </p>

              {/* Required Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/doctors"
                  data-testid="home-find-doctor"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-medium shadow-sm transition"
                >
                  <Search className="w-4 h-4" />
                  <span>Find a Doctor</span>
                </Link>

                <Link
                  to="/appointments/book"
                  data-testid="home-book-appointment"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-slate-50 text-teal-800 font-medium border border-teal-300 shadow-xs transition"
                >
                  <Calendar className="w-4 h-4 text-teal-700" />
                  <span>Book Appointment</span>
                </Link>

                <Link
                  to="/login"
                  data-testid="home-patient-login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
                >
                  <LogIn className="w-4 h-4 text-slate-600" />
                  <span>Patient Login</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="text-xs font-medium text-slate-700">NABH &amp; NABL Accredited</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hospital className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="text-xs font-medium text-slate-700">16 Departments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="text-xs font-medium text-slate-700">32+ Specialists</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="text-xs font-medium text-slate-700">Guaranteed Slots</span>
                </div>
              </div>
            </div>

            {/* Quick Operating Hours & Emergency Disclaimer Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <Hospital className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Hospital Operating Hours</h3>
                    <p className="text-xs text-slate-500">CareFlow Medical Complex</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Emergency Care (Casualty):</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">24 Hours / 7 Days</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Outpatient Consultations (OPD):</span>
                    <span className="font-semibold text-slate-800 text-xs">Mon - Sat: 08:00 AM - 08:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Diagnostic Lab &amp; Imaging:</span>
                    <span className="font-semibold text-slate-800 text-xs">Mon - Sun: 07:00 AM - 09:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-slate-600 font-medium">Pharmacy (In-Hospital):</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">Open 24/7</span>
                  </div>
                </div>

                {/* Emergency Disclaimer */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    Emergency Disclaimer
                  </div>
                  <p>
                    Online appointments are scheduled for non-acute, regular consultations. If you or a loved one is experiencing chest pain, severe trauma, stroke symptoms, or acute shortness of breath, please call <strong>+91 80 4000 0100</strong> or proceed immediately to the Emergency Ward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Departments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-teal-700 uppercase">Clinical Excellence</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Featured Departments
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Comprehensive specialty care equipped with dedicated consultation suites and modern diagnostics.
            </p>
          </div>
          <Link
            to="/departments"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-slate-100 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.slice(0, 6).map((dep) => (
              <div
                key={dep.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-teal-300 hover:shadow-sm transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-semibold border border-teal-100">
                        {dep.id}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1.5">{dep.name}</h3>
                    </div>
                    {dep.emergencySupport && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                        24x7 ER
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {dep.description}
                  </p>

                  {dep.location && (
                    <div className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span className="font-semibold text-slate-700">Location:</span> {dep.location}
                    </div>
                  )}

                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-semibold text-slate-700">Core Services:</span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {dep.services.slice(0, 2).map((srv, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/doctors?department=${encodeURIComponent(dep.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
                  >
                    <span>View Doctors</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to={`/appointments/book?departmentId=${dep.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium transition"
                  >
                    <span>Book Now</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center pt-2">
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-900 border border-slate-200 text-sm font-semibold text-slate-700 transition"
          >
            <span>Explore All 16 Clinical Departments &amp; Centres of Excellence</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Hospital Facilities & Clinical Services Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-teal-700 uppercase">State-of-the-Art Infrastructure</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Hospital Facilities &amp; 24x7 Services
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Fully integrated tertiary healthcare ecosystem engineered for rapid resuscitation, high-acuity surgeries, and outpatient comfort.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            <span>View All Facilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">24x7 Emergency &amp; Trauma</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Level 1 trauma triage bays, mobile ICU ambulances, and immediate code stroke &amp; cardiac teams.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">3.0 Tesla MRI &amp; CT</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Silent MRI technology, 128-slice dual source low-radiation CT, and 4D ultrasound imaging suites.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Hospital className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Modular Robotic OTs</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              12 ultra-clean laminar airflow surgical suites featuring Da Vinci robotic assisted precision surgery.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Preventive Health Checks</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tailored Executive Master Health Checks, Well Woman, and Cardiac Screening with immediate specialist reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Policies Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-900 text-white rounded-2xl p-8 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
              Transparent Policies
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Predictable, Respectful Care Scheduling
            </h2>
            <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
              We respect your time. Every appointment made through CareFlow is reserved in a dedicated slot to minimize waiting room delays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="bg-teal-800/60 p-4 rounded-xl border border-teal-700/50 space-y-2">
              <h4 className="font-semibold text-teal-200 text-sm">Flexible Rescheduling</h4>
              <p className="text-xs text-teal-100/90 leading-relaxed">
                Reschedule appointments easily up to 4 hours prior to your scheduled consultation slot.
              </p>
            </div>

            <div className="bg-teal-800/60 p-4 rounded-xl border border-teal-700/50 space-y-2">
              <h4 className="font-semibold text-teal-200 text-sm">Simple Cancellations</h4>
              <p className="text-xs text-teal-100/90 leading-relaxed">
                Explicit two-step cancellation with instant slot release back to other patients in need.
              </p>
            </div>

            <div className="bg-teal-800/60 p-4 rounded-xl border border-teal-700/50 space-y-2">
              <h4 className="font-semibold text-teal-200 text-sm">Punctual Check-In</h4>
              <p className="text-xs text-teal-100/90 leading-relaxed">
                Please arrive 15 minutes ahead of your time slot with photo identification for OPD registration.
              </p>
            </div>

            <div className="bg-teal-800/60 p-4 rounded-xl border border-teal-700/50 space-y-2">
              <h4 className="font-semibold text-teal-200 text-sm">Fictional Demo Environment</h4>
              <p className="text-xs text-teal-100/90 leading-relaxed">
                Test accounts and simulated data are pre-seeded for automated browser testing and agent benchmarks.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-start">
            <Link
              to="/policies"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium text-sm transition"
            >
              <span>Read Full Hospital Policies &amp; Guidelines</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

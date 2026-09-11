import React from 'react';
import { ShieldCheck, CalendarX, CalendarCheck, FileText, AlertTriangle, Lock } from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Simulation Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block text-amber-950 font-bold">Fictional Educational Simulation Notice</strong>
          <span>
            CareFlow Hospital is an educational simulation environment built for testing AI agents via browser automation. No real patient data, payment processing, or medical treatment is handled by this website.
          </span>
        </div>
      </div>

      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-teal-700 text-sm font-semibold">
          <FileText className="w-4 h-4" />
          <span>Patient Guidelines</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Hospital Scheduling &amp; Privacy Policies
        </h1>
        <p className="text-slate-600 leading-relaxed text-sm">
          Please review CareFlow Hospital&apos;s outpatient policies regarding appointment bookings, rescheduling terms, cancellations, and privacy standards.
        </p>
      </div>

      {/* Cancellation Policy */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 text-rose-700">
          <div className="p-2.5 rounded-xl bg-rose-50">
            <CalendarX className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">1. Cancellation Policy</h2>
        </div>
        <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
          <p>
            • <strong>Advance Notice:</strong> Patients are encouraged to cancel appointments at least 2 hours prior to their scheduled slot if unable to attend.
          </p>
          <p>
            • <strong>Immediate Slot Release:</strong> When an appointment is cancelled, the reserved time slot is immediately released back to the hospital database so other patients or emergency consultations can be scheduled.
          </p>
          <p>
            • <strong>No Cancellation Fee:</strong> Outpatient consultations at CareFlow do not incur pre-payment cancellation penalties.
          </p>
          <p>
            • <strong>Completed Consultations:</strong> Consultations marked as &quot;completed&quot; cannot be cancelled or altered.
          </p>
        </div>
      </section>

      {/* Rescheduling Policy */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 text-blue-700">
          <div className="p-2.5 rounded-xl bg-blue-50">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">2. Rescheduling Policy</h2>
        </div>
        <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
          <p>
            • <strong>Same-Doctor Availability:</strong> Patients can reschedule any active confirmed appointment to another open slot with the same doctor at any time before consultation commencement.
          </p>
          <p>
            • <strong>Atomic Swapping:</strong> Rescheduling is handled atomically: your old slot is freed and your new slot is locked in a single transactional step, preventing race conditions or double bookings.
          </p>
          <p>
            • <strong>Past Dates:</strong> Rescheduling to past dates or to slots already reserved by other patients is strictly prohibited.
          </p>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 text-teal-700">
          <div className="p-2.5 rounded-xl bg-teal-50">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">3. Privacy &amp; Data Security Standards</h2>
        </div>
        <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
          <p>
            • <strong>Minimal Data Collection:</strong> Only basic identification details (Patient ID, Full Name, Contact Number, Email, and general Visit Reason) are required for outpatient booking.
          </p>
          <p>
            • <strong>No Sensitive Health Records:</strong> We do not ask for or store confidential medical history, prescription scans, or payment card numbers on this web interface.
          </p>
          <p>
            • <strong>Role-Based Firestore Rules:</strong> Patient appointment records are protected by database security rules allowing patients to only access and modify their own bookings.
          </p>
        </div>
      </section>
    </div>
  );
};

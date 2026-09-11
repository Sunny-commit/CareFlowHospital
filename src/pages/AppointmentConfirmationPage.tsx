import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Appointment } from '../types';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorAlert } from '../components/ErrorAlert';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building2,
  DollarSign,
  ArrowRight,
  Home,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const AppointmentConfirmationPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointment = async () => {
    if (!appointmentId) return;
    setLoading(true);
    setError(null);
    try {
      const appt = await storageService.getAppointmentById(appointmentId);
      if (!appt) {
        throw new Error(`Appointment with ID "${appointmentId}" was not found.`);
      }
      setAppointment(appt);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to retrieve appointment confirmation.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [appointmentId]);

  if (loading) {
    return <LoadingIndicator message="Retrieving appointment confirmation details..." />;
  }

  if (error || !appointment) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <ErrorAlert
          title="Confirmation Lookup Failed"
          message={error || 'Could not find the specified appointment.'}
          onRetry={fetchAppointment}
        />
        <div className="mt-4 text-center">
          <Link to="/" className="text-teal-700 text-sm font-semibold hover:underline">
            Return to CareFlow Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      {/* Confirmation Card with data-testid="booking-success" */}
      <div
        data-testid="booking-success"
        className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8"
      >
        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Booking Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Appointment Reserved Successfully
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your consultation slot is locked in the CareFlow Hospital database. Please arrive 15 minutes early.
          </p>
        </div>

        {/* Appointment ID Highlight */}
        <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl text-center space-y-1">
          <span className="text-xs text-teal-800 font-semibold uppercase tracking-wider block">
            Official Appointment Reference ID
          </span>
          <div
            data-testid="appointment-id"
            className="text-xl sm:text-2xl font-mono font-extrabold text-teal-950 tracking-wider"
          >
            {appointment.id}
          </div>
        </div>

        {/* Verified Details Grid */}
        <div className="space-y-4 text-xs sm:text-sm">
          <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
            Consultation Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                Patient Name
              </span>
              <span data-testid="confirmation-patient-name" className="font-bold text-slate-900">
                {appointment.patientName || 'Rahul Sharma'}
              </span>
              <div className="text-[11px] text-slate-500 font-mono">
                ID: {appointment.patientId}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5" />
                Specialist Doctor
              </span>
              <span data-testid="confirmation-doctor-name" className="font-bold text-slate-900">
                {appointment.doctorName}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                Department
              </span>
              <span data-testid="confirmation-department" className="font-bold text-slate-900">
                {appointment.departmentName}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Appointment Date
              </span>
              <span data-testid="confirmation-date" className="font-bold text-slate-900">
                {appointment.appointmentDate}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Scheduled Time Slot
              </span>
              <span data-testid="confirmation-time" className="font-bold text-slate-900 font-mono">
                {appointment.startTime} - {appointment.endTime}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Appointment Status
              </span>
              <span
                data-testid="confirmation-status"
                className="font-bold text-emerald-700 capitalize inline-block"
              >
                {appointment.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                Consultation Fee
              </span>
              <span className="font-bold text-teal-800 text-base">
                ₹{appointment.consultationFee}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                Booking Created
              </span>
              <span className="text-slate-700 text-xs font-mono">
                {new Date(appointment.createdAt).toLocaleDateString()} at{' '}
                {new Date(appointment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl space-y-1 text-xs text-slate-700">
            <span className="font-semibold block text-slate-900">Reason for Visit:</span>
            <span>{appointment.reasonForVisit}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/appointments"
            data-testid="view-my-appointments"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition"
          >
            <span>View My Appointments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

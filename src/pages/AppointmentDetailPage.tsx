import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Appointment } from '../types';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorAlert } from '../components/ErrorAlert';
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building2,
  CalendarCheck,
  CalendarX,
  ArrowLeft,
  FileText,
  DollarSign
} from 'lucide-react';

export const AppointmentDetailPage: React.FC = () => {
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
        throw new Error(`Appointment with ID "${appointmentId}" not found.`);
      }
      setAppointment(appt);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error retrieving appointment.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [appointmentId]);

  if (loading) {
    return <LoadingIndicator message="Loading appointment record..." />;
  }

  if (error || !appointment) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <ErrorAlert
          title="Appointment Lookup Error"
          message={error || 'Appointment record not found.'}
          onRetry={fetchAppointment}
        />
        <div className="mt-4">
          <Link to="/appointments" className="text-teal-700 text-sm font-semibold hover:underline">
            Back to My Appointments
          </Link>
        </div>
      </div>
    );
  }

  const canReschedule = appointment.status === 'confirmed' || appointment.status === 'rescheduled';
  const canCancel = appointment.status === 'confirmed' || appointment.status === 'rescheduled';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <Link
          to="/appointments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Appointments</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                {appointment.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize bg-emerald-100 text-emerald-800">
                {appointment.status}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
              Appointment Record
            </h1>
          </div>

          <div className="text-xs text-slate-500">
            Booked on {new Date(appointment.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Stethoscope className="w-3.5 h-3.5" />
              Specialist Physician
            </span>
            <div className="font-bold text-slate-900 text-base">{appointment.doctorName}</div>
            <div className="text-teal-700 font-semibold">{appointment.departmentName}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Scheduled Date &amp; Slot
            </span>
            <div className="font-bold text-slate-900 text-base">{appointment.appointmentDate}</div>
            <div className="text-slate-600 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {appointment.startTime} - {appointment.endTime}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              Patient Details
            </span>
            <div className="font-bold text-slate-900">{appointment.patientName || 'Rahul Sharma'}</div>
            <div className="text-slate-500 font-mono text-xs">ID: {appointment.patientId}</div>
            <div className="text-slate-600">{appointment.patientEmail} | {appointment.patientPhone}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              Consultation Fee
            </span>
            <div className="font-bold text-teal-800 text-base">₹{appointment.consultationFee}</div>
            <div className="text-slate-500 text-xs">Payable at OPD Reception desk</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm space-y-2">
          <div className="font-bold text-slate-900">Reason for Visit</div>
          <p className="text-slate-700">{appointment.reasonForVisit}</p>
          {appointment.notes && (
            <div className="pt-2 border-t border-slate-200 text-slate-600">
              <strong>Notes:</strong> {appointment.notes}
            </div>
          )}
          {appointment.cancellationReason && (
            <div className="pt-2 border-t border-slate-200 text-rose-700 font-semibold">
              <strong>Cancellation Reason:</strong> {appointment.cancellationReason}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <Link
            to={`/appointments/${appointment.id}/confirmation`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
          >
            <FileText className="w-4 h-4" />
            <span>View Printable Confirmation Slip</span>
          </Link>

          <div className="flex items-center gap-2">
            {canReschedule && (
              <Link
                to={`/appointments/${appointment.id}/reschedule`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold border border-blue-200 transition"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Reschedule Appointment</span>
              </Link>
            )}

            {canCancel && (
              <Link
                to={`/appointments/${appointment.id}/cancel`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold border border-rose-200 transition"
              >
                <CalendarX className="w-4 h-4" />
                <span>Cancel Appointment</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Appointment } from '../types';
import { LoadingIndicator } from '../components/LoadingIndicator';
import {
  AlertTriangle,
  CalendarX,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const CancelPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [cancellationReason, setCancellationReason] = useState<string>('Patient schedule conflict');
  const [customReason, setCustomReason] = useState<string>('');
  const [confirmedCheckbox, setConfirmedCheckbox] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const predefinedReasons = [
    'Patient schedule conflict',
    'Health improved / Consultation no longer needed',
    'Prefer another specialist doctor',
    'Personal / family emergency',
    'Financial or insurance constraint',
    'Other reason'
  ];

  const fetchAppointment = async () => {
    if (!appointmentId) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const appt = await storageService.getAppointmentById(appointmentId);
      if (!appt) {
        throw new Error(`Appointment "${appointmentId}" was not found.`);
      }

      if (appt.status === 'cancelled') {
        throw new Error('This appointment has already been cancelled.');
      }
      if (appt.status === 'completed') {
        throw new Error('Completed appointments cannot be cancelled.');
      }

      setAppointment(appt);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to retrieve appointment.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [appointmentId]);

  const handleConfirmCancellation = async () => {
    if (!appointment) return;
    if (!confirmedCheckbox) {
      setErrorMessage('You must check the confirmation checkbox to proceed with cancellation.');
      return;
    }

    const finalReason = cancellationReason === 'Other reason'
      ? (customReason.trim() || 'Other reason')
      : cancellationReason;

    setProcessing(true);
    setErrorMessage(null);

    try {
      const updated = await storageService.cancelAppointment(appointment.id, finalReason);
      setAppointment(updated);
      setSuccessMessage('Appointment has been successfully cancelled. The reserved slot has been released back into the hospital availability pool.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to cancel appointment.';
      setErrorMessage(msg);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <LoadingIndicator message="Loading appointment details..." />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8" data-testid="cancel-dialog">
      <div>
        <Link
          to="/appointments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Appointments</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <CalendarX className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {appointmentId}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              Cancel Appointment
            </h1>
            <p className="text-xs text-slate-500">
              Cancellation is an explicit action and will release your booked slot.
            </p>
          </div>
        </div>

        {/* Error Alert with data-testid="cancel-error" */}
        {errorMessage && (
          <div
            data-testid="cancel-error"
            role="alert"
            aria-live="assertive"
            className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs sm:text-sm flex items-start gap-2.5"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Cancellation Alert</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Success Alert with data-testid="cancel-success" */}
        {successMessage && (
          <div
            data-testid="cancel-success"
            role="status"
            aria-live="polite"
            className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Cancellation Complete</span>
              <p>{successMessage}</p>
              <div className="pt-3">
                <Link
                  to="/appointments"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition"
                >
                  <span>Return to My Appointments</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Appointment Details Display */}
        {appointment && !successMessage && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                Appointment Information
              </span>
              <div className="grid grid-cols-2 gap-3 text-slate-800">
                <div>Doctor: <strong>{appointment.doctorName}</strong></div>
                <div>Department: <strong>{appointment.departmentName}</strong></div>
                <div>Date: <strong>{appointment.appointmentDate}</strong></div>
                <div>Time: <strong>{appointment.startTime} - {appointment.endTime}</strong></div>
                <div>Patient: <strong>{appointment.patientName || 'Rahul Sharma'}</strong></div>
                <div>Fee: <strong>₹{appointment.consultationFee}</strong></div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Warning:</strong> Cancelling this appointment will release the time slot immediately so that other patients may book it. If you wish to consult at another time instead, consider rescheduling.
              </p>
            </div>

            {/* Cancellation Reason Selection with data-testid="cancellation-reason" */}
            <div className="space-y-2">
              <label
                htmlFor="cancellation-reason"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Select Cancellation Reason *
              </label>
              <select
                id="cancellation-reason"
                data-testid="cancellation-reason"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50/50"
              >
                {predefinedReasons.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {cancellationReason === 'Other reason' && (
                <textarea
                  rows={2}
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Please specify your cancellation reason..."
                  className="w-full mt-2 px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50/50"
                />
              )}
            </div>

            {/* Confirmation Checkbox with data-testid="cancel-confirmation-checkbox" */}
            <div className="pt-2">
              <label
                htmlFor="cancel-confirmation-checkbox"
                className="flex items-start gap-3 p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 cursor-pointer"
              >
                <input
                  id="cancel-confirmation-checkbox"
                  type="checkbox"
                  data-testid="cancel-confirmation-checkbox"
                  checked={confirmedCheckbox}
                  onChange={(e) => setConfirmedCheckbox(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                />
                <span className="text-xs text-slate-800 leading-relaxed select-none">
                  I understand that this action will permanently cancel appointment{' '}
                  <strong>{appointment.id}</strong> and release the consultation time slot back to the hospital schedule.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                to="/appointments"
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold text-center hover:bg-slate-50"
              >
                Keep Appointment
              </Link>

              {/* The final cancellation button with visible text: "Confirm Cancellation" */}
              <button
                type="button"
                data-testid="confirm-cancellation"
                disabled={!confirmedCheckbox || processing}
                onClick={handleConfirmCancellation}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {processing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Cancelling Appointment...</span>
                  </>
                ) : (
                  <>
                    <CalendarX className="w-4 h-4" />
                    <span>Confirm Cancellation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

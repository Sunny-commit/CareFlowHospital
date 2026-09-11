import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Appointment, AvailabilitySlot } from '../types';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorAlert } from '../components/ErrorAlert';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CalendarCheck,
  Stethoscope
} from 'lucide-react';

export const ReschedulePage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchAppointmentAndSlots = async () => {
    if (!appointmentId) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const appt = await storageService.getAppointmentById(appointmentId);
      if (!appt) {
        throw new Error(`Appointment "${appointmentId}" not found.`);
      }

      if (appt.status === 'completed') {
        throw new Error('Completed appointments cannot be rescheduled.');
      }
      if (appt.status === 'cancelled') {
        throw new Error('Cancelled appointments cannot be rescheduled.');
      }

      setAppointment(appt);

      // Fetch open slots for the same doctor
      const slots = await storageService.getSlotsByDoctor(appt.doctorId);
      const openSlots = slots.filter((s) => s.status === 'available');
      setAvailableSlots(openSlots);

      if (openSlots.length > 0) {
        const uniqueDates = Array.from(new Set(openSlots.map((s) => s.date))).sort();
        setSelectedDate(uniqueDates[0]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error preparing rescheduling flow.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentAndSlots();
  }, [appointmentId]);

  // Unique dates
  const availableDates = Array.from(new Set(availableSlots.map((s) => s.date))).sort();

  // Filtered slots for selected date
  const slotsOnDate = availableSlots
    .filter((s) => s.date === selectedDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const chosenSlot = availableSlots.find((s) => s.id === selectedSlotId);

  const handleConfirmReschedule = async () => {
    if (!appointment || !chosenSlot) {
      setErrorMessage('Please select a new appointment date and time slot.');
      return;
    }

    setProcessing(true);
    setErrorMessage(null);

    try {
      const updated = await storageService.rescheduleAppointment(
        appointment.id,
        chosenSlot.id,
        chosenSlot.date,
        chosenSlot.startTime,
        chosenSlot.endTime
      );
      setAppointment(updated);
      setSuccessMessage(`Appointment successfully rescheduled to ${chosenSlot.date} at ${chosenSlot.startTime}.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Rescheduling failed. The slot may have just been booked.';
      setErrorMessage(msg);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <LoadingIndicator message="Loading appointment details and doctor schedule..." />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8" data-testid="reschedule-dialog">
      {/* Back button */}
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
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              {appointmentId}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              Reschedule Appointment
            </h1>
            <p className="text-xs text-slate-500">
              Select a new available date and time slot for Doctor <strong>{appointment?.doctorName}</strong>.
            </p>
          </div>
        </div>

        {/* Error Alert with data-testid="reschedule-error" */}
        {errorMessage && (
          <div
            data-testid="reschedule-error"
            role="alert"
            aria-live="assertive"
            className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs sm:text-sm flex items-start gap-2.5"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Rescheduling Conflict or Error</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Success Alert with data-testid="reschedule-success" */}
        {successMessage && (
          <div
            data-testid="reschedule-success"
            role="status"
            aria-live="polite"
            className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs sm:text-sm flex items-start gap-2.5"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Reschedule Confirmed!</span>
              <p>{successMessage}</p>
              <div className="pt-2">
                <Link
                  to="/appointments"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:underline"
                >
                  <span>Return to My Appointments</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Current vs New Appointment Comparison */}
        {appointment && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="space-y-1">
              <span className="font-bold uppercase tracking-wider text-slate-500 block">
                Current Scheduled Slot
              </span>
              <div className="text-slate-800">
                <strong>Date:</strong> {appointment.appointmentDate}
              </div>
              <div className="text-slate-800 font-mono">
                <strong>Time:</strong> {appointment.startTime} - {appointment.endTime}
              </div>
              <div className="text-teal-700">
                <strong>Doctor:</strong> {appointment.doctorName} ({appointment.departmentName})
              </div>
            </div>

            <div className="space-y-1 sm:border-l sm:border-slate-200 sm:pl-4">
              <span className="font-bold uppercase tracking-wider text-teal-800 block">
                New Requested Slot
              </span>
              {chosenSlot ? (
                <>
                  <div className="text-slate-900 font-bold">
                    <strong>New Date:</strong> {chosenSlot.date}
                  </div>
                  <div className="text-slate-900 font-mono font-bold">
                    <strong>New Time:</strong> {chosenSlot.startTime} - {chosenSlot.endTime}
                  </div>
                  <div className="text-emerald-700 font-semibold">
                    Slot ready for confirmation
                  </div>
                </>
              ) : (
                <span className="text-slate-400 italic">No new slot selected yet</span>
              )}
            </div>
          </div>
        )}

        {/* Available Dates Selection */}
        {!successMessage && appointment && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="reschedule-date" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Select New Consultation Date
              </label>
              <select
                id="reschedule-date"
                data-testid="reschedule-date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedSlotId('');
                }}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50/50"
              >
                <option value="">-- Choose New Date --</option>
                {availableDates.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2 pt-1">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlotId('');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                      selectedDate === date
                        ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots with data-testid="reschedule-slots" */}
            <div className="space-y-2" data-testid="reschedule-slots">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Available Time Slots for {selectedDate} ({slotsOnDate.length})
              </label>

              {slotsOnDate.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                  No open slots found on {selectedDate}. Please select another date.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {slotsOnDate.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        data-testid={`reschedule-slot-${slot.id}`}
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-teal-700 text-white border-teal-700 ring-2 ring-teal-600 ring-offset-1'
                            : 'bg-slate-50 hover:bg-teal-50 border-slate-200 hover:border-teal-300 text-slate-800'
                        }`}
                      >
                        <span className="text-xs font-bold font-mono">
                          {slot.startTime} - {slot.endTime}
                        </span>
                        <span className={`text-[10px] font-semibold ${isSelected ? 'text-teal-100' : 'text-emerald-700'}`}>
                          Available
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                to="/appointments"
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold text-center hover:bg-slate-50"
              >
                Cancel &amp; Go Back
              </Link>

              <button
                type="button"
                data-testid="confirm-reschedule"
                disabled={processing || !chosenSlot}
                onClick={handleConfirmReschedule}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {processing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating Database...</span>
                  </>
                ) : (
                  <>
                    <CalendarCheck className="w-4 h-4" />
                    <span>Confirm Reschedule</span>
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

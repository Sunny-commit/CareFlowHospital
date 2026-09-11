import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { authService, AuthState } from '../services/authService';
import { Appointment, AppointmentStatus } from '../types';
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
  Filter,
  ArrowRight,
  RefreshCw,
  Plus
} from 'lucide-react';

export const MyAppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>(authService.getState());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = authService.subscribe(setAuthState);
    return () => unsub();
  }, []);

  const patientId = authState.patient?.id || 'PAT-1001';

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await storageService.getAppointmentsByPatient(patientId);
      setAppointments(list);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load patient appointments.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [patientId]);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    if (statusFilter === 'all') return appointments;
    return appointments.filter((a) => a.status === statusFilter);
  }, [appointments, statusFilter]);

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Confirmed
          </span>
        );
      case 'rescheduled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            Rescheduled
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" data-testid="my-appointments">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-teal-700 text-sm font-semibold mb-1">
            <Calendar className="w-4 h-4" />
            <span>CareFlow Patient Consultations</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Patient:{' '}
            <strong>{authState.patient ? authState.patient.fullName : 'Rahul Sharma'}</strong> (ID: {patientId})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchAppointments}
            title="Refresh appointments"
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link
            to="/appointments/book"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Appointment</span>
          </Link>
        </div>
      </div>

      {/* Filter Toolbar with data-testid="appointment-status-filter" */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <Filter className="w-4 h-4 text-teal-700" />
          <label htmlFor="appointment-status-filter">Filter by Status:</label>
        </div>

        <div className="flex items-center gap-2">
          <select
            id="appointment-status-filter"
            data-testid="appointment-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50/50"
          >
            <option value="all">All Appointments</option>
            <option value="confirmed">Confirmed</option>
            <option value="rescheduled">Rescheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <span className="text-xs text-slate-400">
            Showing {filteredAppointments.length} record(s)
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading && <LoadingIndicator message="Fetching your appointment records..." />}

      {/* Error State */}
      {error && (
        <ErrorAlert
          title="Appointments Lookup Error"
          message={error}
          onRetry={fetchAppointments}
        />
      )}

      {/* Appointments List */}
      {!loading && !error && (
        <>
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <CalendarX className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No appointments found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No appointment history matches the selected filter. Book a consultation with a CareFlow specialist.
              </p>
              <div className="pt-2">
                <Link
                  to="/appointments/book"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-700 text-white text-xs font-medium hover:bg-teal-800 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Book an Appointment</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appt) => {
                const canReschedule = appt.status === 'confirmed' || appt.status === 'rescheduled';
                const canCancel = appt.status === 'confirmed' || appt.status === 'rescheduled';

                return (
                  <article
                    key={appt.id}
                    data-testid={`appointment-card-${appt.id}`}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition p-6 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-teal-900 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                          {appt.id}
                        </span>
                        {getStatusBadge(appt.status)}
                      </div>
                      <div className="text-xs text-slate-500">
                        Booked: {new Date(appt.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Stethoscope className="w-3.5 h-3.5" />
                          Doctor
                        </span>
                        <div className="font-bold text-slate-900 text-sm">{appt.doctorName}</div>
                        <div className="text-teal-700 font-medium">{appt.departmentName}</div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Appointment Date
                        </span>
                        <div className="font-bold text-slate-900 text-sm">{appt.appointmentDate}</div>
                        <div className="text-slate-500 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {appt.startTime} - {appt.endTime}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          Patient
                        </span>
                        <div className="font-medium text-slate-800">{appt.patientName || 'Rahul Sharma'}</div>
                        <div className="text-slate-500 font-mono text-[11px]">ID: {appt.patientId}</div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400">Consultation Fee</span>
                        <div className="font-bold text-teal-800 text-sm">₹{appt.consultationFee}</div>
                        <div className="text-slate-400 text-[11px]">Pay at Reception</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                      <div>
                        <strong>Reason for Visit:</strong> {appt.reasonForVisit}
                      </div>
                      {appt.notes && (
                        <div className="text-slate-500">
                          <strong>Notes:</strong> {appt.notes}
                        </div>
                      )}
                      {appt.cancellationReason && (
                        <div className="text-rose-700 font-semibold pt-1 border-t border-slate-200">
                          <strong>Cancellation Reason:</strong> {appt.cancellationReason}
                        </div>
                      )}
                    </div>

                    {/* Actions: Reschedule & Cancel Buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        to={`/appointments/${appt.id}/confirmation`}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                      >
                        <span>View Confirmation Slip</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-2">
                        {canReschedule && (
                          <Link
                            to={`/appointments/${appt.id}/reschedule`}
                            data-testid={`reschedule-${appt.id}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition"
                          >
                            <CalendarCheck className="w-3.5 h-3.5" />
                            <span>Reschedule</span>
                          </Link>
                        )}

                        {canCancel && (
                          <Link
                            to={`/appointments/${appt.id}/cancel`}
                            data-testid={`cancel-${appt.id}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold border border-rose-200 transition"
                          >
                            <CalendarX className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Doctor, AvailabilitySlot } from '../types';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorAlert } from '../components/ErrorAlert';
import {
  Calendar,
  Clock,
  DollarSign,
  Briefcase,
  Globe,
  GraduationCap,
  Award,
  ArrowLeft,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

export const DoctorProfilePage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctorData = async () => {
    if (!doctorId) return;
    setLoading(true);
    setError(null);
    try {
      const doc = await storageService.getDoctorById(doctorId);
      if (!doc) {
        throw new Error(`Doctor with ID "${doctorId}" was not found.`);
      }
      setDoctor(doc);

      const allSlots = await storageService.getSlotsByDoctor(doctorId);
      const availableOnly = allSlots.filter((s) => s.status === 'available');
      setSlots(availableOnly);

      // Default to the first available date
      if (availableOnly.length > 0) {
        const uniqueDates = Array.from(new Set(availableOnly.map((s) => s.date))).sort();
        setSelectedDate(uniqueDates[0]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load doctor profile.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, [doctorId]);

  // Unique sorted dates available for this doctor
  const availableDates = Array.from(new Set(slots.map((s) => s.date))).sort();

  // Slots matching the chosen date
  const filteredSlots = slots
    .filter((s) => s.date === selectedDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handleStartBooking = () => {
    if (!doctor) return;
    let url = `/appointments/book?doctorId=${doctor.id}`;
    if (selectedSlotId) {
      url += `&slotId=${selectedSlotId}`;
    }
    if (selectedDate) {
      url += `&date=${selectedDate}`;
    }
    navigate(url);
  };

  if (loading) {
    return <LoadingIndicator message="Loading doctor profile and availability schedule..." />;
  }

  if (error || !doctor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ErrorAlert
          title="Doctor Not Found"
          message={error || 'The requested doctor profile could not be located.'}
          onRetry={fetchDoctorData}
        />
        <div className="mt-4">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-1.5 text-sm text-teal-700 font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Doctors Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" data-testid="doctor-profile">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          to="/doctors"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-teal-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Doctors</span>
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={doctor.profileImage}
            alt={doctor.fullName}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
          />

          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  data-testid="doctor-department"
                  className="px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200"
                >
                  {doctor.departmentName}
                </span>
                <span className="text-xs font-mono text-slate-500">ID: {doctor.id}</span>
              </div>

              <h1 data-testid="doctor-name" className="text-3xl font-extrabold text-slate-900">
                {doctor.fullName}
              </h1>

              <p data-testid="doctor-specialty" className="text-base text-teal-700 font-medium">
                {doctor.specialty}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 text-sm">
              <div className="space-y-0.5">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  Experience
                </span>
                <span className="font-bold text-slate-800">{doctor.yearsOfExperience} Years</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  Consultation Fee
                </span>
                <span data-testid="doctor-fee" className="font-bold text-teal-800 text-base">
                  ₹{doctor.consultationFee}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  Languages
                </span>
                <span className="font-medium text-slate-800 text-xs truncate block">
                  {doctor.languages.join(', ')}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-slate-400" />
                  Status
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Active / Accepting
                </span>
              </div>
            </div>

            {/* Qualifications */}
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <GraduationCap className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Qualifications: </strong>
                <span>{doctor.qualifications.join(', ')}</span>
              </div>
            </div>

            {/* Biography */}
            <div className="pt-2">
              <h3 className="text-sm font-bold text-slate-900 mb-1">Doctor Biography</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                {doctor.biography}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Dates & Time Slots Booking Section */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-700" />
              <span>Available Appointment Slots</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select a date and preferred time slot to reserve your consultation with {doctor.fullName}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">Regular Schedule:</span>
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
              {doctor.weeklySchedule}
            </span>
          </div>
        </div>

        {availableDates.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl space-y-2">
            <Clock className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm text-slate-600 font-medium">
              No available slots at this moment for this doctor.
            </p>
            <p className="text-xs text-slate-400">
              Please check back later or consider choosing another specialist in {doctor.departmentName}.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Date Selection with data-testid="availability-date" */}
            <div className="space-y-2">
              <label htmlFor="availability-date" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Consultation Date
              </label>
              <div className="flex flex-wrap gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    type="button"
                    data-testid="availability-date"
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedSlotId('');
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition border ${
                      selectedDate === date
                        ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50/50'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Slots List with data-testid="availability-slots" and data-testid="slot-{slotId}" */}
            <div className="space-y-2" data-testid="availability-slots">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Available Time Slots for {selectedDate} ({filteredSlots.length})
              </label>
              {filteredSlots.length === 0 ? (
                <p className="text-xs text-slate-500 py-4">No slots available on {selectedDate}.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {filteredSlots.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        data-testid={`slot-${slot.id}`}
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
                        <span className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-teal-100' : 'text-emerald-700'}`}>
                          Available
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Start Booking Button */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                {selectedSlotId ? (
                  <span className="text-teal-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    Slot selected for {selectedDate}. Click &quot;Book Appointment&quot; to proceed.
                  </span>
                ) : (
                  <span>Please select an available time slot above to proceed with booking.</span>
                )}
              </div>

              <button
                type="button"
                data-testid="start-booking"
                onClick={handleStartBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm transition shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

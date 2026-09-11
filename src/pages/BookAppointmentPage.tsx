import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { authService } from '../services/authService';
import { Department, Doctor, AvailabilitySlot, Patient } from '../types';
import { LoadingIndicator } from '../components/LoadingIndicator';
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  ShieldCheck,
  Stethoscope,
  Building2
} from 'lucide-react';

export const BookAppointmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Wizard Step (1 to 7)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Data Collections
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  // Form State
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');

  // Patient Details
  const [patientId, setPatientId] = useState<string>('PAT-1001');
  const [patientName, setPatientName] = useState<string>('Rahul Sharma');
  const [patientEmail, setPatientEmail] = useState<string>('demo.patient@careflow.test');
  const [patientPhone, setPatientPhone] = useState<string>('+91 90000 00001');
  const [reasonForVisit, setReasonForVisit] = useState<string>('Routine consultation and general assessment.');
  const [appointmentNotes, setAppointmentNotes] = useState<string>('');

  // Submission / Error state
  const [bookingInProgress, setBookingInProgress] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Pre-load data and apply query params
  useEffect(() => {
    const init = async () => {
      setInitialLoading(true);
      try {
        const [deps, docs] = await Promise.all([
          storageService.getDepartments(),
          storageService.getDoctors()
        ]);
        setDepartments(deps);
        setDoctors(docs);

        // Pre-fill logged-in patient if available
        const currentPatient = authService.getCurrentPatient();
        if (currentPatient) {
          setPatientId(currentPatient.id);
          setPatientName(currentPatient.fullName);
          setPatientEmail(currentPatient.email);
          setPatientPhone(currentPatient.phone);
        }

        // Query param handling
        const paramDeptId = searchParams.get('departmentId');
        const paramDocId = searchParams.get('doctorId');
        const paramSlotId = searchParams.get('slotId');
        const paramDate = searchParams.get('date');
        const paramReason = searchParams.get('reason');

        if (paramReason) {
          setReasonForVisit(paramReason);
        }

        if (paramDocId) {
          const matchedDoc = docs.find((d) => d.id === paramDocId);
          if (matchedDoc) {
            setSelectedDoctorId(matchedDoc.id);
            setSelectedDepartmentId(matchedDoc.departmentId);

            // Load doctor slots
            const docSlots = await storageService.getSlotsByDoctor(matchedDoc.id);
            const availableSlots = docSlots.filter((s) => s.status === 'available');
            setSlots(availableSlots);

            if (paramDate) {
              setSelectedDate(paramDate);
            } else if (availableSlots.length > 0) {
              setSelectedDate(availableSlots[0].date);
            }

            if (paramSlotId) {
              setSelectedSlotId(paramSlotId);
              setCurrentStep(5); // Go straight to patient details
            } else {
              setCurrentStep(3); // Go to date selection
            }
          }
        } else if (paramDeptId) {
          setSelectedDepartmentId(paramDeptId);
          setCurrentStep(2);
        }
      } catch (err: unknown) {
        console.error('Failed initializing booking wizard', err);
      } finally {
        setInitialLoading(false);
      }
    };

    init();
  }, [searchParams]);

  // When selected doctor changes, fetch slots
  useEffect(() => {
    if (!selectedDoctorId) return;
    const loadSlots = async () => {
      const docSlots = await storageService.getSlotsByDoctor(selectedDoctorId);
      const available = docSlots.filter((s) => s.status === 'available');
      setSlots(available);
      if (available.length > 0 && !selectedDate) {
        setSelectedDate(available[0].date);
      }
    };
    loadSlots();
  }, [selectedDoctorId]);

  // Derived filtered doctors
  const doctorsInSelectedDept = selectedDepartmentId
    ? doctors.filter((d) => d.departmentId === selectedDepartmentId)
    : doctors;

  // Derived selected entities
  const currentDepartment = departments.find((d) => d.id === selectedDepartmentId);
  const currentDoctor = doctors.find((d) => d.id === selectedDoctorId);
  const currentSlot = slots.find((s) => s.id === selectedSlotId);

  // Available unique dates for selected doctor
  const availableDates = Array.from(new Set(slots.map((s) => s.date))).sort();

  // Slots matching selected date
  const slotsOnDate = slots
    .filter((s) => s.date === selectedDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Step Navigation Validation
  const handleNext = () => {
    setBookingError(null);

    if (currentStep === 1) {
      if (!selectedDepartmentId) {
        setBookingError('Please select a department to proceed.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedDoctorId) {
        setBookingError('Please select a doctor to proceed.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!selectedDate) {
        setBookingError('Please select an appointment date.');
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (!selectedSlotId) {
        setBookingError('Please select an available time slot.');
        return;
      }
      setCurrentStep(5);
    } else if (currentStep === 5) {
      if (!patientName.trim()) {
        setBookingError('Patient full name is required.');
        return;
      }
      if (!patientEmail.trim() || !patientEmail.includes('@')) {
        setBookingError('A valid email address is required.');
        return;
      }
      if (!patientPhone.trim()) {
        setBookingError('Patient contact phone number is required.');
        return;
      }
      if (!reasonForVisit.trim()) {
        setBookingError('Please enter a brief reason for visit.');
        return;
      }
      if (reasonForVisit.length > 500) {
        setBookingError('Reason for visit must not exceed 500 characters.');
        return;
      }
      setCurrentStep(6);
    } else if (currentStep === 6) {
      setCurrentStep(7);
    }
  };

  const handleBack = () => {
    setBookingError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Explicit Confirm Booking
  const handleConfirmBooking = async () => {
    if (!currentDoctor || !currentSlot) {
      setBookingError('Incomplete appointment details. Please restart booking.');
      return;
    }

    setBookingInProgress(true);
    setBookingError(null);

    try {
      const newAppointment = await storageService.bookAppointment({
        patientId: patientId || 'PAT-1001',
        patientName: patientName.trim(),
        patientEmail: patientEmail.trim(),
        patientPhone: patientPhone.trim(),
        doctorId: currentDoctor.id,
        doctorName: currentDoctor.fullName,
        departmentId: currentDoctor.departmentId,
        departmentName: currentDoctor.departmentName,
        slotId: currentSlot.id,
        appointmentDate: currentSlot.date,
        startTime: currentSlot.startTime,
        endTime: currentSlot.endTime,
        reasonForVisit: reasonForVisit.trim(),
        notes: appointmentNotes.trim() || undefined,
        consultationFee: currentDoctor.consultationFee
      });

      // Step 8: Route to dedicated confirmation page with new ID
      navigate(`/appointments/${newAppointment.id}/confirmation`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Booking failed. Please try again.';
      setBookingError(msg);
    } finally {
      setBookingInProgress(false);
    }
  };

  if (initialLoading) {
    return <LoadingIndicator message="Initializing appointment scheduler..." />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-teal-700 text-sm font-semibold mb-1">
          <Calendar className="w-4 h-4" />
          <span>CareFlow Outpatient Scheduling</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Book an Appointment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete the guided steps below to reserve your guaranteed consultation slot.
        </p>
      </div>

      {/* Step Indicator Tracker */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between overflow-x-auto text-xs font-semibold gap-2 pb-1">
          {[
            { step: 1, label: 'Department' },
            { step: 2, label: 'Doctor' },
            { step: 3, label: 'Date' },
            { step: 4, label: 'Time Slot' },
            { step: 5, label: 'Patient Info' },
            { step: 6, label: 'Review' },
            { step: 7, label: 'Confirmation' },
          ].map((item) => (
            <div
              key={item.step}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md shrink-0 transition ${
                currentStep === item.step
                  ? 'bg-teal-700 text-white font-bold'
                  : currentStep > item.step
                  ? 'bg-teal-50 text-teal-800'
                  : 'text-slate-400'
              }`}
            >
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] border border-current">
                {item.step}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Error Banner with data-testid="booking-error" */}
      {bookingError && (
        <div
          data-testid="booking-error"
          role="alert"
          aria-live="assertive"
          className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs sm:text-sm flex items-start gap-2.5"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Scheduling Validation Error</span>
            <span>{bookingError}</span>
          </div>
        </div>
      )}

      {/* Main Booking Form Container with data-testid="booking-form" */}
      <div
        data-testid="booking-form"
        className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6"
      >
        {/* STEP 1: Select Department */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 1: Select Medical Department</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose the clinical specialty corresponding to your symptoms or referral.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="booking-department" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Department
              </label>
              <select
                id="booking-department"
                data-testid="booking-department"
                value={selectedDepartmentId}
                onChange={(e) => {
                  setSelectedDepartmentId(e.target.value);
                  setSelectedDoctorId('');
                  setSelectedSlotId('');
                }}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50/50"
              >
                <option value="">-- Choose a Department --</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.operatingHours.split('|')[0]})
                  </option>
                ))}
              </select>
            </div>

            {selectedDepartmentId && currentDepartment && (
              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 space-y-2 text-xs">
                <div className="font-bold text-teal-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-teal-700" />
                  {currentDepartment.name} Department Overview
                </div>
                <p className="text-slate-600">{currentDepartment.description}</p>
                <div className="text-slate-700 pt-1">
                  <strong>Operating Hours:</strong> {currentDepartment.operatingHours}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Select Doctor */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 2: Select Specialist Doctor</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose a consulting physician or surgeon in {currentDepartment?.name || 'this department'}.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="booking-doctor" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Doctor
              </label>
              <select
                id="booking-doctor"
                data-testid="booking-doctor"
                value={selectedDoctorId}
                onChange={(e) => {
                  setSelectedDoctorId(e.target.value);
                  setSelectedSlotId('');
                }}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50/50"
              >
                <option value="">-- Choose a Doctor --</option>
                {doctorsInSelectedDept.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.fullName} - {doc.specialty} (₹{doc.consultationFee})
                  </option>
                ))}
              </select>
            </div>

            {currentDoctor && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                <img
                  src={currentDoctor.profileImage}
                  alt={currentDoctor.fullName}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm">{currentDoctor.fullName}</h4>
                  <p className="text-teal-700 font-semibold">{currentDoctor.specialty}</p>
                  <p className="text-slate-500">
                    Experience: {currentDoctor.yearsOfExperience} years | Consultation Fee: ₹{currentDoctor.consultationFee}
                  </p>
                  <p className="text-slate-600">Schedule: {currentDoctor.weeklySchedule}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Select Date */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 3: Select Consultation Date</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Doctor: <strong>{currentDoctor?.fullName}</strong> ({currentDoctor?.specialty})
              </p>
            </div>

            {availableDates.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                No future open dates currently found for this doctor. Please choose another doctor.
              </div>
            ) : (
              <div className="space-y-3">
                <label htmlFor="booking-date" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Appointment Date
                </label>
                <select
                  id="booking-date"
                  data-testid="booking-date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedSlotId('');
                  }}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50/50"
                >
                  <option value="">-- Choose a Date --</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2 pt-2">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      type="button"
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedSlotId('');
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
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
            )}
          </div>
        )}

        {/* STEP 4: Select Time Slot */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 4: Select Available Time Slot</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Date: <strong>{selectedDate}</strong> with <strong>{currentDoctor?.fullName}</strong>
              </p>
            </div>

            <div className="space-y-3" data-testid="booking-slots">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Available Time Slots ({slotsOnDate.length})
              </label>

              {slotsOnDate.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                  No slots available for the selected date. Please click Back and choose another date.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {slotsOnDate.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        data-testid={`booking-slot-${slot.id}`}
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
          </div>
        )}

        {/* STEP 5: Enter Patient Details */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 5: Patient Details</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Confirm identification and provide the primary reason for consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="patient-id" className="block text-xs font-semibold text-slate-700">
                  Patient ID
                </label>
                <input
                  id="patient-id"
                  type="text"
                  data-testid="patient-id"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="patient-name" className="block text-xs font-semibold text-slate-700">
                  Patient Full Name *
                </label>
                <input
                  id="patient-name"
                  type="text"
                  required
                  data-testid="patient-name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="patient-email" className="block text-xs font-semibold text-slate-700">
                  Email Address *
                </label>
                <input
                  id="patient-email"
                  type="email"
                  required
                  data-testid="patient-email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="patient-phone" className="block text-xs font-semibold text-slate-700">
                  Contact Phone Number *
                </label>
                <input
                  id="patient-phone"
                  type="tel"
                  required
                  data-testid="patient-phone"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50/50"
                />
              </div>

              <div className="col-span-1 sm:col-span-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="reason-for-visit" className="block text-xs font-semibold text-slate-700">
                    Reason for Visit (Max 500 chars) *
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {reasonForVisit.length}/500
                  </span>
                </div>
                <textarea
                  id="reason-for-visit"
                  data-testid="reason-for-visit"
                  maxLength={500}
                  required
                  rows={3}
                  value={reasonForVisit}
                  onChange={(e) => setReasonForVisit(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50/50"
                  placeholder="e.g. Routine cardiac consultation, blood pressure check..."
                />
              </div>

              <div className="col-span-1 sm:col-span-2 space-y-1.5">
                <label htmlFor="appointment-notes" className="block text-xs font-semibold text-slate-700">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="appointment-notes"
                  data-testid="appointment-notes"
                  rows={2}
                  value={appointmentNotes}
                  onChange={(e) => setAppointmentNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50/50"
                  placeholder="Optional past records, preferred language or accessibility assistance..."
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review Appointment */}
        {currentStep === 6 && (
          <div className="space-y-4" data-testid="booking-review">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 6: Review Appointment Details</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Please verify your consultation details before final confirmation.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-slate-500 block text-xs">Department:</span>
                  <span className="font-bold text-slate-800">{currentDepartment?.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Doctor:</span>
                  <span className="font-bold text-slate-800">{currentDoctor?.fullName}</span>
                  <span className="text-xs text-teal-700 block">({currentDoctor?.specialty})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Appointment Date:</span>
                  <span className="font-bold text-slate-800">{selectedDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Reserved Time Slot:</span>
                  <span className="font-bold text-slate-800 font-mono">
                    {currentSlot?.startTime} - {currentSlot?.endTime}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Consultation Fee:</span>
                  <span className="font-bold text-teal-800 text-base">₹{currentDoctor?.consultationFee}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Payment Method:</span>
                  <span className="font-medium text-slate-700">Pay at Hospital OPD Desk</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Patient Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>Name: <strong>{patientName}</strong></div>
                  <div>Patient ID: <strong>{patientId}</strong></div>
                  <div>Email: <strong>{patientEmail}</strong></div>
                  <div>Phone: <strong>{patientPhone}</strong></div>
                  <div className="col-span-1 sm:col-span-2">
                    Reason: <strong>{reasonForVisit}</strong>
                  </div>
                  {appointmentNotes && (
                    <div className="col-span-1 sm:col-span-2 text-slate-600">
                      Notes: {appointmentNotes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Explicitly Confirm Booking */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 7: Confirm Reservation</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click below to finalize this appointment and reserve your slot in the hospital database.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-2 text-xs text-teal-900">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                Slot Reservation Guarantee
              </div>
              <p>
                By confirming, slot <strong>{currentSlot?.startTime} - {currentSlot?.endTime}</strong> on <strong>{selectedDate}</strong> with <strong>{currentDoctor?.fullName}</strong> will be locked in the database.
              </p>
            </div>

            <div className="pt-4 flex flex-col items-center gap-3">
              <button
                type="button"
                data-testid="confirm-booking"
                disabled={bookingInProgress}
                onClick={handleConfirmBooking}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-teal-400 text-white font-bold text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {bookingInProgress ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Reserving Slot in Database...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm &amp; Book Appointment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons: Next & Back */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                data-testid="booking-back"
                onClick={handleBack}
                disabled={bookingInProgress}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div>
            {currentStep < 7 && (
              <button
                type="button"
                data-testid="booking-next"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold bg-teal-700 hover:bg-teal-800 text-white transition shadow-xs cursor-pointer"
              >
                <span>{currentStep === 6 ? 'Proceed to Confirmation' : 'Continue to Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

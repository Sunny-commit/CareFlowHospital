export type SlotStatus = 'available' | 'reserved' | 'unavailable';

export type AppointmentStatus = 'confirmed' | 'rescheduled' | 'cancelled' | 'completed' | 'no-show';

export interface Department {
  id: string;
  name: string;
  description: string;
  services: string[];
  operatingHours: string;
  category?: 'Centres of Excellence' | 'Surgical Specialties' | 'Medical Specialties' | 'Critical Care & Diagnostics' | 'Women & Child Health';
  location?: string;
  headOfDepartment?: string;
  emergencySupport?: boolean;
  phoneExtension?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  fullName: string;
  departmentId: string;
  departmentName: string;
  specialty: string;
  qualifications: string[];
  yearsOfExperience: number;
  languages: string[];
  consultationFee: number;
  biography: string;
  profileImage: string;
  active: boolean;
  weeklySchedule: string;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  authenticationUserId: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Female' | 'Male' | 'Other' | 'Prefer not to say';
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilitySlot {
  id: string;
  doctorId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: SlotStatus;
  appointmentId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName?: string;
  patientEmail?: string;
  patientPhone?: string;
  doctorId: string;
  doctorName: string;
  departmentId: string;
  departmentName: string;
  slotId: string;
  appointmentDate: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  reasonForVisit: string;
  notes?: string;
  consultationFee: number;
  status: AppointmentStatus;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
  cancelledAt?: string;
}

export interface AuditLog {
  id: string;
  action: 'BOOK_APPOINTMENT' | 'RESCHEDULE_APPOINTMENT' | 'CANCEL_APPOINTMENT' | 'SEED_DATA';
  entityType: 'appointment' | 'slot' | 'system';
  entityId: string;
  patientId?: string;
  previousValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
  timestamp: string;
}

export interface SearchDoctorFilters {
  searchTerm: string;
  department: string;
  specialty: string;
  date: string;
  language: string;
}

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  runTransaction,
} from 'firebase/firestore';
import { firestore } from './firebase';
import {
  Department,
  Doctor,
  Patient,
  AvailabilitySlot,
  Appointment,
  AuditLog,
} from '../types';
import {
  SEED_DEPARTMENTS,
  SEED_DOCTORS,
  DEMO_PATIENT,
  generateSeedSlots,
  generateSampleAppointments
} from '../data/seedData';
import { simulationService } from './simulationService';

// Local storage key constants for persistent fallback mode
const LOCAL_STORAGE_PREFIX = 'careflow_db_';
const COLLECTIONS = {
  DEPARTMENTS: 'departments',
  DOCTORS: 'doctors',
  PATIENTS: 'patients',
  SLOTS: 'availabilitySlots',
  APPOINTMENTS: 'appointments',
  AUDIT_LOGS: 'auditLogs'
};

class StorageService {
  private isUsingFirestore: boolean = false;
  private initialized: boolean = false;

  constructor() {
    this.isUsingFirestore = Boolean(firestore);
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return;
    await this.seedInitialDataIfNeeded();
    this.initialized = true;
  }

  public isCloudFirestoreActive(): boolean {
    return this.isUsingFirestore;
  }

  // --- Local Persistent Storage Helpers (IndexedDB / LocalStorage) ---
  private getLocalCollection<T>(name: string): T[] {
    try {
      const data = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${name}`);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveLocalCollection<T>(name: string, items: T[]): void {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${name}`, JSON.stringify(items));
    } catch (err) {
      console.error(`Failed to persist collection ${name}`, err);
    }
  }

  // --- Idempotent Seeding Support ---
  public async seedInitialDataIfNeeded(force: boolean = false): Promise<{ message: string; seededCount: number }> {
    if (this.isUsingFirestore && firestore) {
      try {
        const depSnapshot = await getDocs(collection(firestore, COLLECTIONS.DEPARTMENTS));
        if (depSnapshot.empty || force) {
          // Seed departments
          for (const dep of SEED_DEPARTMENTS) {
            await setDoc(doc(firestore, COLLECTIONS.DEPARTMENTS, dep.id), dep);
          }
          // Seed doctors
          for (const docItem of SEED_DOCTORS) {
            await setDoc(doc(firestore, COLLECTIONS.DOCTORS, docItem.id), docItem);
          }
          // Seed patient
          await setDoc(doc(firestore, COLLECTIONS.PATIENTS, DEMO_PATIENT.id), DEMO_PATIENT);
          
          // Seed slots
          const seedSlots = generateSeedSlots();
          const { appointments, updatedSlots } = generateSampleAppointments(seedSlots);
          for (const s of updatedSlots) {
            await setDoc(doc(firestore, COLLECTIONS.SLOTS, s.id), s);
          }
          // Seed sample appointments
          for (const a of appointments) {
            await setDoc(doc(firestore, COLLECTIONS.APPOINTMENTS, a.id), a);
          }
          return { message: 'Cloud Firestore database seeded successfully with departments, doctors, slots, and demo patient.', seededCount: updatedSlots.length };
        }
        return { message: 'Cloud Firestore database already seeded.', seededCount: depSnapshot.size };
      } catch (err) {
        console.warn('Firestore seeding failed, activating local persistent store fallback', err);
        this.isUsingFirestore = false;
      }
    }

    // Local persistent database seeding (Idempotent by key ID or auto-upgrade)
    const existingDeps = this.getLocalCollection<Department>(COLLECTIONS.DEPARTMENTS);
    if (existingDeps.length < SEED_DEPARTMENTS.length || force) {
      this.saveLocalCollection(COLLECTIONS.DEPARTMENTS, SEED_DEPARTMENTS);
      this.saveLocalCollection(COLLECTIONS.DOCTORS, SEED_DOCTORS);
      this.saveLocalCollection(COLLECTIONS.PATIENTS, [DEMO_PATIENT]);
      
      const seedSlots = generateSeedSlots();
      const { appointments, updatedSlots } = generateSampleAppointments(seedSlots);
      this.saveLocalCollection(COLLECTIONS.SLOTS, updatedSlots);
      this.saveLocalCollection(COLLECTIONS.APPOINTMENTS, appointments);
      this.saveLocalCollection(COLLECTIONS.AUDIT_LOGS, [
        {
          id: 'AUDIT-SEED-01',
          action: 'SEED_DATA',
          entityType: 'system',
          entityId: 'SYSTEM-INIT',
          timestamp: new Date().toISOString()
        }
      ]);
      return { message: 'Local persistent database seeded successfully.', seededCount: updatedSlots.length };
    }
    return { message: 'Local database already initialized with valid records.', seededCount: existingDeps.length };
  }

  // --- Departments ---
  public async getDepartments(): Promise<Department[]> {
    if (!this.initialized) {
      await this.initialize();
    }
    await simulationService.interceptOperation('getDepartments');
    if (this.isUsingFirestore && firestore) {
      try {
        const snap = await getDocs(collection(firestore, COLLECTIONS.DEPARTMENTS));
        if (!snap.empty) {
          return snap.docs.map(d => d.data() as Department);
        }
      } catch (e) {
        console.warn('Firestore getDepartments failed, using local', e);
      }
    }
    const localDeps = this.getLocalCollection<Department>(COLLECTIONS.DEPARTMENTS);
    if (localDeps.length === 0) {
      this.saveLocalCollection(COLLECTIONS.DEPARTMENTS, SEED_DEPARTMENTS);
      return SEED_DEPARTMENTS;
    }
    return localDeps;
  }

  public async getDepartmentById(id: string): Promise<Department | null> {
    const deps = await this.getDepartments();
    return deps.find(d => d.id === id) || null;
  }

  // --- Doctors ---
  public async getDoctors(): Promise<Doctor[]> {
    if (!this.initialized) {
      await this.initialize();
    }
    await simulationService.interceptOperation('getDoctors');
    if (this.isUsingFirestore && firestore) {
      try {
        const snap = await getDocs(collection(firestore, COLLECTIONS.DOCTORS));
        if (!snap.empty) {
          return snap.docs.map(d => d.data() as Doctor);
        }
      } catch (e) {
        console.warn('Firestore getDoctors failed, using local', e);
      }
    }
    const localDocs = this.getLocalCollection<Doctor>(COLLECTIONS.DOCTORS);
    if (localDocs.length === 0) {
      this.saveLocalCollection(COLLECTIONS.DOCTORS, SEED_DOCTORS);
      return SEED_DOCTORS;
    }
    return localDocs;
  }

  public async getDoctorById(id: string): Promise<Doctor | null> {
    await simulationService.interceptOperation('getDoctorById');
    if (this.isUsingFirestore && firestore) {
      try {
        const docRef = doc(firestore, COLLECTIONS.DOCTORS, id);
        const snap = await getDoc(docRef);
        if (snap.exists()) return snap.data() as Doctor;
      } catch (e) {
        console.warn('Firestore getDoctorById failed, using local', e);
      }
    }
    const docs = this.getLocalCollection<Doctor>(COLLECTIONS.DOCTORS);
    return docs.find(d => d.id === id) || null;
  }

  // --- Availability Slots ---
  public async getSlotsByDoctor(doctorId: string, date?: string): Promise<AvailabilitySlot[]> {
    await simulationService.interceptOperation('getSlotsByDoctor');
    if (this.isUsingFirestore && firestore) {
      try {
        const slotsRef = collection(firestore, COLLECTIONS.SLOTS);
        const q = date
          ? query(slotsRef, where('doctorId', '==', doctorId), where('date', '==', date))
          : query(slotsRef, where('doctorId', '==', doctorId));
        const snap = await getDocs(q);
        return snap.docs.map(d => d.data() as AvailabilitySlot);
      } catch (e) {
        console.warn('Firestore getSlots failed, using local', e);
      }
    }
    const allSlots = this.getLocalCollection<AvailabilitySlot>(COLLECTIONS.SLOTS);
    return allSlots.filter(s => s.doctorId === doctorId && (!date || s.date === date));
  }

  public async getSlotById(slotId: string): Promise<AvailabilitySlot | null> {
    if (this.isUsingFirestore && firestore) {
      try {
        const docRef = doc(firestore, COLLECTIONS.SLOTS, slotId);
        const snap = await getDoc(docRef);
        if (snap.exists()) return snap.data() as AvailabilitySlot;
      } catch (e) {
        console.warn('Firestore getSlotById failed, using local', e);
      }
    }
    const allSlots = this.getLocalCollection<AvailabilitySlot>(COLLECTIONS.SLOTS);
    return allSlots.find(s => s.id === slotId) || null;
  }

  // --- Patients ---
  public async getPatientById(id: string): Promise<Patient | null> {
    if (this.isUsingFirestore && firestore) {
      try {
        const docRef = doc(firestore, COLLECTIONS.PATIENTS, id);
        const snap = await getDoc(docRef);
        if (snap.exists()) return snap.data() as Patient;
      } catch (e) {
        console.warn('Firestore getPatientById failed, using local', e);
      }
    }
    const patients = this.getLocalCollection<Patient>(COLLECTIONS.PATIENTS);
    return patients.find(p => p.id === id) || null;
  }

  public async getPatientByEmail(email: string): Promise<Patient | null> {
    if (this.isUsingFirestore && firestore) {
      try {
        const q = query(collection(firestore, COLLECTIONS.PATIENTS), where('email', '==', email.toLowerCase().trim()));
        const snap = await getDocs(q);
        if (!snap.empty) return snap.docs[0].data() as Patient;
      } catch (e) {
        console.warn('Firestore getPatientByEmail failed, using local', e);
      }
    }
    const patients = this.getLocalCollection<Patient>(COLLECTIONS.PATIENTS);
    return patients.find(p => p.email.toLowerCase().trim() === email.toLowerCase().trim()) || null;
  }

  // --- Appointments ---
  public async getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
    await simulationService.interceptOperation('getAppointmentsByPatient');
    if (this.isUsingFirestore && firestore) {
      try {
        const q = query(collection(firestore, COLLECTIONS.APPOINTMENTS), where('patientId', '==', patientId));
        const snap = await getDocs(q);
        return snap.docs.map(d => d.data() as Appointment);
      } catch (e) {
        console.warn('Firestore getAppointments failed, using local', e);
      }
    }
    const appts = this.getLocalCollection<Appointment>(COLLECTIONS.APPOINTMENTS);
    return appts.filter(a => a.patientId === patientId);
  }

  public async getAppointmentById(id: string): Promise<Appointment | null> {
    await simulationService.interceptOperation('getAppointmentById');
    if (this.isUsingFirestore && firestore) {
      try {
        const docRef = doc(firestore, COLLECTIONS.APPOINTMENTS, id);
        const snap = await getDoc(docRef);
        if (snap.exists()) return snap.data() as Appointment;
      } catch (e) {
        console.warn('Firestore getAppointmentById failed, using local', e);
      }
    }
    const appts = this.getLocalCollection<Appointment>(COLLECTIONS.APPOINTMENTS);
    return appts.find(a => a.id === id) || null;
  }

  public async getAllAppointments(): Promise<Appointment[]> {
    if (this.isUsingFirestore && firestore) {
      try {
        const snap = await getDocs(collection(firestore, COLLECTIONS.APPOINTMENTS));
        return snap.docs.map(d => d.data() as Appointment);
      } catch (e) {
        console.warn('Firestore getAllAppointments failed, using local', e);
      }
    }
    return this.getLocalCollection<Appointment>(COLLECTIONS.APPOINTMENTS);
  }

  // --- Transactional Booking Logic (Prevent Double Booking) ---
  public async bookAppointment(appointmentData: {
    patientId: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    doctorId: string;
    doctorName: string;
    departmentId: string;
    departmentName: string;
    slotId: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    reasonForVisit: string;
    notes?: string;
    consultationFee: number;
  }): Promise<Appointment> {
    await simulationService.interceptOperation('book');

    const appointmentId = `APT-${appointmentData.appointmentDate.replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();

    const newAppointment: Appointment = {
      id: appointmentId,
      ...appointmentData,
      status: 'confirmed',
      createdAt: nowIso,
      updatedAt: nowIso
    };

    if (this.isUsingFirestore && firestore) {
      try {
        await runTransaction(firestore, async (transaction) => {
          const slotRef = doc(firestore, COLLECTIONS.SLOTS, appointmentData.slotId);
          const slotDoc = await transaction.get(slotRef);

          if (!slotDoc.exists()) {
            throw new Error(`Slot ${appointmentData.slotId} does not exist.`);
          }

          const slotData = slotDoc.data() as AvailabilitySlot;
          if (slotData.status !== 'available') {
            throw new Error('This appointment slot is no longer available. Another patient has already reserved it.');
          }

          // Mark slot reserved
          transaction.update(slotRef, {
            status: 'reserved',
            appointmentId: appointmentId,
            updatedAt: nowIso
          });

          // Save appointment
          const appointmentRef = doc(firestore, COLLECTIONS.APPOINTMENTS, appointmentId);
          transaction.set(appointmentRef, newAppointment);

          // Audit log
          const auditRef = doc(firestore, COLLECTIONS.AUDIT_LOGS, `AUDIT-${Date.now()}`);
          transaction.set(auditRef, {
            id: `AUDIT-${Date.now()}`,
            action: 'BOOK_APPOINTMENT',
            entityType: 'appointment',
            entityId: appointmentId,
            patientId: appointmentData.patientId,
            previousValue: null,
            newValue: newAppointment,
            timestamp: nowIso
          });
        });

        return newAppointment;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Booking transaction failed';
        if (message.includes('no longer available') || message.includes('reserved')) {
          throw new Error(message);
        }
        console.warn('Firestore transaction failed, falling back to atomic local persistence', err);
      }
    }

    // Local Transaction Semantics (Atomic Read-Validate-Write)
    const allSlots = this.getLocalCollection<AvailabilitySlot>(COLLECTIONS.SLOTS);
    const slotIdx = allSlots.findIndex(s => s.id === appointmentData.slotId);
    if (slotIdx === -1) {
      throw new Error(`Appointment slot ${appointmentData.slotId} was not found.`);
    }

    const targetSlot = allSlots[slotIdx];
    if (targetSlot.status !== 'available') {
      throw new Error('This appointment slot is no longer available. Another patient has already reserved it.');
    }

    // Atomic update
    allSlots[slotIdx] = {
      ...targetSlot,
      status: 'reserved',
      appointmentId: appointmentId,
      updatedAt: nowIso
    };
    this.saveLocalCollection(COLLECTIONS.SLOTS, allSlots);

    const allAppts = this.getLocalCollection<Appointment>(COLLECTIONS.APPOINTMENTS);
    allAppts.unshift(newAppointment);
    this.saveLocalCollection(COLLECTIONS.APPOINTMENTS, allAppts);

    const auditLogs = this.getLocalCollection<AuditLog>(COLLECTIONS.AUDIT_LOGS);
    auditLogs.unshift({
      id: `AUDIT-${Date.now()}`,
      action: 'BOOK_APPOINTMENT',
      entityType: 'appointment',
      entityId: appointmentId,
      patientId: appointmentData.patientId,
      previousValue: null,
      newValue: newAppointment as unknown as Record<string, unknown>,
      timestamp: nowIso
    });
    this.saveLocalCollection(COLLECTIONS.AUDIT_LOGS, auditLogs);

    return newAppointment;
  }

  // --- Transactional Rescheduling Logic (Releases old slot, reserves new slot) ---
  public async rescheduleAppointment(
    appointmentId: string,
    newSlotId: string,
    newDate: string,
    newStartTime: string,
    newEndTime: string
  ): Promise<Appointment> {
    await simulationService.interceptOperation('reschedule');

    const nowIso = new Date().toISOString();

    if (this.isUsingFirestore && firestore) {
      try {
        let updatedApptResult: Appointment | null = null;
        await runTransaction(firestore, async (transaction) => {
          const apptRef = doc(firestore, COLLECTIONS.APPOINTMENTS, appointmentId);
          const apptDoc = await transaction.get(apptRef);

          if (!apptDoc.exists()) {
            throw new Error(`Appointment ${appointmentId} was not found.`);
          }

          const currentAppt = apptDoc.data() as Appointment;
          if (currentAppt.status === 'completed') {
            throw new Error('Completed appointments cannot be rescheduled.');
          }
          if (currentAppt.status === 'cancelled') {
            throw new Error('Cancelled appointments cannot be rescheduled.');
          }

          // Check new slot
          const newSlotRef = doc(firestore, COLLECTIONS.SLOTS, newSlotId);
          const newSlotDoc = await transaction.get(newSlotRef);
          if (!newSlotDoc.exists()) {
            throw new Error(`New slot ${newSlotId} does not exist.`);
          }
          const newSlotData = newSlotDoc.data() as AvailabilitySlot;
          if (newSlotData.status !== 'available') {
            throw new Error('The selected new slot is no longer available. Please choose a different slot.');
          }

          // Release old slot if exists
          if (currentAppt.slotId && currentAppt.slotId !== newSlotId) {
            const oldSlotRef = doc(firestore, COLLECTIONS.SLOTS, currentAppt.slotId);
            transaction.update(oldSlotRef, {
              status: 'available',
              appointmentId: null,
              updatedAt: nowIso
            });
          }

          // Reserve new slot
          transaction.update(newSlotRef, {
            status: 'reserved',
            appointmentId: appointmentId,
            updatedAt: nowIso
          });

          // Update appointment
          const updated: Appointment = {
            ...currentAppt,
            slotId: newSlotId,
            appointmentDate: newDate,
            startTime: newStartTime,
            endTime: newEndTime,
            status: 'rescheduled',
            updatedAt: nowIso
          };
          transaction.set(apptRef, updated);
          updatedApptResult = updated;

          // Audit log
          const auditRef = doc(firestore, COLLECTIONS.AUDIT_LOGS, `AUDIT-${Date.now()}`);
          transaction.set(auditRef, {
            id: `AUDIT-${Date.now()}`,
            action: 'RESCHEDULE_APPOINTMENT',
            entityType: 'appointment',
            entityId: appointmentId,
            patientId: currentAppt.patientId,
            previousValue: currentAppt,
            newValue: updated,
            timestamp: nowIso
          });
        });

        if (updatedApptResult) return updatedApptResult;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Rescheduling transaction failed';
        if (message.includes('cannot be rescheduled') || message.includes('no longer available')) {
          throw new Error(message);
        }
        console.warn('Firestore reschedule failed, using local transaction', err);
      }
    }

    // Local Atomic Reschedule
    const allAppts = this.getLocalCollection<Appointment>(COLLECTIONS.APPOINTMENTS);
    const apptIdx = allAppts.findIndex(a => a.id === appointmentId);
    if (apptIdx === -1) throw new Error(`Appointment ${appointmentId} was not found.`);

    const currentAppt = allAppts[apptIdx];
    if (currentAppt.status === 'completed') {
      throw new Error('Completed appointments cannot be rescheduled.');
    }
    if (currentAppt.status === 'cancelled') {
      throw new Error('Cancelled appointments cannot be rescheduled.');
    }

    const allSlots = this.getLocalCollection<AvailabilitySlot>(COLLECTIONS.SLOTS);
    const newSlotIdx = allSlots.findIndex(s => s.id === newSlotId);
    if (newSlotIdx === -1) throw new Error(`Slot ${newSlotId} not found.`);

    const newSlot = allSlots[newSlotIdx];
    if (newSlot.status !== 'available') {
      throw new Error('The selected new slot is no longer available. Please choose a different slot.');
    }

    // Release old slot
    const oldSlotIdx = allSlots.findIndex(s => s.id === currentAppt.slotId);
    if (oldSlotIdx !== -1) {
      allSlots[oldSlotIdx] = {
        ...allSlots[oldSlotIdx],
        status: 'available',
        appointmentId: null,
        updatedAt: nowIso
      };
    }

    // Reserve new slot
    allSlots[newSlotIdx] = {
      ...newSlot,
      status: 'reserved',
      appointmentId: appointmentId,
      updatedAt: nowIso
    };
    this.saveLocalCollection(COLLECTIONS.SLOTS, allSlots);

    // Update appointment
    const updatedAppt: Appointment = {
      ...currentAppt,
      slotId: newSlotId,
      appointmentDate: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
      status: 'rescheduled',
      updatedAt: nowIso
    };
    allAppts[apptIdx] = updatedAppt;
    this.saveLocalCollection(COLLECTIONS.APPOINTMENTS, allAppts);

    // Audit log
    const auditLogs = this.getLocalCollection<AuditLog>(COLLECTIONS.AUDIT_LOGS);
    auditLogs.unshift({
      id: `AUDIT-${Date.now()}`,
      action: 'RESCHEDULE_APPOINTMENT',
      entityType: 'appointment',
      entityId: appointmentId,
      patientId: currentAppt.patientId,
      previousValue: currentAppt as unknown as Record<string, unknown>,
      newValue: updatedAppt as unknown as Record<string, unknown>,
      timestamp: nowIso
    });
    this.saveLocalCollection(COLLECTIONS.AUDIT_LOGS, auditLogs);

    return updatedAppt;
  }

  // --- Transactional Cancellation Logic (Releases slot, marks cancelled) ---
  public async cancelAppointment(appointmentId: string, reason: string): Promise<Appointment> {
    await simulationService.interceptOperation('cancel');

    const nowIso = new Date().toISOString();

    if (this.isUsingFirestore && firestore) {
      try {
        let updatedApptResult: Appointment | null = null;
        await runTransaction(firestore, async (transaction) => {
          const apptRef = doc(firestore, COLLECTIONS.APPOINTMENTS, appointmentId);
          const apptDoc = await transaction.get(apptRef);

          if (!apptDoc.exists()) {
            throw new Error(`Appointment ${appointmentId} was not found.`);
          }

          const currentAppt = apptDoc.data() as Appointment;
          if (currentAppt.status === 'cancelled') {
            throw new Error('This appointment has already been cancelled.');
          }

          // Release slot
          if (currentAppt.slotId) {
            const slotRef = doc(firestore, COLLECTIONS.SLOTS, currentAppt.slotId);
            transaction.update(slotRef, {
              status: 'available',
              appointmentId: null,
              updatedAt: nowIso
            });
          }

          // Mark cancelled
          const updated: Appointment = {
            ...currentAppt,
            status: 'cancelled',
            cancellationReason: reason,
            cancelledAt: nowIso,
            updatedAt: nowIso
          };
          transaction.set(apptRef, updated);
          updatedApptResult = updated;

          // Audit log
          const auditRef = doc(firestore, COLLECTIONS.AUDIT_LOGS, `AUDIT-${Date.now()}`);
          transaction.set(auditRef, {
            id: `AUDIT-${Date.now()}`,
            action: 'CANCEL_APPOINTMENT',
            entityType: 'appointment',
            entityId: appointmentId,
            patientId: currentAppt.patientId,
            previousValue: currentAppt,
            newValue: updated,
            timestamp: nowIso
          });
        });

        if (updatedApptResult) return updatedApptResult;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Cancellation transaction failed';
        if (message.includes('already been cancelled')) {
          throw new Error(message);
        }
        console.warn('Firestore cancel failed, using local transaction', err);
      }
    }

    // Local Cancellation
    const allAppts = this.getLocalCollection<Appointment>(COLLECTIONS.APPOINTMENTS);
    const apptIdx = allAppts.findIndex(a => a.id === appointmentId);
    if (apptIdx === -1) throw new Error(`Appointment ${appointmentId} was not found.`);

    const currentAppt = allAppts[apptIdx];
    if (currentAppt.status === 'cancelled') {
      throw new Error('This appointment has already been cancelled.');
    }

    // Release slot
    const allSlots = this.getLocalCollection<AvailabilitySlot>(COLLECTIONS.SLOTS);
    const slotIdx = allSlots.findIndex(s => s.id === currentAppt.slotId);
    if (slotIdx !== -1) {
      allSlots[slotIdx] = {
        ...allSlots[slotIdx],
        status: 'available',
        appointmentId: null,
        updatedAt: nowIso
      };
      this.saveLocalCollection(COLLECTIONS.SLOTS, allSlots);
    }

    const updatedAppt: Appointment = {
      ...currentAppt,
      status: 'cancelled',
      cancellationReason: reason,
      cancelledAt: nowIso,
      updatedAt: nowIso
    };
    allAppts[apptIdx] = updatedAppt;
    this.saveLocalCollection(COLLECTIONS.APPOINTMENTS, allAppts);

    const auditLogs = this.getLocalCollection<AuditLog>(COLLECTIONS.AUDIT_LOGS);
    auditLogs.unshift({
      id: `AUDIT-${Date.now()}`,
      action: 'CANCEL_APPOINTMENT',
      entityType: 'appointment',
      entityId: appointmentId,
      patientId: currentAppt.patientId,
      previousValue: currentAppt as unknown as Record<string, unknown>,
      newValue: updatedAppt as unknown as Record<string, unknown>,
      timestamp: nowIso
    });
    this.saveLocalCollection(COLLECTIONS.AUDIT_LOGS, auditLogs);

    return updatedAppt;
  }
}

export const storageService = new StorageService();

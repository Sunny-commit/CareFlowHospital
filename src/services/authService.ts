import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from './firebase';
import { storageService } from './storageService';
import { Patient } from '../types';
import { DEMO_PATIENT } from '../data/seedData';

export interface AuthState {
  user: FirebaseUser | null;
  patient: Patient | null;
  isDemoAuth: boolean;
  isLoading: boolean;
}

const DEMO_CREDENTIALS = {
  email: 'demo.patient@careflow.test',
  password: 'DemoPatient123!'
};

const LOCAL_AUTH_KEY = 'careflow_auth_patient';

class AuthService {
  private currentPatient: Patient | null = null;
  private listeners: ((state: AuthState) => void)[] = [];
  private isLoading: boolean = true;
  private isDemoAuth: boolean = true;

  constructor() {
    this.initAuth();
  }

  private initAuth(): void {
    // Check if live Firebase Auth is available
    if (auth) {
      this.isDemoAuth = false;
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser && firebaseUser.email) {
          const patient = await storageService.getPatientByEmail(firebaseUser.email);
          this.currentPatient = patient || {
            ...DEMO_PATIENT,
            authenticationUserId: firebaseUser.uid,
            email: firebaseUser.email
          };
        } else {
          this.currentPatient = null;
        }
        this.isLoading = false;
        this.notify();
      });
    } else {
      // Local demo mode persistence check
      this.isDemoAuth = true;
      try {
        const stored = localStorage.getItem(LOCAL_AUTH_KEY);
        if (stored) {
          this.currentPatient = JSON.parse(stored);
        }
      } catch (err) {
        console.warn('Failed to restore local session', err);
      }
      this.isLoading = false;
      this.notify();
    }
  }

  public subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    listener(this.getState());
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public getState(): AuthState {
    return {
      user: null,
      patient: this.currentPatient,
      isDemoAuth: this.isDemoAuth,
      isLoading: this.isLoading
    };
  }

  private notify(): void {
    const state = this.getState();
    this.listeners.forEach(l => l(state));
  }

  public async login(email: string, password: string): Promise<Patient> {
    const cleanEmail = email.trim().toLowerCase();

    // If live Firebase auth is enabled
    if (auth && !this.isDemoAuth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
        let patient = await storageService.getPatientByEmail(cleanEmail);
        if (!patient) {
          patient = {
            ...DEMO_PATIENT,
            authenticationUserId: cred.user.uid,
            email: cleanEmail
          };
        }
        this.currentPatient = patient;
        this.notify();
        return patient;
      } catch {
        throw new Error('Invalid email or password. Please verify your credentials.');
      }
    }

    // Mock/Demo authentication mode
    if (cleanEmail === DEMO_CREDENTIALS.email.toLowerCase() && password === DEMO_CREDENTIALS.password) {
      this.currentPatient = DEMO_PATIENT;
      try {
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(DEMO_PATIENT));
      } catch (e) {
        console.warn('Failed to persist demo session', e);
      }
      this.notify();
      return DEMO_PATIENT;
    }

    // Also allow logging in with any registered patient email if demo password is used
    const existingPatient = await storageService.getPatientByEmail(cleanEmail);
    if (existingPatient && password === DEMO_CREDENTIALS.password) {
      this.currentPatient = existingPatient;
      localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(existingPatient));
      this.notify();
      return existingPatient;
    }

    throw new Error('Invalid email or password. Please verify your credentials.');
  }

  public async logout(): Promise<void> {
    if (auth && !this.isDemoAuth) {
      await firebaseSignOut(auth);
    }
    this.currentPatient = null;
    try {
      localStorage.removeItem(LOCAL_AUTH_KEY);
    } catch {
      // ignore
    }
    this.notify();
  }

  public getCurrentPatient(): Patient | null {
    return this.currentPatient;
  }
}

export const authService = new AuthService();

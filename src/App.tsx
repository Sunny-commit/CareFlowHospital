import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SimulationBanner } from './components/SimulationBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorProfilePage } from './pages/DoctorProfilePage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { AppointmentConfirmationPage } from './pages/AppointmentConfirmationPage';
import { MyAppointmentsPage } from './pages/MyAppointmentsPage';
import { AppointmentDetailPage } from './pages/AppointmentDetailPage';
import { ReschedulePage } from './pages/ReschedulePage';
import { CancelPage } from './pages/CancelPage';
import { LoginPage } from './pages/LoginPage';
import { AboutPage } from './pages/AboutPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { FAQPage } from './pages/FAQPage';
import { HospitalServicesPage } from './pages/HospitalServicesPage';
import { storageService } from './services/storageService';

// Scroll to top on route change helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  useEffect(() => {
    storageService.initialize();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-teal-600 selection:text-white">
        <SimulationBanner />
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/services" element={<HospitalServicesPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:doctorId" element={<DoctorProfilePage />} />
            <Route path="/appointments" element={<MyAppointmentsPage />} />
            <Route path="/appointments/book" element={<BookAppointmentPage />} />
            <Route path="/appointments/:appointmentId" element={<AppointmentDetailPage />} />
            <Route path="/appointments/:appointmentId/reschedule" element={<ReschedulePage />} />
            <Route path="/appointments/:appointmentId/cancel" element={<CancelPage />} />
            <Route path="/appointments/:appointmentId/confirmation" element={<AppointmentConfirmationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

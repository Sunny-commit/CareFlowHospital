import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService, AuthState } from '../services/authService';
import { Activity, User, LogOut, Menu, X, Calendar, Stethoscope } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(authService.getState());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Departments', path: '/departments' },
    { label: 'Services & Facilities', path: '/services' },
    { label: 'Find a Doctor', path: '/doctors' },
    { label: 'Book Appointment', path: '/appointments/book' },
    { label: 'My Appointments', path: '/appointments' },
    { label: 'Policies', path: '/policies' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-teal-800 hover:text-teal-900 transition font-bold text-xl tracking-tight"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center shadow-xs">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-teal-900">CareFlow</span>
              <span className="text-teal-600 font-semibold ml-1">Hospital</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive(link.path)
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-600 hover:text-teal-800 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Status / Login Button */}
          <div className="hidden md:flex items-center gap-3">
            {authState.patient ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-teal-50 border border-teal-200/70 text-teal-900 text-sm">
                  <User className="w-4 h-4 text-teal-700" />
                  <span className="font-medium" id="logged-in-user-name">
                    {authState.patient.fullName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 transition border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                data-testid="navbar-login-link"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium bg-teal-700 text-white hover:bg-teal-800 transition shadow-xs"
              >
                <User className="w-4 h-4" />
                <span>Patient Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-slate-600 hover:text-teal-800 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100">
            {authState.patient ? (
              <div className="space-y-2">
                <div className="px-3 py-2 text-sm text-teal-800 font-medium bg-teal-50 rounded">
                  Logged in as: <strong>{authState.patient.fullName}</strong>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full px-4 py-2 text-base font-medium rounded-md bg-teal-700 text-white hover:bg-teal-800"
              >
                Patient Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

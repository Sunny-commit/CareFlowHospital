import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { Eye, EyeOff, LogIn, Lock, Mail, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const redirectPath = (location.state as { from?: string })?.from || '/appointments';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await authService.login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('demo.patient@careflow.test');
    setPassword('DemoPatient123!');
    setErrorMessage(null);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Patient Portal Login
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to view, reschedule, or cancel your CareFlow Hospital consultations.
          </p>
        </div>

        {/* Demo Account Quick-Fill Helper */}
        <div className="p-3.5 bg-teal-50/70 border border-teal-200/80 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Demo Test Account
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 bg-white px-2 py-0.5 rounded border border-teal-300 transition cursor-pointer shadow-2xs"
            >
              Autofill Credentials
            </button>
          </div>
          <div className="text-[11px] text-teal-800 space-y-0.5 font-mono">
            <div>Email: <strong>demo.patient@careflow.test</strong></div>
            <div>Password: <strong>DemoPatient123!</strong></div>
          </div>
        </div>

        {/* Login Error Display with data-testid="login-error" and role="alert" */}
        {errorMessage && (
          <div
            data-testid="login-error"
            role="alert"
            aria-live="assertive"
            className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="patient-email"
              className="block text-xs font-semibold text-slate-700"
            >
              Patient Email Address
            </label>
            <div className="relative">
              <input
                id="patient-email"
                type="email"
                data-testid="patient-email"
                autoComplete="email"
                required
                placeholder="demo.patient@careflow.test"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-slate-50/50"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="patient-password"
              className="block text-xs font-semibold text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="patient-password"
                type={showPassword ? 'text' : 'password'}
                data-testid="patient-password"
                autoComplete="current-password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-slate-50/50"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <button
                type="button"
                data-testid="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            data-testid="patient-login-submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 disabled:bg-teal-400 text-white font-medium text-sm transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Log In to Patient Portal</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Need help with appointment access? </span>
          <Link to="/faq" className="text-teal-700 font-semibold hover:underline">
            Read Patient FAQs
          </Link>
        </div>
      </div>
    </div>
  );
};

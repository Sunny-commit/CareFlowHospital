import React, { useState, useEffect } from 'react';
import { Database, X, Copy, Check, RefreshCw, FileText, Layers } from 'lucide-react';
import { storageService } from '../services/storageService';
import { Department, Doctor, AvailabilitySlot, Appointment } from '../types';

interface DatabaseViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseViewerModal: React.FC<DatabaseViewerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'departments' | 'doctors' | 'slots' | 'appointments'>('departments');
  const [data, setData] = useState<{
    departments: Department[];
    doctors: Doctor[];
    slots: AvailabilitySlot[];
    appointments: Appointment[];
  }>({
    departments: [],
    doctors: [],
    slots: [],
    appointments: [],
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [departments, doctors, appointments] = await Promise.all([
        storageService.getDepartments(),
        storageService.getDoctors(),
        storageService.getAllAppointments(),
      ]);

      // Sample first 50 slots for performance
      const firstDocSlots = doctors.length > 0 ? await storageService.getSlotsByDoctor(doctors[0].id) : [];

      setData({
        departments,
        doctors,
        slots: firstDocSlots,
        appointments,
      });
    } catch (err) {
      console.error('Failed to load database records', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentRecords =
    activeTab === 'departments'
      ? data.departments
      : activeTab === 'doctors'
      ? data.doctors
      : activeTab === 'slots'
      ? data.slots
      : data.appointments;

  const jsonString = JSON.stringify(currentRecords, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCloud = storageService.isCloudFirestoreActive();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Database Record Inspector</h3>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  isCloud
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-800 border-slate-300'
                }`}>
                  {isCloud ? 'Cloud Firestore (Active)' : 'Local Persistent Storage'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {isCloud
                  ? 'Connected live to Google Cloud Firestore database'
                  : 'Inspect the serialized collections currently inserted and queried by the application'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collection Selector Tabs */}
        <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'departments'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Departments ({data.departments.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'doctors'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Doctors ({data.doctors.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('slots')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'slots'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Sample Slots ({data.slots.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'appointments'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Booked Appointments ({data.appointments.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={loadAllData}
              disabled={loading}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100 transition flex items-center gap-1 font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>
        </div>

        {/* JSON Viewer Body */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-900 text-slate-100 font-mono text-xs">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Querying database collection...</span>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap break-all leading-relaxed">{jsonString}</pre>
          )}
        </div>

        {/* Modal Footer Notes */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-slate-500">
            <FileText className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>
              Key in browser: <code className="font-mono text-slate-800 bg-slate-200 px-1 py-0.5 rounded">careflow_db_{activeTab}</code>
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

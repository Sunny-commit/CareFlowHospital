import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Doctor, Department, AvailabilitySlot } from '../types';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorAlert } from '../components/ErrorAlert';
import {
  Search,
  Filter,
  X,
  Calendar,
  DollarSign,
  Briefcase,
  Globe,
  Stethoscope,
  ChevronRight
} from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [slots, setSlots] = useState<Record<string, AvailabilitySlot[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Form Filter States
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('q') || '');
  const [selectedDepartment, setSelectedDepartment] = useState<string>(searchParams.get('department') || '');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(searchParams.get('specialty') || '');
  const [selectedDate, setSelectedDate] = useState<string>(searchParams.get('date') || '');
  const [selectedLanguage, setSelectedLanguage] = useState<string>(searchParams.get('language') || '');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [docs, deps] = await Promise.all([
        storageService.getDoctors(),
        storageService.getDepartments()
      ]);
      setDoctors(docs);
      setDepartments(deps);

      // Load availability slots for all doctors in parallel
      const slotMap: Record<string, AvailabilitySlot[]> = {};
      const allDoctorSlots = await Promise.all(
        docs.map(async (d) => {
          const docSlots = await storageService.getSlotsByDoctor(d.id);
          return { id: d.id, available: docSlots.filter((s) => s.status === 'available') };
        })
      );
      allDoctorSlots.forEach((item) => {
        slotMap[item.id] = item.available;
      });
      setSlots(slotMap);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching doctor directory.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Synchronize department filter from URL if present
  useEffect(() => {
    const deptFromUrl = searchParams.get('department');
    if (deptFromUrl && deptFromUrl !== selectedDepartment) {
      setSelectedDepartment(deptFromUrl);
    }
  }, [searchParams]);

  // Derived Specialties list based on active doctors or selected department
  const availableSpecialties = useMemo(() => {
    const relevantDocs = selectedDepartment
      ? doctors.filter((d) => d.departmentName === selectedDepartment)
      : doctors;
    return Array.from(new Set(relevantDocs.map((d) => d.specialty))).sort();
  }, [doctors, selectedDepartment]);

  // Derived Languages list
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    doctors.forEach((d) => d.languages.forEach((l) => langs.add(l)));
    return Array.from(langs).sort();
  }, [doctors]);

  // Filtered Doctors List
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      // Name Search
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = doc.fullName.toLowerCase().includes(term);
        const matchesSpec = doc.specialty.toLowerCase().includes(term);
        if (!matchesName && !matchesSpec) return false;
      }

      // Department Filter
      if (selectedDepartment && doc.departmentName !== selectedDepartment) {
        return false;
      }

      // Specialty Filter
      if (selectedSpecialty && doc.specialty !== selectedSpecialty) {
        return false;
      }

      // Language Filter
      if (selectedLanguage && !doc.languages.includes(selectedLanguage)) {
        return false;
      }

      // Date Filter
      if (selectedDate) {
        const docAvailableSlots = slots[doc.id] || [];
        const hasSlotOnDate = docAvailableSlots.some((s) => s.date === selectedDate);
        if (!hasSlotOnDate) return false;
      }

      return true;
    });
  }, [doctors, searchTerm, selectedDepartment, selectedSpecialty, selectedLanguage, selectedDate, slots]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('');
    setSelectedSpecialty('');
    setSelectedDate('');
    setSelectedLanguage('');
    setSearchParams({});
  };

  const getNextAvailableSlot = (doctorId: string): string => {
    const docSlots = slots[doctorId] || [];
    if (docSlots.length === 0) return 'No upcoming slots';
    const sorted = [...docSlots].sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      if (cmp !== 0) return cmp;
      return a.startTime.localeCompare(b.startTime);
    });
    return `${sorted[0].date} at ${sorted[0].startTime}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Heading */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-teal-700 text-sm font-semibold mb-2">
          <Stethoscope className="w-4 h-4" />
          <span>CareFlow Medical Specialists</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find a Doctor
        </h1>
        <p className="mt-2 text-slate-600 max-w-3xl leading-relaxed">
          Filter certified physicians and surgeons across our clinical departments, check their consultation fees and upcoming availability, and reserve your consultation.
        </p>
      </div>

      {/* Filter Toolbar with semantic HTML labels */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Filter className="w-4 h-4 text-teal-700" />
            <span>Search &amp; Filter Directory</span>
          </div>
          <button
            type="button"
            data-testid="clear-doctor-filters"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition px-2.5 py-1.5 rounded-md hover:bg-teal-50 border border-teal-200/60 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear all filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search by Doctor Name */}
          <div className="space-y-1.5">
            <label htmlFor="doctor-search-input" className="block text-xs font-semibold text-slate-700">
              Doctor Name or Specialty
            </label>
            <div className="relative">
              <input
                id="doctor-search-input"
                type="text"
                data-testid="doctor-search-input"
                placeholder="e.g. Dr. Ananya Mehta"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-slate-50/50"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Department Filter */}
          <div className="space-y-1.5">
            <label htmlFor="department-filter" className="block text-xs font-semibold text-slate-700">
              Department
            </label>
            <select
              id="department-filter"
              data-testid="department-filter"
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedSpecialty('');
              }}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-slate-50/50"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Specialty Filter */}
          <div className="space-y-1.5">
            <label htmlFor="specialty-filter" className="block text-xs font-semibold text-slate-700">
              Specialty
            </label>
            <select
              id="specialty-filter"
              data-testid="specialty-filter"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-slate-50/50"
            >
              <option value="">All Specialties</option>
              {availableSpecialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Available Date Filter */}
          <div className="space-y-1.5">
            <label htmlFor="date-filter" className="block text-xs font-semibold text-slate-700">
              Available Date
            </label>
            <input
              id="date-filter"
              type="date"
              data-testid="date-filter"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-slate-50/50"
            />
          </div>

          {/* Language Filter */}
          <div className="space-y-1.5">
            <label htmlFor="language-filter" className="block text-xs font-semibold text-slate-700">
              Language Spoken
            </label>
            <select
              id="language-filter"
              data-testid="language-filter"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-slate-50/50"
            >
              <option value="">All Languages</option>
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <div>
          Showing <strong>{filteredDoctors.length}</strong> of {doctors.length} doctors
        </div>
        {selectedDepartment && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800">
            Filtered by: {selectedDepartment}
          </span>
        )}
      </div>

      {/* Loading State */}
      {loading && <LoadingIndicator message="Searching doctor directory..." />}

      {/* Error State */}
      {error && (
        <ErrorAlert
          title="Doctor Directory Unavailable"
          message={error}
          onRetry={fetchData}
        />
      )}

      {/* Results Container with data-testid */}
      {!loading && !error && (
        <div data-testid="doctor-search-results" className="space-y-6">
          {filteredDoctors.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">No matching doctors found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  We couldn&apos;t find any doctors matching your active search and filter criteria. Try clearing some filters or searching for another term.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2 rounded-lg bg-teal-700 text-white text-sm font-medium hover:bg-teal-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => {
                const nextSlot = getNextAvailableSlot(doc.id);

                return (
                  <article
                    key={doc.id}
                    data-testid={`doctor-card-${doc.id}`}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-teal-300 hover:shadow-sm transition flex flex-col justify-between p-6"
                  >
                    <div className="space-y-4">
                      {/* Doctor Header & Avatar */}
                      <div className="flex items-start gap-4">
                        <img
                          src={doc.profileImage}
                          alt={doc.fullName}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                        />
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold text-slate-900 leading-tight">
                            {doc.fullName}
                          </h3>
                          <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                            {doc.departmentName}
                          </span>
                          <p className="text-xs text-slate-600 font-medium">{doc.specialty}</p>
                        </div>
                      </div>

                      {/* Doctor Meta Info */}
                      <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span><strong>{doc.yearsOfExperience} yrs</strong> experience</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <DollarSign className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Fee: <strong>₹{doc.consultationFee}</strong></span>
                        </div>
                        <div className="col-span-2 flex items-center gap-1.5 text-slate-600">
                          <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">Languages: {doc.languages.join(', ')}</span>
                        </div>
                      </div>

                      {/* Next Available Slot */}
                      <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-100 flex items-start gap-2 text-xs">
                        <Calendar className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-500 block">Next Available Slot:</span>
                          <span className="font-semibold text-teal-900">{nextSlot}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 mt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                      <Link
                        to={`/doctors/${doc.id}`}
                        data-testid={`view-doctor-${doc.id}`}
                        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition"
                      >
                        <span>View Profile</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        to={`/appointments/book?doctorId=${doc.id}`}
                        data-testid={`book-doctor-${doc.id}`}
                        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-medium transition shadow-xs"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Appointment</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Department, Doctor } from '../types';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorAlert } from '../components/ErrorAlert';
import {
  Clock,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Hospital,
  MapPin,
  UserCheck,
  Phone,
  AlertCircle,
  Search,
  Filter,
  HeartPulse,
  Building2,
  Calendar
} from 'lucide-react';

export const DepartmentsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchDepartmentsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [deps, docs] = await Promise.all([
        storageService.getDepartments(),
        storageService.getDoctors()
      ]);
      setDepartments(deps);
      setDoctors(docs);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load department details.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartmentsData();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    departments.forEach((d) => {
      if (d.category) set.add(d.category);
    });
    return ['All', ...Array.from(set)];
  }, [departments]);

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      const matchesCategory =
        selectedCategory === 'All' || dept.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dept.name.toLowerCase().includes(q) ||
        dept.description.toLowerCase().includes(q) ||
        (dept.headOfDepartment && dept.headOfDepartment.toLowerCase().includes(q)) ||
        (dept.location && dept.location.toLowerCase().includes(q)) ||
        dept.services.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [departments, selectedCategory, searchQuery]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" data-testid="departments-page">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-teal-700 text-sm font-semibold">
          <Hospital className="w-4 h-4" />
          <span>CareFlow Multi-Specialty Hospital Infrastructure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" data-testid="page-title">
          Clinical Departments &amp; Centres of Excellence
        </h1>
        <p className="text-slate-600 max-w-3xl leading-relaxed text-sm sm:text-base">
          CareFlow Hospital houses 16 specialized medical and surgical departments, each led by credentialed specialists with round-the-clock intensive care, diagnostic imaging, and dedicated outpatient consultation wings.
        </p>
      </div>

      {/* Quick Hospital Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 text-center shadow-xs">
        <div className="p-2">
          <div className="text-2xl font-black text-teal-700">16</div>
          <div className="text-xs text-slate-500 font-medium">Departments &amp; Centers</div>
        </div>
        <div className="p-2 border-l border-slate-100">
          <div className="text-2xl font-black text-teal-700">32+</div>
          <div className="text-xs text-slate-500 font-medium">Certified Specialists</div>
        </div>
        <div className="p-2 border-l border-slate-100">
          <div className="text-2xl font-black text-rose-600">24x7</div>
          <div className="text-xs text-slate-500 font-medium">Emergency &amp; Trauma</div>
        </div>
        <div className="p-2 border-l border-slate-100">
          <div className="text-2xl font-black text-teal-700">100%</div>
          <div className="text-xs text-slate-500 font-medium">NABH / NABL Standards</div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              id="department-search-input"
              data-testid="department-search-input"
              placeholder="Search by department, clinical service, doctor, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0 self-center">
            <Filter className="w-3.5 h-3.5" />
            <span>Showing {filteredDepartments.length} of {departments.length} departments</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100" data-testid="department-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && <LoadingIndicator message="Loading hospital departments & specialties..." />}

      {error && (
        <ErrorAlert
          title="Departments Retrieval Failed"
          message={error}
          onRetry={fetchDepartmentsData}
        />
      )}

      {!loading && !error && filteredDepartments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No departments found matching your criteria</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search terms or selecting &quot;All&quot; categories to see all 16 departments.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-lg bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}

      {!loading && !error && filteredDepartments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="departments-grid">
          {filteredDepartments.map((dept) => {
            const deptDoctors = doctors.filter((d) => d.departmentId === dept.id);

            return (
              <article
                key={dept.id}
                id={`dept-${dept.id.toLowerCase()}`}
                data-testid={`department-card-${dept.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-teal-300 hover:shadow-sm transition p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  {/* Top Badges & Title */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-100">
                          {dept.id}
                        </span>
                        {dept.category && (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {dept.category}
                          </span>
                        )}
                        {dept.emergencySupport && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                            <HeartPulse className="w-3 h-3 text-rose-600 animate-pulse" />
                            <span>24x7 Emergency</span>
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 pt-1" data-testid="department-name">
                        {dept.name}
                      </h2>
                    </div>

                    <div className="p-3 bg-teal-50 text-teal-700 rounded-xl shrink-0 border border-teal-100/50">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {dept.description}
                  </p>

                  {/* Metadata: Head of Dept, Location & Phone Ext */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                    {dept.headOfDepartment && (
                      <div className="flex items-center gap-2 text-slate-700">
                        <UserCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span><strong className="text-slate-900">Head:</strong> {dept.headOfDepartment}</span>
                      </div>
                    )}
                    {dept.location && (
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span><strong className="text-slate-900">Floor:</strong> {dept.location}</span>
                      </div>
                    )}
                    {dept.phoneExtension && (
                      <div className="flex items-center gap-2 text-slate-700 sm:col-span-2">
                        <Phone className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span><strong className="text-slate-900">Desk:</strong> {dept.phoneExtension}</span>
                      </div>
                    )}
                  </div>

                  {/* Core Clinical Services */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Core Clinical Services ({dept.services.length})
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                      {dept.services.map((srv, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Operating Hours */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
                    <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-800 block">Outpatient Consultation Hours:</span>
                      <span>{dept.operatingHours}</span>
                    </div>
                  </div>

                  {/* Available Specialists */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Certified Department Specialists ({deptDoctors.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {deptDoctors.map((doc) => (
                        <Link
                          key={doc.id}
                          to={`/doctors/${doc.id}`}
                          id={`doc-link-${doc.id.toLowerCase()}`}
                          data-testid={`doctor-link-${doc.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-200 border border-slate-200/80 text-xs font-medium text-slate-700 transition"
                        >
                          <span className="font-semibold">{doc.fullName}</span>
                          <span className="text-[10px] text-slate-500">({doc.specialty})</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <Link
                    to={`/doctors?department=${encodeURIComponent(dept.name)}`}
                    id={`browse-docs-${dept.id.toLowerCase()}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800"
                  >
                    <span>View All {dept.name} Doctors</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to={`/appointments/book?departmentId=${dept.id}`}
                    id={`book-dept-${dept.id.toLowerCase()}`}
                    data-testid={`book-department-btn-${dept.id}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition"
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
  );
};

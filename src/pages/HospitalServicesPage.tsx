import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Activity,
  PhoneCall,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Calendar,
  AlertCircle,
  FlaskConical,
  Cross,
  Stethoscope,
  Sparkles,
  Bed,
  ArrowRight,
  Eye,
  FileText
} from 'lucide-react';

export const HospitalServicesPage: React.FC = () => {
  const facilities = [
    {
      id: 'emergency-trauma',
      title: '24x7 Emergency & Level 1 Trauma Center',
      tagline: 'Rapid Resuscitation & Round-the-clock Trauma Surgery',
      icon: HeartPulse,
      accentColor: 'text-rose-600 bg-rose-50 border-rose-200',
      badge: '24x7 Emergency',
      description: 'Fully equipped trauma resuscitation bays with dedicated point-of-care ultrasound, mobile stroke unit, and advanced cardiac life support (ACLS) trained emergency physicians on duty 24/7.',
      keyHighlights: [
        'Dedicated triage protocols for Chest Pain, Acute Stroke & Polytrauma',
        'State-of-the-art mobile ICU ambulances with GPS tracking & ventilator support',
        'Direct seamless transfer to Cath Lab and Modular Trauma Operation Theatres',
        'In-hospital rapid response emergency team: 1066 / +91 80 4000 0100'
      ],
      location: 'Ground Floor, Dedicated Ambulance Ramp Bay',
      contact: 'Emergency Hotline: 1066'
    },
    {
      id: 'critical-care-icu',
      title: 'Intensive Care Units (ICU, CCU, NICU, PICU)',
      tagline: 'Precision Hemodynamic Monitoring & 1:1 Nursing Care',
      icon: Activity,
      accentColor: 'text-teal-700 bg-teal-50 border-teal-200',
      badge: 'Critical Care',
      description: 'Comprehensive tertiary intensive care infrastructure comprising Medical ICU, Surgical ICU, Cardiac Care Unit (CCU), Level III Neonatal ICU (NICU), and Pediatric ICU (PICU).',
      keyHighlights: [
        '1:1 specialized critical care nurse-to-patient ratio',
        'Advanced invasive and non-invasive ventilators with high-flow nasal oxygen',
        'Continuous multiparameter hemodynamic & intracranial pressure monitoring',
        'HEPA filtration with positive/negative pressure isolation suites'
      ],
      location: 'Critical Care Tower, 2nd & 3rd Floors',
      contact: 'ICU Helpdesk: Ext. 4250'
    },
    {
      id: 'diagnostic-imaging',
      title: 'Advanced Diagnostic Radiology & Imaging',
      tagline: '3.0 Tesla Silent MRI, 128-Slice Dual Source CT & 4D Ultrasound',
      icon: Eye,
      accentColor: 'text-blue-700 bg-blue-50 border-blue-200',
      badge: 'Radiology & Imaging',
      description: 'Sub-millimeter anatomical precision imaging facilitating rapid clinical diagnosis. Equipped with silent scanning technology, low-radiation pediatric protocols, and image-guided interventions.',
      keyHighlights: [
        '3.0 Tesla Silent Whole-Body & Neuro MRI with functional sequences',
        '128-Slice Dual Source Low-Dose Cardiac CT Angiography',
        'High-resolution 4D Color Doppler Ultrasound & Echocardiography',
        'Digital 3D Tomosynthesis Mammography & DEXA Bone Densitometry'
      ],
      location: 'Basement Level 1, Diagnostic Imaging Center',
      contact: 'Radiology Desk: Ext. 4050'
    },
    {
      id: 'pathology-lab',
      title: 'NABL-Accredited Diagnostic Pathology & Laboratory',
      tagline: 'Automated Track Testing & Rapid Online Lab Reports',
      icon: FlaskConical,
      accentColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      badge: 'Pathology & Genomics',
      description: 'Fully automated biochemistry, hematology, clinical pathology, microbiology, molecular diagnostics, and histopathology testing ensuring quality-controlled results.',
      keyHighlights: [
        'NABL accredited robotic track analyzers with barcoded specimen tracking',
        'Emergency 30-minute turn-around time for critical cardiac markers & ABG',
        'Molecular PCR testing for infectious diseases & genetic mutations',
        'Complimentary Home Sample Collection available across the metro'
      ],
      location: 'Diagnostic Pavilion, Ground Floor',
      contact: 'Lab Reception: Ext. 4080'
    },
    {
      id: 'modular-ot',
      title: 'Modular Operation Theatres & Robotic Surgery',
      tagline: 'Laminar Airflow, Ultra-clean HEPA Filtration & Da Vinci Robotic Suites',
      icon: Stethoscope,
      accentColor: 'text-purple-700 bg-purple-50 border-purple-200',
      badge: 'Surgical Suites',
      description: '12 technologically advanced surgical suites engineered for open-heart surgery, robotic oncology, neuro-navigation craniotomies, and joint replacement procedures.',
      keyHighlights: [
        'Ultra-clean vertical laminar airflow with Class 100 HEPA air changes',
        'Da Vinci Xi Surgical Robotic System for minimal-access precision',
        'High-definition 4K 3D laparoscopic surgical visualization towers',
        'Integrated intraoperative digital C-Arm fluoroscopy & neuro-monitoring'
      ],
      location: 'Surgical Tower, 4th Floor',
      contact: 'OT Coordinator: Ext. 4450'
    },
    {
      id: 'dialysis-unit',
      title: 'Renal Care & 24-Station Hemodialysis Center',
      tagline: 'Ultra-Pure Reverse Osmosis Water & Dedicated Sero-Positive Bays',
      icon: Building2,
      accentColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
      badge: 'Nephrology & Dialysis',
      description: 'Modern outpatient and emergency dialysis suites offering maintenance hemodialysis, nocturnal dialysis, bedside SLED, and plasmapheresis for renal patients.',
      keyHighlights: [
        '24 microprocessor-controlled dialysis machines with online Kt/V clearance',
        'Double-pass computerized Reverse Osmosis (RO) ultrapure water plant',
        'Dedicated isolated stations for seropositive patients',
        '24x7 emergency nephrologist coverage for acute dialysis in ICU'
      ],
      location: 'Renal Pavilion, 4th Floor',
      contact: 'Dialysis Desk: Ext. 4601'
    },
    {
      id: 'pharmacy-bloodbank',
      title: '24x7 In-House Central Pharmacy & Blood Bank',
      tagline: '100% Genuine Certified Medications & Component Blood Separation',
      icon: ShieldCheck,
      accentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      badge: '24x7 Support',
      description: 'Comprehensive hospital pharmacy ensuring computerized prescription dispensing and temperature-monitored cold chains, alongside a certified 24x7 Blood Bank.',
      keyHighlights: [
        'Round-the-clock outpatient pharmacy counter and inpatient bedside dispensing',
        'Strict cold-chain storage for vaccines, biologics, and oncology medications',
        'Automated Blood Component separation (PRBC, Platelets, Cryoprecipitate, FFP)',
        'Single Donor Platelet (SDP) Apheresis facility on standby'
      ],
      location: 'Central Concourse, Ground Floor',
      contact: 'Pharmacy Hotline: Ext. 4020'
    },
    {
      id: 'inpatient-rooms',
      title: 'Inpatient Accommodations & Deluxe Suites',
      tagline: 'Healing Spaces with Personalized Nursing & Culinary Care',
      icon: Bed,
      accentColor: 'text-amber-700 bg-amber-50 border-amber-200',
      badge: 'Patient Stay',
      description: 'CareFlow features 350 inpatient beds including air-conditioned sharing rooms, private deluxe rooms, and luxury family suites with dedicated nurse-call systems.',
      keyHighlights: [
        'Multi-position ergonomic motorized patient beds with pneumatic support',
        'Attendant companion daybeds, en-suite bathrooms, and high-speed Wi-Fi',
        'Personalized clinical dietitian-prescribed therapeutic meal service',
        'Cashless TPA insurance helpdesk and paperless digital discharge'
      ],
      location: 'Inpatient Towers A & B, Floors 3 to 7',
      contact: 'Admissions Desk: Ext. 4005'
    }
  ];

  const healthPackages = [
    {
      title: 'CareFlow Essential Heart Check',
      price: '₹ 2,499',
      testsCount: '18 Vital Parameters',
      bestFor: 'Adults aged 30+, individuals with sedentary habits or family history of heart disease.',
      includes: [
        'Complete Blood Count (CBC) & ESR',
        'Fasting Blood Glucose & HbA1c',
        'Comprehensive Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
        '12-Lead Resting ECG',
        '2D Echocardiography / Cardiac Screening',
        'Cardiology Specialist Consultation'
      ]
    },
    {
      title: 'Executive Comprehensive Master Health Check',
      price: '₹ 4,999',
      testsCount: '48 Comprehensive Tests',
      bestFor: 'Working professionals seeking an exhaustive annual multi-organ health assessment.',
      includes: [
        'Complete Hemogram & Vitamin D3 / B12 assays',
        'Liver Function Test (LFT) & Kidney Function Test (KFT)',
        'Thyroid Profile (Free T3, T4, TSH)',
        'Digital Chest X-Ray & Ultrasound Abdomen/Pelvis',
        'Pulmonary Function Test (Spirometry) & ECG',
        'Consultations with Senior Physician & Dietitian'
      ]
    },
    {
      title: 'Senior Citizen Golden Wellness Package',
      price: '₹ 3,799',
      testsCount: '34 Age-Specific Tests',
      bestFor: 'Seniors aged 60+ focusing on bone mineral density, cardiac wellness, and metabolic stability.',
      includes: [
        'Complete Blood Count & Diabetic Glycemic Markers',
        'DEXA Bone Mineral Densitometry (BMD)',
        'Serum Calcium, Phosphorus & Electrolytes',
        'Audiometry (Hearing Screen) & Eye Refraction',
        'Urine Microalbumin & Serum Creatinine',
        'Comprehensive Geriatric Consultation'
      ]
    },
    {
      title: 'CareFlow Well Woman Health Screening',
      price: '₹ 3,499',
      testsCount: '26 Specific Parameters',
      bestFor: 'Women of all ages addressing hormonal balance, breast health, and cervical wellness.',
      includes: [
        'Complete Blood Count & Iron Deficiency Anemia Profile',
        'Digital 3D Mammography or Breast Ultrasound',
        'Liquid-Based Pap Smear Cervical Cytology',
        'Pelvic Ultrasound (USG Pelvis)',
        'Thyroid Function & Blood Sugar Assessment',
        'Consultation with Senior Consultant Gynecologist'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Breadcrumb / Title */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-teal-700 text-sm font-semibold">
          <Building2 className="w-4 h-4" />
          <span>Hospital Infrastructure &amp; Clinical Services</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Comprehensive Medical Facilities &amp; Services
        </h1>
        <p className="text-slate-600 max-w-3xl leading-relaxed text-sm sm:text-base">
          From round-the-clock emergency trauma care and precision robotic surgical suites to NABL-accredited labs and preventative health checkup packages, explore CareFlow Hospital’s healthcare ecosystem.
        </p>
      </div>

      {/* Emergency Quick Action Bar */}
      <div className="bg-gradient-to-r from-rose-600 to-rose-700 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <HeartPulse className="w-7 h-7 text-white animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold">In Case of Medical Emergency</h2>
            <p className="text-xs sm:text-sm text-rose-100">
              Immediate ambulance dispatch, cardiac resuscitation, acute stroke intervention, and polytrauma surgery.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:1066"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-rose-700 font-bold text-sm shadow-xs hover:bg-rose-50 transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 1066 / +91 80 4000 0100</span>
          </a>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">World-Class Healthcare Infrastructure</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Core Clinical &amp; Support Facilities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((fac) => {
            const Icon = fac.icon;
            return (
              <div
                key={fac.id}
                id={`fac-${fac.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-teal-300 hover:shadow-sm transition p-6 sm:p-7 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${fac.accentColor}`}>
                        {fac.badge}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 pt-1">{fac.title}</h3>
                      <p className="text-xs font-medium text-teal-700">{fac.tagline}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl text-teal-700 border border-slate-100">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>

                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Key Capabilities</span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {fac.keyHighlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="text-slate-500">
                    <span className="font-semibold text-slate-700">Location: </span>
                    <span>{fac.location}</span>
                  </div>
                  <div className="font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md self-start sm:self-auto">
                    {fac.contact}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preventive Health Checkup Packages Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Proactive Healthcare</span>
          <h2 className="text-2xl sm:text-3xl font-bold">Preventive Health Checkup Packages</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Early detection saves lives. Our comprehensive health packages include clinical pathology tests, advanced diagnostic imaging, and 1-on-1 consultations with senior medical specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthPackages.map((pkg, i) => (
            <div
              key={i}
              className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between space-y-4 hover:border-teal-500/80 transition"
            >
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-teal-300 bg-teal-950/80 px-2.5 py-0.5 rounded border border-teal-800/50">
                    {pkg.testsCount}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{pkg.title}</h3>
                </div>

                <div className="text-2xl font-extrabold text-teal-400">
                  {pkg.price}
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {pkg.bestFor}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-700/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Included Tests:</span>
                  <ul className="text-[11px] text-slate-300 space-y-1">
                    {pkg.includes.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/60">
                <Link
                  to={`/appointments/book?reason=${encodeURIComponent(pkg.title)}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs transition"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book This Package</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hospital Support Desks & TPA Insurance */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Cashless Insurance (TPA) &amp; Patient Support Desks</h3>
            <p className="text-xs text-slate-500">Hassle-free admissions, billing transparently aligned with IRDAI guidelines</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">Cashless Mediclaim Desks</h4>
            <p className="leading-relaxed">
              Empaneled with over 35 leading private insurers and Third Party Administrators (TPAs) including Star Health, HDFC ERGO, ICICI Lombard, Medi Assist, Vidal, and Care Health.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">International Patient Cell</h4>
            <p className="leading-relaxed">
              Dedicated assistance for international visitors including pre-travel medical opinions, priority airport transfers, dedicated multi-lingual translators, and FRRO registration support.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="font-bold text-slate-800 text-sm">Visiting Hours &amp; Guidelines</h4>
            <p className="leading-relaxed">
              General Wards: 04:30 PM - 07:00 PM | ICUs: 11:00 AM - 12:00 PM &amp; 05:00 PM - 06:00 PM. Maximum 1 attendant allowed at bedside to maintain hospital sanitation and safety.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

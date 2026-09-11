import { Department, Doctor, Patient, AvailabilitySlot, Appointment } from '../types';

export const SEED_DEPARTMENTS: Department[] = [
  {
    id: 'DEP-CARD',
    name: 'Cardiology & Heart Institute',
    category: 'Centres of Excellence',
    description: 'Comprehensive cardiovascular care utilizing 24x7 primary angioplasty, digital catheterization labs, 4D echocardiography, coronary artery bypass surgery, and heart failure prevention.',
    services: [
      '24x7 Primary Coronary Angioplasty (STEMI)',
      '2D/4D Echocardiography & Color Doppler',
      'Coronary Angiography & Complex Stenting',
      'Electrophysiology & Pacemaker / ICD Implantation',
      'Minimally Invasive Valve Replacement (TAVR)',
      'Pediatric & Adult Cardiac Rehabilitation'
    ],
    operatingHours: 'Mon - Sat: 08:00 AM - 08:00 PM | 24x7 Emergency Cardiac Care',
    location: 'Cardiovascular Wing, 2nd Floor',
    headOfDepartment: 'Dr. Ananya Mehta',
    emergencySupport: true,
    phoneExtension: 'Ext. 4101',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-NEUR',
    name: 'Neurology & Neurosurgery',
    category: 'Centres of Excellence',
    description: 'Specialized brain, spine, and peripheral nerve therapy with hyperacute stroke thrombolysis, digital video EEG, micro-neurosurgical navigation, and comprehensive neuro-rehabilitation.',
    services: [
      '24x7 Rapid Code Stroke Thrombolysis Unit',
      'Micro-Neurosurgery & Brain Tumor Resection',
      'Minimally Invasive Endoscopic Spine Surgery',
      'Epilepsy & Seizure Long-Term Telemetry (EEG)',
      'Parkinson\'s & Movement Disorder Deep Brain Stimulation',
      'Comprehensive Stroke Rehabilitation Program'
    ],
    operatingHours: 'Mon - Sat: 08:30 AM - 07:30 PM | 24x7 Acute Neuro-Trauma',
    location: 'Neurosciences Pavilion, 3rd Floor',
    headOfDepartment: 'Dr. Rajesh Kulkarni',
    emergencySupport: true,
    phoneExtension: 'Ext. 4201',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-ORTH',
    name: 'Orthopedics, Spine & Joint Replacement',
    category: 'Centres of Excellence',
    description: 'High-precision bone and joint care featuring robotic knee and hip replacements, arthroscopic sports reconstructions, scoliosis correction, and polytrauma fracture stabilization.',
    services: [
      'Robotic-Assisted Total Knee & Hip Arthroplasty',
      'Arthroscopic Knee (ACL/Meniscus) & Shoulder Repair',
      'Minimally Invasive Spine Surgery & Disc Herniation Care',
      'Pelvic & Complex Polytrauma Reconstruction',
      'Pediatric Orthopedic Deformity Correction',
      'Advanced Sports Medicine & Physical Therapy'
    ],
    operatingHours: 'Mon - Sat: 08:00 AM - 08:00 PM | 24x7 Polytrauma Bay',
    location: 'Bone & Joint Pavilion, 1st Floor',
    headOfDepartment: 'Dr. Karthik Iyer',
    emergencySupport: true,
    phoneExtension: 'Ext. 4301',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-ONCO',
    name: 'Oncology & Comprehensive Cancer Care',
    category: 'Centres of Excellence',
    description: 'Multidisciplinary cancer center offering precision medical oncology, targeted immunotherapy, robotic surgical resections, stereotactic radiotherapy, and compassionate palliative support.',
    services: [
      'Daycare Outpatient Chemotherapy & Immunotherapy',
      'Robotic Surgical Oncology (Head, Neck, Thoracic, GI)',
      'Linear Accelerator (LINAC) Radiation Therapy',
      'Bone Marrow Transplant Support Clinic',
      'Genomic Biomarker Profiling & Targeted Therapy',
      'Comprehensive Cancer Screening & Palliative Care'
    ],
    operatingHours: 'Mon - Sat: 08:30 AM - 06:30 PM',
    location: 'Cancer Care Pavilion, Levels 1 & 2',
    headOfDepartment: 'Dr. Siddharth Sengupta',
    emergencySupport: false,
    phoneExtension: 'Ext. 4401',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-GAST',
    name: 'Gastroenterology & Hepatobiliary Sciences',
    category: 'Surgical Specialties',
    description: 'Advanced digestive, liver, and pancreatic care equipped with high-definition endoscopic suites, ERCP, capsule endoscopy, and minimally invasive laparoscopic surgery.',
    services: [
      'Diagnostic & Therapeutic Upper GI Video Endoscopy',
      'Full Colonoscopy & Polyp Removal Screening',
      'ERCP & Biliary / Pancreatic Stenting',
      'Chronic Hepatitis, Fatty Liver & Cirrhosis Clinic',
      'Laparoscopic Gallbladder, Hernia & Appendiceal Surgery',
      'Inflammatory Bowel Disease (Crohn\'s & Colitis) Center'
    ],
    operatingHours: 'Mon - Sat: 08:00 AM - 07:00 PM | 24x7 GI Bleed Management',
    location: 'Main Hospital Block, 2nd Floor',
    headOfDepartment: 'Dr. Vivek Bhattacharya',
    emergencySupport: true,
    phoneExtension: 'Ext. 4501',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-NEPH',
    name: 'Nephrology, Urology & Dialysis',
    category: 'Medical Specialties',
    description: 'Renal care encompassing a 24-station computerized hemodialysis unit, kidney transplant follow-up, holmium laser lithotripsy (RIRS), and prostate health care.',
    services: [
      '24x7 Hemodialysis, Hemodiafiltration & Bedside SLED',
      'Kidney Transplantation Evaluation & Post-Op Care',
      'Holmium Laser Lithotripsy (RIRS/PCNL) for Stones',
      'Minimally Invasive Urological Laparoscopy',
      'Prostate Laser Enucleation (HoLEP / TURP)',
      'Hypertension & Diabetic Kidney Disease Protection'
    ],
    operatingHours: 'Mon - Sun: 07:00 AM - 09:00 PM | 24x7 Emergency Dialysis',
    location: 'Renal & Dialysis Pavilion, 4th Floor',
    headOfDepartment: 'Dr. Alok Chawla',
    emergencySupport: true,
    phoneExtension: 'Ext. 4601',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-PULM',
    name: 'Pulmonology, Allergy & Sleep Medicine',
    category: 'Medical Specialties',
    description: 'Specialized diagnosis and therapy for asthma, COPD, interstitial lung diseases, sleep apnea, pulmonary rehabilitation, and diagnostic bronchoscopy.',
    services: [
      'Computerized Pulmonary Function Tests (PFT / Spirometry)',
      'Video Fiberoptic Bronchoscopy & EBUS Diagnostics',
      'Overnight Polysomnography (Sleep Study Suite)',
      'Comprehensive Allergen Testing & Desensitization',
      'Pulmonary Fibrosis & Chronic Cough Clinics',
      'Post-ICU Pulmonary Rehabilitation & Chest Physiotherapy'
    ],
    operatingHours: 'Mon - Sat: 08:30 AM - 06:30 PM',
    location: 'Ambulatory Care Wing, 2nd Floor',
    headOfDepartment: 'Dr. Vandana Saxena',
    emergencySupport: true,
    phoneExtension: 'Ext. 4701',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-OBGY',
    name: 'Obstetrics, Gynecology & Women\'s Health',
    category: 'Women & Child Health',
    description: 'Holistic care for women across all life stages: luxury private LDR (Labor, Delivery, Recovery) suites, high-risk obstetric monitoring, advanced laparoscopy, and menopause care.',
    services: [
      'High-Risk Pregnancy & Maternal-Fetal Ultrasound',
      'Private LDR Delivery Suites & Painless Epidural Childbirth',
      '3D Laparoscopic & Hysteroscopic Gynae Surgery',
      'Infertility Workup & Follicular Monitoring',
      'Comprehensive Cervical Cancer Screening (Pap Smear & HPV)',
      'Menopause Health & Osteoporosis Bone Density Clinic'
    ],
    operatingHours: 'Mon - Sat: 08:00 AM - 08:00 PM | 24x7 Obstetric Emergency & Labor',
    location: 'Women & Child Health Tower, 3rd Floor',
    headOfDepartment: 'Dr. Radhika Srinivasan',
    emergencySupport: true,
    phoneExtension: 'Ext. 4801',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-PED',
    name: 'Pediatrics, Neonatology & Child Health',
    category: 'Women & Child Health',
    description: 'Compassionate pediatric care featuring a Level III Neonatal ICU (NICU), Pediatric ICU (PICU), childhood developmental milestone monitoring, and universal vaccination schedules.',
    services: [
      'Well-Baby Checkups & Developmental Milestones Tracking',
      'Complete WHO/IAP Child Immunization Schedules',
      'Level III Neonatal Intensive Care Unit (NICU)',
      'Pediatric Asthma, Allergy & Wheezing Clinic',
      'Childhood Nutrition, Obesity & Growth Deficiency Clinic',
      'Adolescent Health & Behavioral Pediatric Guidance'
    ],
    operatingHours: 'Mon - Sun: 08:00 AM - 08:30 PM | 24x7 Pediatric Emergency',
    location: 'Children\'s Pavilion, 3rd Floor',
    headOfDepartment: 'Dr. Sunita Deshmukh',
    emergencySupport: true,
    phoneExtension: 'Ext. 4850',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-DERM',
    name: 'Dermatology, Aesthetics & Cosmetology',
    category: 'Medical Specialties',
    description: 'Comprehensive clinical dermatology, dermatosurgery, narrow-band phototherapy, aesthetic laser rejuvenation, and scientifically proven hair restoration.',
    services: [
      'Chronic Acne, Atopic Eczema & Psoriasis Management',
      'Narrowband UVB Phototherapy for Vitiligo & Psoriasis',
      'Laser Skin Resurfacing & Pigment Correction',
      'Dermoscopy, Mole Mapping & Skin Biopsies',
      'Trichology, PRP Therapy & Hair Restoration Protocols',
      'Pediatric Dermatological Care'
    ],
    operatingHours: 'Mon - Sat: 09:00 AM - 06:00 PM',
    location: 'Outpatient Specialty Suites, 1st Floor',
    headOfDepartment: 'Dr. Priya Nair',
    emergencySupport: false,
    phoneExtension: 'Ext. 4901',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-GEN',
    name: 'General Medicine, Diabetology & Endocrinology',
    category: 'Medical Specialties',
    description: 'Primary adult healthcare, preventive health screenings, multi-system chronic disease management, advanced diabetes education, and geriatric care.',
    services: [
      'Comprehensive Adult Preventive Health Screenings',
      'Type 1 & Type 2 Diabetes Glycemic Optimization',
      'Hypertension, Dyslipidemia & Cardiovascular Risk Reduction',
      'Infectious Disease Diagnostics & Tropical Illness Treatment',
      'Geriatric Multi-Morbidity & Frailty Assessments',
      'Thyroid, Pituitary & Endocrine Disorder Management'
    ],
    operatingHours: 'Mon - Sun: 08:00 AM - 08:00 PM | 24x7 Inpatient Medical Wards',
    location: 'Main Medical Concourse, Ground Floor',
    headOfDepartment: 'Dr. Farhan Ali',
    emergencySupport: true,
    phoneExtension: 'Ext. 4010',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-EMER',
    name: 'Emergency Medicine & Level 1 Trauma Center',
    category: 'Critical Care & Diagnostics',
    description: 'Accredited 24x7 emergency resuscitation center equipped with direct ambulance triage, mobile cardiac ICU, resuscitation bays, and emergency surgical suites.',
    services: [
      '24x7 Rapid Resuscitation & Triage Bays',
      'Level 1 Polytrauma & Fracture Surgical Stabilization',
      'Advanced Cardiac Life Support (ACLS / BLS)',
      'Toxicology & Pediatric Poison Emergency Response',
      'Disaster Emergency Preparedness & Mass Casualty Protocols',
      'High-Tech GPS Mobile ICU Ambulances with Paramedics'
    ],
    operatingHours: '24 Hours / 7 Days a Week (Always Open)',
    location: 'Ground Level, Direct Ambulance Access Bay',
    headOfDepartment: 'Dr. Rajiv Menon',
    emergencySupport: true,
    phoneExtension: 'Emergency Hotline: 1066 / +91 80 4000 0100',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-ENT',
    name: 'ENT & Head-Neck Surgery',
    category: 'Surgical Specialties',
    description: 'Complete otolaryngology care for ear, nose, sinus, throat, voice, and balance conditions with computerized audiometry and endoscopic sinus surgeries.',
    services: [
      'Functional Endoscopic Sinus Surgery (FESS)',
      'Microscopic Ear Surgery & Tympanoplasty',
      'Computerized Audiometry & Digital Hearing Aid Clinic',
      'Voice Assessment & High-Definition Video Laryngoscopy',
      'Coblation Tonsillectomy & Adenoidectomy',
      'Snoring & Obstructive Sleep Apnea Surgical Correction'
    ],
    operatingHours: 'Mon - Sat: 09:00 AM - 06:00 PM',
    location: 'Surgical Specialty Suites, 2nd Floor',
    headOfDepartment: 'Dr. Deepa Nair',
    emergencySupport: false,
    phoneExtension: 'Ext. 4350',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-EYE',
    name: 'Ophthalmology & Vision Sciences',
    category: 'Surgical Specialties',
    description: 'Advanced vision restoration featuring sutureless micro-incision cataract surgery (MICS), diabetic retinopathy lasers, glaucoma management, and pediatric squint care.',
    services: [
      'Micro-Incision Cataract Surgery (Phacoemulsification)',
      'Early Glaucoma Detection, Visual Fields & Laser Surgery',
      'Diabetic Retinopathy & Macular Degeneration Lasers',
      'Automated Refraction & Contact Lens Specialty Fitting',
      'Pediatric Squint & Amblyopia Vision Therapy',
      'Corneal Topography & Advanced Dry Eye Therapy'
    ],
    operatingHours: 'Mon - Sat: 08:30 AM - 05:30 PM',
    location: 'Eye Care Institute, 1st Floor',
    headOfDepartment: 'Dr. Suresh Venkatesh',
    emergencySupport: false,
    phoneExtension: 'Ext. 4380',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-PSYC',
    name: 'Psychiatry & Behavioral Health',
    category: 'Medical Specialties',
    description: 'Confidential, evidence-based mental healthcare addressing anxiety, depression, mood disorders, childhood ADHD/Autism, and geriatric memory health.',
    services: [
      'Clinical Depression & Panic Disorder Therapies',
      'Cognitive Behavioral Therapy (CBT) & Stress Counseling',
      'Childhood ADHD, Learning Disability & Autism Assessments',
      'Sleep Disorders & Insomnia Management Programs',
      'Substance & Behavioral De-Addiction Rehabilitation',
      'Geriatric Memory & Dementia Family Support Programs'
    ],
    operatingHours: 'Mon - Fri: 09:00 AM - 05:30 PM | Sat: 09:00 AM - 01:30 PM',
    location: 'Mind-Body Wellness Center, 5th Floor',
    headOfDepartment: 'Dr. Nandini Roy',
    emergencySupport: false,
    phoneExtension: 'Ext. 4950',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DEP-RAD',
    name: 'Radiology & Diagnostic Imaging',
    category: 'Critical Care & Diagnostics',
    description: 'High-precision diagnostic imaging center equipped with 3.0 Tesla Silent MRI, 128-Slice Dual Source CT, 4D Ultrasound, and digital tomosynthesis mammography.',
    services: [
      '3.0 Tesla Silent Neuro & Whole-Body MRI',
      '128-Slice Low-Dose Dual Source Cardiac CT Angio',
      'High-Resolution 4D Ultrasound & Vascular Doppler',
      'Digital 3D Tomosynthesis Mammography & DEXA Bone Scan',
      'Digital Fluoroscopy & Low-Radiation Pediatric X-Ray',
      'Image-Guided Interventional Biopsies & Catheter Drainage'
    ],
    operatingHours: 'Mon - Sun: 24/7 Diagnostic Emergency Imaging',
    location: 'Diagnostic Imaging Center, Basement Level 1',
    headOfDepartment: 'Dr. Arvind Swaminathan',
    emergencySupport: true,
    phoneExtension: 'Ext. 4050',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  }
];

export const SEED_DOCTORS: Doctor[] = [
  // Cardiology
  {
    id: 'DOC-CARD-001',
    fullName: 'Dr. Ananya Mehta',
    departmentId: 'DEP-CARD',
    departmentName: 'Cardiology & Heart Institute',
    specialty: 'Interventional Cardiology',
    qualifications: ['MBBS', 'MD (Medicine)', 'DM (Cardiology)', 'FSCAI'],
    yearsOfExperience: 14,
    languages: ['English', 'Hindi', 'Gujarati'],
    consultationFee: 950,
    biography: 'Dr. Ananya Mehta is a senior interventional cardiologist with extensive expertise in complex coronary interventions, primary angioplasty, and structural heart therapies. She leads the Heart Institute at CareFlow.',
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (09:00 AM - 04:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-CARD-002',
    fullName: 'Dr. Arjun Rao',
    departmentId: 'DEP-CARD',
    departmentName: 'Cardiology & Heart Institute',
    specialty: 'Preventive & Non-Invasive Cardiology',
    qualifications: ['MBBS', 'MD (Gen Med)', 'DNB (Cardiology)'],
    yearsOfExperience: 10,
    languages: ['English', 'Hindi', 'Kannada'],
    consultationFee: 850,
    biography: 'Dr. Arjun Rao emphasizes proactive cardiovascular risk prevention, echocardiography, lipid disorder management, and personalized cardiac rehabilitation protocols.',
    profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Tuesday to Saturday (09:30 AM - 05:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Neurology
  {
    id: 'DOC-NEUR-001',
    fullName: 'Dr. Rajesh Kulkarni',
    departmentId: 'DEP-NEUR',
    departmentName: 'Neurology & Neurosurgery',
    specialty: 'Stroke & Vascular Neurology',
    qualifications: ['MBBS', 'MD', 'DM (Neurology)', 'FRCP (London)'],
    yearsOfExperience: 16,
    languages: ['English', 'Marathi', 'Hindi'],
    consultationFee: 1100,
    biography: 'Dr. Rajesh Kulkarni is head of Neurosciences, specializing in acute stroke thrombolysis, cerebral vascular health, and complex neuro-critical care with over 16 years of academic and clinical distinction.',
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Thursday (09:00 AM - 03:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-NEUR-002',
    fullName: 'Dr. Sneha Joshi',
    departmentId: 'DEP-NEUR',
    departmentName: 'Neurology & Neurosurgery',
    specialty: 'Epilepsy & Neuro-Electrophysiology',
    qualifications: ['MBBS', 'MD (Medicine)', 'DM (Neurology)'],
    yearsOfExperience: 11,
    languages: ['English', 'Hindi', 'Gujarati'],
    consultationFee: 950,
    biography: 'Dr. Sneha Joshi specializes in adult and pediatric epilepsy, long-term video EEG telemetry analysis, chronic migraines, and neuromuscular electrodiagnostic evaluations.',
    profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Tuesday to Saturday (10:00 AM - 04:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Orthopedics
  {
    id: 'DOC-ORTH-001',
    fullName: 'Dr. Karthik Iyer',
    departmentId: 'DEP-ORTH',
    departmentName: 'Orthopedics, Spine & Joint Replacement',
    specialty: 'Robotic Joint Replacement & Arthroplasty',
    qualifications: ['MBBS', 'MS (Orthopedics)', 'MCh (Ortho, UK)'],
    yearsOfExperience: 15,
    languages: ['English', 'Tamil', 'Hindi'],
    consultationFee: 1000,
    biography: 'Dr. Karthik Iyer is a renowned orthopedic surgeon with over 2,500 successful knee and hip joint replacements utilizing computer and robotic precision guidance.',
    profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (08:30 AM - 03:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-ORTH-002',
    fullName: 'Dr. Meera Nambiar',
    departmentId: 'DEP-ORTH',
    departmentName: 'Orthopedics, Spine & Joint Replacement',
    specialty: 'Sports Medicine & Arthroscopy',
    qualifications: ['MBBS', 'DNB (Orthopedics)', 'Fellowship in Sports Medicine'],
    yearsOfExperience: 8,
    languages: ['English', 'Malayalam', 'Hindi'],
    consultationFee: 850,
    biography: 'Dr. Meera Nambiar specializes in athletic ligament injuries (ACL/PCL tears, meniscus preservation) and rotator cuff shoulder repair with minimally invasive arthroscopy.',
    profileImage: 'https://images.unsplash.com/photo-1594824813631-526487e41fa8?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday, Wednesday, Friday (09:00 AM - 05:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Oncology
  {
    id: 'DOC-ONCO-001',
    fullName: 'Dr. Siddharth Sengupta',
    departmentId: 'DEP-ONCO',
    departmentName: 'Oncology & Comprehensive Cancer Care',
    specialty: 'Medical Oncology & Targeted Immunotherapy',
    qualifications: ['MBBS', 'MD (Gen Med)', 'DM (Medical Oncology)', 'ESMO Certified'],
    yearsOfExperience: 14,
    languages: ['English', 'Bengali', 'Hindi'],
    consultationFee: 1200,
    biography: 'Dr. Siddharth Sengupta is head of Oncology with international training in genomics, monoclonal antibodies, and targeted immunotherapy for solid tumors and hematological malignancies.',
    profileImage: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (09:30 AM - 04:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-ONCO-002',
    fullName: 'Dr. Kavita Narang',
    departmentId: 'DEP-ONCO',
    departmentName: 'Oncology & Comprehensive Cancer Care',
    specialty: 'Surgical Oncology & Breast Health',
    qualifications: ['MBBS', 'MS (Surgery)', 'MCh (Surgical Oncology)'],
    yearsOfExperience: 12,
    languages: ['English', 'Hindi', 'Punjabi'],
    consultationFee: 1100,
    biography: 'Dr. Kavita Narang focuses on oncoplastic breast conservation surgery, robotic abdominal cancer resections, and comprehensive post-surgical oncologic follow-up care.',
    profileImage: 'https://images.unsplash.com/photo-1594824813590-79883584852a?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Tuesday to Saturday (10:00 AM - 04:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Gastroenterology
  {
    id: 'DOC-GAST-001',
    fullName: 'Dr. Vivek Bhattacharya',
    departmentId: 'DEP-GAST',
    departmentName: 'Gastroenterology & Hepatobiliary Sciences',
    specialty: 'Medical Gastroenterology & Hepatology',
    qualifications: ['MBBS', 'MD', 'DM (Gastroenterology)'],
    yearsOfExperience: 15,
    languages: ['English', 'Bengali', 'Hindi'],
    consultationFee: 1000,
    biography: 'Dr. Vivek Bhattacharya is an expert in therapeutic endoscopy, ERCP, chronic hepatitis B/C eradication, fatty liver disease, and inflammatory bowel conditions.',
    profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (08:30 AM - 04:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-GAST-002',
    fullName: 'Dr. Neha Kapoor',
    departmentId: 'DEP-GAST',
    departmentName: 'Gastroenterology & Hepatobiliary Sciences',
    specialty: 'Laparoscopic GI & Bariatric Surgery',
    qualifications: ['MBBS', 'MS (Gen Surgery)', 'Fellowship in Minimal Access Surgery'],
    yearsOfExperience: 9,
    languages: ['English', 'Hindi', 'Punjabi'],
    consultationFee: 900,
    biography: 'Dr. Neha Kapoor specializes in minimally invasive laparoscopic gallbladder surgery, hernia mesh repair, colon surgery, and metabolic digestive health.',
    profileImage: 'https://images.unsplash.com/photo-1559839734-6e7922d56a00?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Tuesday to Saturday (09:00 AM - 05:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Nephrology
  {
    id: 'DOC-NEPH-001',
    fullName: 'Dr. Alok Chawla',
    departmentId: 'DEP-NEPH',
    departmentName: 'Nephrology, Urology & Dialysis',
    specialty: 'Nephrology & Renal Transplant',
    qualifications: ['MBBS', 'MD (Gen Med)', 'DM (Nephrology)'],
    yearsOfExperience: 16,
    languages: ['English', 'Hindi', 'Punjabi'],
    consultationFee: 1050,
    biography: 'Dr. Alok Chawla heads the Dialysis and Kidney Care Center, with extensive experience in renal transplantation, acute kidney injury, and refractory glomerulonephritis.',
    profileImage: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (08:30 AM - 03:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-NEPH-002',
    fullName: 'Dr. Sameer Siddiqui',
    departmentId: 'DEP-NEPH',
    departmentName: 'Nephrology, Urology & Dialysis',
    specialty: 'Urology & Endourology (Laser Lithotripsy)',
    qualifications: ['MBBS', 'MS (Surgery)', 'MCh (Urology)'],
    yearsOfExperience: 11,
    languages: ['English', 'Urdu', 'Hindi'],
    consultationFee: 950,
    biography: 'Dr. Sameer Siddiqui specializes in laser treatment for kidney stones (RIRS/PCNL), prostate enlargement surgery (TURP/HoLEP), and urological oncology.',
    profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Tuesday to Saturday (09:00 AM - 04:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Pulmonology
  {
    id: 'DOC-PULM-001',
    fullName: 'Dr. Vandana Saxena',
    departmentId: 'DEP-PULM',
    departmentName: 'Pulmonology, Allergy & Sleep Medicine',
    specialty: 'Pulmonology & Respiratory Medicine',
    qualifications: ['MBBS', 'MD (Pulmonary Medicine)', 'FCCP (USA)'],
    yearsOfExperience: 13,
    languages: ['English', 'Hindi'],
    consultationFee: 900,
    biography: 'Dr. Vandana Saxena specializes in severe adult asthma, chronic obstructive pulmonary disease (COPD), diagnostic bronchoscopy, and post-viral pulmonary fibrosis.',
    profileImage: 'https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (09:00 AM - 04:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-PULM-002',
    fullName: 'Dr. Manish Trivedi',
    departmentId: 'DEP-PULM',
    departmentName: 'Pulmonology, Allergy & Sleep Medicine',
    specialty: 'Sleep Medicine & Critical Care Pulmonology',
    qualifications: ['MBBS', 'DNB (Respiratory Diseases)', 'Fellowship in Sleep Disorders'],
    yearsOfExperience: 9,
    languages: ['English', 'Hindi', 'Gujarati'],
    consultationFee: 850,
    biography: 'Dr. Manish Trivedi directs the Sleep Study Center, treating obstructive sleep apnea, snoring disorders, chronic respiratory failure, and occupational lung illnesses.',
    profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Tuesday to Saturday (10:00 AM - 05:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Obstetrics & Gynecology
  {
    id: 'DOC-OBGY-001',
    fullName: 'Dr. Radhika Srinivasan',
    departmentId: 'DEP-OBGY',
    departmentName: 'Obstetrics, Gynecology & Women\'s Health',
    specialty: 'High-Risk Obstetrics & Maternal-Fetal Medicine',
    qualifications: ['MBBS', 'MS (OBG)', 'MRCOG (UK)', 'Fellowship in Fetal Medicine'],
    yearsOfExperience: 17,
    languages: ['English', 'Tamil', 'Hindi', 'Kannada'],
    consultationFee: 1000,
    biography: 'Dr. Radhika Srinivasan has guided over 4,000 successful safe childbirths, specializing in high-risk pregnancies, pre-eclampsia management, and maternal wellness.',
    profileImage: 'https://images.unsplash.com/photo-1594824813590-79883584852a?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (08:30 AM - 03:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-OBGY-002',
    fullName: 'Dr. Pooja Deshmukh',
    departmentId: 'DEP-OBGY',
    departmentName: 'Obstetrics, Gynecology & Women\'s Health',
    specialty: 'Laparoscopic Gynae Surgery & Fertility',
    qualifications: ['MBBS', 'DGO', 'DNB (OBG)', 'Fellowship in Gynae Endoscopy'],
    yearsOfExperience: 10,
    languages: ['English', 'Marathi', 'Hindi'],
    consultationFee: 850,
    biography: 'Dr. Pooja Deshmukh focuses on minimally invasive surgery for ovarian cysts, fibroids, endometriosis, as well as comprehensive infertility evaluation.',
    profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday, Wednesday, Friday, Saturday (09:30 AM - 04:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Pediatrics
  {
    id: 'DOC-PED-001',
    fullName: 'Dr. Sunita Deshmukh',
    departmentId: 'DEP-PED',
    departmentName: 'Pediatrics, Neonatology & Child Health',
    specialty: 'General Pediatrics & Neonatology',
    qualifications: ['MBBS', 'DCH', 'DNB (Pediatrics)'],
    yearsOfExperience: 14,
    languages: ['English', 'Marathi', 'Hindi'],
    consultationFee: 750,
    biography: 'Dr. Sunita Deshmukh is head of Pediatrics, providing nurturing healthcare from newborn feeding and developmental milestones to childhood infections and vaccinations.',
    profileImage: 'https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Saturday (09:00 AM - 03:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-PED-002',
    fullName: 'Dr. Rohan Kapoor',
    departmentId: 'DEP-PED',
    departmentName: 'Pediatrics, Neonatology & Child Health',
    specialty: 'Pediatric Pulmonology & Allergy',
    qualifications: ['MBBS', 'MD (Pediatrics)', 'Fellowship in Pediatric Pulmonology'],
    yearsOfExperience: 10,
    languages: ['English', 'Hindi', 'Punjabi'],
    consultationFee: 800,
    biography: 'Dr. Rohan Kapoor specializes in childhood respiratory conditions including persistent coughs, bronchial asthma, childhood sleep apnea, and environmental allergies.',
    profileImage: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Tuesday to Sunday (10:00 AM - 04:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Dermatology
  {
    id: 'DOC-DERM-001',
    fullName: 'Dr. Priya Nair',
    departmentId: 'DEP-DERM',
    departmentName: 'Dermatology, Aesthetics & Cosmetology',
    specialty: 'Clinical & Pediatric Dermatology',
    qualifications: ['MBBS', 'MD (DVL)'],
    yearsOfExperience: 12,
    languages: ['English', 'Malayalam', 'Hindi'],
    consultationFee: 800,
    biography: 'Dr. Priya Nair is chief of Dermatology, specializing in pediatric skin conditions, eczema, autoimmune bullous disorders, and advanced psoriasis phototherapy.',
    profileImage: 'https://images.unsplash.com/photo-1594824813590-79883584852a?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (10:00 AM - 04:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-DERM-002',
    fullName: 'Dr. Vikram Sen',
    departmentId: 'DEP-DERM',
    departmentName: 'Dermatology, Aesthetics & Cosmetology',
    specialty: 'Aesthetic & Laser Dermatology',
    qualifications: ['MBBS', 'DVD', 'Fellowship in Dermatosurgery'],
    yearsOfExperience: 9,
    languages: ['English', 'Bengali', 'Hindi'],
    consultationFee: 850,
    biography: 'Dr. Vikram Sen has extensive training in dermatosurgery, non-invasive laser therapy for scarring, pigmentation, and scientifically validated hair restoration.',
    profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday, Wednesday, Friday, Saturday (10:00 AM - 05:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // General Medicine
  {
    id: 'DOC-GEN-001',
    fullName: 'Dr. Farhan Ali',
    departmentId: 'DEP-GEN',
    departmentName: 'General Medicine, Diabetology & Endocrinology',
    specialty: 'Internal Medicine & Diabetology',
    qualifications: ['MBBS', 'MD (General Medicine)', 'Postgraduate Diploma in Diabetology'],
    yearsOfExperience: 17,
    languages: ['English', 'Urdu', 'Hindi'],
    consultationFee: 700,
    biography: 'Dr. Farhan Ali is head of Internal Medicine with expertise in metabolic syndrome, diabetic glycemic reversal, chronic fever workup, and adult preventative care.',
    profileImage: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (08:30 AM - 04:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-GEN-002',
    fullName: 'Dr. Shalini Verma',
    departmentId: 'DEP-GEN',
    departmentName: 'General Medicine, Diabetology & Endocrinology',
    specialty: 'Family Medicine & Geriatrics',
    qualifications: ['MBBS', 'DNB (Family Medicine)', 'Certification in Geriatric Care'],
    yearsOfExperience: 11,
    languages: ['English', 'Hindi'],
    consultationFee: 650,
    biography: 'Dr. Shalini Verma specializes in multi-generational family health, holistic geriatric evaluations, preventive checkups, and chronic disease coordination.',
    profileImage: 'https://images.unsplash.com/photo-1559839734-6e7922d56a00?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Saturday (09:00 AM - 05:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Emergency Medicine
  {
    id: 'DOC-EMER-001',
    fullName: 'Dr. Rajiv Menon',
    departmentId: 'DEP-EMER',
    departmentName: 'Emergency Medicine & Level 1 Trauma Center',
    specialty: 'Emergency Medicine & Acute Trauma Resuscitation',
    qualifications: ['MBBS', 'MD (Emergency Medicine)', 'FACEM (Hon)'],
    yearsOfExperience: 15,
    languages: ['English', 'Malayalam', 'Hindi'],
    consultationFee: 800,
    biography: 'Dr. Rajiv Menon is medical director of the Level 1 Trauma Center, leading resuscitation teams for cardiac arrest, severe polytrauma, strokes, and toxicological emergencies.',
    profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Rotational 24x7 Trauma Resuscitation Shifts',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-EMER-002',
    fullName: 'Dr. Tanvi Shah',
    departmentId: 'DEP-EMER',
    departmentName: 'Emergency Medicine & Level 1 Trauma Center',
    specialty: 'Critical Care & Acute Medical Emergency',
    qualifications: ['MBBS', 'MEM (Emergency Medicine)', 'Fellowship in Intensive Care'],
    yearsOfExperience: 9,
    languages: ['English', 'Gujarati', 'Hindi'],
    consultationFee: 750,
    biography: 'Dr. Tanvi Shah oversees acute medical emergency triage, pediatric resuscitations, point-of-care emergency ultrasound (POCUS), and critical airway interventions.',
    profileImage: 'https://images.unsplash.com/photo-1594824813631-526487e41fa8?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Rotational 24x7 Emergency Triage Shifts',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // ENT
  {
    id: 'DOC-ENT-001',
    fullName: 'Dr. Deepa Nair',
    departmentId: 'DEP-ENT',
    departmentName: 'ENT & Head-Neck Surgery',
    specialty: 'Otology & Endoscopic Sinus Surgery',
    qualifications: ['MBBS', 'MS (ENT)', 'DNB (Otolaryngology)'],
    yearsOfExperience: 13,
    languages: ['English', 'Malayalam', 'Hindi'],
    consultationFee: 850,
    biography: 'Dr. Deepa Nair is chief of ENT, specializing in microscopic ear reconstructive surgeries, balloon sinuplasty, endoscopic sinus surgery, and vertigo vestibular therapy.',
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (09:00 AM - 04:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-ENT-002',
    fullName: 'Dr. Harish Chandra',
    departmentId: 'DEP-ENT',
    departmentName: 'ENT & Head-Neck Surgery',
    specialty: 'Head-Neck Surgery & Voice Disorders',
    qualifications: ['MBBS', 'MS (Otolaryngology)', 'Fellowship in Head-Neck Oncology'],
    yearsOfExperience: 11,
    languages: ['English', 'Hindi', 'Kannada'],
    consultationFee: 800,
    biography: 'Dr. Harish Chandra focuses on thyroid and salivary gland surgery, vocal cord pathology, stroboscopy evaluations, and surgical treatments for obstructive sleep apnea.',
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Tuesday to Saturday (09:30 AM - 05:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Ophthalmology
  {
    id: 'DOC-EYE-001',
    fullName: 'Dr. Suresh Venkatesh',
    departmentId: 'DEP-EYE',
    departmentName: 'Ophthalmology & Vision Sciences',
    specialty: 'Cataract (MICS) & Refractive Surgery',
    qualifications: ['MBBS', 'MS (Ophthalmology)', 'FRCS (Glasgow)'],
    yearsOfExperience: 16,
    languages: ['English', 'Tamil', 'Hindi'],
    consultationFee: 900,
    biography: 'Dr. Suresh Venkatesh has performed over 5,000 sutureless micro-incision cataract surgeries with multifocal intraocular lens implants, alongside LASIK vision correction.',
    profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (08:30 AM - 03:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-EYE-002',
    fullName: 'Dr. Anita Banerjee',
    departmentId: 'DEP-EYE',
    departmentName: 'Ophthalmology & Vision Sciences',
    specialty: 'Glaucoma & Medical Retina',
    qualifications: ['MBBS', 'MD (Ophthalmology)', 'Fellowship in Glaucoma'],
    yearsOfExperience: 10,
    languages: ['English', 'Bengali', 'Hindi'],
    consultationFee: 850,
    biography: 'Dr. Anita Banerjee specializes in diabetic retinal laser management, macular degeneration injections, glaucoma laser trabeculoplasty, and pediatric amblyopia.',
    profileImage: 'https://images.unsplash.com/photo-1594824813590-79883584852a?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Tuesday to Saturday (09:00 AM - 04:30 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Psychiatry
  {
    id: 'DOC-PSYC-001',
    fullName: 'Dr. Nandini Roy',
    departmentId: 'DEP-PSYC',
    departmentName: 'Psychiatry & Behavioral Health',
    specialty: 'Adult Psychiatry & Psychotherapy',
    qualifications: ['MBBS', 'MD (Psychiatry)', 'MRCPsych (UK)'],
    yearsOfExperience: 14,
    languages: ['English', 'Bengali', 'Hindi'],
    consultationFee: 950,
    biography: 'Dr. Nandini Roy provides compassionate psychiatric treatment for clinical depression, panic anxiety, obsessive compulsive disorder (OCD), and chronic workplace stress.',
    profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (09:00 AM - 04:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-PSYC-002',
    fullName: 'Dr. Pradeep Mishra',
    departmentId: 'DEP-PSYC',
    departmentName: 'Psychiatry & Behavioral Health',
    specialty: 'Child & Adolescent Behavioral Health',
    qualifications: ['MBBS', 'DPM', 'DNB (Psychiatry)'],
    yearsOfExperience: 9,
    languages: ['English', 'Hindi'],
    consultationFee: 850,
    biography: 'Dr. Pradeep Mishra specializes in adolescent developmental emotional health, childhood ADHD assessments, sleep behavioral therapies, and family counseling.',
    profileImage: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Tuesday to Saturday (10:00 AM - 05:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },

  // Radiology
  {
    id: 'DOC-RAD-001',
    fullName: 'Dr. Arvind Swaminathan',
    departmentId: 'DEP-RAD',
    departmentName: 'Radiology & Diagnostic Imaging',
    specialty: 'Neuroradiology & Cross-Sectional Imaging (MRI/CT)',
    qualifications: ['MBBS', 'MD (Radiodiagnosis)', 'FICR'],
    yearsOfExperience: 15,
    languages: ['English', 'Tamil', 'Hindi'],
    consultationFee: 900,
    biography: 'Dr. Arvind Swaminathan directs Diagnostic Imaging, specializing in high-field 3T brain and spine MRI, stroke perfusion imaging, and advanced cardiac CT angiography.',
    profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Saturday (08:00 AM - 04:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'DOC-RAD-002',
    fullName: 'Dr. Geeta Pillai',
    departmentId: 'DEP-RAD',
    departmentName: 'Radiology & Diagnostic Imaging',
    specialty: 'Women\'s Imaging, Mammography & Interventional Ultrasound',
    qualifications: ['MBBS', 'DNB (Radio-Diagnosis)', 'Fellowship in Breast Imaging'],
    yearsOfExperience: 11,
    languages: ['English', 'Malayalam', 'Hindi'],
    consultationFee: 850,
    biography: 'Dr. Geeta Pillai specializes in 3D digital mammography, high-resolution obstetric and fetal doppler ultrasound, and ultrasound-guided biopsy interventions.',
    profileImage: 'https://images.unsplash.com/photo-1559839734-6e7922d56a00?auto=format&fit=crop&q=80&w=400',
    active: true,
    weeklySchedule: 'Monday to Friday (09:00 AM - 05:00 PM)',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  }
];

export const DEMO_PATIENT: Patient = {
  id: 'PAT-1001',
  authenticationUserId: 'auth-user-demo-pat-1001',
  fullName: 'Rahul Sharma',
  email: 'demo.patient@careflow.test',
  phone: '+91 90000 00001',
  dateOfBirth: '1995-06-15',
  gender: 'Male',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z'
};

// Generates at least 10 deterministic future slots per doctor starting from tomorrow
export function generateSeedSlots(): AvailabilitySlot[] {
  const slots: AvailabilitySlot[] = [];
  const baseDate = new Date('2026-09-12T00:00:00'); // starting tomorrow relative to current anchor
  
  const timeWindows = [
    { start: '09:00', end: '09:30' },
    { start: '09:30', end: '10:00' },
    { start: '10:00', end: '10:30' },
    { start: '10:30', end: '11:00' },
    { start: '11:00', end: '11:30' },
    { start: '14:00', end: '14:30' },
    { start: '14:30', end: '15:00' },
    { start: '15:00', end: '15:30' },
    { start: '15:30', end: '16:00' },
    { start: '16:00', end: '16:30' }
  ];

  SEED_DOCTORS.forEach((doctor) => {
    // Generate across 4 consecutive days (10 slots each day => 40 slots per doctor)
    for (let dayOffset = 1; dayOffset <= 4; dayOffset++) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + dayOffset);
      const dateStr = d.toISOString().split('T')[0];

      timeWindows.forEach((tw, idx) => {
        const slotId = `SLOT-${doctor.id}-${dateStr}-${idx + 1}`;
        slots.push({
          id: slotId,
          doctorId: doctor.id,
          date: dateStr,
          startTime: tw.start,
          endTime: tw.end,
          status: 'available',
          appointmentId: null,
          createdAt: '2026-09-11T00:00:00Z',
          updatedAt: '2026-09-11T00:00:00Z'
        });
      });
    }
  });

  return slots;
}

// Initial sample appointments
export function generateSampleAppointments(slots: AvailabilitySlot[]): { appointments: Appointment[]; updatedSlots: AvailabilitySlot[] } {
  const updatedSlots = [...slots];

  // Pick Dr. Ananya Mehta's first slot on Day 2 for Confirmed appointment
  const confirmedSlotIndex = updatedSlots.findIndex(s => s.doctorId === 'DOC-CARD-001' && s.status === 'available');
  let confirmedSlot = updatedSlots[confirmedSlotIndex];

  const confirmedApptId = 'APT-20260914-0001';
  if (confirmedSlot) {
    confirmedSlot = {
      ...confirmedSlot,
      status: 'reserved',
      appointmentId: confirmedApptId,
      updatedAt: '2026-09-11T00:00:00Z'
    };
    updatedSlots[confirmedSlotIndex] = confirmedSlot;
  }

  // Create a past slot for completed appointment
  const completedSlotId = 'SLOT-DOC-GEN-001-20260825-01';
  const completedApptId = 'APT-20260825-0002';

  const sampleAppointments: Appointment[] = [
    {
      id: confirmedApptId,
      patientId: DEMO_PATIENT.id,
      patientName: DEMO_PATIENT.fullName,
      patientEmail: DEMO_PATIENT.email,
      patientPhone: DEMO_PATIENT.phone,
      doctorId: 'DOC-CARD-001',
      doctorName: 'Dr. Ananya Mehta',
      departmentId: 'DEP-CARD',
      departmentName: 'Cardiology & Heart Institute',
      slotId: confirmedSlot ? confirmedSlot.id : 'SLOT-DOC-CARD-001-2026-09-14-1',
      appointmentDate: confirmedSlot ? confirmedSlot.date : '2026-09-14',
      startTime: confirmedSlot ? confirmedSlot.startTime : '09:00',
      endTime: confirmedSlot ? confirmedSlot.endTime : '09:30',
      reasonForVisit: 'Routine cardiac health review and baseline blood pressure check.',
      notes: 'Please bring recent lipid panel reports if available.',
      consultationFee: 950,
      status: 'confirmed',
      createdAt: '2026-09-10T10:00:00Z',
      updatedAt: '2026-09-10T10:00:00Z'
    },
    {
      id: completedApptId,
      patientId: DEMO_PATIENT.id,
      patientName: DEMO_PATIENT.fullName,
      patientEmail: DEMO_PATIENT.email,
      patientPhone: DEMO_PATIENT.phone,
      doctorId: 'DOC-GEN-001',
      doctorName: 'Dr. Farhan Ali',
      departmentId: 'DEP-GEN',
      departmentName: 'General Medicine, Diabetology & Endocrinology',
      slotId: completedSlotId,
      appointmentDate: '2026-08-25',
      startTime: '10:00',
      endTime: '10:30',
      reasonForVisit: 'Annual routine health checkup and diabetic screening review.',
      notes: 'Patient advised balanced diet and follow-up in 6 months.',
      consultationFee: 700,
      status: 'completed',
      createdAt: '2026-08-20T09:15:00Z',
      updatedAt: '2026-08-25T11:00:00Z'
    }
  ];

  return { appointments: sampleAppointments, updatedSlots };
}

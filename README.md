# CareFlow Hospital - Simulated Outpatient Appointment Management

> **Educational Project Notice**: CareFlow Hospital is a simulated hospital appointment website specifically designed for benchmarking, demonstrations, and browser automation by AI agents using **Playwright** and **Python LangGraph**. No real patient data or live medical services are used.

---

## 🏥 Project Overview

CareFlow Hospital provides a complete, accessible, deterministic outpatient appointment booking system featuring:
- **6 Medical Departments**: Cardiology, Dermatology, Neurology, Orthopedics, Pediatrics, General Medicine.
- **12 Certified Specialists**: Comprehensive doctor bios, consultation fees, languages, and slot calendars.
- **Deterministic Scheduling**: Multi-step booking wizard with explicit reviews, atomic transactions, and confirmation slips.
- **Lifecycle Management**: Patient portal to view upcoming/completed/cancelled appointments, atomic rescheduling, and confirmed cancellations with slot re-release.
- **Simulation Control**: Error simulation panel (`?simulate=slot-conflict`, `?simulate=db-error`, `?simulate=latency`) for AI agent error handling evaluation.
- **Persistence**: Hybrid Firebase Firestore with atomic transactions and an automated in-memory/LocalStorage fallback for zero-configuration preview.

---

## 🤖 Playwright & AI Agent Automation Reference

All key interactive components are annotated with stable `data-testid` attributes, explicit semantic HTML roles, and accessible labels for deterministic browser automation.

### Locator Cheatsheet

| Target Element | `data-testid` / Locator | Description |
| :--- | :--- | :--- |
| **Search Input** | `data-testid="doctor-search-input"` | Doctor name / specialty filter |
| **Department Filter** | `data-testid="department-filter"` | Dropdown filter for departments |
| **Specialty Filter** | `data-testid="specialty-filter"` | Dropdown filter for specialties |
| **Date Filter** | `data-testid="date-filter"` | Date input filter |
| **Language Filter** | `data-testid="language-filter"` | Dropdown filter for languages |
| **Clear Filters** | `data-testid="clear-doctor-filters"` | Reset all doctor filters |
| **Doctor Card** | `data-testid="doctor-card-{doctorId}"` | Doctor card in search results |
| **View Profile** | `data-testid="view-doctor-{doctorId}"` | Navigate to doctor profile |
| **Book Doctor** | `data-testid="book-doctor-{doctorId}"` | Start booking for doctor |
| **Doctor Profile** | `data-testid="doctor-profile"` | Main doctor profile wrapper |
| **Doctor Fee** | `data-testid="doctor-fee"` | Consultation fee display |
| **Availability Slots** | `data-testid="availability-slots"` | Container for available slots |
| **Slot Button** | `data-testid="slot-{slotId}"` | Specific slot button |
| **Start Booking** | `data-testid="start-booking"` | Button to proceed to booking |
| **Booking Form** | `data-testid="booking-form"` | Multi-step booking form |
| **Booking Dept** | `data-testid="booking-department"` | Select department in booking |
| **Booking Doctor** | `data-testid="booking-doctor"` | Select doctor in booking |
| **Booking Date** | `data-testid="booking-date"` | Select date in booking |
| **Booking Slot** | `data-testid="booking-slot-{slotId}"` | Select slot in booking |
| **Patient ID** | `data-testid="patient-id"` | Patient ID input |
| **Patient Name** | `data-testid="patient-name"` | Patient Name input |
| **Patient Email** | `data-testid="patient-email"` | Patient Email input |
| **Patient Phone** | `data-testid="patient-phone"` | Patient Phone input |
| **Reason for Visit** | `data-testid="reason-for-visit"` | Visit reason (max 500 chars) |
| **Appointment Notes**| `data-testid="appointment-notes"` | Additional notes input |
| **Next Step** | `data-testid="booking-next"` | Proceed to next booking step |
| **Back Step** | `data-testid="booking-back"` | Go back to previous step |
| **Review Step** | `data-testid="booking-review"` | Appointment review container |
| **Confirm Booking**| `data-testid="confirm-booking"` | Final booking confirmation |
| **Booking Error** | `data-testid="booking-error"` | Scheduling validation error alert |
| **Booking Success**| `data-testid="booking-success"` | Appointment confirmation page |
| **Appointment ID** | `data-testid="appointment-id"` | Generated appointment ID |
| **My Appointments**| `data-testid="my-appointments"` | Patient portal appointments view |
| **Status Filter** | `data-testid="appointment-status-filter"`| Filter appointments by status |
| **Reschedule Btn** | `data-testid="reschedule-{appointmentId}"`| Launch rescheduling flow |
| **Reschedule Date**| `data-testid="reschedule-date"` | New date picker |
| **Reschedule Slots**|`data-testid="reschedule-slots"` | Slots container |
| **Confirm Reschedule**|`data-testid="confirm-reschedule"`| Final reschedule button |
| **Reschedule Success**|`data-testid="reschedule-success"`| Reschedule success banner |
| **Cancel Button** | `data-testid="cancel-{appointmentId}"`| Launch cancellation flow |
| **Cancel Reason** | `data-testid="cancellation-reason"` | Reason select dropdown |
| **Cancel Checkbox**| `data-testid="cancel-confirmation-checkbox"`| Mandatory checkbox |
| **Confirm Cancel** | `data-testid="confirm-cancellation"`| Final "Confirm Cancellation" button |
| **Cancel Success** | `data-testid="cancel-success"` | Cancellation success banner |

---

## 🧪 AI Agent Scenario Recipes

### Scenario 1: Book Cardiology Consultation
1. Navigate to `/doctors`.
2. Select `Cardiology` in `data-testid="department-filter"`.
3. Locate card `data-testid="doctor-card-DOC-CARD-001"` (Dr. Ananya Mehta).
4. Click `data-testid="book-doctor-DOC-CARD-001"`.
5. Select a date and slot button `data-testid="booking-slot-..."`.
6. Enter patient details (`patient-name`, `patient-email`, `patient-phone`, `reason-for-visit`).
7. Click `data-testid="booking-next"` through Review.
8. Click `data-testid="confirm-booking"`.
9. Assert `data-testid="booking-success"` is visible and read `data-testid="appointment-id"`.

### Scenario 2: Error Simulation (Slot Conflict)
1. Navigate with URL param `?simulate=slot-conflict`.
2. Attempt to book any slot.
3. Observe and assert error in `data-testid="booking-error"`: `"This slot was just booked by another patient"`.

### Scenario 3: Reschedule Existing Appointment
1. Navigate to `/appointments`.
2. Locate `data-testid="appointment-card-{appointmentId}"`.
3. Click `data-testid="reschedule-{appointmentId}"`.
4. Pick a new date and click `data-testid="reschedule-slot-{slotId}"`.
5. Click `data-testid="confirm-reschedule"`.
6. Assert `data-testid="reschedule-success"` is displayed.

### Scenario 4: Safe Cancellation
1. Navigate to `/appointments`.
2. Click `data-testid="cancel-{appointmentId}"`.
3. Select a reason in `data-testid="cancellation-reason"`.
4. Click `data-testid="cancel-confirmation-checkbox"`.
5. Click `data-testid="confirm-cancellation"` (text: *"Confirm Cancellation"*).
6. Assert `data-testid="cancel-success"`.

---

## 🔑 Demo Credentials

- **Patient Email**: `demo.patient@careflow.test`
- **Password**: `DemoPatient123!`
- **Patient ID**: `PAT-1001`
- **Name**: `Rahul Sharma`

---

## 🚀 Environment Setup & Deployment

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

### Firebase Deployment
1. Copy `.env.example` to `.env` and fill your Firebase credentials if using live Firebase.
2. Deploy Firestore security rules:
```bash
firebase deploy --only firestore:rules
```
3. Deploy to Firebase Hosting:
```bash
firebase deploy --only hosting
```

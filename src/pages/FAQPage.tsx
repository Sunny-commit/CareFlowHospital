import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Stethoscope, PhoneCall, Calendar, CreditCard, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Scheduling',
      question: 'How do I book an appointment at CareFlow Hospital?',
      answer: 'Navigate to "Find a Doctor" or click "Book Appointment" from any department page. Select your department, preferred specialist doctor, consultation date, and available time slot. Enter your patient contact information and confirm the booking to generate your appointment confirmation slip.'
    },
    {
      category: 'Rescheduling & Cancellations',
      question: 'Can I reschedule or change my booked time slot?',
      answer: 'Yes. Visit the "My Appointments" portal and locate the confirmed appointment. Click "Reschedule", pick an alternative available date and slot with the same specialist doctor, and confirm. Your previous slot will be automatically released back to the schedule.'
    },
    {
      category: 'Rescheduling & Cancellations',
      question: 'How do I cancel an appointment?',
      answer: 'Go to "My Appointments", click "Cancel" next to the consultation, select a cancellation reason, check the acknowledgment checkbox, and click "Confirm Cancellation". Cancellation releases your slot immediately.'
    },
    {
      category: 'Consultation & Billing',
      question: 'How do I pay for my consultation?',
      answer: 'Consultation fees (typically ₹700 to ₹1,500 depending on the specialty) are payable directly at the hospital Outpatient Department (OPD) billing counter upon check-in. We accept UPI, debit/credit cards, and cash.'
    },
    {
      category: 'Hospital Visit',
      question: 'What documents should I bring for my outpatient consultation?',
      answer: 'Please bring a copy of your appointment confirmation reference ID (or digital screenshot), a valid government photo ID, and any relevant prior investigation reports, test results, or current medications.'
    },
    {
      category: 'Emergency Care',
      question: 'What should I do if I am experiencing a medical emergency?',
      answer: 'CareFlow Hospital appointment scheduling is strictly for non-emergency outpatient visits. If you or a loved one is experiencing chest pain, severe shortness of breath, sudden weakness, or trauma, please immediately call Emergency Services (112 / 108 / 911) or proceed directly to our 24/7 Emergency & Trauma Room.'
    },
    {
      category: 'Platform Context',
      question: 'Is CareFlow Hospital a real healthcare provider?',
      answer: 'No. CareFlow Hospital is a fictional educational demonstration platform created to demonstrate and evaluate browser automation with Playwright and Python LangGraph AI agents. All medical profiles and slots are simulated.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block text-amber-950 font-bold">Educational Simulation Notice</strong>
          <span>
            This portal is for educational testing and automated AI agent benchmarking. Do not use for real emergencies.
          </span>
        </div>
      </div>

      <div className="border-b border-slate-200 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-teal-700 text-sm font-semibold">
          <HelpCircle className="w-4 h-4" />
          <span>Patient Support Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 leading-relaxed text-sm">
          Find answers regarding our outpatient booking process, department hours, rescheduling terms, and hospital visit guidelines.
        </p>
      </div>

      {/* Accordion FAQ list */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    {faq.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
                </div>
                <div className="text-slate-400 p-1">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Support Footer Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-teal-50 border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 text-teal-950">
          <h4 className="font-bold text-base">Still have questions regarding your appointment?</h4>
          <p className="text-xs text-teal-800">
            Contact our central outpatient desk at <strong>+91 (011) 2659-4000</strong> or speak with a department coordinator.
          </p>
        </div>
        <Link
          to="/doctors"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition"
        >
          <span>Find a Doctor</span>
        </Link>
      </div>
    </div>
  );
};

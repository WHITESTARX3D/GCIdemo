// ————————————————— ADMISSIONS —————————————————
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone, UserCheck, Compass, CalendarDays, ClipboardCheck, PlayCircle,
  MessageCircle, Send, CheckCircle2, Sparkles, ShieldCheck, GraduationCap,
} from "lucide-react";
import { PageHero, SectionHeading, Reveal, RevealStagger, Btn } from "../components/ui";
import { COURSES } from "../data/courses";
import { SITE, waLink } from "../data/site";

const STEPS = [
  { icon: Phone, title: "Enquiry", text: "Form, call or WhatsApp — 2 minutes." },
  { icon: UserCheck, title: "Counselling", text: "Free 30-min session, goal mapping." },
  { icon: Compass, title: "Course Selection", text: "Right program & level for the target." },
  { icon: CalendarDays, title: "Batch Selection", text: "Timings that fit school & life." },
  { icon: ClipboardCheck, title: "Admission", text: "Simple paperwork + scholarship test." },
  { icon: PlayCircle, title: "Learning Begins", text: "Mentor assigned on day one." },
];

const CLASSES = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "Dropper (12th Pass)", "Graduate"];
const EXAMS = ["JEE Main + Advanced", "NEET-UG", "Boards (CBSE/ICSE)", "Olympiads / NTSE", "SSC", "Banking", "Railway / Other Govt", "Not sure yet"];
const BATCHES = ["Morning (7–9:30 AM)", "Day (10 AM–1 PM)", "Evening (4–7:30 PM)", "Weekend", "Online", "Counsellor's recommendation"];

export default function Admissions() {
  const [form, setForm] = useState({ student: "", parent: "", phone: "", klass: "", exam: "", course: "", batch: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const msg =
      `Hello Aarohan Academy! New admission enquiry:%0A` +
      `• Student: ${form.student || "—"}%0A` +
      `• Parent: ${form.parent || "—"}%0A` +
      `• Phone: ${form.phone || "—"}%0A` +
      `• Class: ${form.klass || "—"}%0A` +
      `• Target Exam: ${form.exam || "—"}%0A` +
      `• Course: ${form.course || "—"}%0A` +
      `• Preferred Batch: ${form.batch || "—"}%0A` +
      `• Message: ${form.message || "—"}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${msg}`, "_blank");
    setSent(true);
  };

  const inputCls = "field";

  return (
    <>
      <PageHero
        eyebrow="Admissions 2026–27"
        title={<>Take the first step <em className="text-gradient not-italic font-semibold">toward your goal</em></>}
        sub="A clear, pressure-free admission journey — from first enquiry to your first class, guided by a counsellor throughout."
      />

      {/* ——— Process ——— */}
      <section className="container-x">
        <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" gap={0.07}>
          {STEPS.map((s, i) => (
            <div key={s.title} data-rv className="relative">
              <div className="glass card-hover flex h-full flex-col items-center rounded-[1.5rem] px-4 py-7 text-center">
                <span className="font-display absolute right-4 top-3 text-2xl font-semibold text-indigo-100">0{i + 1}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_14px_30px_-10px_rgba(99,63,240,.6)]">
                  <s.icon size={20} strokeWidth={2.2} />
                </span>
                <p className="mt-4 font-display text-[1.02rem] font-semibold tracking-tight text-slate-900">{s.title}</p>
                <p className="mt-1.5 text-[0.78rem] leading-relaxed text-[color:var(--ink-2)]">{s.text}</p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ——— Form + side ——— */}
      <section className="container-x grid gap-10 pt-16 pb-24 lg:grid-cols-[1.15fr_0.85fr]">
        {/* form */}
        <Reveal variant="clip">
          <div className="glass-strong rounded-[2rem] p-6 sm:p-9">
            <span className="eyebrow">Enquiry Form</span>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-slate-900">Tell us about the student</h2>
            <p className="mt-2 text-[0.9rem] text-[color:var(--ink-2)]">A counsellor calls back within 2 working hours. Or finish instantly on WhatsApp.</p>

            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-9 rounded-3xl bg-emerald-50/80 p-8 text-center">
                <CheckCircle2 size={42} className="mx-auto text-emerald-500" />
                <h3 className="font-display mt-4 text-2xl font-semibold text-slate-900">Enquiry submitted!</h3>
                <p className="mx-auto mt-2 max-w-sm text-[0.92rem] leading-relaxed text-[color:var(--ink-2)]">
                  We've opened WhatsApp with your details pre-filled — just press send. Prefer a call? We'll ring you within 2 working hours.
                </p>
                <Btn variant="glass" className="mt-6" onClick={() => setSent(false)} arrow={false}>Submit another enquiry</Btn>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="flabel" htmlFor="adm-student">Student Name *</label>
                  <input id="adm-student" required value={form.student} onChange={set("student")} className={inputCls} placeholder="e.g. Ananya Sharma" />
                </div>
                <div>
                  <label className="flabel" htmlFor="adm-parent">Parent Name *</label>
                  <input id="adm-parent" required value={form.parent} onChange={set("parent")} className={inputCls} placeholder="e.g. Rajesh Sharma" />
                </div>
                <div>
                  <label className="flabel" htmlFor="adm-phone">Phone / WhatsApp *</label>
                  <input id="adm-phone" required type="tel" pattern="[0-9+ -]{10,}" value={form.phone} onChange={set("phone")} className={inputCls} placeholder="10-digit mobile number" />
                </div>
                <div>
                  <label className="flabel" htmlFor="adm-class">Class *</label>
                  <select id="adm-class" required value={form.klass} onChange={set("klass")} className={inputCls}>
                    <option value="" disabled>Select class</option>
                    {CLASSES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flabel" htmlFor="adm-exam">Target Exam *</label>
                  <select id="adm-exam" required value={form.exam} onChange={set("exam")} className={inputCls}>
                    <option value="" disabled>Select exam</option>
                    {EXAMS.map((x) => <option key={x}>{x}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flabel" htmlFor="adm-course">Course of Interest</label>
                  <select id="adm-course" value={form.course} onChange={set("course")} className={inputCls}>
                    <option value="" disabled>Select course</option>
                    {COURSES.map((c) => <option key={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flabel" htmlFor="adm-batch">Preferred Batch</label>
                  <select id="adm-batch" value={form.batch} onChange={set("batch")} className={inputCls}>
                    <option value="" disabled>Select timing</option>
                    {BATCHES.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="flabel" htmlFor="adm-msg">Message</label>
                  <input id="adm-msg" value={form.message} onChange={set("message")} className={inputCls} placeholder="Anything we should know?" />
                </div>
                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                  <button type="submit" className="btn btn-primary flex-1"><Send size={16} strokeWidth={2.4} /><span>Submit Enquiry</span></button>
                  <a
                    href={waLink("Hello! I'd like to book a free counselling session for admission. Please share available slots.")}
                    target="_blank" rel="noreferrer"
                    className="btn btn-wa flex-1"
                  >
                    <MessageCircle size={16} strokeWidth={2.4} /><span>WhatsApp Counselling</span>
                  </a>
                </div>
                <p className="text-center text-[0.74rem] font-semibold text-[color:var(--ink-3)] sm:col-span-2">
                  Submitting opens WhatsApp with your details pre-filled — nothing is stored on this demo site.
                </p>
              </form>
            )}
          </div>
        </Reveal>

        {/* side */}
        <div className="space-y-6">
          <Reveal variant="left" delay={0.05}>
            <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-7 text-white shadow-[0_30px_70px_-24px_rgba(99,63,240,.6)]">
              <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10" />
              <Sparkles size={28} className="text-amber-300" />
              <h3 className="font-display mt-4 text-[1.5rem] font-semibold leading-tight">Aarohan Scholarship Test</h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-indigo-100">
                Score in the top percentile bands and earn up to <span className="font-extrabold text-white">100% tuition scholarship</span>. Free for every enquiring student.
              </p>
              <p className="tnum mt-5 rounded-2xl bg-white/12 px-4 py-3 text-[0.84rem] font-extrabold">Next AST: Every Sunday · 10 AM</p>
            </div>
          </Reveal>

          <Reveal variant="left" delay={0.12}>
            <div className="glass rounded-[1.8rem] p-7">
              <h3 className="font-display text-[1.25rem] font-semibold tracking-tight text-slate-900">Why families choose Aarohan</h3>
              <ul className="mt-4 space-y-3.5">
                {[
                  [ShieldCheck, "Transparent fees — shared before you commit"],
                  [GraduationCap, "Free 3-day demo before admission"],
                  [UserCheck, "Mentor assigned on day one"],
                  [CalendarDays, "Batch-change flexibility within 15 days"],
                ].map(([Ic, t]) => (
                  <li key={t} className="flex items-start gap-3 text-[0.9rem] font-bold text-slate-800">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600"><Ic size={14} /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-indigo-100/70 pt-5">
                <p className="text-[0.8rem] font-bold text-[color:var(--ink-3)]">Prefer to talk first?</p>
                <a href={SITE.phoneHref} className="tnum mt-1 block font-display text-2xl font-semibold text-indigo-700">{SITE.phone}</a>
                <p className="text-[0.76rem] font-semibold text-[color:var(--ink-3)]">{SITE.hoursShort}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

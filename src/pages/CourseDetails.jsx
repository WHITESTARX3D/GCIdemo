// ————————————————— COURSE DETAILS —————————————————
import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronDown, Clock, CalendarDays, Signal, Users, Layers,
  CheckCircle2, MessageCircle, FileText, Download, Sparkles, Target, ClipboardList, BookMarked, CalendarClock, Lock,
} from "lucide-react";
import { SectionHeading, Btn, Reveal, RevealStagger, CTABand } from "../components/ui";
import { CourseCard, Avatar } from "../components/cards";
import { getCourse, COURSES } from "../data/courses";
import { FACULTY } from "../data/faculty";
import { waCourse } from "../data/site";

function Accordion({ modules }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {modules.map((m, i) => {
        const isOpen = open === i;
        return (
          <div key={m.m} className={`glass overflow-hidden rounded-2xl transition-shadow duration-300 ${isOpen ? "shadow-[0_20px_50px_-20px_rgba(23,32,84,.3)]" : ""}`}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="flex items-center gap-3.5">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[0.78rem] font-extrabold transition-colors ${isOpen ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white" : "bg-indigo-50 text-indigo-600"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[1.02rem] font-semibold tracking-tight text-slate-900">{m.m}</span>
              </span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-[color:var(--ink-3)]">
                <ChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ul className="grid gap-2 px-5 pb-5 pt-1 sm:grid-cols-2">
                    {m.topics.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-[0.86rem] font-semibold text-[color:var(--ink-2)]">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" /> {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function Block({ icon, title, sub, children, className = "" }) {
  return (
    <Reveal className={className}>
      <div className="mb-5 flex items-center gap-3.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600">{icon}</span>
        <div>
          <h2 className="font-display text-[1.45rem] font-semibold tracking-tight text-slate-900">{title}</h2>
          {sub && <p className="text-[0.82rem] font-semibold text-[color:var(--ink-3)]">{sub}</p>}
        </div>
      </div>
      {children}
    </Reveal>
  );
}

export default function CourseDetails() {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  if (!course) return <Navigate to="/courses" replace />;

  const teachers = course.faculty.map((id) => FACULTY.find((f) => f.id === id)).filter(Boolean);
  const related = COURSES.filter((c) => c.category === course.category && c.id !== course.id).slice(0, 3);
  const meta = [
    [Clock, "Duration", course.duration],
    [CalendarDays, "Classes", course.classes],
    [Layers, "Batch", course.batch],
    [Users, "For", course.audience],
    [Signal, "Level", course.level],
    [CalendarClock, "Next Batch", course.startDate],
  ];

  return (
    <>
      {/* ——— HERO ——— */}
      <section className="container-x pt-32 sm:pt-40">
        <Reveal variant="clip">
          <div className="relative overflow-hidden rounded-[2.2rem]">
            <img src={course.img} alt={course.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1230]/95 via-[#0c1230]/60 to-[#0c1230]/25" />
            <div className="relative px-6 pb-8 pt-24 sm:px-10 sm:pb-10 sm:pt-32 lg:pt-36">
              <nav className="flex flex-wrap items-center gap-1.5 text-[0.72rem] font-extrabold uppercase tracking-wider text-indigo-200/70">
                <Link to="/courses" className="transition-colors hover:text-white">Courses</Link>
                <ChevronRight size={12} />
                <span>{course.categoryLabel}</span>
              </nav>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="glass-chip px-3.5 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-wider text-indigo-700">{course.exam}</span>
                {course.badge && <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3.5 py-1.5 text-[0.72rem] font-extrabold uppercase tracking-wider text-white shadow-lg">{course.badge}</span>}
              </div>
              <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
                {course.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-indigo-100/85">{course.short}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={waCourse(course.title)} target="_blank" rel="noreferrer" className="btn btn-wa"><MessageCircle size={17} strokeWidth={2.4} /><span>Get Fee &amp; Batch Details</span></a>
                <Btn to="/admissions" variant="glass" arrow className="!bg-white/95">Book Free Counselling</Btn>
              </div>
            </div>
          </div>
        </Reveal>

        {/* meta strip */}
        <RevealStagger className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6" gap={0.06}>
          {meta.map(([IconC, l, v]) => (
            <div key={l} data-rv className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5">
              <IconC size={17} className="shrink-0 text-indigo-600" />
              <div className="min-w-0">
                <p className="text-[0.6rem] font-extrabold uppercase tracking-wider text-[color:var(--ink-3)]">{l}</p>
                <p className="truncate text-[0.82rem] font-extrabold text-slate-900">{v}</p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* ——— BODY ——— */}
      <section className="container-x mt-14 grid gap-12 pb-24 lg:grid-cols-[1fr_21rem] lg:gap-10">
        <div className="space-y-14">
          {/* Overview */}
          <Block icon={<Target size={20} />} title="Course Overview" sub="What this program guarantees">
            <p className="text-[0.98rem] leading-relaxed text-[color:var(--ink-2)]">{course.short} Every element below is included — no add-ons, no hidden layers.</p>
            <RevealStagger className="mt-5 grid gap-2.5 sm:grid-cols-2" gap={0.05}>
              {course.highlights.map((h) => (
                <div key={h} data-rv className="glass-soft flex items-center gap-3 rounded-2xl px-4 py-3">
                  <CheckCircle2 size={17} className="shrink-0 text-emerald-500" />
                  <span className="text-[0.88rem] font-bold text-slate-900">{h}</span>
                </div>
              ))}
            </RevealStagger>
          </Block>

          {/* Syllabus */}
          <Block icon={<BookMarked size={20} />} title="Complete Syllabus" sub="Expand each module to see the chapter map">
            <Accordion modules={course.syllabus} />
          </Block>

          {/* Subjects */}
          <Block icon={<Layers size={20} />} title="Subjects Covered">
            <RevealStagger className="flex flex-wrap gap-2.5" gap={0.05}>
              {course.subjects.map((s) => (
                <span key={s} data-rv className="glass-chip card-hover cursor-default px-5 py-2.5 text-[0.86rem] font-extrabold text-slate-800">{s}</span>
              ))}
            </RevealStagger>
          </Block>

          {/* Method */}
          <Block icon={<Sparkles size={20} />} title="How You'll Learn" sub="The same 6-step loop, every week">
            <RevealStagger className="grid gap-3 sm:grid-cols-2" gap={0.06}>
              {course.method.map((m, i) => (
                <div key={m} data-rv className="glass flex items-center gap-3.5 rounded-2xl px-4 py-3.5">
                  <span className="font-display text-lg font-semibold text-indigo-300">0{i + 1}</span>
                  <span className="text-[0.87rem] font-bold text-slate-900">{m}</span>
                </div>
              ))}
            </RevealStagger>
          </Block>

          {/* Test series */}
          <Block icon={<ClipboardList size={20} />} title="Test Series" sub="Included with the course">
            <div className="glass grid gap-x-4 gap-y-5 rounded-[1.6rem] p-6 sm:grid-cols-2 sm:p-7">
              {[
                ["Total Tests", course.testSeries.count],
                ["Frequency", course.testSeries.frequency],
                ["Difficulty", course.testSeries.difficulty],
                ["Analysis System", course.testSeries.analysis],
              ].map(([l, v]) => (
                <div key={l} className="border-l-2 border-indigo-200 pl-4">
                  <p className="text-[0.66rem] font-extrabold uppercase tracking-[0.16em] text-[color:var(--ink-3)]">{l}</p>
                  <p className="mt-1 text-[0.92rem] font-bold leading-snug text-slate-900">{v}</p>
                </div>
              ))}
            </div>
          </Block>

          {/* Materials */}
          <Block icon={<FileText size={20} />} title="Study Material Included">
            <ul className="space-y-2.5">
              {course.materials.map((m) => (
                <li key={m} className="glass-soft flex items-center justify-between gap-4 rounded-2xl px-4 py-3.5">
                  <span className="flex items-center gap-3 text-[0.88rem] font-bold text-slate-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><BookMarked size={14} /></span>{m}
                  </span>
                  <Download size={15} className="shrink-0 text-[color:var(--ink-3)]" />
                </li>
              ))}
            </ul>
          </Block>

          {/* Schedule */}
          <Block icon={<CalendarClock size={20} />} title="Weekly Batch Schedule">
            <div className="space-y-2.5">
              {course.schedule.map((s) => (
                <div key={s.days + s.time} className="glass grid gap-1 rounded-2xl px-5 py-4 sm:grid-cols-[10rem_10rem_1fr] sm:items-center sm:gap-4">
                  <p className="text-[0.88rem] font-extrabold text-slate-900">{s.days}</p>
                  <p className="tnum text-[0.84rem] font-bold text-indigo-700">{s.time}</p>
                  <p className="text-[0.84rem] font-semibold text-[color:var(--ink-2)]">{s.detail}</p>
                </div>
              ))}
            </div>
          </Block>
        </div>

        {/* ——— ASIDE ——— */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {/* Fee card */}
          <Reveal variant="clip">
            <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-6 text-white shadow-[0_30px_70px_-24px_rgba(99,63,240,.6)] sm:p-7">
              <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10" />
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15"><Lock size={17} /></span>
              <h3 className="font-display mt-4 text-[1.4rem] font-semibold tracking-tight">Fee &amp; Admission Details</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-indigo-100">
                We share fees personally during counselling — based on batch, scholarship test score and payment plan. Ask us directly; it takes 2 minutes.
              </p>
              <div className="mt-5 space-y-2.5">
                <a href={waCourse(course.title)} target="_blank" rel="noreferrer" className="btn w-full !bg-white !text-indigo-700 shadow-lg"><MessageCircle size={16} strokeWidth={2.4} /><span>WhatsApp the Counsellor</span></a>
                <Btn to="/admissions" variant="glass" arrow className="w-full !border-white/40 !bg-white/10 !text-white">Apply for Admission</Btn>
              </div>
              <p className="mt-4 text-center text-[0.72rem] font-bold text-indigo-200/80">Scholarships up to 100% via AST (Aarohan Scholarship Test)</p>
            </div>
          </Reveal>

          {/* Faculty */}
          <Reveal>
            <div className="glass rounded-[1.8rem] p-6">
              <h3 className="font-display text-[1.15rem] font-semibold tracking-tight text-slate-900">Your Teachers</h3>
              <div className="mt-4 space-y-4">
                {teachers.map((t) => (
                  <Link to="/faculty" key={t.id} className="group flex items-center gap-3.5">
                    <img src={t.img} alt={t.name} loading="lazy" className="h-12 w-12 rounded-2xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105" />
                    <div className="min-w-0">
                      <p className="truncate text-[0.9rem] font-extrabold text-slate-900 group-hover:text-indigo-700">{t.name}</p>
                      <p className="truncate text-[0.74rem] font-bold text-[color:var(--ink-3)]">{t.subject} · {t.qualification}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </aside>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-x pb-24">
          <SectionHeading center={false} eyebrow="Keep Exploring" title={<>Similar programs</>} />
          <RevealStagger className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {related.map((c) => <div key={c.id} data-rv><CourseCard course={c} /></div>)}
          </RevealStagger>
        </section>
      )}

      <CTABand title="Still deciding? Book a Free Counselling Session" sub="Tell us your target — we'll recommend the exact course, batch and study plan, honestly." />
    </>
  );
}

// ————————————————— Reusable content cards —————————————————
import { Link } from "react-router-dom";
import { ArrowRight, Clock, CalendarDays, Star, Quote, MessageCircle, Users, Signal, BadgeCheck } from "lucide-react";
import { waCourse } from "../data/site";
import { FACULTY } from "../data/faculty";
import { Counter } from "./Reveal";
import { Icon } from "./ui";

const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export function Avatar({ name, className = "" }) {
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 font-extrabold text-white ${className}`}>
      {initials(name)}
    </div>
  );
}

// ————— Course card —————
export function CourseCard({ course, ...rest }) {
  const teachers = course.faculty.map((id) => FACULTY.find((f) => f.id === id)).filter(Boolean);
  return (
    <article className="glass card-hover group flex h-full flex-col overflow-hidden rounded-[1.6rem]" {...rest}>
      <div className="relative h-44 overflow-hidden">
        <img
          src={course.img}
          alt={course.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1230]/70 via-[#0c1230]/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="glass-chip px-3 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-indigo-700">{course.exam}</span>
          {course.badge && (
            <span className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-white shadow-lg">{course.badge}</span>
          )}
        </div>
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between">
          <span className="glass-chip px-3 py-1 text-[0.72rem] font-bold text-slate-700">{course.categoryLabel}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-[1.3rem] font-semibold leading-snug tracking-tight text-slate-900">{course.title}</h3>
        <p className="mt-2 line-clamp-2 text-[0.88rem] leading-relaxed text-[color:var(--ink-2)]">{course.short}</p>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-[0.78rem] font-bold text-[color:var(--ink-2)]">
          <span className="flex items-center gap-1.5"><Clock size={13} className="text-indigo-500" />{course.duration}</span>
          <span className="flex items-center gap-1.5"><CalendarDays size={13} className="text-indigo-500" />{course.classes}</span>
          <span className="flex items-center gap-1.5"><Users size={13} className="text-indigo-500" />{course.audience}</span>
          <span className="flex items-center gap-1.5"><Signal size={13} className="text-indigo-500" />{course.level}</span>
        </div>

        {teachers.length > 0 && (
          <div className="mt-4 flex items-center gap-2.5 border-t border-indigo-100/70 pt-4">
            <div className="flex -space-x-2.5">
              {teachers.slice(0, 3).map((t) => (
                <img key={t.id} src={t.img} alt={t.name} loading="lazy" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <span className="text-[0.74rem] font-bold text-[color:var(--ink-3)]">{teachers[0].name}{teachers.length > 1 ? ` +${teachers.length - 1} more` : ""}</span>
          </div>
        )}

        <div className="mt-5 flex gap-2.5 pt-1">
          <Link to={`/courses/${course.id}`} className="btn btn-dark btn-sm flex-1"><span>View Course</span><ArrowRight size={14} className="arr" /></Link>
          <a
            href={waCourse(course.title)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Enquire about ${course.title} on WhatsApp`}
            className="btn btn-wa btn-sm !px-3.5"
          >
            <MessageCircle size={15} strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </article>
  );
}

// ————— Testimonial card —————
export function TestimonialCard({ t }) {
  return (
    <article className="glass sheen flex h-full flex-col rounded-[1.6rem] p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600">
          <Quote size={18} strokeWidth={2.4} />
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
      <p className="mt-5 flex-1 text-[0.94rem] leading-relaxed text-[color:var(--ink-2)]">“{t.text}”</p>
      <div className="mt-6 flex items-center gap-3.5 border-t border-indigo-100/70 pt-5">
        <Avatar name={t.name} className="h-11 w-11 text-[0.82rem]" />
        <div className="min-w-0">
          <p className="truncate font-display text-[1.02rem] font-semibold tracking-tight text-slate-900">{t.name}</p>
          <p className="truncate text-[0.74rem] font-bold text-indigo-600">{t.course}</p>
          <p className="truncate text-[0.72rem] font-semibold text-[color:var(--ink-3)]">{t.exam}</p>
        </div>
      </div>
    </article>
  );
}

// ————— Trust stat card —————
export function StatCard({ icon, value, suffix, label, dark = false }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 rounded-3xl px-4 py-6 text-center ${dark ? "glass-dark" : "glass"}`}>
      {icon && <span className={`mb-1 flex h-10 w-10 items-center justify-center rounded-2xl ${dark ? "bg-white/10 text-indigo-200" : "bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600"}`}>
        <Icon name={icon} size={18} strokeWidth={2.4} />
      </span>}
      <Counter to={value} suffix={suffix} className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-slate-900"}`} />
      <span className={`text-[0.74rem] font-extrabold uppercase tracking-[0.14em] ${dark ? "text-indigo-200/60" : "text-[color:var(--ink-3)]"}`}>{label}</span>
    </div>
  );
}

// ————— Topper card —————
export function TopperCard({ t, ...rest }) {
  return (
    <article className="glass card-hover relative overflow-hidden rounded-[1.5rem] p-5 sm:p-6" {...rest}>
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,.14),transparent_70%)]" />
      <div className="flex items-start justify-between gap-3">
        <Avatar name={t.name} className="h-12 w-12 text-[0.9rem]" />
        <span className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-1.5 text-[0.72rem] font-extrabold tracking-wide text-white shadow-[0_10px_24px_-8px_rgba(99,63,240,.6)]">{t.rank}</span>
      </div>
      <h3 className="font-display mt-4 text-[1.25rem] font-semibold tracking-tight text-slate-900">{t.name}</h3>
      <p className="mt-1 flex items-center gap-1.5 text-[0.8rem] font-bold text-indigo-600"><BadgeCheck size={14} />{t.exam} · {t.year}</p>
      <div className="mt-4 space-y-1.5 border-t border-indigo-100/70 pt-4 text-[0.8rem] font-semibold text-[color:var(--ink-2)]">
        <p className="flex justify-between"><span className="text-[color:var(--ink-3)]">Score</span><span className="tnum">{t.score}</span></p>
        <p className="flex justify-between gap-2"><span className="text-[color:var(--ink-3)]">Course</span><span className="text-right">{t.course}</span></p>
        {t.college && <p className="flex justify-between gap-2"><span className="text-[color:var(--ink-3)]">Joined</span><span className="text-right font-bold text-slate-900">{t.college}</span></p>}
      </div>
    </article>
  );
}

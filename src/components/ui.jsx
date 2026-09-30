// ————————————————— Glass UI primitives —————————————————
import { Link } from "react-router-dom";
import {
  ArrowRight, Award, Users, GraduationCap, Heart, Trophy, BookOpen, Cog,
  HeartPulse, Landmark, Rocket, LayoutList, ClipboardCheck, UserCheck,
  MessageCircleQuestion, LineChart, BookMarked, Users2, Lightbulb, PenLine,
  Timer, RefreshCcw, FileBarChart, CalendarCheck, ClipboardList, NotebookPen,
  ShieldCheck, MessagesSquare,
} from "lucide-react";
import { Reveal, RevealStagger } from "./Reveal";

export const ICONS = {
  Award, Users, GraduationCap, Heart, Trophy, BookOpen, Cog, HeartPulse,
  Landmark, Rocket, LayoutList, ClipboardCheck, UserCheck, MessageCircleQuestion,
  LineChart, BookMarked, Users2, Lightbulb, PenLine, Timer, RefreshCcw,
  FileBarChart, CalendarCheck, ClipboardList, NotebookPen, ShieldCheck, MessagesSquare,
};

export const Icon = ({ name, ...props }) => {
  const Cmp = ICONS[name] || BookOpen;
  return <Cmp {...props} />;
};

// ————— Buttons —————
const btnVariant = {
  primary: "btn btn-primary",
  glass: "btn btn-glass",
  dark: "btn btn-dark",
  wa: "btn btn-wa",
};

export function Btn({ to, href, variant = "primary", small, arrow = true, icon: LeadIcon, children, className = "", ...rest }) {
  const cls = `${btnVariant[variant]} ${small ? "btn-sm" : ""} ${className}`;
  const inner = (
    <>
      {LeadIcon && <LeadIcon size={small ? 15 : 17} strokeWidth={2.4} />}
      <span>{children}</span>
      {arrow && <ArrowRight size={small ? 15 : 17} strokeWidth={2.4} className="arr" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls} {...rest}>{inner}</a>;
  return <button className={cls} {...rest}>{inner}</button>;
}

// ————— Chip —————
export function Chip({ icon: ChipIcon, children, className = "" }) {
  return (
    <span className={`glass-chip inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[0.78rem] font-bold text-[color:var(--ink-2)] ${className}`}>
      {ChipIcon && <ChipIcon size={13} className="text-indigo-600" strokeWidth={2.6} />}
      {children}
    </span>
  );
}

// ————— Section heading —————
export function SectionHeading({ eyebrow, title, sub, center = true, className = "" }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className="h-display mt-4 text-[2.1rem] leading-[1.06] sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[color:var(--ink-2)] sm:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

// ————— Inner page hero —————
export function PageHero({ eyebrow, title, sub, children }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-16">
      <div className="glass-orb anim-a hidden lg:block" style={{ width: 130, height: 130, top: "18%", right: "7%" }} />
      <div className="glass-orb anim-b hidden lg:block" style={{ width: 70, height: 70, top: "60%", right: "20%", animationDuration: "30s" }} />
      <div className="container-x relative">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="h-display mt-5 max-w-3xl text-[2.6rem] sm:text-6xl lg:text-[4.2rem]">{title}</h1>
        </Reveal>
        {sub && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-[color:var(--ink-2)] sm:text-lg">{sub}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.22}><div className="mt-7 flex flex-wrap gap-3">{children}</div></Reveal>}
      </div>
    </section>
  );
}

// ————— Conversion band (reused across pages) —————
export function CTABand({ title = "Book a Free Counselling Session", sub = "A 30-minute conversation with our academic counsellor — course fit, batch plan, and an honest roadmap. No pressure, no obligation." }) {
  return (
    <section className="container-x pb-24 pt-6">
      <Reveal variant="clip">
        <div className="glass-strong sheen relative overflow-hidden rounded-[2.2rem] px-7 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,.18),transparent_65%)]" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,.16),transparent_65%)]" />
          <span className="eyebrow justify-center">Admissions Open 2026–27</span>
          <h2 className="h-display mx-auto mt-4 max-w-2xl text-3xl sm:text-5xl">
            {title.split("Counselling")[0]}
            {title.includes("Counselling") ? <em className="text-gradient not-italic font-semibold">Counselling Session</em> : null}
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-[color:var(--ink-2)]">{sub}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Btn to="/admissions" className="w-full sm:w-auto">Begin Admission</Btn>
            <Btn to="/courses" variant="glass" className="w-full sm:w-auto">Explore Courses</Btn>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ————— Icon bullet tile —————
export function IconTile({ name, gradient = "from-indigo-500 to-violet-600", size = 46 }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-[0_12px_28px_-10px_rgba(99,63,240,.55)]`}
      style={{ width: size, height: size }}
    >
      <Icon name={name} size={size * 0.44} strokeWidth={2.2} />
    </div>
  );
}

export { Reveal, RevealStagger };
export { Counter, reducedMotion } from "./Reveal";

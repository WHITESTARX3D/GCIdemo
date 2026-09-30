// ————————————————— HOME —————————————————
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Flame, TrendingUp, Users, GraduationCap, ClipboardList, BookOpen, UserCheck,
  ChevronDown, Star, CalendarClock, ArrowRight, Sparkles, Target, ShieldCheck,
  Trophy, CheckCircle2, Timer,
} from "lucide-react";
import { gsap, ScrollTrigger, Reveal, RevealStagger, Counter, reducedMotion } from "../components/Reveal";
import { Btn, Chip, SectionHeading, Icon, IconTile, CTABand } from "../components/ui";
import { CourseCard, TestimonialCard, Avatar } from "../components/cards";
import SampleTestModal from "../components/SampleTest";
import { TRUST_STATS, EXAM_CATEGORIES, WHY_US, LEARNING_STEPS, PARENT_POINTS, WA_GENERIC } from "../data/site";
import { COURSES } from "../data/courses";
import { STUDENT_TESTIMONIALS } from "../data/testimonials";

// ————— Word with overflow mask for headline reveal —————
const W = ({ children, className = "" }) => (
  <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
    <span className={`hw inline-block will-change-transform ${className}`}>{children}</span>
  </span>
);

// ————— Floating glass chip —————
const FloatChip = ({ icon: ChipIcon, label, sub, className = "", delay = 0, dur = 5 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: [0, -11, 0] }}
    transition={{
      opacity: { delay, duration: 0.6 },
      scale: { delay, type: "spring", stiffness: 200, damping: 16 },
      y: { delay: delay + 0.4, duration: dur, repeat: Infinity, ease: "easeInOut" },
    }}
    className={`glass-chip absolute z-20 hidden items-center gap-2.5 px-4 py-2.5 md:flex ${className}`}
  >
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md">
      <ChipIcon size={14} strokeWidth={2.4} />
    </span>
    <span>
      <span className="block text-[0.8rem] font-extrabold leading-tight text-slate-900">{label}</span>
      {sub && <span className="block text-[0.64rem] font-bold leading-tight text-[color:var(--ink-3)]">{sub}</span>}
    </span>
  </motion.div>
);

// ————— SVG progress ring —————
function Ring({ value, label, display, gradId, size = 118, delay = 0 }) {
  const r = 48;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e5" /><stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="9" className="ring-track" />
        <motion.circle
          cx="60" cy="60" r={r} fill="none" strokeWidth="9" stroke={`url(#${gradId})`} strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: reducedMotion() ? 0 : 0.9 + delay }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display tnum text-[1.35rem] font-semibold leading-none text-slate-900">{display}</span>
        <span className="mt-1 max-w-[5.5rem] text-[0.58rem] font-extrabold uppercase leading-tight tracking-[0.12em] text-[color:var(--ink-3)]">{label}</span>
      </div>
    </div>
  );
}

// ————————————————— HERO —————————————————
function Hero({ onStartTest }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-chip", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .fromTo(".hw", { yPercent: 112 }, { yPercent: 0, duration: 1.05, stagger: 0.07, ease: "power4.out" }, 0.25)
        .fromTo(".hero-sub", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8 }, 0.85)
        .fromTo(".hero-cta > *", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, 1)
        .fromTo(".hero-trust", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 1.15)
        .fromTo(".hero-dash", { opacity: 0, y: 60, rotateX: 14 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.3, ease: "power4.out", transformPerspective: 900 }, 0.55)
        .fromTo(".sub-bar", { width: 0 }, { width: (i, el) => el.dataset.w, duration: 1.2, stagger: 0.12, ease: "power2.out" }, 1.3);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8">
          {/* ——— Copy ——— */}
          <div className="relative z-10 text-center lg:text-left">
            <div className="hero-chip">
              <Chip icon={Sparkles} className="!py-2">
                Admissions Open · Batch 2026–27
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              </Chip>
            </div>

            <h1 className="h-display mt-7 text-[2.9rem] sm:text-6xl lg:text-[4.3rem] xl:text-[4.9rem]">
              <W>Prepare</W> <W>Today.</W>
              <br />
              <W className="text-gradient italic font-semibold">Perform</W> <W className="italic">Tomorrow.</W>
            </h1>

            <p className="hero-sub mx-auto mt-6 max-w-xl text-[1.02rem] leading-relaxed text-[color:var(--ink-2)] sm:text-lg lg:mx-0">
              Structured preparation, expert mentorship and proven learning systems for boards,
              JEE, NEET, Olympiads and government exams — in one academy.
            </p>

            <div className="hero-cta mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Btn to="/courses" className="w-full sm:w-auto">Explore Courses</Btn>
              <Btn href={WA_GENERIC} variant="wa" icon={undefined} arrow={false} className="w-full sm:w-auto">
                <span className="flex items-center gap-2">Talk to a Counsellor</span>
              </Btn>
              <Link to="/results" className="link-underline text-[0.92rem] font-extrabold text-indigo-700">
                View Results →
              </Link>
            </div>

            <div className="hero-trust mt-9 flex items-center justify-center gap-4 lg:justify-start">
              <div className="flex -space-x-3">
                {["Aarav Khanna", "Sana Mirza", "Ishita Verma", "Kabir Sethi"].map((n) => (
                  <Avatar key={n} name={n} className="h-9 w-9 border-2 border-white text-[0.62rem]" />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-amber-400 text-amber-400" />)}
                  <span className="tnum ml-1 text-[0.8rem] font-extrabold text-slate-900">4.9</span>
                </div>
                <p className="text-[0.78rem] font-bold text-[color:var(--ink-2)]">Trusted by <span className="tnum">5,000+</span> students & parents</p>
              </div>
            </div>
          </div>

          {/* ——— Interactive dashboard ——— */}
          <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/40" style={{ animation: "spin-slow 38s linear infinite", borderStyle: "dashed" }} />

            <FloatChip icon={Users} label="1,000+ Students" sub="learning right now" className="-left-2 top-6 lg:-left-8" delay={1.3} dur={5.5} />
            <FloatChip icon={GraduationCap} label="Expert Faculty" sub="IIT · AIIMS alumni" className="-right-2 top-24 lg:-right-6" delay={1.5} dur={6.5} />
            <FloatChip icon={ClipboardList} label="Weekly Tests" sub="with rank analytics" className="-left-4 bottom-24 lg:-left-10" delay={1.7} dur={6} />
            <FloatChip icon={UserCheck} label="Personal Mentorship" sub="1 mentor per 25 students" className="-right-2 bottom-6 lg:-right-8" delay={1.9} dur={5.2} />

            <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 220, damping: 20 }} className="hero-dash relative z-10">
              <div className="glass-strong sheen rounded-[2rem] p-5 sm:p-7">
                {/* header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name="Ananya Sharma" className="h-11 w-11 text-[0.8rem]" />
                    <div>
                      <p className="font-display text-[1.02rem] font-semibold leading-tight text-slate-900">Ananya Sharma</p>
                      <p className="text-[0.7rem] font-bold text-[color:var(--ink-3)]">JEE Achiever · Class 12</p>
                    </div>
                  </div>
                  <span className="glass-chip flex items-center gap-1.5 px-3 py-2 text-[0.74rem] font-extrabold text-orange-600">
                    <Flame size={14} className="fill-orange-400/30" /> 24-day streak
                  </span>
                </div>

                {/* rings */}
                <div className="mt-6 flex items-center justify-around rounded-3xl bg-white/55 py-5">
                  <Ring value={78} display="78%" label="Syllabus Ready" gradId="heroRingA" />
                  <Ring value={82} display="642" label="Last Mock /720" gradId="heroRingB" delay={0.15} />
                </div>

                {/* subject bars */}
                <div className="mt-5 space-y-3.5">
                  {[["Physics", "84%"], ["Chemistry", "76%"], ["Mathematics", "71%"]].map(([s, w]) => (
                    <div key={s}>
                      <div className="mb-1.5 flex justify-between text-[0.74rem] font-extrabold">
                        <span className="text-[color:var(--ink-2)]">{s}</span>
                        <span className="tnum text-indigo-700">{w}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-indigo-100/60">
                        <div className="sub-bar h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-400" data-w={w} style={{ width: 0 }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* footer row */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 rounded-2xl bg-white/55 px-3.5 py-3">
                    <CalendarClock size={17} className="shrink-0 text-indigo-600" />
                    <div>
                      <p className="text-[0.6rem] font-extrabold uppercase tracking-wider text-[color:var(--ink-3)]">Next Test</p>
                      <p className="text-[0.8rem] font-extrabold text-slate-900">Sun · 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 px-3.5 py-3 text-white shadow-[0_14px_30px_-10px_rgba(99,63,240,.55)]">
                    <TrendingUp size={17} className="shrink-0" />
                    <div>
                      <p className="text-[0.6rem] font-extrabold uppercase tracking-wider text-indigo-200">Batch Rank</p>
                      <p className="text-[0.8rem] font-extrabold">#3 · Top 1%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* result toast */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
              transition={{
                opacity: { delay: 2, duration: 0.5 }, scale: { delay: 2, type: "spring", stiffness: 200, damping: 15 },
                y: { delay: 2.4, duration: 5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="glass-strong absolute -bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl px-4 py-3 sm:left-auto sm:-right-3 sm:translate-x-0"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><Trophy size={14} /></span>
              <p className="text-[0.74rem] font-extrabold leading-tight text-slate-900">Rohan scored <span className="text-emerald-600">98.2%</span><br /><span className="font-bold text-[color:var(--ink-3)]">in Sunday Mock #42</span></p>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="mt-14 hidden justify-center lg:flex"
      >
        <div className="flex flex-col items-center gap-1.5 text-[color:var(--ink-3)]">
          <span className="text-[0.62rem] font-extrabold uppercase tracking-[0.28em]">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}><ChevronDown size={16} /></motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ————————————————— TRUST BAR —————————————————
function TrustBar() {
  return (
    <section className="container-x">
      <Reveal variant="clip">
        <div className="glass grid grid-cols-2 gap-y-6 rounded-[2rem] px-6 py-9 sm:grid-cols-3 lg:grid-cols-5 lg:px-10">
          {TRUST_STATS.map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center gap-1 text-center ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
              <span className="mb-1.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600">
                <Icon name={s.icon} size={18} strokeWidth={2.3} />
              </span>
              <Counter to={s.value} suffix={s.suffix} className="font-display text-[1.8rem] font-semibold leading-none tracking-tight text-slate-900 sm:text-4xl" />
              <span className="mt-1.5 text-[0.66rem] font-extrabold uppercase tracking-[0.16em] text-[color:var(--ink-3)]">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ————————————————— EXAM CATEGORIES —————————————————
function ExamCategories() {
  return (
    <section className="container-x pt-24 sm:pt-32">
      <SectionHeading
        eyebrow="Exam Categories"
        title={<>Preparation for <em className="text-gradient not-italic font-semibold">Every Major Goal</em></>}
        sub="One academy, five distinct preparation ecosystems — each with its own faculty team, test series and mentoring model."
      />
      <RevealStagger className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {EXAM_CATEGORIES.map((c) => (
          <div key={c.id} data-rv>
            <Link to={`/courses?cat=${c.id}`} className="glass card-hover sheen group flex h-full flex-col rounded-[1.6rem] p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <IconTile name={c.icon} />
                <span className="glass-chip px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-wider text-indigo-700">{c.tagline}</span>
              </div>
              <h3 className="font-display mt-5 text-[1.4rem] font-semibold tracking-tight text-slate-900">{c.title}</h3>
              <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-[color:var(--ink-2)]">{c.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.subjects.map((s) => (
                  <span key={s} className="rounded-full bg-indigo-50/80 px-2.5 py-1 text-[0.68rem] font-extrabold text-indigo-700">{s}</span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-indigo-100/70 pt-4">
                <span className="text-[0.75rem] font-extrabold uppercase tracking-wider text-[color:var(--ink-3)]">{c.duration}</span>
                <span className="flex items-center gap-1.5 text-[0.82rem] font-extrabold text-indigo-700 transition-transform duration-300 group-hover:translate-x-1">
                  View Details <ArrowRight size={14} strokeWidth={2.6} />
                </span>
              </div>
            </Link>
          </div>
        ))}
        {/* CTA tile */}
        <div data-rv>
          <div className="relative flex h-full min-h-[19rem] flex-col justify-between overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-7 text-white shadow-[0_30px_70px_-24px_rgba(99,63,240,.6)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-sm" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-fuchsia-300/20 blur-xl" />
            <div>
              <Sparkles size={30} className="text-white/80" />
              <h3 className="font-display mt-5 text-[1.65rem] font-semibold leading-snug tracking-tight">Not sure which path fits?</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-indigo-100">Take a free diagnostic + counselling session. We'll map the right exam, course and batch for you.</p>
            </div>
            <Btn to="/admissions" variant="glass" arrow className="mt-6 w-fit !bg-white/95">Get Free Guidance</Btn>
          </div>
        </div>
      </RevealStagger>
    </section>
  );
}

// ————————————————— FEATURED COURSES —————————————————
function FeaturedCourses() {
  const featured = ["jee-achiever", "neet-achiever", "class-10-board-mastery"].map((id) => COURSES.find((c) => c.id === id));
  return (
    <section className="container-x pt-24 sm:pt-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          center={false}
          eyebrow="Flagship Programs"
          title={<>Courses built like <em className="text-gradient not-italic font-semibold">systems</em>, not batches</>}
        />
        <Reveal delay={0.1}><Btn to="/courses" variant="glass" small className="shrink-0">All 10 Courses</Btn></Reveal>
      </div>
      <RevealStagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((c) => <div key={c.id} data-rv><CourseCard course={c} /></div>)}
      </RevealStagger>
    </section>
  );
}

// ————————————————— WHY CHOOSE US —————————————————
function WhyUs() {
  return (
    <section className="container-x pt-24 sm:pt-32">
      <SectionHeading
        eyebrow="Why Aarohan"
        title={<>More than classes. <em className="text-gradient not-italic font-semibold">A complete preparation system.</em></>}
        sub="Eight interlocking layers that turn effort into outcomes — measured every single week."
      />
      <RevealStagger gap={0.07} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_US.map((w) => (
          <div key={w.title} data-rv className="glass card-hover group rounded-[1.5rem] p-6">
            <motion.div whileHover={{ rotate: [0, -10, 8, 0], scale: 1.08 }} transition={{ duration: 0.5 }} className="w-fit">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600">
                <Icon name={w.icon} size={21} strokeWidth={2.1} />
              </div>
            </motion.div>
            <h3 className="mt-4 font-display text-[1.12rem] font-semibold tracking-tight text-slate-900">{w.title}</h3>
            <p className="mt-1.5 text-[0.85rem] leading-relaxed text-[color:var(--ink-2)]">{w.text}</p>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}

// ————————————————— LEARNING SYSTEM (GSAP timeline) —————————————————
function LearningSystem() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tl-fill",
        { scaleY: 0 },
        {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 62%", end: "bottom 65%", scrub: 0.6 },
        }
      );
      gsap.utils.toArray(".ls-item").forEach((item) => {
        const dot = item.querySelector(".ls-dot");
        const num = item.querySelector(".ls-num");
        gsap.fromTo(item, { opacity: 0, y: 44 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%", once: true },
        });
        ScrollTrigger.create({
          trigger: item, start: "top 62%", end: "top 30%",
          onEnter: () => {
            gsap.to(dot, { scale: 1.16, duration: 0.45, ease: "back.out(2.4)" });
            num.classList.add("text-gradient");
          },
          onLeaveBack: () => {
            gsap.to(dot, { scale: 1, duration: 0.4, ease: "power2.out" });
            num.classList.remove("text-gradient");
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="container-x pt-24 sm:pt-32">
      <SectionHeading
        eyebrow="The Aarohan Method"
        title={<>A 6-step engine for <em className="text-gradient not-italic font-semibold">predictable improvement</em></>}
        sub="Every student, every subject, every week — the same disciplined loop. Scroll through the journey."
      />
      <div ref={root} className="relative mx-auto mt-16 max-w-3xl">
        <div className="tl-line left-[1.35rem] sm:left-1/2 sm:-translate-x-1/2"><div className="tl-fill" /></div>
        <div className="space-y-10 sm:space-y-14">
          {LEARNING_STEPS.map((s, i) => (
            <div key={s.num} className={`ls-item relative flex gap-6 sm:gap-0 ${i % 2 ? "sm:flex-row-reverse" : ""}`}>
              {/* dot */}
              <div className="ls-dot absolute left-[1.35rem] top-2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_12px_28px_-8px_rgba(99,63,240,.6)] transition-transform duration-500 sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2">
                <Icon name={s.icon} size={19} strokeWidth={2.3} />
              </div>
              {/* card */}
              <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-3.5rem)] ${i % 2 ? "sm:mr-auto" : "sm:ml-auto"}`}>
                <div className="glass card-hover rounded-[1.5rem] p-6 sm:p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="ls-num font-display tnum text-3xl font-semibold text-indigo-200 transition-all duration-500">{s.num}</span>
                    <h3 className="font-display text-[1.35rem] font-semibold tracking-tight text-slate-900">{s.title}</h3>
                  </div>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-[color:var(--ink-2)]">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ————————————————— MOCK TEST PREVIEW —————————————————
function MockTestPreview({ onStartTest }) {
  return (
    <section className="container-x pt-24 sm:pt-32">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            center={false}
            eyebrow="Test Engine"
            title={<>Mocks that feel like <em className="text-gradient not-italic font-semibold">the real exam hall</em></>}
            sub="OMR & CBT simulations, percentile predictors and a post-test error clinic — so exam day feels like just another Sunday."
          />
          <RevealStagger gap={0.08} className="mt-8 space-y-3.5">
          {[
            ["Exact exam patterns", "Timed OMR/CBT interface mirroring NTA & board patterns."],
            ["Micro-analytics", "Accuracy, speed, and silly-mistake audit per chapter."],
            ["Rank trajectory", "Watch your batch rank climb week after week."],
          ].map(([t, d]) => (
            <div key={t} data-rv className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-500/20 text-emerald-600"><CheckCircle2 size={16} strokeWidth={2.4} /></span>
              <div>
                <p className="font-display text-[1.05rem] font-semibold tracking-tight text-slate-900">{t}</p>
                <p className="text-[0.88rem] leading-relaxed text-[color:var(--ink-2)]">{d}</p>
              </div>
            </div>
          ))}
          <div data-rv className="pt-3"><Btn onClick={onStartTest} icon={Timer}>Start Free Practice Test</Btn></div>
          </RevealStagger>
        </div>

        <Reveal variant="clip" delay={0.08}>
          <div className="glass-strong sheen relative rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-indigo-600">Mock Dashboard</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[0.7rem] font-extrabold text-emerald-700">Improving ↑</span>
            </div>
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-indigo-200">Upcoming Test</p>
              <p className="font-display mt-1.5 text-xl font-semibold">Full Mock #43 · JEE Main Pattern</p>
              <div className="tnum mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.82rem] font-bold text-indigo-100">
                <span>3h 00m</span><span>90 Questions</span><span>Difficulty ●●●○○</span>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                ["Previous", "642/720"],
                ["Accuracy", "91%"],
                ["vs Last", "+6.4%"],
              ].map(([l, v]) => (
                <div key={l} className="rounded-2xl bg-white/60 py-4">
                  <p className="tnum font-display text-lg font-semibold text-slate-900">{v}</p>
                  <p className="mt-0.5 text-[0.62rem] font-extrabold uppercase tracking-widest text-[color:var(--ink-3)]">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <div className="mb-1.5 flex justify-between text-[0.74rem] font-extrabold">
                <span className="text-[color:var(--ink-2)]">Improvement this month</span>
                <span className="tnum text-emerald-600">+12%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-indigo-100/60">
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: "72%" }} viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                />
              </div>
            </div>
            <p className="mt-5 text-center text-[0.72rem] font-bold text-[color:var(--ink-3)]">Demo dashboard — actual analytics are richer</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ————————————————— PARENT TRUST —————————————————
function ParentTrust() {
  return (
    <section className="container-x pt-24 sm:pt-32">
      <Reveal variant="clip">
        <div className="glass rounded-[2.4rem] px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                center={false}
                eyebrow="For Parents"
                title={<>Built for students. <em className="text-gradient not-italic font-semibold">Designed with parents in mind.</em></>}
                sub="You invest your trust in us — so every part of the experience reports back to you, clearly and on time."
              />
              <RevealStagger gap={0.05} className="mt-9 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {PARENT_POINTS.map((p) => (
                  <div key={p.title} data-rv className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon name={p.icon} size={15} strokeWidth={2.4} />
                    </span>
                    <div>
                      <p className="text-[0.92rem] font-extrabold text-slate-900">{p.title}</p>
                      <p className="mt-0.5 hidden text-[0.8rem] leading-relaxed text-[color:var(--ink-2)] xl:block">{p.text}</p>
                    </div>
                  </div>
                ))}
              </RevealStagger>
            </div>

            {/* progress report mock */}
            <Reveal variant="left" delay={0.1}>
              <div className="glass-strong mx-auto max-w-md rounded-[2rem] p-6 sm:p-7 lg:mr-0">
                <div className="flex items-center justify-between">
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-indigo-600">Monthly Parent Report</p>
                  <ShieldCheck size={17} className="text-emerald-500" />
                </div>
                <p className="font-display mt-3 text-xl font-semibold text-slate-900">Aarav K. · JEE Achiever</p>
                <p className="text-[0.74rem] font-bold text-[color:var(--ink-3)]">October 2026 · Batch M1</p>
                <div className="mt-5 space-y-4">
                  {[
                    ["Attendance", "96%", "bg-gradient-to-r from-indigo-500 to-violet-500", "96%"],
                    ["Test Avg (this month)", "78%", "bg-gradient-to-r from-violet-500 to-fuchsia-500", "78%"],
                    ["Syllabus Completion", "62%", "bg-gradient-to-r from-fuchsia-500 to-pink-400", "62%"],
                  ].map(([l, v, g, w]) => (
                    <div key={l}>
                      <div className="mb-1.5 flex justify-between text-[0.76rem] font-extrabold">
                        <span className="text-[color:var(--ink-2)]">{l}</span><span className="tnum text-indigo-700">{v}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-indigo-100/60">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: w }} viewport={{ once: true }}
                          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                          className={`h-full rounded-full ${g}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-white/60 p-4">
                  <p className="text-[0.66rem] font-extrabold uppercase tracking-widest text-[color:var(--ink-3)]">Mentor Note</p>
                  <p className="mt-1.5 text-[0.84rem] leading-relaxed text-[color:var(--ink-2)]">“Rotation & electrostatics secured. Focus this month: speed in physical chemistry numericals. On track for top-500 target.”</p>
                  <p className="mt-2 text-[0.74rem] font-extrabold text-indigo-700">— Dr. Arvind Menon</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ————————————————— TESTIMONIALS PREVIEW —————————————————
function TestimonialsPreview() {
  return (
    <section className="container-x pt-24 sm:pt-32">
      <SectionHeading
        eyebrow="Student Voices"
        title={<>Stories written by <em className="text-gradient not-italic font-semibold">results</em></>}
        sub="Real journeys from our classrooms — more on the testimonials page."
      />
      <Reveal className="mt-12" delay={0.1}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={22}
          slidesPerView={1}
          breakpoints={{ 700: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
          autoplay={{ delay: 3600, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          loop
        >
          {STUDENT_TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name} className="!h-auto pb-1">
              <TestimonialCard t={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Reveal>
      <Reveal delay={0.15} className="mt-6 text-center">
        <Btn to="/testimonials" variant="glass" small>Read All Stories</Btn>
      </Reveal>
    </section>
  );
}

// ————————————————— RESULTS TEASER —————————————————


// ————————————————— PAGE —————————————————
export default function Home() {
  const [testOpen, setTestOpen] = useState(false);
  return (
    <>
      <Hero onStartTest={() => setTestOpen(true)} />
      <TrustBar />
      <ExamCategories />
      <FeaturedCourses />
      <WhyUs />
      <LearningSystem />
      <MockTestPreview onStartTest={() => setTestOpen(true)} />
      <ParentTrust />
      <TestimonialsPreview />
      
      <CTABand />
      <SampleTestModal open={testOpen} onClose={() => setTestOpen(false)} />
    </>
  );
}

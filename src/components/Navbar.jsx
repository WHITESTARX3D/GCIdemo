// ————————————————— Floating glass navbar —————————————————
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { SITE, EXAM_CATEGORIES, WA_GENERIC } from "../data/site";
import { Icon } from "./ui";
import { reducedMotion } from "./Reveal";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses", dropdown: true },
  { label: "Faculty", to: "/faculty" },
  { label: "Contact", to: "/contact" },
];

const EXTRA_LINKS = [
  { label: "Testimonials", to: "/testimonials" },
  { label: "Gallery", to: "/gallery" },
  { label: "Admissions", to: "/admissions" },
];

export function Logo({ dark = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 text-white shadow-[0_10px_24px_-8px_rgba(99,63,240,.6)]">
        <GraduationCap size={21} strokeWidth={2.2} />
      </div>
      <div className="leading-none">
        <span className={`font-display block text-[1.12rem] font-semibold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
          Aarohan
        </span>
        <span className={`text-[0.58rem] font-extrabold uppercase tracking-[0.32em] ${dark ? "text-indigo-200" : "text-indigo-600"}`}>
          Academy
        </span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const barRef = useRef(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // GSAP-driven shrink on scroll
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    let last = false;
    const apply = (scrolled) => {
      if (reducedMotion()) return;
      gsap.to(el, {
        paddingTop: scrolled ? 7 : 12,
        paddingBottom: scrolled ? 7 : 12,
        boxShadow: scrolled
          ? "0 24px 60px -18px rgba(23,32,84,.38), inset 0 1px 0 rgba(255,255,255,1)"
          : "0 14px 40px -20px rgba(23,32,84,.22), inset 0 1px 0 rgba(255,255,255,1)",
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    const onScroll = () => {
      const s = window.scrollY > 28;
      if (s !== last) { last = s; apply(s); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change + lock scroll
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navCls = ({ isActive }) =>
    `relative rounded-full px-3.5 py-2 text-[0.86rem] font-bold transition-all duration-300 ${
      isActive ? "bg-white/85 text-indigo-700 shadow-[0_6px_18px_-8px_rgba(23,32,84,.3)]" : "text-[color:var(--ink-2)] hover:text-indigo-700 hover:bg-white/50"
    }`;

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-3 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div ref={barRef} className="glass-strong flex items-center justify-between gap-3 py-3 pl-4 pr-2.5 sm:pl-5" style={{ paddingTop: 12, paddingBottom: 12, borderRadius: 999 }}>
            <Logo />

            <nav className="hidden items-center gap-0.5 xl:flex">
              {LINKS.map((l) =>
                l.dropdown ? (
                  <div key={l.to} className="group relative">
                    <NavLink to={l.to} className={({ isActive }) =>
                      `group/i relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.86rem] font-bold transition-all duration-300 ${
                        isActive ? "bg-white/85 text-indigo-700 shadow-[0_6px_18px_-8px_rgba(23,32,84,.3)]" : "text-[color:var(--ink-2)] hover:text-indigo-700 hover:bg-white/50"
                      }`
                    }>
                      {l.label}
                      <ChevronDown size={14} strokeWidth={2.6} className="transition-transform duration-300 group-hover:rotate-180" />
                    </NavLink>
                    {/* dropdown */}
                    <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 translate-y-3 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="glass-strong rounded-3xl p-2.5">
                        {EXAM_CATEGORIES.map((c) => (
                          <Link
                            key={c.id}
                            to={`/courses?cat=${c.id}`}
                            className="flex items-center gap-3.5 rounded-2xl px-3.5 py-3 transition-colors hover:bg-white/80"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600">
                              <Icon name={c.icon} size={17} strokeWidth={2.2} />
                            </span>
                            <span>
                              <span className="block text-[0.88rem] font-bold text-slate-900">{c.title}</span>
                              <span className="block text-[0.72rem] font-semibold text-[color:var(--ink-3)]">{c.tagline}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink key={l.to} to={l.to} className={navCls} end={l.to === "/"}>
                    {l.label}
                  </NavLink>
                )
              )}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={WA_GENERIC}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp enquiry"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-emerald-200/80 bg-emerald-50/80 text-emerald-600 transition-all hover:-translate-y-0.5 hover:bg-emerald-100 sm:flex"
              >
                <MessageCircle size={17} strokeWidth={2.4} />
              </a>
              <Link to="/admissions" className="btn btn-primary btn-sm hidden md:inline-flex">
                <span>Admissions</span>
              </Link>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="glass-chip flex h-10 w-10 items-center justify-center text-slate-800 xl:hidden"
              >
                <Menu size={19} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ————— Mobile menu ————— */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white/70 backdrop-blur-2xl"
          >
            <div className="container-x flex items-center justify-between pt-7">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="glass-chip flex h-11 w-11 items-center justify-center text-slate-800"
              >
                <X size={20} strokeWidth={2.4} />
              </button>
            </div>
            <motion.nav
              initial="hidden" animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              className="container-x mt-8 flex flex-1 flex-col gap-1 overflow-y-auto pb-10"
            >
              {[...LINKS, ...EXTRA_LINKS].map((l) => (
                <motion.div key={l.to} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }}>
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className={({ isActive }) =>
                      `font-display flex items-center justify-between border-b border-indigo-100/70 py-3.5 text-[1.65rem] font-medium tracking-tight transition-colors ${
                        isActive ? "text-indigo-600" : "text-slate-900"
                      }`
                    }
                  >
                    {l.label}
                    <span className="text-indigo-300">→</span>
                  </NavLink>
                </motion.div>
              ))}
              <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="mt-6 flex flex-col gap-3">
                <Link to="/admissions" className="btn btn-primary w-full">Book Counselling Session</Link>
                <a href={WA_GENERIC} target="_blank" rel="noreferrer" className="btn btn-wa w-full">
                  <MessageCircle size={17} strokeWidth={2.4} /><span>WhatsApp Enquiry</span>
                </a>
              </motion.div>
              <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-6 text-center text-xs font-semibold text-[color:var(--ink-3)]">
                {SITE.hours} · {SITE.phone}
              </motion.p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

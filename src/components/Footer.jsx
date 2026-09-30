// ————————————————— Footer —————————————————
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const SOCIALS = [
  { label: "Instagram", d: "M12 2.2c3.2 0 3.6 0 4.8.06 3.2.15 4.7 1.66 4.85 4.85.06 1.27.07 1.65.07 4.84 0 3.2-.01 3.57-.07 4.84-.15 3.2-1.65 4.7-4.85 4.85-1.27.06-1.64.07-4.84.07-3.2 0-3.57-.01-4.85-.07-3.2-.15-4.7-1.65-4.85-4.85C2.2 15.6 2.2 15.2 2.2 12s0-3.6.06-4.85C2.4 3.96 3.9 2.4 7.1 2.26 8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.76.07-2.5.11-3.6 1.3-3.72 3.72C3.45 9.04 3.45 9.4 3.45 12s0 2.96.07 4.21c.11 2.42 1.22 3.6 3.72 3.72 1.25.06 1.6.07 4.76.07s3.5 0 4.76-.07c2.5-.11 3.6-1.3 3.72-3.72.06-1.25.07-1.6.07-4.21s0-2.96-.07-4.21c-.11-2.42-1.22-3.6-3.72-3.72-1.25-.06-1.6-.07-4.76-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm6.4-3.76a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" },
  { label: "Facebook", d: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" },
  { label: "YouTube", d: "M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.8ZM9.6 15.6V8.4l6.27 3.6-6.27 3.6Z" },
  { label: "X", d: "M18.9 2.1h3.68l-8.04 9.19L24 23.9h-7.4l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 2.1h7.59l5.24 6.93L18.9 2.1Zm-1.3 19.6h2.04L6.5 4.16H4.3l13.3 17.54Z" },
];
import { SITE, WA_GENERIC } from "../data/site";
import { Logo } from "./Navbar";
import { Reveal } from "./ui";

const COLS = [
  {
    title: "Institute",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Faculty", to: "/faculty" },
      { label: "Results", to: "/results" },
      { label: "Gallery", to: "/gallery" },
      { label: "Testimonials", to: "/testimonials" },
    ],
  },
  {
    title: "Courses",
    links: [
      { label: "School (8–12)", to: "/courses?cat=school" },
      { label: "JEE Programs", to: "/courses?cat=engineering" },
      { label: "NEET Programs", to: "/courses?cat=medical" },
      { label: "Government Exams", to: "/courses?cat=government" },
      { label: "Foundation", to: "/courses?cat=foundation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Study Material", to: "/study-material" },
      { label: "Mock Tests", to: "/study-material" },
      { label: "FAQ", to: "/faq" },
      { label: "Admissions", to: "/admissions" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* fluid separator */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-full rounded-t-[3rem] bg-gradient-to-b from-[#111736] via-[#0e1330] to-[#0a0f27]" />
      <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-violet-600/15 blur-[110px]" />

      <Reveal className="relative" y={24}>
        <div className="container-x grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] lg:gap-8">
          {/* Brand */}
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-indigo-200/70">
              Serious academics. Expert guidance. Structured preparation — trusted by students and parents since {SITE.founded}.
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="glass-dark flex h-10 w-10 items-center justify-center text-indigo-100/80 transition-all hover:-translate-y-1 hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[0.72rem] font-extrabold uppercase tracking-[0.24em] text-indigo-300/80">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="group inline-flex items-center gap-2 text-[0.92rem] font-semibold text-indigo-100/75 transition-colors hover:text-white">
                      <span className="h-1 w-1 rounded-full bg-indigo-400/60 transition-all group-hover:w-3 group-hover:bg-indigo-300" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-[0.72rem] font-extrabold uppercase tracking-[0.24em] text-indigo-300/80">Contact</h4>
            <ul className="mt-5 space-y-3.5 text-[0.9rem] font-semibold text-indigo-100/75">
              <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-indigo-300" />{SITE.address}</li>
              <li><a href={SITE.phoneHref} className="flex gap-2.5 hover:text-white"><Phone size={16} className="mt-0.5 shrink-0 text-indigo-300" />{SITE.phone}</a></li>
              <li><a href={WA_GENERIC} target="_blank" rel="noreferrer" className="flex gap-2.5 hover:text-white"><MessageCircle size={16} className="mt-0.5 shrink-0 text-emerald-400" />WhatsApp Counsellor</a></li>
              <li><a href={`mailto:${SITE.email}`} className="flex gap-2.5 hover:text-white"><Mail size={16} className="mt-0.5 shrink-0 text-indigo-300" />{SITE.email}</a></li>
              <li className="flex gap-2.5"><Clock size={16} className="mt-0.5 shrink-0 text-indigo-300" />{SITE.hours}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[0.8rem] font-semibold text-indigo-200/50 sm:flex-row">
            <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
            <div className="flex items-center gap-5">
              <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-white">Terms of Use</a>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}

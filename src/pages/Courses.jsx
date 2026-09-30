// ————————————————— COURSES LISTING —————————————————
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass } from "lucide-react";
import { PageHero, CTABand, Reveal } from "../components/ui";
import { CourseCard } from "../components/cards";
import { COURSES, COURSE_FILTERS } from "../data/courses";

export default function Courses() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const cat = params.get("cat") || "all";

  const list = useMemo(() => {
    return COURSES.filter((c) => {
      const matchCat = cat === "all" || c.category === cat;
      const matchQ =
        !q ||
        [c.title, c.exam, c.categoryLabel, c.subjects.join(" ")].join(" ").toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [cat, q]);

  return (
    <>
      <PageHero
        eyebrow="Programs 2026–27"
        title={<>Every course, engineered for a <em className="text-gradient not-italic font-semibold">target exam</em></>}
        sub="Search, filter and compare all 10 programs. Fees are shared personally during counselling — honest, transparent, no surprises."
      />

      <section className="container-x pb-24">
        {/* ——— Search bar (standalone) ——— */}
        <Reveal>
          <div className="glass-strong sticky top-[3.0rem] z-30 flex items-center gap-3 rounded-full p-2 pl-5">
            <Search size={17} className="shrink-0 text-indigo-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses, exams, subjects…"
              className="w-full min-w-0 flex-1 bg-transparent py-2 text-[0.95rem] font-semibold text-slate-900 outline-none placeholder:text-[color:var(--ink-3)]"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="glass-chip shrink-0 px-3.5 py-2 text-[0.72rem] font-extrabold text-[color:var(--ink-2)] transition-colors hover:text-indigo-700"
              >
                Clear
              </button>
            )}
            <span className="hidden shrink-0 rounded-full bg-gradient-to-r from-indigo-600/10 to-violet-600/10 px-4 py-2 text-[0.74rem] font-extrabold text-indigo-700 sm:block">
              {list.length} / {COURSES.length} programs
            </span>
          </div>
        </Reveal>

        {/* divider */}
        <div className="mt-5 mb-12 flex items-center gap-4 sm:mt-6 sm:mb-16">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-200/70 to-indigo-300/60" />
             <span className="h-px flex-1 bg-gradient-to-l from-transparent via-indigo-200/70 to-indigo-300/60" />
        </div>

        {/* ——— Category filters ——— */}
        <Reveal delay={0.08}>
          <div className="glass rounded-[1.8rem] px-4 py-5 sm:px-8 sm:py-6">
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {COURSE_FILTERS.map((f) => {
                const active = cat === f.id || (f.id === "all" && cat === "all");
                const count = f.id === "all" ? COURSES.length : COURSES.filter((c) => c.category === f.id).length;
                return (
                  <button
                    key={f.id}
                    onClick={() => setParams(f.id === "all" ? {} : { cat: f.id })}
                    className={`fbtn ${active ? "active" : ""}`}
                  >
                    {f.label}
                    <span className="cnt">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ——— Grid ——— */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((c) => (
              <motion.div
                layout
                key={c.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <CourseCard course={c} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && (
          <div className="glass mx-auto mt-10 max-w-md rounded-[2rem] p-10 text-center">
            <Compass size={34} className="mx-auto text-indigo-400" />
            <p className="font-display mt-4 text-xl font-semibold text-slate-900">No programs match that filter</p>
            <p className="mt-2 text-[0.9rem] text-[color:var(--ink-2)]">Try clearing the search or choosing a different category — or ask us on WhatsApp.</p>
          </div>
        )}
      </section>

      <CTABand />
    </>
  );
}

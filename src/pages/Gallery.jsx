// ————————————————— GALLERY + LIGHTBOX —————————————————
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { PageHero, Reveal, RevealStagger, CTABand } from "../components/ui";
import { GALLERY, GALLERY_CATS } from "../data/site";

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [light, setLight] = useState(null); // index in filtered list

  const list = useMemo(() => (cat === "All" ? GALLERY : GALLERY.filter((g) => g.cat === cat)), [cat]);

  const move = (dir) => setLight((i) => (i + dir + list.length) % list.length);

  useEffect(() => {
    if (light === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLight(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [light, list.length]);

  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title={<>Inside <em className="text-gradient not-italic font-semibold">Aarohan</em></>}
        sub="Classrooms, labs, seminars, celebrations — a glimpse of where the work (and the joy) happens."
      />

      <section className="container-x pb-24">
        <Reveal>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
            {GALLERY_CATS.map((c) => (
              <button key={c} onClick={() => { setCat(c); setLight(null); }}
                className={`pill whitespace-nowrap ${cat === c ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg" : "glass-chip text-[color:var(--ink-2)]"}`}>
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-8 columns-2 gap-4 space-y-4 md:columns-3 md:gap-5 md:space-y-5">
          <AnimatePresence mode="popLayout">
            {list.map((g, i) => (
              <motion.button
                layout
                key={g.img + g.cat}
                initial={{ opacity: 0, y: 26, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLight(i)}
                className="group relative block w-full overflow-hidden rounded-[1.4rem] text-left shadow-[0_20px_50px_-24px_rgba(23,32,84,.35)]"
              >
                <img
                  src={g.img}
                  alt={g.title}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07] ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1230]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="glass-chip px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wider text-indigo-700">{g.cat}</span>
                  <p className="mt-2 font-display text-[1.02rem] font-semibold leading-tight text-white">{g.title}</p>
                </div>
                <span className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
                  <Camera size={15} />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ——— Lightbox ——— */}
      <AnimatePresence>
        {light !== null && list[light] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0c1230]/80 p-4 backdrop-blur-xl"
            onClick={() => setLight(null)}
          >
            <button aria-label="Close" onClick={() => setLight(null)}
              className="glass-chip absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center text-slate-800"><X size={19} /></button>
            <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); move(-1); }}
              className="glass-chip absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-slate-800 sm:left-6"><ChevronLeft size={20} /></button>
            <button aria-label="Next" onClick={(e) => { e.stopPropagation(); move(1); }}
              className="glass-chip absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-slate-800 sm:right-6"><ChevronRight size={20} /></button>

            <motion.figure
              key={list[light].img}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-full max-w-4xl overflow-hidden rounded-[1.8rem] p-3"
            >
              <img src={list[light].img} alt={list[light].title} className="max-h-[70vh] w-full rounded-[1.2rem] object-cover" />
              <figcaption className="flex items-center justify-between gap-3 px-3 py-3.5">
                <p className="font-display text-[1.05rem] font-semibold text-slate-900">{list[light].title}</p>
                <span className="glass-chip px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-wider text-indigo-700">{list[light].cat}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      <CTABand title="Come see the campus yourself" sub="Book a campus visit with counselling — walk the classrooms, meet the mentors." />
    </>
  );
}

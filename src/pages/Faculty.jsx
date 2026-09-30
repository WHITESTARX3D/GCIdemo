// ————————————————— FACULTY —————————————————
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { GraduationCap, BadgeCheck } from "lucide-react";
import { PageHero, CTABand, Reveal } from "../components/ui";
import { FACULTY, FACULTY_FILTERS } from "../data/faculty";

function FacultyCard({ f }) {
  return (
    <article className="glass card-hover group h-full overflow-hidden rounded-[1.6rem]">
      <div className="relative h-64 overflow-hidden sm:h-72">
        <img
          src={f.img}
          alt={f.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1230]/65 via-transparent to-transparent" />
        <span className="glass-chip absolute left-4 top-4 px-3 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-indigo-700">{f.subject}</span>
        <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3.5 py-1.5 text-[0.72rem] font-extrabold text-white backdrop-blur-md">
          {f.experience}+ years teaching
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="font-display text-[1.3rem] font-semibold tracking-tight text-slate-900">{f.name}</h3>
        <p className="mt-0.5 flex items-center gap-1.5 text-[0.8rem] font-extrabold text-indigo-600">
          <GraduationCap size={14} /> {f.qualification}
        </p>
        <p className="mt-3 flex items-start gap-1.5 text-[0.82rem] font-bold leading-snug text-slate-800">
          <BadgeCheck size={14} className="mt-0.5 shrink-0 text-emerald-500" /> {f.specialization}
        </p>
        <p className="mt-2.5 line-clamp-3 text-[0.84rem] leading-relaxed text-[color:var(--ink-2)]">{f.bio}</p>
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-indigo-100/70 pt-4">
          {f.tags.map((t) => (
            <span key={t} className="rounded-full bg-indigo-50/80 px-2.5 py-1 text-[0.66rem] font-extrabold uppercase tracking-wide text-indigo-700">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Faculty() {
  const [filter, setFilter] = useState("All");
  const list = FACULTY.filter((f) => filter === "All" || f.subject === filter);

  return (
    <>
      <PageHero
        eyebrow="The Mentors"
        title={<>Teachers students <em className="text-gradient not-italic font-semibold">remember for life</em></>}
        sub="50+ full-time educators — IIT, NIT, AIIMS and IISc alumni — who teach, mentor and track every student personally."
      />

      <section className="container-x pb-24">
        <Reveal>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
            {FACULTY_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`pill whitespace-nowrap ${filter === f ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_10px_24px_-8px_rgba(99,63,240,.55)]" : "glass-chip text-[color:var(--ink-2)] hover:bg-white/80"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={22}
              slidesPerView={1}
              breakpoints={{ 640: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
              autoplay={{ delay: 4200, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
            >
              {list.map((f) => (
                <SwiperSlide key={f.id} className="!h-auto pb-1">
                  <FacultyCard f={f} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </AnimatePresence>

        <Reveal className="mt-12">
          <div className="glass mx-auto flex max-w-3xl flex-col items-center gap-2 rounded-[2rem] px-8 py-7 text-center">
            <p className="font-display text-xl font-semibold text-slate-900">Faculty portraits shown are demo stand-ins.</p>
            <p className="text-[0.9rem] leading-relaxed text-[color:var(--ink-2)]">
              In production, this page showcases the institute's real teaching team with verified credentials.
            </p>
          </div>
        </Reveal>
      </section>

      <CTABand title="Learn from the best. Book a Free Demo Class" sub="Attend 3 days of real classes before you decide — meet the teachers, feel the method." />
    </>
  );
}

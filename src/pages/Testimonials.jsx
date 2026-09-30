// ————————————————— TESTIMONIALS —————————————————
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Quote, Star } from "lucide-react";
import { PageHero, SectionHeading, Reveal, CTABand } from "../components/ui";
import { TestimonialCard } from "../components/cards";
import { STUDENT_TESTIMONIALS, PARENT_TESTIMONIALS } from "../data/testimonials";

function Carousel({ items, reverse = false }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={22}
      slidesPerView={1}
      breakpoints={{ 700: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
      autoplay={{ delay: 3400, pauseOnMouseEnter: true, reverseDirection: reverse }}
      pagination={{ clickable: true }}
      loop
    >
      {items.map((t) => (
        <SwiperSlide key={t.name} className="!h-auto pb-1">
          <TestimonialCard t={t} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function Testimonials() {
  return (
    <>
      <PageHero
        eyebrow="Wall of Trust"
        title={<>What students say. <em className="text-gradient not-italic font-semibold">What parents confirm.</em></>}
        sub="Unfiltered words from our classrooms and living rooms — the two perspectives that matter most."
      />

      {/* big quote feature */}
      <section className="container-x">
        <Reveal variant="clip">
          <div className="glass-strong sheen relative overflow-hidden rounded-[2.2rem] px-7 py-12 text-center sm:px-14 sm:py-16">
            <Quote size={44} className="mx-auto text-indigo-300" />
            <p className="font-display mx-auto mt-6 max-w-3xl text-2xl font-medium leading-snug tracking-tight text-slate-900 sm:text-[2rem]">
              “Every institute promises ranks. Aarohan promised a <span className="text-gradient font-semibold">system</span> — and showed it to us every single week.”
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={15} className="fill-amber-400 text-amber-400" />)}
            </div>
            <p className="mt-3 text-[0.86rem] font-extrabold text-slate-900">Mrs. Sharma</p>
            <p className="text-[0.76rem] font-bold text-[color:var(--ink-3)]">Parent · JEE 2025 batch</p>
          </div>
        </Reveal>
      </section>

      <section className="container-x pt-20">
        <SectionHeading eyebrow="Student Reviews" title={<>In their own words</>} />
        <Reveal className="mt-12" delay={0.08}><Carousel items={STUDENT_TESTIMONIALS} /></Reveal>
      </section>

      <section className="container-x pt-20 pb-24">
        <SectionHeading eyebrow="Parent Reviews" title={<>From the people who notice everything</>} />
        <Reveal className="mt-12" delay={0.08}><Carousel items={PARENT_TESTIMONIALS} reverse /></Reveal>
      </section>

      <CTABand title="Become our next success story" sub="Book a free demo week and experience exactly what these students and parents describe." />
    </>
  );
}

// ————————————————— App shell: router + transitions + layout —————————————————
import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LiquidBackground from "./components/LiquidBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FloatingWhatsApp, MobileActionBar } from "./components/FloatingButtons";
import { Btn } from "./components/ui";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Faculty from "./pages/Faculty";
import Testimonials from "./pages/Testimonials";
import Gallery from "./pages/Gallery";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search]);
  return null;
}

function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-32 pb-20 text-center">
      <span className="eyebrow justify-center">404</span>
      <h1 className="h-display mt-4 text-5xl sm:text-6xl">This page skipped class.</h1>
      <p className="mt-4 max-w-md text-[color:var(--ink-2)]">The page you're looking for doesn't exist. Let's get you back on the right track.</p>
      <Btn to="/" className="mt-8">Back to Home</Btn>
    </section>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
    
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/faculty" element={<Faculty />} />
          
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/gallery" element={<Gallery />} />
          
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen pb-[76px] md:pb-0">
        <LiquidBackground />
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />

        <MobileActionBar />
      </div>
    </BrowserRouter>
  );
}

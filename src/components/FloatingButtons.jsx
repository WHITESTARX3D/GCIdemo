// ————————————————— Floating conversion widgets —————————————————
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ClipboardPenLine } from "lucide-react";
import { SITE, WA_GENERIC } from "../data/site";

/** Floating WhatsApp bubble (desktop + mobile, sits above the mobile bar) */
export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1600);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={WA_GENERIC}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="wa-pulse fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_18px_40px_-10px_rgba(16,185,106,.6)] md:bottom-7 md:right-6"
        >
          <MessageCircle size={24} strokeWidth={2.2} />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-slate-900 px-3.5 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 md:block" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/** Sticky bottom action bar (mobile only) */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}>
      <div className="glass-strong flex items-center gap-2 rounded-full p-1.5">
        <a href={SITE.phoneHref} className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-[0.8rem] font-extrabold text-slate-800 transition-colors hover:bg-white/70">
          <Phone size={15} strokeWidth={2.5} className="text-indigo-600" /> Call
        </a>
        <span className="h-6 w-px bg-indigo-200/60" />
        <a href={WA_GENERIC} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-[0.8rem] font-extrabold text-emerald-700 transition-colors hover:bg-emerald-50">
          <MessageCircle size={15} strokeWidth={2.5} /> WhatsApp
        </a>
        <span className="h-6 w-px bg-indigo-200/60" />
        <Link to="/admissions" className="btn btn-primary flex-[1.3] !py-2.5 !text-[0.8rem]" style={{ borderRadius: 999 }}>
          <ClipboardPenLine size={14} strokeWidth={2.5} /><span>Enquire</span>
        </Link>
      </div>
    </div>
  );
}

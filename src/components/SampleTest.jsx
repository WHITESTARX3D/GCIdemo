// ————————————————— Interactive sample mock test (GlassModal) —————————————————
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Timer, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { SAMPLE_TEST } from "../data/site";
import { Btn } from "./ui";

export default function SampleTestModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [secs, setSecs] = useState(600);

  useEffect(() => {
    if (open) {
      setStep(0); setPicked(null); setAnswers([]); setDone(false); setSecs(600);
    }
  }, [open]);

  useEffect(() => {
    if (!open || done) return;
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [open, done]);

  const q = SAMPLE_TEST.questions[step];
  const score = useMemo(
    () => answers.reduce((acc, a, i) => acc + (a === SAMPLE_TEST.questions[i].answer ? 1 : 0), 0),
    [answers]
  );

  const next = () => {
    const newAnswers = [...answers];
    newAnswers[step] = picked;
    setAnswers(newAnswers);
    setPicked(null);
    if (step + 1 >= SAMPLE_TEST.questions.length) setDone(true);
    else setStep(step + 1);
  };

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[#0c1230]/45 p-0 backdrop-blur-md sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] p-6 sm:rounded-[2rem] sm:p-8"
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-indigo-600">Demo · Mock Test Preview</span>
                <h3 className="font-display mt-1 text-2xl font-semibold tracking-tight text-slate-900">{SAMPLE_TEST.title}</h3>
              </div>
              <button onClick={onClose} aria-label="Close" className="glass-chip flex h-10 w-10 shrink-0 items-center justify-center text-slate-700">
                <X size={18} />
              </button>
            </div>

            {!done ? (
              <>
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3">
                  <span className="text-[0.8rem] font-extrabold text-[color:var(--ink-2)]">Question {step + 1} / {SAMPLE_TEST.questions.length}</span>
                  <span className="tnum flex items-center gap-1.5 rounded-full bg-indigo-600/10 px-3 py-1 text-[0.8rem] font-extrabold text-indigo-700">
                    <Timer size={14} /> {mm}:{ss}
                  </span>
                </div>
                {/* progress */}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-indigo-100/70">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    animate={{ width: `${((step) / SAMPLE_TEST.questions.length) * 100}%` }} transition={{ duration: 0.4 }} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                    <p className="mt-6 text-[1.02rem] font-bold leading-relaxed text-slate-900">{q.q}</p>
                    <div className="mt-5 grid gap-2.5">
                      {q.options.map((opt, i) => {
                        const active = picked === i;
                        return (
                          <button
                            key={i}
                            onClick={() => setPicked(i)}
                            className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[0.92rem] font-bold transition-all duration-300 ${
                              active
                                ? "border-indigo-500 bg-gradient-to-r from-indigo-600/10 to-violet-600/10 text-indigo-700 shadow-[0_8px_24px_-10px_rgba(99,63,240,.4)]"
                                : "border-slate-200/80 bg-white/60 text-[color:var(--ink-2)] hover:border-indigo-300 hover:bg-white/90"
                            }`}
                          >
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-extrabold ${active ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white" : "bg-indigo-100/70 text-indigo-700"}`}>
                              {String.fromCharCode(65 + i)}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <Btn onClick={next} className="mt-7 w-full" arrow>
                  {step + 1 === SAMPLE_TEST.questions.length ? "Finish Test" : "Next Question"}
                </Btn>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="py-4 text-center">
                <div className="relative mx-auto mt-4 h-36 w-36">
                  <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                    <defs>
                      <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" /><stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                    <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" className="ring-track" />
                    <motion.circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" className="ring-fill"
                      strokeDasharray={2 * Math.PI * 52}
                      initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - score / SAMPLE_TEST.questions.length) }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display tnum text-4xl font-semibold text-slate-900">{score}/{SAMPLE_TEST.questions.length}</span>
                    <span className="text-[0.68rem] font-extrabold uppercase tracking-widest text-[color:var(--ink-3)]">Score</span>
                  </div>
                </div>
                <h4 className="font-display mt-6 text-2xl font-semibold text-slate-900">
                  {score === SAMPLE_TEST.questions.length ? "Outstanding!" : score >= 2 ? "Strong base — keep going!" : "Good start — we'll get you there."}
                </h4>
                <p className="mx-auto mt-2 max-w-sm text-[0.9rem] leading-relaxed text-[color:var(--ink-2)]">
                  Our full test engine gives chapter-wise analytics, silly-mistake audits and rank prediction after every mock.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                  {SAMPLE_TEST.questions.map((qq, i) => (
                    <span key={i} className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-[0.72rem] font-extrabold ${answers[i] === qq.answer ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"}`}>
                      {answers[i] === qq.answer ? <CheckCircle2 size={13} /> : <XCircle size={13} />} Q{i + 1}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                  <Btn variant="glass" arrow={false} icon={RotateCcw} className="flex-1" onClick={() => { setStep(0); setAnswers([]); setPicked(null); setDone(false); setSecs(600); }}>Retake</Btn>
                  <Btn to="/admissions" className="flex-1">Get Full Access</Btn>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

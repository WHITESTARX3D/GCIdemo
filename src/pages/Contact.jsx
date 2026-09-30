// ————————————————— CONTACT —————————————————
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Navigation, CheckCircle2 } from "lucide-react";
import { PageHero, Reveal, RevealStagger, Btn, CTABand } from "../components/ui";
import { SITE, waLink } from "../data/site";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    window.open(
      waLink(`Hello Aarohan Academy! I'm ${form.name} (${form.phone}). ${form.message}`),
      "_blank"
    );
    setSent(true);
  };

  const CARDS = [
    { icon: MapPin, title: "Visit Us", lines: [SITE.address], action: { label: "Get Directions", href: "https://maps.google.com/?q=Sector+15+Noida" } },
    { icon: Phone, title: "Call Us", lines: [SITE.phone, SITE.hoursShort], action: { label: "Call Now", href: SITE.phoneHref } },
    { icon: MessageCircle, title: "WhatsApp", lines: ["Fastest response — usually minutes", "8 AM – 8 PM, Mon–Sat"], action: { label: "Chat Now", href: waLink("Hello Aarohan Academy! I have a question.") } },
    { icon: Mail, title: "Email", lines: [SITE.email, "Replies within 24 hours"], action: { label: "Write Email", href: `mailto:${SITE.email}` } },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Talk to a human, <em className="text-gradient not-italic font-semibold">not a bot</em></>}
        sub="Call, WhatsApp, email or walk in — counsellors are available six days a week."
      />

      <section className="container-x pb-24">
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c) => (
            <div key={c.title} data-rv>
              <div className="glass card-hover flex h-full flex-col rounded-[1.6rem] p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-600">
                  <c.icon size={20} strokeWidth={2.2} />
                </span>
                <h3 className="font-display mt-4 text-[1.2rem] font-semibold tracking-tight text-slate-900">{c.title}</h3>
                {c.lines.map((l) => <p key={l} className="mt-1 text-[0.85rem] font-semibold leading-relaxed text-[color:var(--ink-2)]">{l}</p>)}
                <a href={c.action.href} target={c.action.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 pt-1 text-[0.84rem] font-extrabold text-indigo-700">
                  {c.action.label} <Navigation size={12} />
                </a>
              </div>
            </div>
          ))}
        </RevealStagger>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Map */}
          <Reveal variant="clip">
            <div className="glass-strong overflow-hidden rounded-[2rem] p-3">
              <iframe
                title="Aarohan Academy location map"
                src="https://www.google.com/maps?q=Sector+15,+Noida&output=embed"
                className="h-[24rem] w-full rounded-[1.5rem] border-0 sm:h-[27rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex items-center justify-between px-3 py-3.5">
                <p className="flex items-center gap-2 text-[0.84rem] font-bold text-slate-800"><MapPin size={15} className="text-indigo-600" /> {SITE.address}</p>
                <span className="hidden items-center gap-1.5 text-[0.74rem] font-extrabold text-[color:var(--ink-3)] sm:flex"><Clock size={13} /> {SITE.hoursShort}</span>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal variant="left" delay={0.08}>
            <div className="glass-strong h-full rounded-[2rem] p-6 sm:p-9">
              <span className="eyebrow">Quick Message</span>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-slate-900">We'll call you back</h2>
              <p className="mt-2 text-[0.9rem] text-[color:var(--ink-2)]">Leave your number and question — a counsellor responds within 2 working hours.</p>
              {sent ? (
                <div className="mt-9 rounded-3xl bg-emerald-50/80 p-8 text-center">
                  <CheckCircle2 size={40} className="mx-auto text-emerald-500" />
                  <h3 className="font-display mt-4 text-xl font-semibold text-slate-900">Message ready!</h3>
                  <p className="mt-2 text-[0.9rem] text-[color:var(--ink-2)]">WhatsApp opened with your message — just press send.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-7 space-y-5">
                  <div>
                    <label className="flabel" htmlFor="c-name">Name *</label>
                    <input id="c-name" required value={form.name} onChange={set("name")} className="field" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="flabel" htmlFor="c-phone">Phone *</label>
                    <input id="c-phone" required type="tel" pattern="[0-9+ -]{10,}" value={form.phone} onChange={set("phone")} className="field" placeholder="10-digit mobile" />
                  </div>
                  <div>
                    <label className="flabel" htmlFor="c-msg">Message *</label>
                    <textarea id="c-msg" required rows={4} value={form.message} onChange={set("message")} className="field resize-none" placeholder="Which course are you curious about?" />
                  </div>
                  <button type="submit" className="btn btn-primary w-full"><Send size={16} strokeWidth={2.4} /><span>Send Message</span></button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}

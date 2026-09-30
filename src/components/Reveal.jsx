// ————————————————— GSAP scroll-reveal system —————————————————
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== "undefined") {
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll-triggered reveal for a single element.
 * variant: "up" | "clip" | "left" | "right" | "scale"
 */
export function Reveal({ children, variant = "up", delay = 0, y = 34, className = "", style, ...rest }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      gsap.set(el, { opacity: 1, clearProps: "transform,clipPath" });
      return;
    }
    const ctx = gsap.context(() => {
      const presets = {
        up: { opacity: 0, y },
        left: { opacity: 0, x: -44 },
        right: { opacity: 0, x: 44 },
        scale: { opacity: 0, scale: 0.92 },
        clip: { opacity: 0, y: 26, clipPath: "inset(14% 6% 14% 6% round 32px)" },
      };
      const to = { opacity: 1, x: 0, y: 0, scale: 1, duration: 1, delay, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true } };
      if (variant === "clip") to.clipPath = "inset(0% 0% 0% 0% round 32px)";
      gsap.fromTo(el, presets[variant] || presets.up, to);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: reducedMotion() ? 1 : 0, ...style }} {...rest}>
      {children}
    </div>
  );
}

/** Stagger-reveal all children tagged with data-rv */
export function RevealStagger({ children, className = "", gap = 0.09, as: Tag = "div", ...rest }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll("[data-rv]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: gap, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/** Animated counter that counts up on viewport entry */
export function Counter({ to, suffix = "", prefix = "", decimals = 0, duration = 1.8, className = "" }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const final = `${prefix}${Number(to.toFixed(decimals)).toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
    if (reducedMotion()) { el.textContent = final; return; }
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: to, duration, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Number(obj.v.toFixed(decimals)).toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [to]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}0{suffix}
    </span>
  );
}

export { gsap, ScrollTrigger };

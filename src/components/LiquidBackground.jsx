// ————————————————— Animated liquid background layer —————————————————
// Stack: base mesh → grid lines → drifting gradient blobs → glass orbs
export default function LiquidBackground() {
  return (
    <div aria-hidden className="mesh-bg fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-lines absolute inset-0" />

      <div className="blob anim-a" style={{ width: "44rem", height: "44rem", top: "-14%", left: "-12%", background: "radial-gradient(circle, rgba(99,102,241,.30), rgba(99,102,241,0) 68%)" }} />
      <div className="blob anim-b" style={{ width: "40rem", height: "40rem", top: "6%", right: "-14%", background: "radial-gradient(circle, rgba(168,85,247,.26), rgba(168,85,247,0) 68%)" }} />
      <div className="blob anim-c" style={{ width: "46rem", height: "46rem", bottom: "-20%", left: "18%", background: "radial-gradient(circle, rgba(56,189,248,.24), rgba(56,189,248,0) 68%)" }} />
      <div className="blob anim-b" style={{ width: "30rem", height: "30rem", top: "42%", left: "-10%", background: "radial-gradient(circle, rgba(34,211,238,.18), rgba(34,211,238,0) 68%)", animationDuration: "40s" }} />
      <div className="blob anim-a" style={{ width: "26rem", height: "26rem", top: "62%", right: "-6%", background: "radial-gradient(circle, rgba(129,140,248,.2), rgba(129,140,248,0) 68%)", animationDuration: "34s" }} />

      <div className="glass-orb anim-a hidden md:block" style={{ width: 110, height: 110, top: "12%", right: "10%" }} />
      <div className="glass-orb anim-b hidden lg:block" style={{ width: 64, height: 64, top: "58%", right: "26%", animationDuration: "28s" }} />
      <div className="glass-orb anim-c hidden md:block" style={{ width: 84, height: 84, bottom: "12%", left: "6%" }} />
    </div>
  );
}

import { useEffect, useRef, useState, type CSSProperties } from "react";

const NODES = [
  { x: 18, y: 34, z: -120, label: "NOVA Storefront" },
  { x: 50, y: 22, z: -260, label: "Checkout API" },
  { x: 82, y: 36, z: -140, label: "Order Records" },
  { x: 30, y: 60, z: 40, label: "" },
  { x: 70, y: 62, z: 20, label: "" },
  { x: 8, y: 52, z: -320, label: "" },
  { x: 93, y: 55, z: -300, label: "" },
];
const EDGES: [number,number][] = [[0,1],[1,2],[0,3],[3,1],[1,4],[4,2],[5,0],[2,6]];
const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function Intro({ onEnter }: { onEnter: () => void }) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const move = (event: PointerEvent) => {
      el.style.setProperty("--px", String(event.clientX / window.innerWidth - 0.5));
      el.style.setProperty("--py", String(event.clientY / window.innerHeight - 0.5));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const element = canvas.current;
    const ctx = element?.getContext("2d");
    if (!element || !ctx) return;
    let frame = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { element.width = element.clientWidth * dpr; element.height = element.clientHeight * dpr; };
    resize(); window.addEventListener("resize", resize);
    const particles = Array.from({length: 72}, () => ({ x: Math.random(), y: Math.random(), z: Math.random(), speed: 0.00015 + Math.random()*0.0005, phase: Math.random()*6.28 }));
    const still = reducedMotion();
    const draw = () => {
      ctx.clearRect(0,0,element.width,element.height);
      for (const p of particles) {
        if (!still) { p.y -= p.speed * (0.5+p.z); p.phase += 0.01; if (p.y < -0.02) p.y = 1.02; }
        ctx.globalAlpha = (0.22+p.z*0.55)*(0.6+0.4*Math.sin(p.phase));
        ctx.fillStyle = p.z > 0.82 ? "#F4B942" : "#35C6D9";
        ctx.beginPath(); ctx.arc((p.x+Math.sin(p.phase)*0.004)*element.width,p.y*element.height,(0.6+p.z*1.8)*dpr,0,Math.PI*2); ctx.fill();
      }
      if (!still) frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize",resize); };
  }, []);

  const enter = () => { if (leaving) return; setLeaving(true); window.setTimeout(onEnter, reducedMotion() ? 250 : 1300); };

  return <section ref={root} aria-labelledby="intro-title" className={`intro fixed inset-0 z-20 overflow-hidden bg-background ${leaving ? "intro-leaving" : ""}`}>
    <div className="intro-stage" aria-hidden="true">
      <div className="intro-sky"/><div className="intro-horizon"/><div className="intro-floor"/>
      <div className="intro-net">
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">{EDGES.map(([a,b])=>{const A=NODES[a]!,B=NODES[b]!;return <line key={`${a}-${b}`} x1={A.x} y1={A.y} x2={B.x} y2={B.y} className="intro-edge" vectorEffect="non-scaling-stroke"/>;})}</svg>
        {NODES.map((node,i)=><div key={i} className="intro-node" style={{left:`${node.x}%`,top:`${node.y}%`,"--z":`${node.z}px`,animationDelay:`${i*-0.9}s`} as CSSProperties}><span className="intro-node-core"/>{node.label && <span className="intro-node-label">{node.label}</span>}</div>)}
      </div>
      <canvas ref={canvas} className="absolute inset-0 size-full"/>
    </div>
    <div className="intro-content relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
      <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-accent/70 bg-background/70 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-accent backdrop-blur sm:text-sm"><span className="rounded border border-accent px-1.5 text-[10px]">SIM</span>SIMULATION ONLY · No real action taken</p>
      <div className="intro-shield" aria-hidden="true">{[0,1,2].map(layer=><svg key={layer} viewBox="0 0 32 32" className="intro-shield-layer" style={{"--l":layer} as CSSProperties}><path d="M16 2 L28 7 V16 C28 23 22 28 16 30 C10 28 4 23 4 16 V7 Z" fill={layer===0?"color-mix(in oklab, var(--primary) 10%, transparent)":"none"} stroke="var(--primary)" strokeWidth={layer===0?1.4:0.5} strokeOpacity={1-layer*0.35}/>{layer===0&&<path d="M11 16 L15 20 L22 12" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}</svg>)}</div>
      <h1 id="intro-title" className="mt-8 font-display text-6xl font-semibold tracking-tight sm:text-8xl">BASTION</h1>
      <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">Digital Twin for Safe Incident Response. Rehearse a decision on a simulated copy of your services before anything real is touched.</p>
      <button onClick={enter} disabled={leaving} className="intro-cta mt-10 inline-flex items-center gap-3 rounded-full border border-primary bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03] disabled:opacity-80">{leaving?"Entering the twin…":"Enter Simulation"}<span aria-hidden="true">→</span></button>
      <p className="mt-5 font-mono text-xs text-muted-foreground">Illustrative scenario · synthetic data · 5 steps</p>
    </div>
  </section>;
}

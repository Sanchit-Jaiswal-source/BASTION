import type { LinkState, NodeState, Severity } from "../../data/scenario";

export const sevStyle: Record<Severity, { chip: string; dot: string; label: string }> = {
  low: { chip: "border-border text-muted-foreground", dot: "bg-muted-foreground", label: "Low" },
  medium: { chip: "border-accent/50 text-accent", dot: "bg-accent", label: "Medium" },
  high: { chip: "border-destructive/60 text-destructive", dot: "bg-destructive", label: "High" },
};
export const nodeStyle: Record<NodeState, { box: string; tag: string; dot: string; label: string }> = {
  normal: { box: "border-border", tag: "text-success", dot: "bg-success", label: "Healthy" },
  suspected: { box: "border-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_14%,transparent)]", tag: "text-accent", dot: "bg-accent", label: "Suspected" },
  degraded: { box: "border-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_14%,transparent)]", tag: "text-accent", dot: "bg-accent", label: "Degraded" },
  review: { box: "border-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_14%,transparent)]", tag: "text-accent", dot: "bg-accent", label: "Review hold" },
  unavailable: { box: "border-destructive shadow-[0_0_0_4px_color-mix(in_oklab,var(--destructive)_14%,transparent)]", tag: "text-destructive", dot: "bg-destructive", label: "Unavailable" },
  unchanged: { box: "border-border", tag: "text-muted-foreground", dot: "bg-muted-foreground", label: "Unchanged" },
  protected: { box: "border-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_14%,transparent)]", tag: "text-primary", dot: "bg-primary", label: "Credential blocked" },
};
const linkStyle: Record<LinkState, { color: string; text: string; label: string; flowing: boolean }> = {
  normal: { color: "var(--primary)", text: "text-primary", label: "Flowing", flowing: true },
  suspect: { color: "var(--accent)", text: "text-accent", label: "Under review", flowing: true },
  cut: { color: "var(--destructive)", text: "text-destructive", label: "Blocked", flowing: false },
  filtered: { color: "var(--primary)", text: "text-primary", label: "Credential requests blocked", flowing: true },
  limited: { color: "var(--accent)", text: "text-accent", label: "Rate limited", flowing: true },
  review: { color: "var(--accent)", text: "text-accent", label: "Records held for review", flowing: true },
};
export function Arrow({ state, label }: { state: LinkState; label: string }) {
  const s = linkStyle[state];
  const line = (x1: number, y1: number, x2: number, y2: number) => <>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={s.color} strokeOpacity=".25" strokeWidth="2.5" />
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={s.color} strokeWidth="2.5" strokeDasharray={s.flowing ? "6 6" : "3 7"} strokeLinecap="round" className={s.flowing ? "animate-flow" : ""} />
  </>;
  return <div className="flex shrink-0 items-center justify-center gap-3 py-2 md:w-36 md:flex-col md:gap-2 md:py-0">
    <svg viewBox="0 0 120 24" className="hidden h-6 w-full md:block" aria-hidden>{line(4,12,104,12)}<path d="M104 5 L116 12 L104 19 Z" fill={s.color}/>{!s.flowing && <path d="M48 4 L62 20 M62 4 L48 20" stroke={s.color} strokeWidth="2.5"/>}</svg>
    <svg viewBox="0 0 24 56" className="h-14 w-6 shrink-0 md:hidden" aria-hidden>{line(12,2,12,42)}<path d="M5 42 L12 54 L19 42 Z" fill={s.color}/>{!s.flowing && <path d="M5 16 L19 30 M19 16 L5 30" stroke={s.color} strokeWidth="2.5"/>}</svg>
    <p className="text-left leading-tight md:text-center"><span className="block text-xs font-medium">{label}</span><span className={`block text-[11px] font-semibold ${s.text}`}>{s.label}</span></p>
  </div>;
}
export function Legend() {
  const items: [string,string][] = [["bg-success","Healthy"],["bg-accent","Suspected / degraded / review"],["bg-primary","Credential blocked"],["bg-destructive","Unavailable / blocked"]];
  return <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground" aria-label="Map legend">{items.map(([c,l])=><li key={l} className="flex items-center gap-1.5"><span className={`size-2 rounded-full ${c}`} aria-hidden/>{l}</li>)}</ul>;
}
export function Logo() {
  return <svg viewBox="0 0 32 32" className="size-10 shrink-0" aria-hidden><path d="M16 2 L28 7 V16 C28 23 22 28 16 30 C10 28 4 23 4 16 V7 Z" fill="none" stroke="var(--primary)" strokeWidth="2"/><path d="M11 16 L15 20 L22 12" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

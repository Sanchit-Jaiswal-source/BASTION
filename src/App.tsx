import { useState } from "react";
import { BastionSecurity } from "./components/bastion/BastionSecurity";
import { Intro } from "./components/bastion/Intro";
import { ScenarioLab } from "./components/bastion/ScenarioLab";
import { Logo } from "./components/bastion/parts";
import { Marketplace } from "./components/marketplace/Marketplace";
import { createSimulation, getResponses, type ScenarioId, type SimulationState } from "./data/lab";
import { type ResponseId } from "./data/scenario";

type AppView = "shop" | "lab" | "security";

export default function App() {
  const [view, setView] = useState<AppView>("security");
  const [introVisible, setIntroVisible] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedResponse, setSelectedResponse] = useState<ResponseId | null>(null);
  const [incident, setIncident] = useState<SimulationState | null>(() => createSimulation("credential-abuse", "walkthrough"));
  const checkoutUnavailable = incident?.services.payment === "unavailable" || incident?.links["portal-payment"] === "cut";

  const scrollToTop = () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
  const showView = (next: AppView) => {
    setView(next);
    scrollToTop();
  };
  const showStep = (next: number) => {
    setStep(next);
    scrollToTop();
  };

  const startScenario = (scenarioId: ScenarioId) => {
    setIncident(createSimulation(scenarioId));
    setSelectedResponse(null);
    setStep(1);
    scrollToTop();
  };

  const resetSimulation = () => {
    setIncident(null);
    setSelectedResponse(null);
    setStep(1);
    scrollToTop();
  };

  const selectResponse = (responseId: ResponseId) => {
    if (incident?.appliedResponse) return;
    setSelectedResponse(responseId);
    setIncident((current) => current ? { ...current, selectedResponse: responseId } : current);
  };

  const applyResponse = () => {
    if (!incident || !selectedResponse || incident.appliedResponse) return;
    const option = getResponses(incident.scenarioId).find(({ id }) => id === selectedResponse);
    if (!option) return;

    setIncident((current) => {
      if (!current || current.appliedResponse) return current;
      return {
        ...current,
        services: { ...option.nodes },
        links: { ...option.links },
        appliedResponse: option.id,
        audit: [...current.audit, {
          id: `BASTION-AUDIT-${current.audit.length + 1}`,
          time: current.events.length ? `After ${current.events[current.events.length - 1]!.time}` : "Local simulation",
          actor: "BASTION Security",
          action: `Operator-approved: ${option.label}`,
          detail: `Applied to “${current.title}” in the local digital twin only. No external service, real credential, payment, or order was accessed or changed.`,
        }],
      };
    });
  };

  if (introVisible) return <Intro onEnter={() => { setIntroVisible(false); setView("security"); setStep(1); }} />;

  return <div className="workspace min-h-screen flex flex-col">
    <div role="note" className="sim-banner"><span className="sim-chip">LOCAL</span> LOCAL SIMULATION ONLY · no production services connected or changed</div>
    <header className="app-header app-shell-header">
      <button className="brand-button" onClick={() => showView("security")} aria-label="Open BASTION Security">
        <Logo />
        <span><strong>BASTION</strong><small>Digital twin · local demonstration</small></span>
      </button>
      <nav className="product-nav" aria-label="Application areas">
        <button className={`product-nav-link ${view === "shop" ? "active" : ""}`} onClick={() => showView("shop")} aria-current={view === "shop" ? "page" : undefined}><span aria-hidden="true">✳</span> NOVA Market</button>
        <button className={`product-nav-link ${view === "lab" ? "active" : ""}`} onClick={() => showView("lab")} aria-current={view === "lab" ? "page" : undefined}><span aria-hidden="true">◉</span> Scenario Lab</button>
        <button className={`product-nav-link ${view === "security" ? "active" : ""}`} onClick={() => showView("security")} aria-current={view === "security" ? "page" : undefined}><span aria-hidden="true">⬡</span> Bastion Security</button>
      </nav>
    </header>

    <div hidden={view !== "shop"}><Marketplace active={view === "shop"} checkoutUnavailable={checkoutUnavailable} onOpenShop={() => showView("shop")} /></div>
    <div hidden={view !== "lab"}><ScenarioLab incident={incident} onRun={startScenario} onReset={resetSimulation} onOpenBastion={() => { setSelectedResponse(null); showStep(1); showView("security"); }} /></div>
    <div hidden={view !== "security"}><BastionSecurity
      incident={incident}
      step={step}
      selected={selectedResponse}
      onStep={showStep}
      onSelect={selectResponse}
      onApply={applyResponse}
      onReset={resetSimulation}
      onWelcome={() => { scrollToTop(); setIntroVisible(true); }}
      onOpenLab={() => showView("lab")}
      onLoadWalkthrough={() => startScenario("credential-abuse")}
    /></div>
    <footer className="app-footer"><span>BASTION × NOVA</span><span>Frontend-only demonstration · synthetic local data · no backend or external calls</span></footer>
  </div>;
}

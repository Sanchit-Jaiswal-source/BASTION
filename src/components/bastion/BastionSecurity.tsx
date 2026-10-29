import type { ReactNode } from "react";
import { Arrow, Legend, nodeStyle, sevStyle } from "./parts";
import {
  getResponses,
  getScenario,
  scenarioDefinitions,
  simulationBaseline,
  type SimulationState,
} from "../../data/lab";
import { links, services, type ResponseId, type ResponseOption } from "../../data/scenario";

const STEPS = ["Welcome", "Briefing", "Topology", "Responses", "Outcome"];

export function BastionSecurity({ incident, step, selected, onStep, onSelect, onApply, onReset, onWelcome, onOpenLab, onLoadWalkthrough }: {
  incident: SimulationState | null;
  step: number;
  selected: ResponseId | null;
  onStep: (step: number) => void;
  onSelect: (id: ResponseId) => void;
  onApply: () => void;
  onReset: () => void;
  onWelcome: () => void;
  onOpenLab: () => void;
  onLoadWalkthrough: () => void;
}) {
  const options = incident ? getResponses(incident.scenarioId) : scenarioDefinitions[0]!.responses;
  const option = options.find((response) => response.id === selected) ?? null;

  const go = (next: number) => onStep(Math.max(1, Math.min(4, next)));

  return <section className="security-content" aria-labelledby="security-page-title">
    <div className="security-topline"><div><p className="eyebrow">BASTION SECURITY · OPERATOR CONTROLLED</p><h1 id="security-page-title">Incident response twin</h1></div><div className="security-incident-id"><span>{incident ? "MOCK INCIDENT" : "SIMULATION BASELINE"}</span><strong>{!incident ? "NO ACTIVE EVENT" : incident.source === "local-lab" ? `LAB-${incident.scenarioId.toUpperCase()}` : "SIM-INC-0427"}</strong></div></div>
    <nav className="step-nav security-steps" aria-label="Bastion walkthrough steps">
      {STEPS.map((label, index) => {
        const target = index;
        const active = target === 0 ? false : step === target;
        const done = target > 0 && target < step;
        return <button key={label} onClick={() => target === 0 ? onWelcome() : go(target)} className={`step-pill ${active ? "active" : done ? "done" : ""}`} aria-current={active ? "step" : undefined}>
          <span className="step-num">{index + 1}</span><span className="step-label">{label}</span>
        </button>;
      })}
    </nav>
    <div className="security-local-note" role="note">Illustrative digital twin only · no production service is connected or changed.</div>

    <main className="main-content" key={step}>
      <div className="page-enter">
        {step === 1 && <Briefing incident={incident} onOpenLab={onOpenLab} onLoadWalkthrough={onLoadWalkthrough} />}
        {step === 2 && <Topology incident={incident} selected={option} />}
        {step === 3 && <Compare incident={incident} options={options} selected={selected} onSelect={onSelect} />}
        {step === 4 && <Outcome incident={incident} option={option} onApply={onApply} onGoToResponses={() => go(3)} />}
      </div>
    </main>
    <footer className="bottom-nav">
      <button className="btn btn-outline" onClick={() => go(step - 1)} disabled={step <= 1}>← Previous</button>
      <div className="footer-middle"><span className="footer-selection">{incident?.appliedResponse ? "Response applied · audit recorded" : option ? `Option ${option.short} selected` : incident ? "No response selected" : "Load an incident to apply a response"}</span><button className="btn btn-quiet" onClick={onReset} disabled={!incident && !selected}>Reset simulation</button></div>
      <button className="btn btn-primary" onClick={() => go(step + 1)} disabled={step >= 4 || (step === 3 && !option)}>{step === 3 ? "Review outcome →" : "Next →"}</button>
    </footer>
  </section>;
}

function StepTitle({ n, title, note, children }: { n: number; title: string; note: string; children?: ReactNode }) {
  return <div className="step-title"><p className="eyebrow">STEP {n} OF 5 <span>· {note}</span></p><h2 tabIndex={-1}>{title}</h2>{children && <p className="step-description">{children}</p>}</div>;
}

function Briefing({ incident, onOpenLab, onLoadWalkthrough }: {
  incident: SimulationState | null;
  onOpenLab: () => void;
  onLoadWalkthrough: () => void;
}) {
  const events = incident?.events ?? [];
  const scenario = incident ? getScenario(incident.scenarioId) : null;
  return <>
    <StepTitle n={2} title={titleFromIncident(incident)} note={incident?.source === "local-lab" ? "Lab-generated synthetic events" : "Synthetic walkthrough"}>
      {incident ? `${scenario?.detection} ${incident.appliedResponse ? "A Bastion-owned response has been applied by the operator." : "Review the evidence, then select and explicitly apply a Bastion response."}` : "No event is currently seeded. Run a local scenario in Scenario Lab or load the original credential-abuse walkthrough."}
    </StepTitle>
    {!events.length ? <div className="empty-outcome"><p>No synthetic evidence yet. Bastion will show the shared event timeline here after the Lab emits a scenario.</p><div className="briefing-actions"><button className="btn btn-primary" onClick={onOpenLab}>Open Scenario Lab</button><button className="btn btn-outline" onClick={onLoadWalkthrough}>Load original walkthrough</button></div></div> : <>
      <div className="briefing-context"><span><strong>Source</strong>{incident?.source === "local-lab" ? "Scripted local scenario" : "Original Bastion illustrative walkthrough"}</span><span><strong>Detection</strong>{scenario?.detection}</span></div>
      <ol className="timeline-grid">{events.map((event) => {
        const severity = sevStyle[event.severity];
        return <li key={event.id} className="timeline-card card-rise"><div className="timeline-meta"><time>{event.time}</time><span className={`severity ${event.severity}`}>{severity.label}</span></div><span className={`severity-line ${event.severity}`} /><h3>{event.title}</h3><p>{event.detail}</p><div className="evidence"><code>{event.evidenceId}</code><span>synthetic</span></div></li>;
      })}</ol>
      {incident?.audit.length ? <AuditTrail incident={incident} /> : <p className="audit-empty">No Bastion response has been applied. Detection does not automatically contain this scenario.</p>}
    </>}
  </>;
}

function titleFromIncident(incident: SimulationState | null) {
  return incident?.title ?? "Waiting for a synthetic event";
}

function Topology({ incident, selected }: { incident: SimulationState | null; selected: ResponseOption | null }) {
  const nodes = incident?.services ?? simulationBaseline.nodes;
  const states = incident?.links ?? simulationBaseline.links;
  return <>
    <StepTitle n={3} title="Digital-twin service topology" note="Illustrative service model">
      {selected && incident ? `Current model state is shown below. Selected option ${selected.short} is only a preview until you apply it in Outcome.` : "NOVA Customer Portal / Storefront → Payment API / Checkout → Ledger / Order Records. Statuses show only local mock state."}
    </StepTitle>
    <section className="map-panel" aria-label="NOVA digital-twin service dependency map">
      <div className="map-background"><ol className="service-flow" aria-label="NOVA Customer Portal / Storefront to Payment API / Checkout to Ledger / Order Records">
        {services.map((service, index) => {
          const status = nodeStyle[nodes[service.id]];
          const link = links[index];
          return <li className="service-group" key={service.id}>
            <article className={`service-node ${status.box}`}><span className="service-index">SERVICE 0{index + 1}</span><h3>{service.name}</h3><p>{service.role}</p><span className={`node-state ${status.tag}`}><i className={status.dot} />{status.label}</span></article>
            {link && <Arrow state={states[link.id]} label={link.label} />}
          </li>;
        })}
      </ol></div>
      <Legend />
      <p className="map-note">All nodes and edge statuses are simulated. No live storefront, checkout, payment provider, or ledger is connected.</p>
      <OperationStatuses nodes={nodes} checkoutEdge={states["portal-payment"]} ledgerEdge={states["payment-ledger"]} />
    </section>
    {incident?.appliedResponse && <AuditTrail incident={incident} />}
  </>;
}

function OperationStatuses({ nodes, checkoutEdge, ledgerEdge }: {
  nodes: SimulationState["services"];
  checkoutEdge: SimulationState["links"]["portal-payment"];
  ledgerEdge: SimulationState["links"]["payment-ledger"];
}) {
  const browsing = nodes.portal === "unavailable" ? "Unavailable in model" : "Available";
  const checkout = nodes.payment === "unavailable" || checkoutEdge === "cut"
    ? "Unavailable in model"
    : nodes.payment === "degraded"
      ? "Degraded in model"
      : checkoutEdge === "limited"
        ? "Available · modeled rate limit active"
        : nodes.payment === "protected" || ledgerEdge === "filtered"
          ? "Available · mock credential filtered"
          : nodes.payment === "suspected"
            ? "Under review"
            : "Available";
  const orderRecords = nodes.ledger === "unavailable" || ledgerEdge === "cut"
    ? "Unavailable in model"
    : nodes.ledger === "review" || ledgerEdge === "review"
      ? "Bastion review hold active"
      : nodes.ledger === "suspected" || ledgerEdge === "suspect"
        ? "Flagged for review"
        : "Available";
  const operations = [
    { name: "Storefront browse", status: browsing, className: nodes.portal === "unavailable" ? "unavailable" : "available" },
    { name: "Checkout operation", status: checkout, className: checkout.includes("Unavailable") ? "unavailable" : checkout === "Available" ? "available" : "attention" },
    { name: "Order-record writes", status: orderRecords, className: orderRecords === "Available" ? "available" : orderRecords.includes("Unavailable") ? "unavailable" : "attention" },
  ];
  return <section className="operation-status-panel" aria-label="Modeled operation availability">
    <p className="eyebrow">MODELED OPERATION AVAILABILITY</p>
    <div>{operations.map((operation) => <article key={operation.name} className={`operation-status ${operation.className}`}><span>{operation.name}</span><strong>{operation.status}</strong></article>)}</div>
  </section>;
}

function Compare({ incident, options, selected, onSelect }: {
  incident: SimulationState | null;
  options: ResponseOption[];
  selected: ResponseId | null;
  onSelect: (id: ResponseId) => void;
}) {
  const locked = incident?.appliedResponse !== null && incident?.appliedResponse !== undefined;
  return <>
    <StepTitle n={4} title="Compare response options" note="Bastion-owned responses">
      {incident ? `Review the modeled effects for “${incident.title}”. Selecting an option is only a preview; it does not change the service model.` : "Select a response to compare its illustrative impact. Load a scenario before applying any response."}
    </StepTitle>
    {!incident && <div className="security-inline-alert">No active event is seeded. A response cannot be applied until a local scenario or walkthrough is loaded.</div>}
    {locked && <div className="security-inline-alert">A Bastion response has already been applied. Reset or replay the scenario before trying another response.</div>}
    <div className="response-grid" role="radiogroup" aria-label="Bastion response options">
      {options.map((response, index) => {
        const active = response.id === selected;
        return <button key={response.id} role="radio" aria-checked={active} disabled={locked} tabIndex={active || (!selected && index === 0) ? 0 : -1} className={`response-card ${active ? "selected" : ""}`} onClick={() => onSelect(response.id)} onKeyDown={(event) => {
          if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) return;
          event.preventDefault();
          const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
          const nextIndex = (index + direction + options.length) % options.length;
          const next = options[nextIndex];
          if (next) {
            onSelect(next.id);
            (event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[nextIndex])?.focus();
          }
        }}>
          <div className="response-heading"><span className="option-letter">{response.short}</span><h3>{response.label}</h3><span className="radio-mark"><i /></span></div>
          <div className="tradeoff benefit"><span>BENEFIT</span><p>{response.benefit}</p></div>
          <div className="tradeoff impact"><span>IMPACT</span><p>{response.impact}</p></div>
          <p className="choose-note">{active ? locked ? "Applied · reset to replay" : "Selected · review outcome before applying" : "Select to preview →"}</p>
        </button>;
      })}
    </div>
  </>;
}

function Outcome({ incident, option, onApply, onGoToResponses }: {
  incident: SimulationState | null;
  option: ResponseOption | null;
  onApply: () => void;
  onGoToResponses: () => void;
}) {
  if (!incident || !option) return <><StepTitle n={5} title="Simulated outcome" note="Illustrative only">Load a local scenario and choose a response before reviewing an outcome.</StepTitle><div className="empty-outcome"><p>No active response is ready to apply.</p><button className="btn btn-primary" onClick={onGoToResponses}>Choose a response</button></div></>;
  const applied = incident.appliedResponse === option.id;
  const shownNodes = applied ? incident.services : option.nodes;
  const shownLinks = applied ? incident.links : option.links;
  return <>
    <StepTitle n={5} title={applied ? option.outcome.headline : "Review before applying"} note={applied ? "Bastion response applied" : "Operator approval required"}>
      {option.short} · {option.label}. {!applied && "This preview does not change the twin until you explicitly apply it below."}
    </StepTitle>
    <div className="outcome-grid">
      <section className="outcome-card"><p className="eyebrow">{applied ? "SIMULATED RESULT" : "PROPOSED SIMULATED RESULT"}</p><ul>{option.outcome.points.map((point) => <li key={point}><span>→</span>{point}</li>)}</ul>
        {!applied ? <div className="apply-response"><strong>Operator approval required</strong><p>Bastion will update only the modeled service and operation state shown here and append a Bastion-attributed audit event.</p><button className="btn btn-primary" onClick={onApply}>Apply response to local twin</button></div> : <p className="outcome-disclaimer"><strong>Illustrative simulation.</strong> The seeded scenario was contained only in this deterministic model. No real systems were accessed or protected.</p>}
      </section>
      <section className="outcome-card"><p className="eyebrow">{applied ? "TWIN STATE AFTER BASTION RESPONSE" : "PREVIEW · STATE AFTER RESPONSE"}</p><ol className="result-services">{services.map((service, index) => {
        const status = nodeStyle[shownNodes[service.id]];
        const link = links[index];
        return <li key={service.id} className="result-service-group"><article className={`result-service ${status.box}`}><strong>{service.name}</strong><span className={status.tag}>{status.label}</span></article>{link && <Arrow state={shownLinks[link.id]} label={link.label} />}</li>;
      })}</ol></section>
    </div>
    {applied && <AuditTrail incident={incident} />}
  </>;
}

function AuditTrail({ incident }: { incident: SimulationState }) {
  if (!incident.audit.length) return null;
  return <section className="audit-panel" aria-label="Bastion response audit trail"><div><p className="eyebrow">BASTION SECURITY · LOCAL AUDIT</p><h3>Operator-approved response</h3></div><ol>{incident.audit.map((entry) => <li key={entry.id}><time>{entry.time}</time><strong>{entry.actor}</strong><span>{entry.action}</span><p>{entry.detail}</p></li>)}</ol></section>;
}

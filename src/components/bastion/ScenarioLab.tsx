import { getScenario, scenarioDefinitions, type ScenarioId, type SimulationState } from "../../data/lab";

export function ScenarioLab({ incident, onRun, onReset, onOpenBastion }: {
  incident: SimulationState | null;
  onRun: (id: ScenarioId) => void;
  onReset: () => void;
  onOpenBastion: () => void;
}) {
  const isLabIncident = incident?.source === "local-lab";
  const definition = isLabIncident && incident ? getScenario(incident.scenarioId) : null;

  return <section className="lab-content" aria-labelledby="lab-title">
    <div className="lab-hero"><div><p className="eyebrow">BASTION · SCENARIO LAB</p><h1 id="lab-title">Seed an incident.<br /><em>Then decide.</em></h1><p>Lab emits scripted, synthetic event summaries into the local twin. Bastion Security is a separate operator-controlled defense surface.</p></div><div className="lab-stamp" aria-hidden="true"><span>LOCAL</span><strong>SIM</strong><span>ONLY</span></div></div>
    <div className="lab-safety" role="note"><strong>LOCAL SIMULATION ONLY — no external systems or real credentials used.</strong><span>Run creates local mock events only. No requests, production activity, real orders, payments, secrets, or credentials are used.</span></div>

    <div className="lab-section-heading"><div><p className="eyebrow">SCRIPTED EVENT GENERATORS</p><h2>Choose a scenario</h2></div><span>Deterministic · replayable · offline</span></div>
    <div className="lab-scenario-grid">{scenarioDefinitions.map((scenario) => {
      const active = isLabIncident && incident?.scenarioId === scenario.id;
      return <article className={`lab-scenario-card ${active ? "active" : ""}`} key={scenario.id}>
        <p className="lab-scenario-kicker">{scenario.label}</p><h3>{scenario.title}</h3><p>{scenario.summary}</p>
        <ul>{scenario.id === "credential-abuse" ? <>
          <li>Repeated failed attempts, then one suspicious mock success</li>
          <li>Uses only a named sample credential in the simulation</li>
        </> : scenario.id === "checkout-surge" ? <>
          <li>Generated event summaries only; no request flood</li>
          <li>Models checkout degradation, not live service load</li>
        </> : <>
          <li>Invented DEMO-ORD records for review</li>
          <li>Never reads or changes the marketplace cart or real orders</li>
        </>}</ul>
        <button className={`btn ${active ? "btn-outline" : "btn-primary"}`} onClick={() => onRun(scenario.id)}>{active ? "Replay scenario" : "Run local scenario"} <span aria-hidden="true">→</span></button>
      </article>;
    })}</div>

    <section className="lab-live" aria-live="polite">
      <div className="lab-section-heading"><div><p className="eyebrow">SHARED MOCK INCIDENT STATE</p><h2>{isLabIncident && incident ? incident.title : "Waiting for a local scenario"}</h2></div>{isLabIncident && <span className="lab-live-status"><i /> {incident.appliedResponse ? "Response applied in twin" : "Events seeded · awaiting Bastion review"}</span>}</div>
      {isLabIncident && incident && definition ? <>
        <p className="lab-detection">{definition.detection}</p>
        {definition.records && <div className="mock-orders" aria-label="Synthetic mock order records">{definition.records.map((record) => <article className="mock-order" key={record.id}><code>{record.id}</code><span>{record.status}</span><small>{record.reason}</small></article>)}</div>}
        <ol className="timeline-grid lab-timeline">{incident.events.map((event) => <li className="timeline-card card-rise" key={event.id}>
          <div className="timeline-meta"><time>{event.time}</time><span className={`severity ${event.severity}`}>{event.severity}</span></div><span className={`severity-line ${event.severity}`} /><h3>{event.title}</h3><p>{event.detail}</p><div className="evidence"><code>{event.evidenceId}</code><span>local · synthetic</span></div>
        </li>)}</ol>
        <div className="lab-hand-off"><span><strong>Lab stops here.</strong> It only seeds events. Bastion Security detects and applies responses after explicit operator approval.</span><button className="btn btn-primary" onClick={onOpenBastion}>Open Bastion Security →</button></div>
        <button className="btn btn-quiet lab-reset" onClick={onReset}>Reset full simulation to baseline</button>
      </> : <div className="lab-empty"><span className="lab-empty-mark">✳</span><div><h3>No Lab-generated incident yet</h3><p>{incident ? "The built-in Bastion walkthrough is separate from the Lab. Run one of the local scenarios above to create the shared mock incident." : "Choose any scenario above to generate its deterministic events locally and make the evidence available to Bastion Security."}</p></div></div>}
    </section>
    <p className="lab-limits"><strong>Limits:</strong> These deterministic examples demonstrate response choices only. They do not prove detection efficacy, secure real systems, or predict production outcomes.</p>
  </section>;
}

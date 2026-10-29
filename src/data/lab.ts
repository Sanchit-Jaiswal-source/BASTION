import {
  baseline,
  incident as credentialIncident,
  links,
  responses,
  services,
  timeline,
  type LinkId,
  type LinkState,
  type NodeState,
  type ResponseId,
  type ResponseOption,
  type ServiceId,
  type TimelineEvent,
} from "./scenario";

export type ScenarioId = "credential-abuse" | "checkout-surge" | "suspicious-orders";

export interface AuditEvent {
  id: string;
  time: string;
  actor: "BASTION Security";
  action: string;
  detail: string;
}

export interface SimulationState {
  scenarioId: ScenarioId;
  title: string;
  source: "walkthrough" | "local-lab";
  events: TimelineEvent[];
  services: Record<ServiceId, NodeState>;
  links: Record<LinkId, LinkState>;
  selectedResponse: ResponseId | null;
  appliedResponse: ResponseId | null;
  audit: AuditEvent[];
}

export interface ScenarioDefinition {
  id: ScenarioId;
  title: string;
  label: string;
  summary: string;
  detection: string;
  events: TimelineEvent[];
  records?: { id: string; status: string; reason: string }[];
  responses: ResponseOption[];
}

const isolation = responses.find(({ id }) => id === "isolate")!;
const revoke = responses.find(({ id }) => id === "revoke")!;

export const scenarioDefinitions: ScenarioDefinition[] = [
  {
    id: "credential-abuse",
    title: "Synthetic credential-abuse burst",
    label: "01 / Credential abuse",
    summary: "Scripted failed-attempt summaries followed by one suspicious mock success against a sample billing credential.",
    detection: "Repeated failures followed by a suspicious mock success associated with Payment API.",
    events: timeline,
    responses: [
      {
        ...isolation,
        short: "A",
        label: "Isolate Payment API host",
        benefit: "Stops modeled traffic to and from the suspected checkout host.",
        impact: "Storefront browsing remains available, but checkout stays unavailable until recovery.",
        outcome: {
          headline: "Modeled checkout is isolated",
          points: ["NOVA storefront browsing remains available.", "Payment API / Checkout is unavailable; checkout operations fail in the model.", "Ledger / Order Records is unchanged."],
        },
      },
      {
        ...revoke,
        short: "B",
        label: "Revoke the mock billing credential",
        benefit: "Blocks the seeded mock credential while leaving legitimate storefront browsing and checkout available.",
        impact: "Operations that rely on the mock credential are blocked until a replacement is modeled.",
        outcome: {
          headline: "Mock credential blocked; modeled checkout recovers",
          points: ["Only requests attributed to the seeded mock credential are blocked.", "Storefront browsing and modeled checkout remain available.", "Ledger / Order Records is unchanged."],
        },
      },
    ],
  },
  {
    id: "checkout-surge",
    title: "Checkout / request surge",
    label: "02 / Checkout surge",
    summary: "A few local summary events model a sudden checkout workload and degraded checkout. No requests or traffic are generated.",
    detection: "Synthetic checkout event summaries exceed the model's normal range; checkout is marked degraded.",
    events: [
      { id: "surge-1", time: "T+00:00", severity: "low", title: "Checkout summaries rise", detail: "Local scenario generator records a short burst of 240 summarized checkout events; no requests are sent.", evidenceId: "LAB-SUR-2001" },
      { id: "surge-2", time: "T+00:04", severity: "medium", title: "Modeled checkout latency increases", detail: "The deterministic service model marks Payment API / Checkout as degraded.", evidenceId: "LAB-SUR-2002" },
      { id: "surge-3", time: "T+00:08", severity: "high", title: "Checkout availability alert", detail: "The synthetic event summary crosses the local alert threshold; storefront browsing remains available.", evidenceId: "LAB-SUR-2003" },
    ],
    responses: [
      {
        id: "rate-limit", label: "Apply modeled checkout rate limit", short: "A",
        benefit: "Reduces the modeled surge and restores checkout availability.",
        impact: "Some checkout operations are delayed in the model while the control is active.",
        nodes: { portal: "normal", payment: "normal", ledger: "normal" },
        links: { "portal-payment": "limited", "payment-ledger": "normal" },
        outcome: {
          headline: "Modeled checkout recovers under rate limiting",
          points: ["A Bastion-owned modeled rate-limit control is recorded against the NOVA → Checkout edge.", "Checkout is available again in the twin; some modeled operations remain throttled.", "No network requests or real customer traffic were generated or changed."],
        },
      },
      {
        ...isolation,
        short: "B",
        label: "Isolate Payment API host",
        benefit: "Stops all modeled traffic to and from checkout.",
        impact: "Checkout remains unavailable; storefront browsing is unaffected.",
        outcome: {
          headline: "Checkout remains isolated",
          points: ["NOVA storefront browsing remains available.", "Payment API / Checkout is unavailable in the model.", "Ledger / Order Records is unchanged."],
        },
      },
    ],
  },
  {
    id: "suspicious-orders",
    title: "Suspicious order activity",
    label: "03 / Suspicious orders",
    summary: "Synthetic mock order records are surfaced for operator review. No marketplace cart or real order is read or changed.",
    detection: "Three local mock records have review indicators and are isolated from the real storefront cart.",
    events: [
      { id: "orders-1", time: "T+00:00", severity: "low", title: "Mock order records seeded", detail: "Three invented demo references are added to the isolated scenario record set.", evidenceId: "LAB-ORD-3001" },
      { id: "orders-2", time: "T+00:03", severity: "medium", title: "Order pattern flagged", detail: "The local rule marks the mock records for manual review; no order is submitted, cancelled, or fulfilled.", evidenceId: "LAB-ORD-3002" },
      { id: "orders-3", time: "T+00:06", severity: "high", title: "Review required", detail: "Ledger / Order Records is shown as under review until an operator chooses a response.", evidenceId: "LAB-ORD-3003" },
    ],
    records: [
      { id: "DEMO-ORD-0412", status: "Flagged", reason: "Synthetic repeat-checkout pattern" },
      { id: "DEMO-ORD-0413", status: "Flagged", reason: "Synthetic address-change pattern" },
      { id: "DEMO-ORD-0414", status: "Flagged", reason: "Synthetic review-window pattern" },
    ],
    responses: [
      {
        id: "hold-orders", label: "Place mock records on review hold", short: "A",
        benefit: "Flags only the three seeded mock records and keeps storefront and checkout available.",
        impact: "The mock records remain on hold until an operator clears the simulated review.",
        nodes: { portal: "normal", payment: "normal", ledger: "review" },
        links: { "portal-payment": "normal", "payment-ledger": "review" },
        outcome: {
          headline: "Mock order records held for review",
          points: ["Three DEMO-ORD references are flagged in the local twin only.", "Storefront browsing and modeled checkout remain available.", "No real order, ledger entry, or marketplace cart is changed."],
        },
      },
      {
        ...isolation,
        short: "B",
        label: "Isolate Payment API host",
        benefit: "Stops modeled checkout traffic while the mock order pattern is reviewed.",
        impact: "Storefront browsing remains available, but checkout is unavailable in the model.",
        outcome: {
          headline: "Checkout is isolated while mock records are reviewed",
          points: ["Payment API / Checkout is unavailable in the model.", "NOVA storefront browsing remains available.", "The synthetic order references remain mock data; no real records are affected."],
        },
      },
    ],
  },
];

export const simulationBaseline = {
  nodes: { portal: "normal", payment: "normal", ledger: "normal" } as Record<ServiceId, NodeState>,
  links: { "portal-payment": "normal", "payment-ledger": "normal" } as Record<LinkId, LinkState>,
};

export function createSimulation(scenarioId: ScenarioId, source: SimulationState["source"] = "local-lab"): SimulationState {
  const definition = scenarioDefinitions.find(({ id }) => id === scenarioId);
  if (!definition) throw new Error(`Unknown local scenario: ${scenarioId}`);

  const serviceState = { ...simulationBaseline.nodes };
  const linkState = { ...simulationBaseline.links };
  if (scenarioId === "credential-abuse") {
    serviceState.payment = baseline.nodes.payment;
    linkState["payment-ledger"] = baseline.links["payment-ledger"];
  } else if (scenarioId === "checkout-surge") {
    serviceState.payment = "degraded";
    linkState["portal-payment"] = "suspect";
  } else {
    serviceState.ledger = "suspected";
    linkState["payment-ledger"] = "suspect";
  }

  return {
    scenarioId,
    title: definition.title,
    source,
    events: definition.events,
    services: serviceState,
    links: linkState,
    selectedResponse: null,
    appliedResponse: null,
    audit: [],
  };
}

export function getResponses(scenarioId: ScenarioId): ResponseOption[] {
  return scenarioDefinitions.find(({ id }) => id === scenarioId)?.responses ?? [];
}

export function getScenario(scenarioId: ScenarioId): ScenarioDefinition {
  const definition = scenarioDefinitions.find(({ id }) => id === scenarioId);
  if (!definition) throw new Error(`Unknown local scenario: ${scenarioId}`);
  return definition;
}

export const servicesDescription = `${services.map(({ name }) => name).join(" → ")}.`;
export const sampleIncidentTitle = credentialIncident.title;

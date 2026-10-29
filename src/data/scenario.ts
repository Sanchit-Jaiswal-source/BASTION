// Illustrative mock scenario. All data is synthetic; nothing here touches real systems.
export type Severity = "low" | "medium" | "high";
export type ServiceId = "portal" | "payment" | "ledger";
export type LinkId = "portal-payment" | "payment-ledger";
export type ResponseId = "isolate" | "revoke" | "rate-limit" | "hold-orders";
export type NodeState = "normal" | "suspected" | "degraded" | "review" | "unavailable" | "unchanged" | "protected";
export type LinkState = "normal" | "suspect" | "cut" | "filtered" | "limited" | "review";

export interface TimelineEvent {
  id: string;
  time: string;
  severity: Severity;
  title: string;
  detail: string;
  evidenceId: string;
}
export interface Service { id: ServiceId; name: string; role: string }
export interface ResponseOption {
  id: ResponseId;
  label: string;
  short: string;
  benefit: string;
  impact: string;
  nodes: Record<ServiceId, NodeState>;
  links: Record<LinkId, LinkState>;
  outcome: { headline: string; points: string[] };
}

export const incident = {
  id: "SIM-INC-0427",
  title: "Suspicious sign-in on mock billing-service credential",
  status: "Investigating",
  credential: "billing-service",
};

export const timeline: TimelineEvent[] = [
  { id: "e1", time: "02:14:07 · SIM", severity: "low", title: "Failed sign-in attempts begin", detail: "The mock billing-service credential is rejected 3 times in the scripted local scenario.", evidenceId: "SYN-EV-1001" },
  { id: "e2", time: "02:16:42 · SIM", severity: "medium", title: "Repeated failures continue", detail: "Further synthetic failures against the same mock credential are summarized within the scenario.", evidenceId: "SYN-EV-1002" },
  { id: "e3", time: "02:18:05 · SIM", severity: "high", title: "Suspicious mock success follows failures", detail: "The scripted scenario records one mock success for the sample credential; no real authentication occurs.", evidenceId: "SYN-EV-1003" },
  { id: "e4", time: "02:18:31 · SIM", severity: "high", title: "Mock credential associated with Payment API", detail: "The local service model associates the sample credential with Payment API and flags the activity for review.", evidenceId: "SYN-EV-1004" },
];

export const services: Service[] = [
  { id: "portal", name: "NOVA Customer Portal / Storefront", role: "Product browsing and customer checkout entry point" },
  { id: "payment", name: "Payment API / Checkout", role: "Processes modeled checkout operations" },
  { id: "ledger", name: "Ledger / Order Records", role: "Stores modeled order records; no real orders are connected" },
];
export const links: { id: LinkId; from: ServiceId; to: ServiceId; label: string }[] = [
  { id: "portal-payment", from: "portal", to: "payment", label: "Checkout requests" },
  { id: "payment-ledger", from: "payment", to: "ledger", label: "Ledger writes" },
];
export const baseline = {
  nodes: { portal: "normal", payment: "suspected", ledger: "normal" } as Record<ServiceId, NodeState>,
  links: { "portal-payment": "normal", "payment-ledger": "suspect" } as Record<LinkId, LinkState>,
};
export const responses: ResponseOption[] = [
  {
    id: "isolate", label: "Isolate Payment API host", short: "A",
    benefit: "Stops all traffic to and from the suspected host.",
    impact: "NOVA storefront browsing remains available, but checkout is unavailable.",
    nodes: { portal: "normal", payment: "unavailable", ledger: "unchanged" },
    links: { "portal-payment": "cut", "payment-ledger": "cut" },
    outcome: { headline: "Payment API / Checkout becomes unavailable to NOVA", points: ["NOVA storefront browsing remains available.", "Checkout requests fail in the model.", "Ledger / Order Records remains unchanged."] },
  },
  {
    id: "revoke", label: "Revoke billing service credential", short: "B",
    benefit: "Blocks only requests that use the suspicious credential.",
    impact: "Services that rely on this credential need a new one.",
    nodes: { portal: "normal", payment: "protected", ledger: "unchanged" },
    links: { "portal-payment": "normal", "payment-ledger": "filtered" },
    outcome: { headline: "Requests using the mock billing credential are blocked", points: ["NOVA storefront browsing and modeled checkout remain available.", "Only the mock credential's requests are blocked.", "Ledger / Order Records remains unchanged."] },
  },
];

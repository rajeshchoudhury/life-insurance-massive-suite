import React, { useMemo, useState } from "react";

// Flexible step engine: insert new steps without rewriting flow.
export type StepId = "lead" | "needs" | "quote" | "knockouts" | "application" | "review";

type Step = {
  id: StepId;
  title: string;
  render: (ctx: FlowContext) => React.ReactNode;
};

type FlowContext = {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  next: () => void;
  back: () => void;
};

export function Flow() {
  const [idx, setIdx] = useState(0);
  const [state, setState] = useState({
    lead: { firstName: "", lastName: "", email: "" },
    needs: { goal: "income-protection" },
    quote: { productType: "TERM", faceAmount: 500000, age: 35, state: "TX", tobaccoUse: "NO", gender: "M" },
    knockouts: { declined: false },
    application: { answers: {} as Record<string, string> }
  });

  const steps: Step[] = useMemo(
    () => [
      {
        id: "lead",
        title: "Lead",
        render: ({ state, setState, next }) => (
          <section>
            <h3>Lead</h3>
            <label>First name <input value={state.lead.firstName} onChange={(e) => setState((s: any) => ({ ...s, lead: { ...s.lead, firstName: e.target.value } }))} /></label><br />
            <label>Last name <input value={state.lead.lastName} onChange={(e) => setState((s: any) => ({ ...s, lead: { ...s.lead, lastName: e.target.value } }))} /></label><br />
            <label>Email <input value={state.lead.email} onChange={(e) => setState((s: any) => ({ ...s, lead: { ...s.lead, email: e.target.value } }))} /></label><br />
            <button onClick={next}>Continue</button>
          </section>
        )
      },
      {
        id: "needs",
        title: "Needs Assessment",
        render: ({ state, setState, next, back }) => (
          <section>
            <h3>Needs Assessment</h3>
            <label>
              Goal
              <select value={state.needs.goal} onChange={(e) => setState((s: any) => ({ ...s, needs: { ...s.needs, goal: e.target.value } }))}>
                <option value="income-protection">Income protection</option>
                <option value="mortgage">Mortgage payoff</option>
                <option value="legacy">Legacy / estate</option>
              </select>
            </label>
            <div style={{ marginTop: 12 }}>
              <button onClick={back}>Back</button> <button onClick={next}>Continue</button>
            </div>
          </section>
        )
      },
      {
        id: "quote",
        title: "Quote",
        render: ({ state, setState, next, back }) => (
          <section>
            <h3>Quote Inputs</h3>
            <label>Product <select value={state.quote.productType} onChange={(e) => setState((s: any) => ({ ...s, quote: { ...s.quote, productType: e.target.value } }))}><option>TERM</option><option>WHOLE</option></select></label><br />
            <label>Face Amount <input type="number" value={state.quote.faceAmount} onChange={(e) => setState((s: any) => ({ ...s, quote: { ...s.quote, faceAmount: Number(e.target.value) } }))} /></label><br />
            <label>Age <input type="number" value={state.quote.age} onChange={(e) => setState((s: any) => ({ ...s, quote: { ...s.quote, age: Number(e.target.value) } }))} /></label><br />
            <label>State <input value={state.quote.state} onChange={(e) => setState((s: any) => ({ ...s, quote: { ...s.quote, state: e.target.value } }))} /></label><br />
            <label>Tobacco <select value={state.quote.tobaccoUse} onChange={(e) => setState((s: any) => ({ ...s, quote: { ...s.quote, tobaccoUse: e.target.value } }))}><option>NO</option><option>YES</option></select></label><br />
            <div style={{ marginTop: 12 }}>
              <button onClick={back}>Back</button> <button onClick={next}>Continue</button>
            </div>
            <p style={{ marginTop: 12, opacity: 0.75 }}>
              Next: call backend `POST /api/v1/quotes` and display premium + available rate classes.
            </p>
          </section>
        )
      },
      {
        id: "knockouts",
        title: "Knockout Questions",
        render: ({ state, setState, next, back }) => (
          <section>
            <h3>Knockout Questions</h3>
            <label>
              Any immediate disqualifiers?
              <input type="checkbox" checked={state.knockouts.declined} onChange={(e) => setState((s: any) => ({ ...s, knockouts: { ...s.knockouts, declined: e.target.checked } }))} />
            </label>
            <div style={{ marginTop: 12 }}>
              <button onClick={back}>Back</button> <button onClick={next} disabled={state.knockouts.declined}>Continue</button>
            </div>
          </section>
        )
      },
      {
        id: "application",
        title: "Application",
        render: ({ state, setState, next, back }) => (
          <section>
            <h3>Application</h3>
            <p>Example reflexive question: if tobacco is YES, ask frequency.</p>
            {state.quote.tobaccoUse === "YES" && (
              <label>
                Tobacco frequency
                <input value={state.application.answers.tobaccoFrequency ?? ""} onChange={(e) => setState((s: any) => ({ ...s, application: { ...s.application, answers: { ...s.application.answers, tobaccoFrequency: e.target.value } } }))} />
              </label>
            )}
            <div style={{ marginTop: 12 }}>
              <button onClick={back}>Back</button> <button onClick={next}>Continue</button>
            </div>
          </section>
        )
      },
      {
        id: "review",
        title: "Review & Submit",
        render: ({ state, back }) => (
          <section>
            <h3>Review</h3>
            <pre style={{ background: "#f6f6f6", padding: 12, borderRadius: 8, overflow: "auto" }}>{JSON.stringify(state, null, 2)}</pre>
            <button onClick={back}>Back</button>
            <button style={{ marginLeft: 8 }} onClick={() => alert("Submit: wire to /applications endpoint")}>Submit</button>
          </section>
        )
      }
    ],
    []
  );

  const ctx: FlowContext = {
    state,
    setState,
    next: () => setIdx((i) => Math.min(i + 1, steps.length - 1)),
    back: () => setIdx((i) => Math.max(i - 1, 0))
  };

  const step = steps[idx];

  return (
    <div>
      <h2>Guided Flow</h2>
      <p>Step {idx + 1} / {steps.length}: <strong>{step.title}</strong></p>
      {step.render(ctx)}
    </div>
  );
}

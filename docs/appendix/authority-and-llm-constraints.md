🌐 [日本語](../ja/appendix/authority-and-llm-constraints.md)

# Authority and LLM Constraints — Why Durable Delegation Is Hard

> [!NOTE]
> Durably delegating authority to an agent presupposes three capabilities: **retaining principles**, **self-judging scope**, and **self-reporting deviation**. This page shows how the LLM's structural problems erode each of the three — and why the continued dominance of harnesses that repeat per-action permission is not design conservatism but a **rational response to structural constraints**.

## About This Document

The sister site's [Permission vs. Authority](https://shuji-bonji.github.io/ai-agent-architecture/strategy/permission-vs-authority) organized, in **design vocabulary (What/How)**, the difference between what harness-type agents (repeated per-action permission) and doctrine-type agents (durable delegated authority) request at the boundary. This page covers the **Why** side: why it is hard to hand an LLM durable authority, explained in the vocabulary of the eight structural problems.

> [!TIP]
> **In three lines**
>
> - Delegating authority presupposes a stable meta-judgment: "measuring the scope of one's own principles."
> - Instruction Decay, Sycophancy, and Context Rot erode precisely that presupposition.
> - So the dominance of repeated permission (harness) is not conservatism — it is a rational response to structure.

## Premise: Permission vs. Authority

| | Permission | Authority |
| --- | --- | --- |
| Granularity | One-shot approval of an individual action | Durable grant of discretion over a domain |
| Basis of safety | External walls and approval flow | Principles internalized by the agent |

For the full structure, see the sister site's [Permission vs. Authority](https://shuji-bonji.github.io/ai-agent-architecture/strategy/permission-vs-authority). Only one point matters here: **in the authority model, the basis of safety migrates into the agent's internal state** (its retention and operation of principles). So "how much can the LLM's internal state be trusted" directly sets the ceiling on delegability.

## The Three Capabilities Durable Authority Requires

For delegated authority to work safely, the delegate must continuously maintain:

1. **Retaining principles** — keeping the principles that justify the delegation (objectives, constraints, judgment criteria) at the same weight across the full length of a task
2. **Self-judging scope** — accurately asking, at each action, "Is this within the scope of my principles?"
3. **Self-reporting deviation** — stopping work and reporting when it recognizes it is out of scope

Delegation works in human organizations because these three capabilities are (imperfectly but) stable. In LLMs, several of the eight problems erode them directly.

```mermaid
graph LR
  subgraph PROBLEM["LLM structural problems"]
    ID["Instruction<br/>Decay"]
    CR["Context Rot"]
    PS["Priority<br/>Saturation"]
    SYC["Sycophancy"]
    HAL["Hallucination"]
  end

  subgraph CAP["Three capabilities authority requires"]
    C1["Retaining<br/>principles"]
    C2["Self-judging<br/>scope"]
    C3["Self-reporting<br/>deviation"]
  end

  ID -->|weight of principles decays| C1
  CR -->|reference precision degrades| C1
  PS -->|priority over criteria saturates| C2
  SYC -->|skews toward judging "in scope"| C2
  SYC -->|collides with reporting limits| C3
  HAL -->|fabricates in-scope justifications| C3

  style ID fill:#f3f4f6,stroke:#374151,color:#000
  style CR fill:#fee2e2,stroke:#b91c1c,color:#000
  style PS fill:#fef9c3,stroke:#a16207,color:#000
  style SYC fill:#f3e8ff,stroke:#7c3aed,color:#000
  style HAL fill:#dbeafe,stroke:#1d4ed8,color:#000
  style C1 fill:#eff6ff,stroke:#1d4ed8,color:#1e40af
  style C2 fill:#eff6ff,stroke:#1d4ed8,color:#1e40af
  style C3 fill:#eff6ff,stroke:#1d4ed8,color:#1e40af
```

### 1. Retaining Principles × Instruction Decay / Context Rot

Through [Instruction Decay](../01-llm-structural-problems/instruction-decay.md), the effective weight of principles given at the start of a conversation decays over a long task. There is no structural guarantee that constraints agreed upon at delegation time still apply with the same strength fifty turns later. [Context Rot](../01-llm-structural-problems/context-rot.md) compounds this: the more the context grows, the worse the precision with which the principles themselves are referenced.

The permission model does not depend on this capability. Because a human outside approves each action, safety is preserved even if the agent's retention of principles collapses. **Only the authority model is directly exposed to this decay.**

### 2. Self-Judging Scope × Sycophancy / Priority Saturation

The self-check "Is this within the scope of my principles?" is a judgment that can conflict with what the user wants. [Sycophancy](../01-llm-structural-problems/sycophancy.md) skews this judgment **systematically** toward "if the user wants it, it's probably in scope." What makes this serious is that it is not random error — it is a bias that always tips toward expanding the delegation.

[Priority Saturation](../01-llm-structural-problems/priority-saturation.md) adds to this: as principles, constraints, and instructions accumulate, the priority over "which criterion applies right now" saturates, destabilizing scope judgment itself.

### 3. Self-Reporting Deviation × Sycophancy / Hallucination

Self-reporting a deviation means "reporting one's own limits and failures and stopping work" — a head-on collision with Sycophancy's preference for compliance and continuation. [Hallucination](../01-llm-structural-problems/hallucination.md) adds the risk of **generating post-hoc justifications** that an already-taken action was in scope. A design that relies solely on the agent's self-report to detect deviation places the detector in the most fragile possible location.

## Doctrine-Type Failure Arises from Structure, Not Character

In the sister site's framing, the doctrine-type failure mode is "expansive interpretation of authority — deviation." Given the above, this is not a matter of the agent's "character" or insufficient training: it is the **necessary consequence of the erosion of the three capabilities**.

| Eroded capability | Eroding structural problems | Resulting failure |
| --- | --- | --- |
| Retaining principles | Instruction Decay, Context Rot | "Forgets" the constraints set at delegation and deviates |
| Self-judging scope | Sycophancy, Priority Saturation | Conveniently expands its interpretation of scope |
| Self-reporting deviation | Sycophancy, Hallucination | Keeps running while deviating, generating justifications |

> [!IMPORTANT]
> Harnesses (repeated permission) dominate not because agents are distrusted, nor because the design philosophy is conservative. It is the rational choice, under structural constraints, of **not letting safety depend on the agent's internal state**. This is one more instance of this site's consistent pattern: the prescription is justified by the diagnosis.

## Mitigations — Re-injection and External Detection That Support Delegation

The erosion of the three capabilities is structural, but it can be mitigated. Every mitigation points in the same direction: **reduce dependence on internal state and support it with external devices**.

| Capability supported | Mitigations (Claude Code examples) |
| --- | --- |
| Retaining principles | Persistent residency via `CLAUDE.md`, per-loop instruction re-injection, context cleanup via `/compact` |
| Self-judging scope | Explicit scoping of principles (MUST/SHOULD), mechanical definition of "scope" via allowlists |
| Self-reporting deviation | Mechanical detection via Hooks, sub-agent quality gates, audit logs |

> [!CAUTION]
> These are **mitigations, not solutions**. The erosion of the three capabilities cannot be reduced to zero, so the further you move toward the right end of the delegation spectrum (broad authority), the more mitigation layers become mandatory. "We wrote a doctrine, so `bypassPermissions` is safe" is not a claim the structure supports.

## Related Pages

- [Judgment Drift](./judgment-drift.md) — delegating the **power to issue a verdict** rather than discretion over actions: the three layers of irreproducibility and the limits of `temperature=0`
- [Harness and LLM Constraints](./harness-and-llm-constraints.md) — the four harness elements mapped to the eight problems (companion to this page)
- [Problems × Countermeasures Map](./problem-countermeasure-map.md) — the eight problems × Claude Code features
- [Part 1: Structural Problems](../01-llm-structural-problems/) — overview of the eight problems
- [Instruction Decay](../01-llm-structural-problems/instruction-decay.md) / [Sycophancy](../01-llm-structural-problems/sycophancy.md) / [Context Rot](../01-llm-structural-problems/context-rot.md) — details of the main eroding problems

## 🔗 Going Deeper: Designing Gradual Delegation from Permission to Authority

This page covered **why** durable authority is hard to hand over (Why). For **how** to delegate gradually from permission to authority (What/How), see the sister site.

- [ai-agent-architecture / Permission vs. Authority](https://shuji-bonji.github.io/ai-agent-architecture/strategy/permission-vs-authority) — the locus of boundary detection, the symmetry of failure modes, and the delegation spectrum implemented by Claude Code's permission modes

---

> **Next**: [Judgment Drift](./judgment-drift.md)
> **Previous**: [Harness and LLM Constraints](./harness-and-llm-constraints.md)

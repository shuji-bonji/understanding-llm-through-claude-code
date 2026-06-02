🌐 [日本語](../ja/appendix/harness-and-llm-constraints.md)

# Harness and LLM Constraints — Diagnose Before You Prescribe

> [!NOTE]
> The four elements of harness engineering can be read as symptomatic treatments for the eight structural constraints of LLMs. This page makes explicit which structural problem each harness prescription is responding to.

## About This Document

"**Harness engineering**" (Action / Context / Guardrails / Orchestration) is the implementation prescription for **operating** an LLM. This page reverse-maps each prescription onto the **LLM structural constraints** that lie behind it, using the 8-problem vocabulary.

> [!TIP]
> **In three lines**
>
> - The harness 4 elements = symptomatic treatments for the 8 problems.
> - Without knowing **why** the prescription is needed, you cannot judge when to apply it.
> - This page is "diagnosis before prescription."

## Reverse-Mapping Harness Onto the 8 Problems

Harness prescribes "give it memory" or "wrap it in a loop," but does not explain **why**. The table below organizes which harness element responds to which structural problem.

```mermaid
graph LR
  subgraph HARNESS["Harness 4 elements (prescription)"]
    H_A["Action"]
    H_C["Context"]
    H_G["Guardrails"]
    H_O["Orchestration"]
  end

  subgraph PROBLEM["LLM structural problems (diagnosis)"]
    KB["Knowledge<br/>Boundary"]
    CR["Context Rot"]
    LITM["Lost in<br/>the Middle"]
    HAL["Hallucination"]
    SYC["Sycophancy"]
    ID["Instruction<br/>Decay"]
    PS["Priority<br/>Saturation"]
  end

  H_A -->|post-training info| KB
  H_C -->|history externalization| CR
  H_C -->|escape mid-context loss| LITM
  H_G -->|stop fabrication| HAL
  H_G -->|stop sycophancy| SYC
  H_O -->|re-inject instructions| ID
  H_O -->|reduce instruction count| PS

  style H_A fill:#dbeafe,stroke:#1d4ed8,color:#000
  style H_C fill:#dbeafe,stroke:#1d4ed8,color:#000
  style H_G fill:#dbeafe,stroke:#1d4ed8,color:#000
  style H_O fill:#dbeafe,stroke:#1d4ed8,color:#000
  style CR fill:#fee2e2,stroke:#b91c1c,color:#000
  style LITM fill:#ffedd5,stroke:#c2410c,color:#000
  style PS fill:#fef9c3,stroke:#a16207,color:#000
  style HAL fill:#dbeafe,stroke:#1d4ed8,color:#000
  style SYC fill:#f3e8ff,stroke:#7c3aed,color:#000
  style KB fill:#e8d5b7,stroke:#78350f,color:#000
  style ID fill:#f3f4f6,stroke:#374151,color:#000
```

## Structural Problems Each Harness Element Addresses

### Action (Tool Integration)

> [!NOTE]
> Connection points to external APIs, databases, file systems, browsers, etc. MCP is its representative implementation.

| Structural Problem Addressed | Effect |
| --- | --- |
| **Knowledge Boundary** | Fetch information unknown to the training cut-off or evolving in real time |
| **Hallucination** (partial) | Ground the model in trusted external sources to stop fabrication |

> [!IMPORTANT]
> Action reaches *outside* the LLM's knowledge boundary. It is essential for **information not in training data or information that changes over time**. See [Part 6: Tool Context — MCP](../06-tool-context/).

### Context (Memory)

> [!NOTE]
> Mechanisms that retain past context, business background, and agent action history, and hand them back to the LLM when needed.

| Structural Problem Addressed | Effect |
| --- | --- |
| **Context Rot** | Externalize history and control how much is injected into the context window |
| **Lost in the Middle** | Inject only essential information near the tail to escape the U-curve trough |
| **Priority Saturation** (partial) | Reduce the total volume of simultaneously injected instructions and information |

> [!IMPORTANT]
> Simply "having memory" via harness is insufficient. You also need to design **which information is injected when and where** — see [Part 2: Context Window](../02-context-window/) through [Part 5: On-Demand Context](../05-on-demand-context/).

> [!WARNING]
> Bad memory design worsens Context Rot (re-loading the entire history is counterproductive). Memory only works when combined with **"expand only when invoked"** design — see the [Skills layer in the sister site](https://shuji-bonji.github.io/ai-agent-architecture/concepts/03-architecture).

### Guardrails (Safety Controls)

> [!NOTE]
> Safety devices that prevent leakage of confidential information and uncontrolled system damage.

| Structural Problem Addressed | Effect |
| --- | --- |
| **Hallucination** | Stop fabrication with **non-sycophantic verification**: compilers, tests, type checkers, etc. |
| **Sycophancy** | Break agreement bias through mechanical verification or cross-model QA |

> [!IMPORTANT]
> The core of Guardrails is **not letting the LLM verify itself**. Hooks ([Part 7: Runtime Layer](../07-runtime-layer/)) and compiler-like **non-sycophantic external mechanisms** are the effective counter to fabrication and agreement bias.

### Orchestration (Loop Control)

> [!NOTE]
> A continuous loop that decomposes tasks, lets the LLM think, executes, evaluates results, and decides the next action.

| Structural Problem Addressed | Effect |
| --- | --- |
| **Instruction Decay** | Re-inject instructions in each loop iteration to prevent decay over long tasks |
| **Priority Saturation** | Split tasks to reduce the instruction count per iteration |
| **Context Rot** (partial) | Isolate context per sub-task |

> [!IMPORTANT]
> Orchestration is intertwined with multi-session coordination ([Part 10](../10-multi-session/)). A design where **parallel splitting prevents any session from growing large** is structurally stronger than **running one long session in a loop**.

## Diagnose Before You Prescribe — Application Flow

> [!TIP]
> Rather than mechanically applying every harness prescription, **diagnose which structural problem your agent is suffering from** and choose prescriptions accordingly.

```mermaid
graph TB
  START(["What is your agent's<br/>symptom?"])

  S1{Instructions decay<br/>over long tasks}
  S2{Context window<br/>keeps growing}
  S3{Mid-context info<br/>gets lost}
  S4{Fabrication or<br/>sycophancy occurs}
  S5{Stale or unknown<br/>info is requested}

  S1 -->|diagnosis| ID["Instruction Decay<br/>Priority Saturation"]
  S2 -->|diagnosis| CR["Context Rot"]
  S3 -->|diagnosis| LITM["Lost in the Middle"]
  S4 -->|diagnosis| HS["Hallucination<br/>Sycophancy"]
  S5 -->|diagnosis| KB["Knowledge Boundary"]

  ID -->|prescription| RX1["Orchestration<br/>+ loop control"]
  CR -->|prescription| RX2["Context<br/>+ memory externalization"]
  LITM -->|prescription| RX3["Context<br/>+ inject at high-attention positions"]
  HS -->|prescription| RX4["Guardrails<br/>+ external verification"]
  KB -->|prescription| RX5["Action<br/>+ MCP / Tool"]

  START --> S1
  START --> S2
  START --> S3
  START --> S4
  START --> S5

  style ID fill:#f3f4f6,stroke:#374151,color:#000
  style CR fill:#fee2e2,stroke:#b91c1c,color:#000
  style LITM fill:#ffedd5,stroke:#c2410c,color:#000
  style HS fill:#dbeafe,stroke:#1d4ed8,color:#000
  style KB fill:#e8d5b7,stroke:#78350f,color:#000
  style RX1 fill:#eff6ff,stroke:#1d4ed8,color:#1e40af
  style RX2 fill:#eff6ff,stroke:#1d4ed8,color:#1e40af
  style RX3 fill:#eff6ff,stroke:#1d4ed8,color:#1e40af
  style RX4 fill:#eff6ff,stroke:#1d4ed8,color:#1e40af
  style RX5 fill:#eff6ff,stroke:#1d4ed8,color:#1e40af
```

## Where Harness Falls Short

Some constraints are not addressed — or only partially addressed — by the four harness elements.

| Structural Problem | Harness Response | Additional Measures Required |
| --- | --- | --- |
| **Prompt Sensitivity** | ❌ No direct prescription | Prompt structuring, benchmarks, A/B testing |
| **Instruction Decay** (severe) | ⚠️ Only loop re-injection | Always-loaded context (CLAUDE.md), conditional injection (`.claude/rules/`) |
| **Hallucination** (full eradication) | ⚠️ External verification stops, but does not eliminate | Structurally unavoidable. Full eradication is impossible. |

> [!CAUTION]
> Harness is a prescription for *operating* and **does not change the LLM's limits themselves**. Hallucination cannot be reduced to zero; sycophancy can be mitigated but never eliminated. Treat these as constraints to **accept and operate around at design time**.

## Related Pages

- [Problems × Countermeasures Map](./problem-countermeasure-map.md) — 8 problems × Claude Code features
- [Part 1: Structural Problems](../01-llm-structural-problems/) — overview of the 8 problems
- [Part 6: Tool Context — MCP](../06-tool-context/) — details on Action (MCP)
- [Part 7: Runtime Layer](../07-runtime-layer/) — details on Guardrails (Hooks)
- [Part 10: Multi-Session Coordination](../10-multi-session/) — the structurally stronger form of Orchestration

## 🔗 Go Deeper: Designing the Harness With the 5-Layer Model

This page covered **diagnosing harness elements through the 8 problems (Why)**. For **how to incorporate each harness element into design (What/How)**, see the sister site.

- [ai-agent-architecture / Harness Engineering Mapping](https://shuji-bonji.github.io/ai-agent-architecture/strategy/harness-engineering-mapping) — mapping onto the 5-layer model, and the Skills and Doctrine layers that harness does not cover

---

> **Next**: [Lifecycle × Config Map](./lifecycle-config-map.md)
> **Previous**: [Problems × Countermeasures Map](./problem-countermeasure-map.md)

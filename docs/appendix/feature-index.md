# Feature Index — Cross-feature cheatsheet

🌐 [日本語](../ja/appendix/feature-index.md)

> [!NOTE]
> One-page lookup of every configuration feature, when it loads, what problem it solves, and where to read more.

## Feature × Loading × Chapter

| Feature | When it loads | Lives in | Chapter | Topic page |
|---|---|---|---|---|
| **CLAUDE.md** | Session start (always) | Project / user / local | [Part 3](/03-always-loaded-context/) | [Topic](/topics/claude-md) |
| **Rules** | When a glob matches | `.claude/rules/` (typical) | [Part 4](/04-conditional-context/) | [Topic](/topics/rules) |
| **Skills** | LLM invokes by name | `.claude/skills/` | [Part 5](/05-on-demand-context/) | [Topic](/topics/skills-and-agents) |
| **Agents** | LLM (or user) spawns | Plugins / config | [Part 5](/05-on-demand-context/) | [Topic](/topics/skills-and-agents) |
| **MCP** | Tools always advertised, schemas via Tool Search | External servers | [Part 6](/06-tool-context/) | [Topic](/topics/mcp) |
| **Hooks** | Lifecycle event fires | `settings.json` | [Part 7](/07-runtime-layer/) | [Topic](/topics/hooks) |
| **Code Intelligence (LSP)** | On symbol query / live diagnostics | IDE / language server | [Part 9](/09-code-intelligence/) | [Topic](/topics/code-intelligence) |
| **Agent Teams** | Across sessions, project-scoped | Persistent sessions + shared artifact store | [Part 10](/10-multi-session/) | [Topic](/topics/agent-teams) |
| **Plugins** | Install time | Marketplaces | [Appendix](/appendix/plugins-and-marketplaces) | [Topic](/topics/plugins) |

## Feature × Structural Problem

Which feature is the primary tool for each of the 8 structural problems.

| Problem | Primary feature(s) | Why |
|---|---|---|
| [Context Rot](/01-llm-structural-problems/context-rot) | Rules, Skills, Tool Search, **Agent Teams** | Move material out of always-loaded context; Agent Teams keeps every session small |
| [Lost in the Middle](/01-llm-structural-problems/lost-in-the-middle) | `/compact`, Agents, **Agent Teams** | Keep context short; short per-session histories never form a "middle" |
| [Priority Saturation](/01-llm-structural-problems/priority-saturation) | CLAUDE.md (kept lean), Rules, **Agent Teams** | Fewer competing signals; one role per session |
| [Hallucination](/01-llm-structural-problems/hallucination) | MCP, **LSP** (Part 9), Agents | Ground in real data, real symbols, or isolated reasoning |
| [Sycophancy](/01-llm-structural-problems/sycophancy) | Hooks | Enforcement the LLM can't talk past |
| [Knowledge Boundary](/01-llm-structural-problems/knowledge-boundary) | MCP, **LSP**, Skills, Plugins | Inject capability beyond training cutoff; resolve project-private symbols |
| [Prompt Sensitivity](/01-llm-structural-problems/prompt-sensitivity) | Hooks, settings, Plugins | Deterministic behavior independent of phrasing; team-shared verified prompts |
| [Instruction Decay](/01-llm-structural-problems/instruction-decay) | CLAUDE.md, Rules, Hooks, Plugins | Re-inject or enforce outside the LLM; org conventions survive turnover |

## Feature × Visibility to the LLM

```mermaid
flowchart LR
    subgraph IN["Inside context (LLM sees)"]
        CMD["CLAUDE.md<br/>(always)"]
        RUL["Rules<br/>(on glob match)"]
        SKL["Skills<br/>(on invoke)"]
        MCPN["MCP tool names<br/>(always)"]
        MCPS["MCP schemas<br/>(via Tool Search)"]
        LSP["LSP responses<br/>(on symbol query)"]
    end
    subgraph OUT["Outside context (LLM never sees)"]
        HK["Hooks"]
        STG["settings.json"]
        PLG["Plugin loader"]
    end
    subgraph CROSS["Crosses session boundary"]
        ART["Artifact store<br/>(Agent Teams)"]
        QUE["Shared task queue<br/>(Agent Teams)"]
    end
    style CMD fill:#dbeafe,stroke:#1d4ed8,color:#000
    style RUL fill:#dbeafe,stroke:#1d4ed8,color:#000
    style SKL fill:#dbeafe,stroke:#1d4ed8,color:#000
    style MCPN fill:#dbeafe,stroke:#1d4ed8,color:#000
    style MCPS fill:#dbeafe,stroke:#1d4ed8,color:#000
    style LSP fill:#dbeafe,stroke:#1d4ed8,color:#000
    style HK fill:#f3f4f6,stroke:#374151,color:#000
    style STG fill:#f3f4f6,stroke:#374151,color:#000
    style PLG fill:#f3f4f6,stroke:#374151,color:#000
    style ART fill:#fef9c3,stroke:#a16207,color:#000
    style QUE fill:#fef9c3,stroke:#a16207,color:#000
```

## See also

- [Problem × Countermeasure Map](/appendix/problem-countermeasure-map)
- [Lifecycle × Config Map](/appendix/lifecycle-config-map)
- [Configuration Reference](/appendix/claude-code-config-reference)
- [Topics index](/topics/)

---

> **Previous**: [Lifecycle × Config Map](/appendix/lifecycle-config-map)
> **Next**: [Configuration Reference](/appendix/claude-code-config-reference)

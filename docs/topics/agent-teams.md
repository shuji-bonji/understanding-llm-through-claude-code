# Agent Teams — Multi-session coordination

🌐 [日本語](/ja/topics/agent-teams)

> [!NOTE]
> When one session — even with `/compact` and `/clear` — cannot hold a multi-week task without quality decay, the answer is not "a better session" but **several persistent sessions that talk to each other**. Where Part 5's Subagents are *delegated children*, Agent Teams are *peers* with their own lifespans.

## How it works

- Multiple **persistent** sessions, each with a bounded role (backend / frontend / QA / docs, or by stage / layer / feature).
- Sessions exchange messages via **direct messages**, a **shared task queue**, or an **artifact store** — chosen by how synchronous the work is.
- An optional **orchestrator** role routes work and arbitrates conflicts; it is a peer with a specific responsibility, not a structural parent.
- Durable state lives in the **artifact store**, not in any single session's history — so any session can be `/clear`-ed and rehydrate from artifacts.

## Related chapters

- [Part 10 — Multi-Session Coordination (overview)](/10-multi-session/)
- [Subagent vs Agent Team](/10-multi-session/subagent-vs-team)
- [Session Boundary Design](/10-multi-session/session-boundary-design)
- [Peer Messaging](/10-multi-session/peer-messaging)
- [Long-Running Tasks](/10-multi-session/long-running-tasks)

## Structural problems it addresses

Agent Teams hit three problems at once — the underlying remedy (*keep every session small*) is exactly what each one individually demands.

- [Context Rot](/01-llm-structural-problems/context-rot) — root-cause fix. No single session ever holds the whole project.
- [Lost in the Middle](/01-llm-structural-problems/lost-in-the-middle) — each session's history stays short, so the U-shaped recall curve never forms.
- [Priority Saturation](/01-llm-structural-problems/priority-saturation) — responsibilities split across sessions; each carries instructions for one role, not all of them.

## See also

- [Topic: Skills & Agents](/topics/skills-and-agents) — start here if a single-shot Subagent is enough; only reach for Agent Teams when it isn't.
- [Topic: Plugins](/topics/plugins) — team-shared CLAUDE.md, Skills, and Hooks can be packaged as a plugin and applied to every session in the team.
- [Feature Index](/appendix/feature-index)

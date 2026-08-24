🌐 [日本語](../ja/appendix/glossary.md)

# Glossary

> [!NOTE]
> This page is an entry point for newcomers. Return here when a term appears in the main text.
> Definitions and why they matter live here. Mechanisms belong to each Part.

- [Foundations](#basics)
- [The eight structural problems](#structural-problems)
- [Claude Code terms and general counterparts](#mapping)
- [Claude Code-specific terms](#claude-code-terms)
- [Related technical terms](#related)

## Foundations {#basics}

### Token {#token}

The smallest unit an LLM processes. Not a character and not a word. A fragment produced by a tokenizer. English is roughly 1–1.3 tokens per word. Japanese is roughly 1–3 tokens per character. The same content costs more tokens in Japanese.

**Why it matters**: Context caps, quality drop, and billing are all measured in tokens. Estimating in characters undercounts Japanese.

**Details**: [Token, Context, Context Window](../02-context-window/token-context-basics.md)

### Context {#context}

Everything passed to the LLM for one inference: system prompt, project rules, conversation history, tool definitions, and tool results. The model generates from what is in this Context only.

**Why it matters**: The model does not "remember." It reads the Context passed on that turn. What to include and what to leave out is a design problem.

**Details**: [Token, Context, Context Window](../02-context-window/token-context-basics.md)

### Context Window {#context-window}

The cap on Context an LLM can process at once (in tokens). The cap differs by model. When the cap is reached, older information no longer fits. Quality still falls as input grows, even before the cap.

**Why it matters**: Window size is not "usable amount." The amount that still preserves quality is smaller than the advertised cap. That is the premise of Context Rot.

**Details**: [What the Context Window Is](../02-context-window/what-llm-sees.md), [Context Budget](../02-context-window/context-budget.md)

### Attention {#attention}

The mechanism by which a Transformer decides how much to attend to each input token. Self-attention computes relations among tokens. As input grows, attention to each token thins out.

**Why it matters**: Middle drop on long input, and ignored instructions when there are too many, are often allocation-of-attention problems.

### Transformer {#transformer}

The base architecture of modern cloud LLMs, with self-attention at its core. Most of the eight structural problems in this repository come from this structure.

**Why it matters**: Treating them as product defects closes the response into setup steps. Seeing them as architectural makes the same thinking usable on other tools.

### RLHF {#rlhf}

Reinforcement Learning from Human Feedback. Training that adjusts replies using human preference. It tends to increase useful replies. It also tends to prefer agreeing replies, which is a source of Sycophancy.

**Why it matters**: Kindness and accuracy are not the same direction. Soft code review is partly from here.

### System Prompt {#system-prompt}

Instructions placed at the front of Context that set role, constraints, and behavior. Chat "custom instructions" and always-on rule files for coding agents often occupy this slot.

**Why it matters**: This position is always read. Too much writing causes Priority Saturation. Too little means constraints never arrive.

### Session {#session}

One conversation unit in which Context accumulates. Context grows with each turn and does not shrink on its own.

**Why it matters**: Long sessions are a breeding ground for Context Rot and Instruction Decay. How you cut them (compress, reset, another conversation) is a design surface.

**Details**: [Chat / Session](../02-context-window/chat-session.md)

### Stateless {#stateless}

The LLM does not keep the previous inference internally. Conversation looks continuous because the application restuffs history into Context every turn.

**Why it matters**: "Remember this" does not hold unless it is passed. Memory across sessions is written outside Context, in files.

## The eight structural problems {#structural-problems}

These constraints are not solved by prompt craft alone. They are not bugs. They come from the Transformer and the training process. Details: [Part 1](../01-llm-structural-problems/index.md).

### Context Rot {#context-rot}

Output quality degrades as the number of input tokens grows. This is not overflow of the context window. Quality still degrades while capacity remains.

**Why it matters**: Failures in long chats or large pastes are easy to misdiagnose as "the model is not smart." The main cause is input length and how attention is allocated.

**Details**: [Context Rot](../01-llm-structural-problems/context-rot.md)

### Lost in the Middle {#lost-in-the-middle}

Attention prefers the beginning and the end of Context. Information in the middle is harder to retrieve. One concrete form of Context Rot.

**Why it matters**: Mid-spec constraints and mid-conversation decisions drop out. Position of important information matters about as much as its content.

**Details**: [Lost in the Middle](../01-llm-structural-problems/lost-in-the-middle.md)

### Priority Saturation {#priority-saturation}

As simultaneous instructions increase, compliance with each instruction falls. "Everything is important" approaches "nothing is important."

**Why it matters**: Thickening a rules file makes even the rules you care about easier to ignore. That is why always-on instructions stay short.

**Details**: [Priority Saturation](../01-llm-structural-problems/priority-saturation.md)

### Hallucination {#hallucination}

Generating content that contradicts facts as if it had a source. This comes from next-token prediction more than from under-training. It cannot be reduced to zero mathematically.

**Why it matters**: It is not something to eliminate. It is something to detect and manage. Checks outside the model — compilers, tests — are required.

**Details**: [Hallucination](../01-llm-structural-problems/hallucination.md)

### Sycophancy {#sycophancy}

Preferring agreement with the user over accuracy. A common side effect of RLHF.

**Why it matters**: Asking "is this fine?" tends to produce affirmation. Generating and reviewing in the same conversation tends to ratify one's own output.

**Details**: [Sycophancy](../01-llm-structural-problems/sycophancy.md)

### Knowledge Boundary {#knowledge-boundary}

The LLM cannot accurately recognize the limits of its own knowledge. It is hard to say "I don't know," and it answers with high confidence anyway.

**Why it matters**: Post-cutoff APIs and internal code produce confident falsehoods. Grounding in primary sources outside the model is the response.

**Details**: [Knowledge Boundary](../01-llm-structural-problems/knowledge-boundary.md)

### Prompt Sensitivity {#prompt-sensitivity}

Semantically close prompts still produce different output when wording or format changes. Models react more to statistical token patterns than to "meaning" as such.

**Why it matters**: Vague instructions are filled differently each session. Make axes you do not want to vary (role, success criteria, output format) explicit.

**Details**: [Prompt Sensitivity](../01-llm-structural-problems/prompt-sensitivity.md)

### Instruction Decay {#instruction-decay}

Compliance with early instructions falls over a long conversation. It appears as the previous seven problems stacked over time.

**Why it matters**: Early policy drops out at the end. The response pattern is: keep conversations short, persist decisions in files, put verification outside the model.

**Details**: [Instruction Decay](../01-llm-structural-problems/instruction-decay.md)

## Claude Code terms and general counterparts {#mapping}

Claude Code file names and commands are representative examples. Other tools need not use the same names. What corresponds is the role, not the feature name.

| Claude Code | General counterpart | Mainly addresses |
| :---------- | :------------------ | :--------------- |
| CLAUDE.md | Always-on system instructions. Project-wide rules | Priority Saturation, Prompt Sensitivity |
| `.claude/rules/` | Rules read conditionally, when matching files are open | Lost in the Middle, Priority Saturation |
| Skills | On-demand procedures, expanded only when needed | Context Rot, Prompt Sensitivity |
| Agents | Execution in an independent conversation (another Context) | Context Rot, Sycophancy |
| Hooks | Checks outside the model (tests, lint, scripts) | Hallucination, Instruction Decay |
| MCP | Connection to external tools and knowledge | Knowledge Boundary, Context Rot (always-on definitions) |
| settings.json | Runtime settings. A layer the model does not see | Hallucination, Sycophancy (permissions and enforcement) |
| `/compact` | Summarize and compress conversation history | Context Rot, Lost in the Middle |
| `/clear` | Reset the session | Context Rot, Instruction Decay |
| Tool Search | Lazy-load tool definitions | Context Rot |
| Code Intelligence (LSP) | Ground symbols and types via a language server | Hallucination, Knowledge Boundary |
| Plugins | A unit for distributing verified configuration | Prompt Sensitivity, Instruction Decay (locking team convention) |

Other tools do not necessarily ship features at the same granularity. What transfers is the "general counterpart" column. Principles are extracted in [Part 11](../11-cross-llm-principles/index.md).

## Claude Code-specific terms {#claude-code-terms}

### CLAUDE.md {#claude-md}

A file of project knowledge and conventions, always read at session start. Always-on context. Growing it too far causes Priority Saturation.

**Why it matters**: Put only what must be said every turn. Procedures that are not needed every turn do not belong here.

**Details**: [CLAUDE.md design](../03-always-loaded-context/claude-md.md)

### `.claude/rules/` {#rules}

Rules injected only when a glob matches a file. Conditional context, not always-on.

**Why it matters**: Unused rules stay off. They are not buried in the middle. They can be placed near the end when needed.

**Details**: [Rules design](../04-conditional-context/rules.md)

### Skills {#skills}

Procedures expanded when the LLM decides they are needed, or when they are invoked explicitly. On-demand context.

**Why it matters**: Specialist procedures stay off the always-on surface. The `description` field decides whether they are called.

**Details**: [Skills design](../05-on-demand-context/skills.md)

### Agents {#agents}

Sub-agents that run in an independent Context Window. They do not share the parent's history.

**Why it matters**: Search and review do not dirty the parent's Context. Generation and verification can be split across conversations.

**Details**: [Agents design](../05-on-demand-context/agents.md)

### Hooks {#hooks}

Shell commands attached to lifecycle events such as before and after tool use. Output generally does not enter the model's Context.

**Why it matters**: Compilers and test runners do not sycophantically agree. Put here the checks that must not depend on instruction compliance.

**Details**: [Hooks lifecycle](../07-runtime-layer/hooks.md)

### MCP {#mcp}

Model Context Protocol. A protocol connecting a model to external tools and resources. Tool definitions consume Context every turn.

**Why it matters**: Primary sources outside the model become reachable. Loading too many definitions also accelerates Context Rot.

**Details**: [MCP context cost](../06-tool-context/mcp-context-cost.md)

### settings.json {#settings-json}

Claude Code runtime settings. Permissions and environment variables — control the model does not see.

**Why it matters**: Some things must be enforced without being readable. Once shown, they can be ignored or worked around.

**Details**: [settings.json](../07-runtime-layer/settings-json.md)

### `/compact` {#compact}

A command that summarizes conversation history, reduces tokens, and continues the session.

**Why it matters**: Use it mid-task when Context use enters the danger zone. Attention dilution is reduced without a full reset.

**Details**: [/compact and /clear](../08-session-management/compact-and-clear.md)

### `/clear` {#clear}

A command that resets the session and starts a new conversation.

**Why it matters**: Use it after a task ends, or when degradation is obvious. Wrong premises that survive compression are cut here.

**Details**: [/compact and /clear](../08-session-management/compact-and-clear.md)

### Tool Search {#tool-search}

A mechanism that does not load every MCP tool definition at startup, and reads them when needed. Also called Deferred Loading.

**Why it matters**: More tools mean more always-on definition cost on Context. Lazy loading is the response to that fixed cost.

**Details**: [Tool Search / Deferred Loading](../06-tool-context/tool-search.md)

## Related technical terms {#related}

| Term | Definition | Why it matters |
| :--- | :--------- | :------------- |
| **RoPE** | Rotary Position Embedding. Positional encoding whose attention tends to decay with distance | One structural cause of Lost in the Middle |
| **U-curve** | Attention high at the beginning and end of Context, low in the middle | Grounds where to place important information |
| **Attention Dilution** | Attention to each token thins as token count grows | One mechanism of Context Rot |
| **Distractor Interference** | Irrelevant but similar input crossing with the task | Long logs and similar function names induce wrong references |
| **Context Budget** | How many tokens to spend on what, within the quality-preserving range | Using the cap is not the goal |
| **Injection** | When and how rules and tool definitions are placed in Context | Always-on, conditional, and on-demand are design choices |
| **Cross-Model QA** | Reviewing output with another model or a new conversation | Shares less of the same sycophancy bias |
| **Harness** | Tools, memory, safety, and loop control placed around the LLM | Constrains the model from the outside without changing it |
| **LSP / Code Intelligence** | Confirming in-repo symbols and types via a language server | Detects generation of APIs that do not exist, at generation time |
| **Underspecification** | Unspecified axes are filled from the prior | A limit case of Prompt Sensitivity. Being explicit is the response |

---

> **Previous**: [Plugins & Marketplaces](plugins-and-marketplaces.md)

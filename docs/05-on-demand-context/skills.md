🌐 [日本語](../ja/05-on-demand-context/skills.md)

# Skills Design Principles

> [!IMPORTANT]
> → Why: **Context Rot** mitigation (expand to context only when needed)
> → Why: **Prompt Sensitivity** mitigation (improve auto-invocation accuracy through description design)

## What Are Skills?

Skills are on-demand specialized knowledge loaded into context either through user `/` invocation or LLM auto-detection.

| Attribute | Value |
|:--|:--|
| Injection Timing | User calls with `/` or LLM auto-detects |
| Context Consumption | Only when called |
| Appearance to LLM | Task-specific detailed procedures |
| Location | `.claude/skills/<skill-name>/SKILL.md` |

## Fundamental Difference from CLAUDE.md / Rules

CLAUDE.md and Rules are injected **passively**. Skills are injected **actively**.

```
CLAUDE.md  = Global variable (always in scope)        ← Keep minimal
Rules      = Conditional global (active if condition) ← Per file type
Skills     = import/require (load when needed)        ← Task-specific details
```

## Skill Structure

```sh
.claude/skills/
└── component-generator/
    ├── SKILL.md              # Required: instructions for LLM
    ├── scripts/              # Optional: executable scripts
    ├── references/           # Optional: reference documents
    └── assets/               # Optional: template files
```

## Importance of description

> [!TIP]
> Core strategy for **Prompt Sensitivity** mitigation.
>
> Whether an LLM auto-invokes a Skill depends on the `description` field. During inference, the LLM evaluates semantic similarity between the user's request and the description to decide whether to invoke.

```yaml
# ❌ Vague (auto-invocation often fails)
description: Tasks related to components

# ✅ Specific (covers diverse expressions)
description: >
  Create new Angular components with OnPush change detection,
  NgRx Store integration, and Jasmine tests. Used for requests like
  "create a component", "add a new screen", etc.
```

The description is **a search query for the LLM**. Like SEO principles, including diverse expressions users might use improves invocation accuracy.

## Real Example: e-shiwake Skills (Injecting Accounting Domain Knowledge)

[e-shiwake](https://github.com/shuji-bonji/e-shiwake/tree/main/.claude/skills/e-shiwake-accounting) is a PWA accounting app for sole proprietors, injecting specialized accounting domain knowledge via Skills.

```sh
.claude/skills/e-shiwake-accounting/
├── SKILL.md              # Entry point: domain overview and operation modes
├── ACCOUNT-CODES.md      # Account code system (4-digit codes, 30 accounts, tax categories)
├── BROWSER-OPERATIONS.md # Browser operation procedures (for non-WebMCP environments)
└── WEBMCP-TOOLS.md       # WebMCP tool reference (Chrome 146+)
```

### Design Intent of 4-Layer Structure

| File | Role | Addresses Structural Problem |
|:--|:--|:--|
| SKILL.md | Overview of domain, terminology definitions | Knowledge Boundary |
| ACCOUNT-CODES.md | Account codes as reference data | Knowledge Boundary |
| BROWSER-OPERATIONS.md | UI operation procedures (unknowable to LLM) | Knowledge Boundary |
| WEBMCP-TOOLS.md | Specifications of available tools | Hallucination (prevent fabrication of non-existent tools) |

<details>
<summary>SKILL.md — Entry Point (Domain Overview and Operation Modes)</summary>

```markdown
# e-shiwake Accounting Skill

e-shiwake (electronic journal entry) is a PWA accounting app for sole proprietors and freelancers.

## Capabilities
- Journal entry input and management
- Books and financial statements (trial balance, P&L, balance sheet)
- Consumption tax aggregation
- Data management (backup, restore, export)

## Operation Modes
- **With WebMCP** (Chrome 146+): Direct control via tools
- **Without WebMCP**: Guide through browser operation instructions

## Basic Principle
Debit total must always equal credit total (double-entry bookkeeping rule)
```

</details>

<details>
<summary>WEBMCP-TOOLS.md — Tool Reference (Excerpt)</summary>

```markdown
# WebMCP Tool Reference (Chrome 146+)

## Journal Management
- search_journals: Search by text, date, account code (space-separated AND search)
- create_journal: Create journal entry (debit total = credit total required)
- delete_journal: Delete journal entry

## Financial Reports
- generate_ledger: General ledger (by account)
- generate_trial_balance: Trial balance
- generate_profit_loss: Profit and loss statement
- generate_balance_sheet: Balance sheet
- calculate_consumption_tax: Consumption tax aggregation

## Recommended Initial Procedure
First confirm available fiscal years with get_available_years.
```

</details>

### Integration with llms.txt

This Skill is designed not to contain full specifications on its own, but to reference `llms.txt` provided by the app and `content.md` on each help page as the **Single Source of Truth**. By not duplicating specifications in Skills, we reduce the risk of documentation drift when the app is updated.

> [!IMPORTANT]
> Skills not only "provide domain knowledge to the LLM," but also function as **pointers to "where to reference."** Rather than writing specifications in Skills themselves, **point to trusted information sources**, preventing both Context Rot and information obsolescence simultaneously.
>
> → Real Project: [e-shiwake/.claude/skills/](https://github.com/shuji-bonji/e-shiwake/tree/main/.claude/skills/e-shiwake-accounting)

## Dynamic Context Injection via Shell Commands

Using `!` backtick syntax, you can execute shell commands when a Skill is invoked and inject their output into the LLM's context.

```markdown
## PR Context
- PR diff: !`gh pr diff`
- Changed files list: !`gh pr diff --name-only`
```

---

> **Previous**: [Part 4: Conditional Context](../04-conditional-context/index.md)

> **Next**: [Agents Design Principles](agents.md)

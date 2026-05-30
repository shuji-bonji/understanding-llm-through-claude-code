# 機能別早見表

🌐 [English](../../appendix/feature-index.md)

> [!NOTE]
> 全ての設定機能について、「いつロードされるか」「どの問題を解くか」「詳細はどの章か」を 1 ページに集約。

## 機能 × ロードタイミング × 章

| 機能 | ロードタイミング | 配置 | 章 | Topic ページ |
|---|---|---|---|---|
| **CLAUDE.md** | セッション開始時（常駐） | プロジェクト / ユーザー / local | [Part 3](/ja/03-always-loaded-context/) | [Topic](/ja/topics/claude-md) |
| **Rules** | Glob マッチ時 | `.claude/rules/` ほか | [Part 4](/ja/04-conditional-context/) | [Topic](/ja/topics/rules) |
| **Skills** | LLM が名前で呼出 | `.claude/skills/` | [Part 5](/ja/05-on-demand-context/) | [Topic](/ja/topics/skills-and-agents) |
| **Agents** | LLM（またはユーザー）が起動 | Plugins / config | [Part 5](/ja/05-on-demand-context/) | [Topic](/ja/topics/skills-and-agents) |
| **MCP** | ツール名は常駐、スキーマは Tool Search | 外部サーバ | [Part 6](/ja/06-tool-context/) | [Topic](/ja/topics/mcp) |
| **Hooks** | ライフサイクル発火時 | `settings.json` | [Part 7](/ja/07-runtime-layer/) | [Topic](/ja/topics/hooks) |
| **Code Intelligence (LSP)** | シンボルクエリ時 / ライブ診断時 | IDE / 言語サーバ | [Part 9](/ja/09-code-intelligence/) | [Topic](/ja/topics/code-intelligence) |
| **Agent Teams** | セッション横断、プロジェクトスコープ | 永続セッション + 共有成果物ストア | [Part 10](/ja/10-multi-session/) | [Topic](/ja/topics/agent-teams) |
| **Plugins** | インストール時 | Marketplace | [付録](/ja/appendix/plugins-and-marketplaces) | [Topic](/ja/topics/plugins) |

## 機能 × 構造的問題

8 つの構造的問題それぞれに対する第一選択の機能。

| 問題 | 主な対応機能 | なぜ |
|---|---|---|
| [Context Rot](/ja/01-llm-structural-problems/context-rot) | Rules, Skills, Tool Search, **Agent Teams** | 常駐コンテキスト外へ追い出す。Agent Teams は各セッションを小さく保つ |
| [Lost in the Middle](/ja/01-llm-structural-problems/lost-in-the-middle) | `/compact`, Agents, **Agent Teams** | 文脈を短く保つ。短い履歴では「真ん中」が形成されない |
| [Priority Saturation](/ja/01-llm-structural-problems/priority-saturation) | CLAUDE.md（精選）, Rules, **Agent Teams** | 競合する信号を減らす。1 セッション = 1 役割 |
| [Hallucination](/ja/01-llm-structural-problems/hallucination) | MCP, **LSP** (Part 9), Agents | 実データ・実シンボルに接地、または推論を隔離 |
| [Sycophancy](/ja/01-llm-structural-problems/sycophancy) | Hooks | LLM が口先で回避できない強制 |
| [Knowledge Boundary](/ja/01-llm-structural-problems/knowledge-boundary) | MCP, **LSP**, Skills, Plugins | 学習カットオフを越えた能力注入、プロジェクト固有シンボルの解決 |
| [Prompt Sensitivity](/ja/01-llm-structural-problems/prompt-sensitivity) | Hooks, settings, Plugins | プロンプト表現に依存しない決定論的挙動、チーム共有の検証済みプロンプト |
| [Instruction Decay](/ja/01-llm-structural-problems/instruction-decay) | CLAUDE.md, Rules, Hooks, Plugins | 再注入、または LLM 外で強制、組織慣習の継承 |

## 機能 × LLM からの可視性

```mermaid
flowchart LR
    subgraph IN["コンテキスト内（LLM が見る）"]
        CMD["CLAUDE.md<br/>（常駐）"]
        RUL["Rules<br/>（Glob マッチ時）"]
        SKL["Skills<br/>（呼出時）"]
        MCPN["MCP ツール名<br/>（常駐）"]
        MCPS["MCP スキーマ<br/>（Tool Search 経由）"]
        LSP["LSP レスポンス<br/>（シンボルクエリ時）"]
    end
    subgraph OUT["コンテキスト外（LLM は見ない）"]
        HK["Hooks"]
        STG["settings.json"]
        PLG["Plugin ローダ"]
    end
    subgraph CROSS["セッション境界を跨ぐ"]
        ART["成果物ストア<br/>（Agent Teams）"]
        QUE["共有タスクキュー<br/>（Agent Teams）"]
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

## 関連

- [構造的問題 × 対策マップ](/ja/appendix/problem-countermeasure-map)
- [ライフサイクル × 設定マップ](/ja/appendix/lifecycle-config-map)
- [Claude Code 設定リファレンス](/ja/appendix/claude-code-config-reference)
- [Topics 一覧](/ja/topics/)

---

> **前へ**: [ライフサイクル × 設定マップ](/ja/appendix/lifecycle-config-map)
> **次へ**: [Claude Code 設定リファレンス](/ja/appendix/claude-code-config-reference)

🌐 [English](../../05-on-demand-context/agents.md)

# Agents の設計原理

> [!IMPORTANT]
> → Why: **Context Rot** 対策（独立したコンテキストウィンドウで実行）
> → Why: **Sycophancy** 対策（Cross-model QA で追従バイアスを排除）
> → Why: **Knowledge Boundary** 対策（知識領域を狭めて境界超過確率を低減）

## Agents とは

Agents は **独立したコンテキストウィンドウ** で動作するサブエージェント。メインのコンテキストを消費しない。

| 属性 | 値 |
|:--|:--|
| 注入タイミング | `Agent()` / `Task()` ツールで呼び出された時 |
| コンテキスト消費 | **メインとは別の独立したコンテキスト** |
| LLM からの見え方 | 独自のシステムプロンプトを持つ別の LLM インスタンス |

## Skills との最大の違い

```
メインClaude（コンテキストウィンドウ）
  ├─ Skill読込 → 同じコンテキスト内で実行（コンテキスト消費する）
  │               → import / require に相当
  │
  └─ Agent 起動
       └─ 別のコンテキストウィンドウ（独立）
          → 結果だけメインに返す（蒸留された要約）
          → 別プロセスへの委譲に相当
```

## 構造的問題への対応

### Context Rot 対策

Agent は新鮮な独立コンテキストで実行されるため、メインの Context Rot の影響を受けない。長いセッションの途中でも、Agent に委譲すれば高品質な出力が得られる。

### Sycophancy 対策（Cross-Model QA）

異なるモデルや新しいコンテキストでレビューすることで、同じ追従バイアスを共有しない検証が可能。

### Knowledge Boundary 対策

特定のドメイン知識が必要なタスクを専門エージェントに委譲することで、知識領域を狭め、知識境界を超える確率を低減する。

## Agent の定義例

```markdown
<!-- .claude/agents/code-reviewer.md -->
---
name: code-reviewer
description: PRのコードレビューを行う専門エージェント
model: sonnet
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash(git diff *)
---

あなたはAngular/NgRxのコードレビュー専門家です。

## レビュー観点
1. NgRxパターンの準拠性
2. RxJSのメモリリーク（takeUntilDestroy未使用）
3. OnPush変更検知との整合性
4. テストカバレッジ
```

## 重要な制約

- サブエージェントは**他のサブエージェントを起動できない**
- bash コマンド経由での間接起動も禁止
- 必ず `Agent(subagent_type="agent-name", ...)` ツールを使う

---

> **前へ**: [Skills の設計原理](skills.md)

> **次へ**: [import vs 別プロセスの判断基準](skill-vs-agent.md)

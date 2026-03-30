# Part 5: オンデマンドコンテキスト — Skills & Agents

> [!NOTE]
> 呼び出された時だけ展開される。
> Skills は「import」、Agents は「別プロセスへの委譲」。

## なぜ存在するのか

常駐コンテキスト（CLAUDE.md）と条件付きコンテキスト（Rules）だけでは、タスク固有の詳細な手順を提供できない。Skills と Agents は「必要な時に必要な知識だけを提供する」仕組みである。

## Skills vs Agents の本質的な違い

```
メインClaude（コンテキスト200k）
  ├─ Skill読込 → 同じコンテキスト内で実行（コンテキスト消費する）
  │               → import / require に相当
  │
  └─ Agent 起動
       └─ 別のコンテキストウィンドウ（独立した200k）
          → 結果だけメインに返す（蒸留された要約）
          → 別プロセスへの委譲に相当
```

## → Why: どの構造的問題に対応しているか

> [!IMPORTANT]
> - **Context Rot**: Skills は必要時のみ展開。Agents は独立コンテキストで根本回避
> - **Sycophancy**: Agents による Cross-model QA で追従バイアスを排除
> - **Knowledge Boundary**: 専門 Agents に特定ドメインを委譲し、知識境界を狭める
> - **Prompt Sensitivity**: Skills の description 設計で自動呼び出し精度を向上

## このパートのドキュメント

| ドキュメント | 内容 |
|:--|:--|
| [Skills の設計原理](skills.md) | SKILL.md の書き方、description の重要性 |
| [Agents の設計原理](agents.md) | 独立コンテキスト、Cross-model QA |
| [import vs 別プロセスの判断基準](skill-vs-agent.md) | どちらを使うべきかの判断フロー |

---

> **前へ**: [Part 4: 条件付きコンテキスト](../04-conditional-context/index.md)
> **次へ**: [Part 6: ツール定義としてのコンテキスト](../06-tool-context/index.md)

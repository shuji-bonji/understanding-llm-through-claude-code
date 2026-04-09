# 構造的制約は全モデル共通

> [!NOTE]
> Part 1 で学んだ 8 つの構造的問題は Claude 固有ではなく、全ての LLM に共通する。

## なぜ共通なのか

8つの構造的問題は全て、**Transformer アーキテクチャ**と**RLHF 訓練プロセス**に起因する。これらは現代の LLM が共通して採用している基盤技術であり、特定のモデルに固有の問題ではない。

| 問題                | 原因                               | GPT | Claude | Gemini | LLaMA |
| :------------------ | :--------------------------------- | :-- | :----- | :----- | :---- |
| Context Rot         | 自己注意の O(N²)                   | ✓   | ✓      | ✓      | ✓     |
| Lost in the Middle  | RoPE / 位置エンコーディング        | ✓   | ✓      | ✓      | ✓     |
| Priority Saturation | in-context learning の限界         | ✓   | ✓      | ✓      | ✓     |
| Hallucination       | 次トークン予測の構造               | ✓   | ✓      | ✓      | ✓     |
| Sycophancy          | RLHF の副作用                      | ✓   | ✓      | ✓      | ✓     |
| Knowledge Boundary  | 目的関数に「知らない」の報酬がない | ✓   | ✓      | ✓      | ✓     |
| Prompt Sensitivity  | 埋め込み空間の非クラスタリング     | ✓   | ✓      | ✓      | ✓     |
| Instruction Decay   | 上記7問題の時間軸複合              | ✓   | ✓      | ✓      | ✓     |

## 対策の原理も共通

Claude Code が採用している対策の原理は、ツールが変わっても適用可能。

1. **常駐コンテキストは最小限に** → どのツールでも指示ファイルは簡潔に
2. **条件付き注入で指示を分散** → 必要な時だけルールを読み込む
3. **独立コンテキストでの検証** → 生成と検証を分離する
4. **機械的検証はコンテキスト外で** → テスト、lint、CI/CD は LLM に依存しない
5. **セッションは短く保つ** → タスクごとにリセット

## ツール間の共通設計パターン

> 詳細は [Cursor / Cline / Copilot 対応表](cursor-cline-mapping.md) を参照

| 原理               | Claude Code    | 他ツールでの実装          |
| :----------------- | :------------- | :------------------------ |
| 常駐コンテキスト   | CLAUDE.md      | .cursorrules, .clinerules |
| 条件付き注入       | .claude/rules/ | @ メンション（Cursor）    |
| オンデマンド知識   | Skills         | Docs 参照（Cursor）       |
| コンテキスト外検証 | Hooks          | CI/CD, pre-commit hooks   |
| 外部知識参照       | MCP            | MCP（Cursor, Cline）      |

---

> **前へ**: [Part 9: 他LLMへの応用](index.md)

> **次へ**: [ツール支援がない環境での実践](prompt-driven-development.md)

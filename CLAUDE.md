# プロジェクト概要

このリポジトリは「LLMの構造的制約を Claude Code の設計を通じて理解する」日本語の学習リポジトリ。
Part 1〜9 + 付録 + 実践例で構成される。

# 言語・文体ルール

- ドキュメントは日本語で記述する
- 専門用語（Context Rot, Lost in the Middle, Priority Saturation 等）は英語のまま使用する
- コード例やツール名（CLAUDE.md, `/compact`, MCP 等）もそのまま表記する

# ツール利用方針

- Mermaid図の生成には mcp-mermaid を使用すること
- 棒グラフには `xychart`（`xychart-beta` ではなく）を使用する

# 参考文献の体裁

- 形式: `著者名 (年). "論文タイトル." 出典. [リンクテキスト](URL) — 日本語の補足説明`
- arXiv や ACL Anthology のリンクがある場合は必ず付与する
- 例: `Hong, K., Troynikov, A., & Huber, J. (2025). "Context Rot: How Increasing Input Tokens Impacts LLM Performance." Chroma Research. [research.trychroma.com](https://research.trychroma.com/context-rot) — 18モデルでの Context Rot 定量測定`

# Mermaid図のスタイル規約

## ノード形状

- 構造的問題（8問題）: 四角形 `["テキスト"]`
- 対策（Claude Code機能）: 丸角 `(["テキスト"])`

## 8問題の配色

| 問題 | スタイル |
|---|---|
| Context Rot | `fill:#fee2e2,stroke:#b91c1c,color:#000` |
| Lost in the Middle | `fill:#ffedd5,stroke:#c2410c,color:#000` |
| Priority Saturation | `fill:#fef9c3,stroke:#a16207,color:#000` |
| Hallucination | `fill:#dbeafe,stroke:#1d4ed8,color:#000` |
| Sycophancy | `fill:#f3e8ff,stroke:#7c3aed,color:#000` |
| Knowledge Boundary | `fill:#e8d5b7,stroke:#78350f,color:#000` |
| Prompt Sensitivity | `fill:#dcfce7,stroke:#15803d,color:#000` |
| Instruction Decay | `fill:#f3f4f6,stroke:#374151,color:#000` |

## 対策ノードの配色

- 統一の青: `fill:#eff6ff,stroke:#1d4ed8,color:#1e40af`

## ダークモード対策

- すべてのカスタムスタイルに `color:#000` を明示する（ダークモードでテキストが見えなくなるのを防止）

# Alerts 構文（GitHub Alerts）

- 強調ブロックには GitHub の Alerts 構文を使用する（素の `> ` blockquote は使わない）
- ナビゲーション（`> **次へ**:` / `> **前へ**:`）と参照リンクは素の blockquote のまま
- 使い分け:
  - `[!NOTE]` — ページ冒頭の定義・概要、補足情報
  - `[!TIP]` — 実践的なヒント、開発者向けアナロジー
  - `[!IMPORTANT]` — 設計根拠（Why）、重要な判断基準
  - `[!WARNING]` — 注意すべき制約や落とし穴
  - `[!CAUTION]` — 重大なリスクや禁止事項

# ページ構成ルール

- 各ページの末尾に `---` + 前後ナビゲーションを配置する
  - `> **次へ**: [ページ名](ファイル名.md)`
  - `> **前へ**: [ページ名](ファイル名.md)`
- Discussion リンクがある場合はナビゲーションの下に配置する

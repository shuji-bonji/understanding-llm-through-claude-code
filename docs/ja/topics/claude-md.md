# CLAUDE.md — 常駐コンテキスト

🌐 [English](/topics/claude-md)

> [!NOTE]
> `CLAUDE.md` は、Claude Code が毎セッションの開始時に読み込むファイル。プロジェクト全体で常に有効にしたいコンテキスト（規約、用語、ビルドコマンド、振る舞いの期待値）を定義する。

## 仕組み

- **セッション開始時に1度だけ**、最初のユーザーメッセージより前に読み込まれる
- 階層構造: プロジェクト / ユーザー (`~/.claude/CLAUDE.md`) / `CLAUDE.local.md` が定義された順でマージされる
- ここに書いた全トークンが**毎ターンの請求対象** — 簡潔さが命

## 関連する章

- [Part 3 — 常駐コンテキスト（概要）](/ja/03-always-loaded-context/)
- [CLAUDE.md の設計原則](/ja/03-always-loaded-context/claude-md)
- [階層マージ](/ja/03-always-loaded-context/hierarchy)
- [CLAUDE.local.md の運用](/ja/03-always-loaded-context/local-md)
- [Claude Code 設定リファレンス](/ja/appendix/claude-code-config-reference)

## 関連する構造的問題

- [Context Rot](/ja/01-llm-structural-problems/context-rot) — CLAUDE.md を小さく保ち精度劣化を遅らせる
- [Instruction Decay](/ja/01-llm-structural-problems/instruction-decay) — 常駐内容による再接地
- [Priority Saturation](/ja/01-llm-structural-problems/priority-saturation) — 詰め込みすぎると優先度が曖昧になる

## 関連トピック

- [Topic: Rules](/ja/topics/rules) — 条件付きで読み込みたい場合
- [Topic: Skills & Agents](/ja/topics/skills-and-agents) — オンデマンドで読み込みたい場合
- [機能別早見表](/ja/appendix/feature-index)

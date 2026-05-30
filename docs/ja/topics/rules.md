# Rules — 条件付きコンテキスト

🌐 [English](/topics/rules)

> [!NOTE]
> Rules は、Glob パターンが**そのターンで触ったファイルにマッチした時だけ**読み込まれる Markdown ファイル。CLAUDE.md を肥大化させずに、ドメイン固有のガイダンスを必要な瞬間だけ注入できる。

## 仕組み

- 各 Rule の frontmatter に `globs:` を宣言（例: `"**/*.test.ts"`）
- マッチした時のみ Rule 本文がコンテキストに注入される
- 複数 Rule が同時にマッチすることもある — 加算されることを前提に設計する

## 関連する章

- [Part 4 — 条件付きコンテキスト（概要）](/ja/04-conditional-context/)
- [Rules の設計原則](/ja/04-conditional-context/rules)
- [Glob パターン設計](/ja/04-conditional-context/glob-patterns)
- [Claude Code 設定リファレンス](/ja/appendix/claude-code-config-reference)

## 関連する構造的問題

- [Context Rot](/ja/01-llm-structural-problems/context-rot) — 不要な文脈にトークンを払わない
- [Priority Saturation](/ja/01-llm-structural-problems/priority-saturation) — 範囲を絞ることで信号を高く保つ
- [Instruction Decay](/ja/01-llm-structural-problems/instruction-decay) — マッチした瞬間に再注入される

## 関連トピック

- [Topic: CLAUDE.md](/ja/topics/claude-md) — 常駐させたい場合
- [Topic: Skills & Agents](/ja/topics/skills-and-agents) — ファイルマッチではなく LLM の判断で読み込みたい場合
- [機能別早見表](/ja/appendix/feature-index)

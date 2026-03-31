# 実践例

> [!NOTE]
> 本編（Part 1〜9）で学んだ LLM の構造的制約と Claude Code の設計原理を、具体的なプロジェクト設定に落とし込んだ実例集。

## プロジェクト別の設定例

| プロジェクト | 技術スタック | 状態 |
|:--|:--|:--|
| [Angular/NgRx](./angular-ngrx/) | Angular 18 + NgRx + RxJS | 🚧 準備中 |
| [SvelteKit](./svelte-kit/) | SvelteKit + Svelte 5 | 🚧 準備中 |

## 実例と本編の対応

各実例がどの Part の概念を実践しているかの対応表。

| 設定ファイル / 機能 | 関連する Part | 対応する構造的問題 |
|:--|:--|:--|
| `CLAUDE.md`（200行以内） | [Part 3: 常駐コンテキスト](../docs/03-always-loaded-context/) | Priority Saturation, Prompt Sensitivity |
| `CLAUDE.local.md` | [Part 3: 常駐コンテキスト](../docs/03-always-loaded-context/) | Context Rot |
| `.claude/rules/`（条件付き） | [Part 4: 条件付きコンテキスト](../docs/04-conditional-context/) | Priority Saturation, Lost in the Middle |
| `.claude/skills/` | [Part 5: オンデマンドコンテキスト](../docs/05-on-demand-context/) | Context Rot, Knowledge Boundary |
| Hooks（lint・テスト自動実行） | [Part 7: ランタイムレイヤー](../docs/07-runtime-layer/) | Hallucination, Sycophancy |
| Agents（レビュー専門） | [Part 5: オンデマンドコンテキスト](../docs/05-on-demand-context/) | Sycophancy, Knowledge Boundary |
| セッション管理戦略 | [Part 8: セッション管理](../docs/08-session-management/) | Instruction Decay |

## 使い方

各プロジェクトディレクトリには、実際に動作する設定ファイルと注釈付きの解説を配置する予定。本編を読みながら「実際にはどう書くのか」を確認するリファレンスとして活用してほしい。

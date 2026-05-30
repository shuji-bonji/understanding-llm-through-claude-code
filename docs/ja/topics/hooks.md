# Hooks — ランタイムレイヤー

🌐 [English](/topics/hooks)

> [!NOTE]
> Hooks は、定義されたライフサイクルイベント（PreToolUse、PostToolUse、UserPromptSubmit など）で発火するスクリプト。**LLM のコンテキスト外**で動く決定論的なチェックと副作用 — モデルからは見えない。

## 仕組み

- `settings.json` の `hooks.<event>` に定義する
- LLM は自身の Hook を**無効化することも、バイパスすることも、読むことすらできない** — それが設計上の狙い
- lint / シークレットスキャン / フォーマット など「絶対にスキップ不可能なガードレール」に最適

## 関連する章

- [Part 7 — ランタイムレイヤー（概要）](/ja/07-runtime-layer/)
- [settings.json の役割](/ja/07-runtime-layer/settings-json)
- [Hooks ライフサイクル](/ja/07-runtime-layer/hooks)
- [なぜコンテキスト外に置くのか](/ja/07-runtime-layer/why-not-in-context)
- [Claude Code 設定リファレンス](/ja/appendix/claude-code-config-reference)

## 関連する構造的問題

- [Instruction Decay](/ja/01-llm-structural-problems/instruction-decay) — 記憶のドリフトに関係なく強制される
- [Sycophancy](/ja/01-llm-structural-problems/sycophancy) — LLM が Hook を口先で回避できない
- [Prompt Sensitivity](/ja/01-llm-structural-problems/prompt-sensitivity) — プロンプトの言い回しがスクリプトの動作を変えない

## 関連トピック

- [Topic: CLAUDE.md](/ja/topics/claude-md) — LLM の自発的遵守を期待する指示
- [Topic: Plugins](/ja/topics/plugins) — Hook を Skills/MCP と一緒に配布
- [機能別早見表](/ja/appendix/feature-index)

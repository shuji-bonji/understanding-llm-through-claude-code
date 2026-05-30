---
title: "Part 2: コンテキストウィンドウとは何か"
description: "コンテキストウィンドウは LLM の「思考空間」。Claude の 200K〜1M トークンの中に何が・いつ・どれだけ注入されるか、Claude Code の全設定ファイルの基盤となる概念を解説。"
---

🌐 [English](../../02-context-window/index.md)

# Part 2: コンテキストウィンドウを理解する

> [!NOTE]
> LLM の「思考空間」の構造を理解する。
> Part 1 で学んだ構造的問題が「なぜ起きるのか」の物理的基盤がここにある。
> Part 3 以降の全ての設計判断は、このコンテキストウィンドウの制約に基づいている。

## コンテキストウィンドウとは何か

**コンテキストウィンドウ（Context Window）とは、LLM が一度に「見て・思考できる」入力の最大サイズ**である。Claude の場合は最大 200K〜1M トークン（モデル世代による）。このウィンドウの外にある情報は LLM にとって存在しないのと同じであり、Claude Code の全ての設定ファイル（CLAUDE.md, settings.json, MCP 等）は、このウィンドウに「いつ・何を・どれだけ注入するか」を制御する仕組みである。

> [!TIP]
> 「コンテキストウィンドウ = LLMの思考空間」とイメージするとよい。広いほど多くを「考慮」できるが、Part 1 の [Context Rot](../01-llm-structural-problems/context-rot.md) で見たように、**広ければ精度が上がるわけではない**。実用的な詳細は [Token・Context・Context Window の基礎](token-context-basics.md) と [LLM が「見る」もの](what-llm-sees.md) を参照。

## このパートで学ぶこと

| ドキュメント | 内容 |
|:--|:--|
| [Token・Context・Context Window](token-context-basics.md) | 3つの基礎概念。本リポジトリ全体の前提知識 |
| [Chat / Session](chat-session.md) | Context が蓄積する「時間の入れ物」。なぜ Context が膨らむのかの物理的説明 |
| [コンテキストウィンドウとは何か](what-llm-sees.md) | LLM が「見る」ものの全体像 |
| [注入タイミングの全体像](injection-timing.md) | 各設定ファイルがいつ・どうやってコンテキストに入るか |
| [コンテキスト予算という考え方](context-budget.md) | 有限のトークンをどう配分するかの戦略 |

## なぜ Part 1 と Part 3 の間にあるのか

Part 1 で「LLM にはこういう問題がある」を学び、このPart 2 で「LLM の思考空間はこういう構造」を理解し、Part 3 以降で「だからこう設定する」に進む。

これは Node.js のランタイムを理解してから TypeScript を書くのと同じ順序。ランタイムの制約を知らずにコードを書くと、なぜ動かないのか分からない。

---

> **前へ**: [Part 1: LLMの構造的制約を知る](../01-llm-structural-problems/index.md)
> **次へ**: [Part 3: 常駐コンテキスト](../03-always-loaded-context/index.md)

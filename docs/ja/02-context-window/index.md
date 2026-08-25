---
title: "Part 2: コンテキストウィンドウを理解する"
description: "Token・Context・Context Window を分けて定義する。LLM の思考空間の構造と、なぜ品質が入力長で劣化するかを理解する。"
---

🌐 [English](../../02-context-window/index.md)

# Part 2: コンテキストウィンドウを理解する

> [!NOTE]
> LLM の「思考空間」の構造を理解する。
> Part 1 で学んだ構造的問題が「なぜ起きるのか」の物理的基盤がここにある。
> ウィンドウの制約は製品を問わない。注入の具体例として Claude Code を使う。

## 最初に押さえる3概念

Token / Context / Context Window は、後続のすべての設計判断の前提である。それぞれ独立したページで定義する。

| ドキュメント | 内容 |
| :-- | :-- |
| [Token](token.md) | LLM の処理単位。文字でも単語でもない |
| [Context](context.md) | 1回の推論に渡す全情報。履歴も毎回載る |
| [Context Window](context-window.md) | 上限と、「安全に使える範囲はもっと狭い」という事実 |
| [3概念の関係](token-context-basics.md) | 単位・中身・上限の関係図 |

## このパートで学ぶこと

| ドキュメント | 内容 |
| :-- | :-- |
| [Chat / Session](chat-session.md) | Context が時間方向に膨らむ理由 |
| [LLM が「見る」もの](what-llm-sees.md) | ウィンドウ内の見え方の全体像 |
| [注入タイミングの全体像](injection-timing.md) | 各設定がいつ Context に入るか |
| [コンテキスト予算](context-budget.md) | 有限のトークンをどう配分するか |

## なぜ Part 1 と Part 3 の間にあるのか

Part 1 で「LLM にはこういう問題がある」を学び、この Part 2 で「思考空間はこういう構造である」を理解し、Part 3 以降で「だからこう置く」に進む。

ランタイムの制約を知らずに設定だけを真似ると、なぜその制限があるのかが見えない。ここはその制約の物理である。

---

> **前へ**: [Part 1: LLMの構造的制約を知る](../01-llm-structural-problems/index.md)

> **次へ**: [Token — LLM の処理単位](token.md)

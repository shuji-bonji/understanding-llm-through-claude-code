# Part 9: 他LLMへの応用

> Claude Code 固有の知識を他ツール・他LLMに応用可能な形に昇華する。
> Part 1〜8 で学んだ原理は Claude Code 固有ではなく、LLM を使うあらゆるツールに共通する。

## なぜこのパートがあるのか

「コンテキストウィンドウへの注入制御」という原理は Claude Code 固有のものではない。Cursor、Cline、GitHub Copilot、その他あらゆる LLM ツールが同じ構造的問題に直面し、同じ原理に基づいた設計をしている。

原理を理解していれば、ツールが変わっても設計の考え方は同じ。

## このパートのドキュメント

| ドキュメント | 内容 |
|:--|:--|
| [構造的制約は全モデル共通](universal-patterns.md) | LLM 共通の原理 |
| [Cursor / Cline / Copilot 対応表](cursor-cline-mapping.md) | ツール間の機能マッピング |

---

> **前へ**: [Part 8: セッション管理と記憶の永続化](../08-session-management/index.md)

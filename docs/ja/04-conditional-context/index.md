🌐 [English](../../04-conditional-context/index.md)

# Part 4: 条件付きコンテキスト — Rules

> [!NOTE]
> 必要な時だけ注入する仕組み。
> CLAUDE.md の Priority Saturation を解決する「条件付き分散」。

## なぜ存在するのか

CLAUDE.md に全てのルールを書くと、API のバリデーションルールが React のコンポーネント規約と同時に読み込まれ、互いに注意を奪い合う。`.claude/rules/` は「今触っているファイルに関連するルールだけ」を LLM に見せることで、限られたコンテキスト内での指示の効果密度を最大化する。

## → Why: どの構造的問題に対応しているか

> [!IMPORTANT]
> - **Priority Saturation**: 全ルールを常時載せず、条件付きで分散することで同時有効指示数を削減
> - **Lost in the Middle**: 必要なルールだけを末尾（高注意位置）に注入

## このパートのドキュメント

| ドキュメント | 内容 |
|:--|:--|
| [.claude/rules/ の設計原理](rules.md) | なぜ存在するのか、どう設計するか |
| [globパターン設計の実践](glob-patterns.md) | 効果的なパターン設計の具体例 |

---

> **前へ**: [Part 3: 常駐コンテキスト](../03-always-loaded-context/index.md)
> **次へ**: [Part 5: オンデマンドコンテキスト](../05-on-demand-context/index.md)

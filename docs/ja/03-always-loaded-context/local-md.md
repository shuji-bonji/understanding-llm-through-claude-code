🌐 [English](../../03-always-loaded-context/local-md.md)

# CLAUDE.local.md の運用

> [!NOTE]
> Git 管理外の個人設定。チームの規約とは独立して管理する。

## CLAUDE.local.md とは

CLAUDE.local.md は自動で `.gitignore` に追加されるローカル専用の CLAUDE.md。チーム共有の `./CLAUDE.md` にマージされるが、Git リポジトリには含まれない。

```sh
my-project/
├── CLAUDE.md              # チーム共有
├── CLAUDE.local.md        # ← 個人専用（.gitignore）
└── src/
    └── CLAUDE.md
```

## いつ使うか

- ローカルの DB 接続先（`localhost:5432`）
- 個人の API キー参照方法
- 実験的な設定やワークフロー
- ローカル環境固有のビルドオプション

## `settings.local.json` との違い

|              | `CLAUDE.local.md`               | `.claude/settings.local.json` |
| :----------- | :------------------------------ | :---------------------------- |
| 対象         | LLM への指示                    | ランタイム設定                |
| LLM が見るか | **見る**                        | 見ない                        |
| 内容例       | 「ローカルDBは localhost:5432」 | ローカル MCP サーバー設定     |

## 運用のポイント

- チームの `./CLAUDE.md` と内容が重複しないようにする
- 環境依存の情報（ポート番号、パス）をここに書く
- 実験的なルールをここでテストしてから、チーム用に昇格させる（`CLAUDE.local.md` で検証 → 有効なら `./CLAUDE.md` へ移動）

---

> **前へ**: [階層マージの仕組み](hierarchy.md)

> **Part 3 完了 → 次へ**: [Part 4: 条件付きコンテキスト](../04-conditional-context/index.md)

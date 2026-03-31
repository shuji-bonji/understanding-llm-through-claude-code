# settings.json の役割

> [!NOTE]
> LLM のコンテキストには注入されない「ランタイム設定」。

## settings.json とは

settings.json は Claude Code アプリケーション（ランタイム）の動作を制御する設定ファイル。**LLM のコンテキストウィンドウには注入されない**。

| 属性 | 値 |
|:--|:--|
| 注入タイミング | **コンテキストに注入されない** |
| コンテキスト消費 | なし |
| 役割 | ランタイムの動作制御 |

## CLAUDE.md との根本的な違い

```
CLAUDE.md      = LLM への指示（「何を知るべきか」「どう振る舞うべきか」）
settings.json  = ランタイムへの設定（「何を許可するか」「どう実行するか」）
```

Node.js での比較:
- CLAUDE.md → ソースコード（V8 エンジンが解釈する）
- settings.json → `node --max-old-space-size=4096` のようなランタイムフラグ

## 階層と優先順位

| 優先度 | 階層 | ファイル | Git管理 |
|:--|:--|:--|:--|
| 最高 | Managed | server-managed / MDM / managed-settings.json | — |
| ↓ | Project | `.claude/settings.json` | する（チーム共有） |
| ↓ | Project Local | `.claude/settings.local.json` | しない（個人用） |
| 最低 | User | `~/.claude/settings.json` | — |

**上位が常に勝つ**。プロジェクト設定で deny されたものは、ユーザー設定で allow しても拒否される。

## 主要な設定カテゴリ

```jsonc
{
  // 権限制御：LLMが使えるツールを制限
  "permissions": {
    "allow": ["Read", "Write", "Bash(npm run *)", "Bash(ng *)"],
    "deny": ["Read(./.env)", "Read(./secrets/**)"]
  },

  // 環境変数
  "env": {
    "ANTHROPIC_MODEL": "claude-sonnet-4-20250514"
  },

  // Hooksの定義
  "hooks": { },

  // MCP接続の許可
  "enableAllProjectMcpServers": true,

  // 思考モード
  "thinking": true
}
```

---

> **前へ**: [Part 7: LLMが見ないレイヤー](index.md)

> **次へ**: [Hooks のライフサイクル](hooks.md)

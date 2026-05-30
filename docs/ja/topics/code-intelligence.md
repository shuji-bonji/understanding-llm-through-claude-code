# Code Intelligence — コード世界への接地

🌐 [English](/topics/code-intelligence)

> [!NOTE]
> Language Server Protocol（LSP）を通じて、Claude が**このリポジトリに実際に存在するシンボル・型・参照**を参照できるようにする。MCP が外部世界の事実への接地を担うなら、Code Intelligence は目の前のコードへの接地を担う。

## 仕組み

- **Definition** — シンボルの存在を確認する。null が返れば、コードがコミットされる前にそれが*非存在の証明*になる。
- **Hover** — 実際の型シグネチャ（RxJS operator のオーバーロード、Angular signal API など）を返す。インストール済みバージョンに対して生成が拘束される。
- **References** — 全ファイルを読み込まずに、正確な呼び出し元一覧を返す。調査トークンを大幅に削減する。
- **Diagnostics** — 編集ループの*最中*に型や lint のエラーをプッシュする。Hallucination 系のシンボルエラーの大半がディスクに到達しない。

## 関連する章

- [Part 9 — Code Intelligence（概要）](/ja/09-code-intelligence/)
- [LSP は接地装置である](/ja/09-code-intelligence/lsp-as-grounding)
- [Hallucination とシンボル](/ja/09-code-intelligence/hallucination-and-symbols)
- [ライブ型エラー](/ja/09-code-intelligence/live-type-errors)
- [Grep / Read / LSP — どれをいつ使うか？](/ja/09-code-intelligence/vs-grep-vs-read)

## 関連する構造的問題

- [Hallucination](/ja/01-llm-structural-problems/hallucination) — シンボルレベルの接地が、コード生成における最も頻発する失敗（架空の関数名・誤ったシグネチャ・存在しない import パス）をディスク到達前に止める。
- [Knowledge Boundary](/ja/01-llm-structural-problems/knowledge-boundary) — プロジェクト固有の型や学習カットオフ後の API が、推測ではなく*解決可能*になる。
- [Context Rot](/ja/01-llm-structural-problems/context-rot)（副次効果） — シンボルクエリはピンポイントで対象を返すので、ファイル全文読み込みを強制せず、実作業に使える予算を残す。

## 関連トピック

- [Topic: MCP](/ja/topics/mcp) — *もう一つ*の接地の柱（外部世界の事実）。
- [Topic: Hooks](/ja/topics/hooks) — LSP が見えないセマンティックバグはテスト実行 Hooks が捕まえる。
- [機能別早見表](/ja/appendix/feature-index)

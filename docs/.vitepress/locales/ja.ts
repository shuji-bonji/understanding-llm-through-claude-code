import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
	description: 'LLMはなぜ幻覚を見るのか、指示を忘れるのか、文脈を失うのか。Claude Codeの多層設計が各問題をどう解決するかを学ぶ、無料のオープンソースガイド。',
	titleTemplate: ':title | Claude CodeでLLMを学ぶ',
	head: [
		['meta', { property: 'og:image', content: 'https://shuji-bonji.github.io/understanding-llm-through-claude-code/og-image-ja.png' }],
		['meta', { name: 'twitter:image', content: 'https://shuji-bonji.github.io/understanding-llm-through-claude-code/og-image-ja.png' }],
	],
	themeConfig: {
		nav: [
			{ text: 'ホーム', link: '/ja/' },
			{ text: 'LLMの問題', link: '/ja/01-llm-structural-problems/' },
			{ text: 'コンテキスト', link: '/ja/02-context-window/' },
			{ text: '設定レイヤー', link: '/ja/03-always-loaded-context/' },
			{ text: '付録', link: '/ja/appendix/glossary' },
		],
		sidebar: {
			'/ja/': [
				{
					text: '1. LLMの構造的問題',
					collapsed: false,
					items: [
						{ text: '概要：8つの構造的問題', link: '/ja/01-llm-structural-problems/' },
						{ text: 'Context Rot', link: '/ja/01-llm-structural-problems/context-rot' },
						{ text: 'Lost in the Middle', link: '/ja/01-llm-structural-problems/lost-in-the-middle' },
						{ text: 'Priority Saturation', link: '/ja/01-llm-structural-problems/priority-saturation' },
						{ text: 'Hallucination', link: '/ja/01-llm-structural-problems/hallucination' },
						{ text: 'Sycophancy', link: '/ja/01-llm-structural-problems/sycophancy' },
						{ text: 'Knowledge Boundary', link: '/ja/01-llm-structural-problems/knowledge-boundary' },
						{ text: 'Prompt Sensitivity', link: '/ja/01-llm-structural-problems/prompt-sensitivity' },
						{ text: 'Instruction Decay', link: '/ja/01-llm-structural-problems/instruction-decay' },
					],
				},
				{
					text: '2. コンテキストウィンドウ',
					collapsed: false,
					items: [
						{ text: '概要', link: '/ja/02-context-window/' },
						{ text: 'トークン・コンテキスト・コンテキストウィンドウ', link: '/ja/02-context-window/token-context-basics' },
						{ text: 'LLMが見ているもの', link: '/ja/02-context-window/what-llm-sees' },
						{ text: '注入タイミング', link: '/ja/02-context-window/injection-timing' },
						{ text: 'コンテキストバジェット', link: '/ja/02-context-window/context-budget' },
						{ text: 'Chat = セッションの生存期間', link: '/ja/02-context-window/chat-session' },
					],
				},
				{
					text: '3. 常駐コンテキスト',
					collapsed: true,
					items: [
						{ text: '概要', link: '/ja/03-always-loaded-context/' },
						{ text: 'CLAUDE.md の設計原則', link: '/ja/03-always-loaded-context/claude-md' },
						{ text: '階層マージ', link: '/ja/03-always-loaded-context/hierarchy' },
						{ text: 'CLAUDE.local.md の運用', link: '/ja/03-always-loaded-context/local-md' },
					],
				},
				{
					text: '4. 条件付きコンテキスト',
					collapsed: true,
					items: [
						{ text: '概要', link: '/ja/04-conditional-context/' },
						{ text: 'Rules の設計原則', link: '/ja/04-conditional-context/rules' },
						{ text: 'Glob パターン設計', link: '/ja/04-conditional-context/glob-patterns' },
					],
				},
				{
					text: '5. オンデマンドコンテキスト',
					collapsed: true,
					items: [
						{ text: '概要', link: '/ja/05-on-demand-context/' },
						{ text: 'Skills の設計原則', link: '/ja/05-on-demand-context/skills' },
						{ text: 'Agents の設計原則', link: '/ja/05-on-demand-context/agents' },
						{ text: 'Skills vs Agents 判断基準', link: '/ja/05-on-demand-context/skill-vs-agent' },
					],
				},
				{
					text: '6. ツールコンテキスト — MCP',
					collapsed: true,
					items: [
						{ text: '概要', link: '/ja/06-tool-context/' },
						{ text: 'MCP のコンテキストコスト', link: '/ja/06-tool-context/mcp-context-cost' },
						{ text: 'Tool Search', link: '/ja/06-tool-context/tool-search' },
					],
				},
				{
					text: '7. ランタイムレイヤー',
					collapsed: true,
					items: [
						{ text: '概要', link: '/ja/07-runtime-layer/' },
						{ text: 'settings.json の役割', link: '/ja/07-runtime-layer/settings-json' },
						{ text: 'Hooks ライフサイクル', link: '/ja/07-runtime-layer/hooks' },
						{ text: 'なぜコンテキスト外に置くのか', link: '/ja/07-runtime-layer/why-not-in-context' },
					],
				},
				{
					text: '8. セッション管理',
					collapsed: true,
					items: [
						{ text: '概要', link: '/ja/08-session-management/' },
						{ text: '/compact vs /clear', link: '/ja/08-session-management/compact-and-clear' },
						{ text: '記憶が問題になる理由', link: '/ja/08-session-management/memory-problem' },
						{ text: '何を記憶すべきか', link: '/ja/08-session-management/what-to-remember' },
						{ text: 'いつ・どう思い出すか', link: '/ja/08-session-management/when-to-recall' },
						{ text: 'ツール比較', link: '/ja/08-session-management/tools-comparison' },
					],
				},
				{
					text: '9. 他LLMへの応用',
					collapsed: true,
					items: [
						{ text: '概要', link: '/ja/09-cross-llm-principles/' },
						{ text: '構造的制約は普遍的', link: '/ja/09-cross-llm-principles/universal-patterns' },
						{ text: 'ツール支援がない環境での実践', link: '/ja/09-cross-llm-principles/prompt-driven-development' },
						{ text: 'Cursor / Cline / Copilot 対応表', link: '/ja/09-cross-llm-principles/cursor-cline-mapping' },
					],
				},
				{
					text: '付録',
					collapsed: true,
					items: [
						{ text: '構造的問題 × 対策マップ', link: '/ja/appendix/problem-countermeasure-map' },
						{ text: 'ライフサイクル × 設定マップ', link: '/ja/appendix/lifecycle-config-map' },
						{ text: 'Claude Code 設定リファレンス', link: '/ja/appendix/claude-code-config-reference' },
						{ text: 'FAQ', link: '/ja/appendix/faq' },
						{ text: '用語集', link: '/ja/appendix/glossary' },
					],
				},
			],
		},
		outline: { label: '目次' },
		lastUpdated: { text: '最終更新' },
		docFooter: { prev: '前へ', next: '次へ' },
		editLink: {
			pattern: 'https://github.com/shuji-bonji/understanding-llm-through-claude-code/edit/main/docs/:path',
			text: 'GitHub で編集する',
		},
	},
};

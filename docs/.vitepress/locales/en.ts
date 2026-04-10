import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
	description: 'Learn why LLMs hallucinate, forget instructions, and lose context — and how Claude Code\'s layered design solves each problem. A free, open-source guide.',
	themeConfig: {
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'LLM Problems', link: '/01-llm-structural-problems/' },
			{ text: 'Context Window', link: '/02-context-window/' },
			{ text: 'Configuration', link: '/03-always-loaded-context/' },
			{ text: 'Appendix', link: '/appendix/glossary' },
		],
		sidebar: [
			{
				text: '1. LLM Structural Problems',
				collapsed: false,
				items: [
					{ text: 'Overview: The 8 Problems', link: '/01-llm-structural-problems/' },
					{ text: 'Context Rot', link: '/01-llm-structural-problems/context-rot' },
					{ text: 'Lost in the Middle', link: '/01-llm-structural-problems/lost-in-the-middle' },
					{ text: 'Priority Saturation', link: '/01-llm-structural-problems/priority-saturation' },
					{ text: 'Hallucination', link: '/01-llm-structural-problems/hallucination' },
					{ text: 'Sycophancy', link: '/01-llm-structural-problems/sycophancy' },
					{ text: 'Knowledge Boundary', link: '/01-llm-structural-problems/knowledge-boundary' },
					{ text: 'Prompt Sensitivity', link: '/01-llm-structural-problems/prompt-sensitivity' },
					{ text: 'Instruction Decay', link: '/01-llm-structural-problems/instruction-decay' },
				],
			},
			{
				text: '2. Context Window',
				collapsed: false,
				items: [
					{ text: 'Overview', link: '/02-context-window/' },
					{ text: 'Token, Context, Context Window', link: '/02-context-window/token-context-basics' },
					{ text: 'What the LLM Sees', link: '/02-context-window/what-llm-sees' },
					{ text: 'Injection Timing', link: '/02-context-window/injection-timing' },
					{ text: 'Context Budget', link: '/02-context-window/context-budget' },
					{ text: 'Chat Session Lifecycle', link: '/02-context-window/chat-session' },
				],
			},
			{
				text: '3. Always-Loaded Context',
				collapsed: true,
				items: [
					{ text: 'Overview', link: '/03-always-loaded-context/' },
					{ text: 'CLAUDE.md Design', link: '/03-always-loaded-context/claude-md' },
					{ text: 'Hierarchical Merging', link: '/03-always-loaded-context/hierarchy' },
					{ text: 'CLAUDE.local.md', link: '/03-always-loaded-context/local-md' },
				],
			},
			{
				text: '4. Conditional Context',
				collapsed: true,
				items: [
					{ text: 'Overview', link: '/04-conditional-context/' },
					{ text: 'Rules Design', link: '/04-conditional-context/rules' },
					{ text: 'Glob Patterns', link: '/04-conditional-context/glob-patterns' },
				],
			},
			{
				text: '5. On-Demand Context',
				collapsed: true,
				items: [
					{ text: 'Overview', link: '/05-on-demand-context/' },
					{ text: 'Skills Design', link: '/05-on-demand-context/skills' },
					{ text: 'Agents Design', link: '/05-on-demand-context/agents' },
					{ text: 'Skills vs Agents', link: '/05-on-demand-context/skill-vs-agent' },
				],
			},
			{
				text: '6. Tool Context — MCP',
				collapsed: true,
				items: [
					{ text: 'Overview', link: '/06-tool-context/' },
					{ text: 'MCP Context Cost', link: '/06-tool-context/mcp-context-cost' },
					{ text: 'Tool Search', link: '/06-tool-context/tool-search' },
				],
			},
			{
				text: '7. Runtime Layer',
				collapsed: true,
				items: [
					{ text: 'Overview', link: '/07-runtime-layer/' },
					{ text: 'settings.json', link: '/07-runtime-layer/settings-json' },
					{ text: 'Hooks Lifecycle', link: '/07-runtime-layer/hooks' },
					{ text: 'Why Not in Context', link: '/07-runtime-layer/why-not-in-context' },
				],
			},
			{
				text: '8. Session Management',
				collapsed: true,
				items: [
					{ text: 'Overview', link: '/08-session-management/' },
					{ text: '/compact vs /clear', link: '/08-session-management/compact-and-clear' },
					{ text: 'Why Memory Is a Problem', link: '/08-session-management/memory-problem' },
					{ text: 'What to Remember', link: '/08-session-management/what-to-remember' },
					{ text: 'When to Recall', link: '/08-session-management/when-to-recall' },
					{ text: 'Tool Comparison', link: '/08-session-management/tools-comparison' },
				],
			},
			{
				text: '9. Cross-LLM Principles',
				collapsed: true,
				items: [
					{ text: 'Overview', link: '/09-cross-llm-principles/' },
					{ text: 'Universal Patterns', link: '/09-cross-llm-principles/universal-patterns' },
					{ text: 'Prompt-Driven Development', link: '/09-cross-llm-principles/prompt-driven-development' },
					{ text: 'Cursor / Cline / Copilot', link: '/09-cross-llm-principles/cursor-cline-mapping' },
				],
			},
			{
				text: 'Appendix',
				collapsed: true,
				items: [
					{ text: 'Problems × Countermeasures Map', link: '/appendix/problem-countermeasure-map' },
					{ text: 'Lifecycle × Config Map', link: '/appendix/lifecycle-config-map' },
					{ text: 'Configuration Reference', link: '/appendix/claude-code-config-reference' },
					{ text: 'FAQ', link: '/appendix/faq' },
					{ text: 'Glossary', link: '/appendix/glossary' },
				],
			},
		],
		editLink: {
			pattern: 'https://github.com/shuji-bonji/understanding-llm-through-claude-code/edit/main/docs/:path',
			text: 'Edit this page on GitHub',
		},
	},
};

import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { jaConfig } from './locales/ja';
import { enConfig } from './locales/en';

export default withMermaid(
	defineConfig({
		title: 'Understanding LLMs',
		description: 'Learn why LLMs hallucinate, forget instructions, and lose context — and how Claude Code\'s layered design solves each problem. A free, open-source guide.',
		titleTemplate: ':title | Understanding LLMs Through Claude Code',

		base: '/understanding-llm-through-claude-code/',

		head: [
			// hreflang: English <-> Japanese
			['link', { rel: 'alternate', hreflang: 'en', href: 'https://shuji-bonji.github.io/understanding-llm-through-claude-code/' }],
			['link', { rel: 'alternate', hreflang: 'ja', href: 'https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/' }],
			['link', { rel: 'alternate', hreflang: 'x-default', href: 'https://shuji-bonji.github.io/understanding-llm-through-claude-code/' }],
			// OGP
			['meta', { property: 'og:type', content: 'website' }],
			['meta', { property: 'og:site_name', content: 'Understanding LLMs Through Claude Code' }],
			['meta', { property: 'og:image', content: 'https://shuji-bonji.github.io/understanding-llm-through-claude-code/og-image.png' }],
			['meta', { property: 'og:image:width', content: '1200' }],
			['meta', { property: 'og:image:height', content: '630' }],
			['meta', { property: 'og:locale', content: 'en' }],
			['meta', { property: 'og:locale:alternate', content: 'ja_JP' }],
			['meta', { name: 'twitter:card', content: 'summary_large_image' }],
			['meta', { name: 'twitter:image', content: 'https://shuji-bonji.github.io/understanding-llm-through-claude-code/og-image.png' }],
		],

		// i18n: English = root, Japanese = /ja/
		locales: {
			root: {
				label: 'English',
				lang: 'en',
				...enConfig,
			},
			ja: {
				label: '日本語 (Japanese)',
				lang: 'ja',
				link: '/ja/',
				...jaConfig,
			},
		},

		// Mermaid
		mermaid: {
			securityLevel: 'loose',
			theme: 'default',
			flowchart: { useMaxWidth: true },
			sequence: { useMaxWidth: true },
			mindmap: { useMaxWidth: true },
			timeline: { useMaxWidth: true },
		},
		mermaidPlugin: {
			class: 'mermaid',
		},

		// Vite optimization
		vite: {
			optimizeDeps: {
				include: ['mermaid'],
			},
			build: {
				emptyOutDir: true,
			},
		},

		// tempDir (avoid mount permission issues)
		tempDir: '/tmp/vitepress-temp',

		// Exclude files
		srcExclude: ['**/README.md', '**/README.ja.md'],

		// Sitemap
		sitemap: {
			hostname: 'https://shuji-bonji.github.io/understanding-llm-through-claude-code/',
		},

		// Theme common
		lastUpdated: true,
		cleanUrls: true,
		ignoreDeadLinks: false,

		themeConfig: {
			socialLinks: [
				{ icon: 'github', link: 'https://github.com/shuji-bonji/understanding-llm-through-claude-code' },
			],
			search: {
				provider: 'local',
			},
			footer: {
				message: 'Released under the MIT License.',
				copyright: 'Copyright © 2025-2026 shuji-bonji',
			},
		},
	}),
);

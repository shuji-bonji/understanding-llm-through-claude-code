// docs/.vitepress/config.ts
import { defineConfig } from "file:///sessions/zen-inspiring-ramanujan/mnt/understanding-llm-through-claude-code/node_modules/vitepress/dist/node/index.js";
import { withMermaid } from "file:///sessions/zen-inspiring-ramanujan/mnt/understanding-llm-through-claude-code/node_modules/vitepress-plugin-mermaid/dist/vitepress-plugin-mermaid.es.mjs";

// docs/.vitepress/locales/ja.ts
var jaConfig = {
  description: "LLM\u306E\u69CB\u9020\u7684\u5236\u7D04\u3092 Claude Code \u306E\u8A2D\u8A08\u3092\u901A\u3058\u3066\u7406\u89E3\u3059\u308B",
  themeConfig: {
    nav: [
      { text: "\u30DB\u30FC\u30E0", link: "/ja/" },
      { text: "LLM\u306E\u554F\u984C", link: "/ja/01-llm-structural-problems/" },
      { text: "\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8", link: "/ja/02-context-window/" },
      { text: "\u8A2D\u5B9A\u30EC\u30A4\u30E4\u30FC", link: "/ja/03-always-loaded-context/" },
      { text: "\u4ED8\u9332", link: "/ja/appendix/glossary" }
    ],
    sidebar: {
      "/ja/": [
        {
          text: "Part 1: LLM\u306E\u69CB\u9020\u7684\u554F\u984C",
          collapsed: false,
          items: [
            { text: "\u6982\u8981\uFF1A8\u3064\u306E\u69CB\u9020\u7684\u554F\u984C", link: "/ja/01-llm-structural-problems/" },
            { text: "Context Rot", link: "/ja/01-llm-structural-problems/context-rot" },
            { text: "Lost in the Middle", link: "/ja/01-llm-structural-problems/lost-in-the-middle" },
            { text: "Priority Saturation", link: "/ja/01-llm-structural-problems/priority-saturation" },
            { text: "Hallucination", link: "/ja/01-llm-structural-problems/hallucination" },
            { text: "Sycophancy", link: "/ja/01-llm-structural-problems/sycophancy" },
            { text: "Knowledge Boundary", link: "/ja/01-llm-structural-problems/knowledge-boundary" },
            { text: "Prompt Sensitivity", link: "/ja/01-llm-structural-problems/prompt-sensitivity" },
            { text: "Instruction Decay", link: "/ja/01-llm-structural-problems/instruction-decay" }
          ]
        },
        {
          text: "Part 2: \u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30A6\u30A3\u30F3\u30C9\u30A6",
          collapsed: false,
          items: [
            { text: "\u6982\u8981", link: "/ja/02-context-window/" },
            { text: "\u30C8\u30FC\u30AF\u30F3\u30FB\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30FB\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30A6\u30A3\u30F3\u30C9\u30A6", link: "/ja/02-context-window/token-context-basics" },
            { text: "LLM\u304C\u898B\u3066\u3044\u308B\u3082\u306E", link: "/ja/02-context-window/what-llm-sees" },
            { text: "\u6CE8\u5165\u30BF\u30A4\u30DF\u30F3\u30B0", link: "/ja/02-context-window/injection-timing" },
            { text: "\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30D0\u30B8\u30A7\u30C3\u30C8", link: "/ja/02-context-window/context-budget" },
            { text: "Chat = \u30BB\u30C3\u30B7\u30E7\u30F3\u306E\u751F\u5B58\u671F\u9593", link: "/ja/02-context-window/chat-session" }
          ]
        },
        {
          text: "Part 3: \u5E38\u99D0\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8",
          collapsed: true,
          items: [
            { text: "\u6982\u8981", link: "/ja/03-always-loaded-context/" },
            { text: "CLAUDE.md \u306E\u8A2D\u8A08\u539F\u5247", link: "/ja/03-always-loaded-context/claude-md" },
            { text: "\u968E\u5C64\u30DE\u30FC\u30B8", link: "/ja/03-always-loaded-context/hierarchy" },
            { text: "CLAUDE.local.md \u306E\u904B\u7528", link: "/ja/03-always-loaded-context/local-md" }
          ]
        },
        {
          text: "Part 4: \u6761\u4EF6\u4ED8\u304D\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8",
          collapsed: true,
          items: [
            { text: "\u6982\u8981", link: "/ja/04-conditional-context/" },
            { text: "Rules \u306E\u8A2D\u8A08\u539F\u5247", link: "/ja/04-conditional-context/rules" },
            { text: "Glob \u30D1\u30BF\u30FC\u30F3\u8A2D\u8A08", link: "/ja/04-conditional-context/glob-patterns" }
          ]
        },
        {
          text: "Part 5: \u30AA\u30F3\u30C7\u30DE\u30F3\u30C9\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8",
          collapsed: true,
          items: [
            { text: "\u6982\u8981", link: "/ja/05-on-demand-context/" },
            { text: "Skills \u306E\u8A2D\u8A08\u539F\u5247", link: "/ja/05-on-demand-context/skills" },
            { text: "Agents \u306E\u8A2D\u8A08\u539F\u5247", link: "/ja/05-on-demand-context/agents" },
            { text: "Skills vs Agents \u5224\u65AD\u57FA\u6E96", link: "/ja/05-on-demand-context/skill-vs-agent" }
          ]
        },
        {
          text: "Part 6: \u30C4\u30FC\u30EB\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8 \u2014 MCP",
          collapsed: true,
          items: [
            { text: "\u6982\u8981", link: "/ja/06-tool-context/" },
            { text: "MCP \u306E\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30B3\u30B9\u30C8", link: "/ja/06-tool-context/mcp-context-cost" },
            { text: "Tool Search", link: "/ja/06-tool-context/tool-search" }
          ]
        },
        {
          text: "Part 7: \u30E9\u30F3\u30BF\u30A4\u30E0\u30EC\u30A4\u30E4\u30FC",
          collapsed: true,
          items: [
            { text: "\u6982\u8981", link: "/ja/07-runtime-layer/" },
            { text: "settings.json \u306E\u5F79\u5272", link: "/ja/07-runtime-layer/settings-json" },
            { text: "Hooks \u30E9\u30A4\u30D5\u30B5\u30A4\u30AF\u30EB", link: "/ja/07-runtime-layer/hooks" },
            { text: "\u306A\u305C\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u5916\u306B\u7F6E\u304F\u306E\u304B", link: "/ja/07-runtime-layer/why-not-in-context" }
          ]
        },
        {
          text: "Part 8: \u30BB\u30C3\u30B7\u30E7\u30F3\u7BA1\u7406",
          collapsed: true,
          items: [
            { text: "\u6982\u8981", link: "/ja/08-session-management/" },
            { text: "/compact vs /clear", link: "/ja/08-session-management/compact-and-clear" },
            { text: "\u8A18\u61B6\u304C\u554F\u984C\u306B\u306A\u308B\u7406\u7531", link: "/ja/08-session-management/memory-problem" },
            { text: "\u4F55\u3092\u8A18\u61B6\u3059\u3079\u304D\u304B", link: "/ja/08-session-management/what-to-remember" },
            { text: "\u3044\u3064\u30FB\u3069\u3046\u601D\u3044\u51FA\u3059\u304B", link: "/ja/08-session-management/when-to-recall" },
            { text: "\u30C4\u30FC\u30EB\u6BD4\u8F03", link: "/ja/08-session-management/tools-comparison" }
          ]
        },
        {
          text: "Part 9: \u4ED6LLM\u3078\u306E\u5FDC\u7528",
          collapsed: true,
          items: [
            { text: "\u6982\u8981", link: "/ja/09-cross-llm-principles/" },
            { text: "\u69CB\u9020\u7684\u5236\u7D04\u306F\u666E\u904D\u7684", link: "/ja/09-cross-llm-principles/universal-patterns" },
            { text: "\u30C4\u30FC\u30EB\u652F\u63F4\u304C\u306A\u3044\u74B0\u5883\u3067\u306E\u5B9F\u8DF5", link: "/ja/09-cross-llm-principles/prompt-driven-development" },
            { text: "Cursor / Cline / Copilot \u5BFE\u5FDC\u8868", link: "/ja/09-cross-llm-principles/cursor-cline-mapping" }
          ]
        },
        {
          text: "\u4ED8\u9332",
          collapsed: true,
          items: [
            { text: "\u69CB\u9020\u7684\u554F\u984C \xD7 \u5BFE\u7B56\u30DE\u30C3\u30D7", link: "/ja/appendix/problem-countermeasure-map" },
            { text: "\u30E9\u30A4\u30D5\u30B5\u30A4\u30AF\u30EB \xD7 \u8A2D\u5B9A\u30DE\u30C3\u30D7", link: "/ja/appendix/lifecycle-config-map" },
            { text: "Claude Code \u8A2D\u5B9A\u30EA\u30D5\u30A1\u30EC\u30F3\u30B9", link: "/ja/appendix/claude-code-config-reference" },
            { text: "FAQ", link: "/ja/appendix/faq" },
            { text: "\u7528\u8A9E\u96C6", link: "/ja/appendix/glossary" }
          ]
        }
      ]
    },
    outline: { label: "\u76EE\u6B21" },
    lastUpdated: { text: "\u6700\u7D42\u66F4\u65B0" },
    docFooter: { prev: "\u524D\u3078", next: "\u6B21\u3078" },
    editLink: {
      pattern: "https://github.com/shuji-bonji/understanding-llm-through-claude-code/edit/main/docs/:path",
      text: "GitHub \u3067\u7DE8\u96C6\u3059\u308B"
    }
  }
};

// docs/.vitepress/locales/en.ts
var enConfig = {
  description: "Understanding LLM structural constraints through Claude Code's design",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "LLM Problems", link: "/01-llm-structural-problems/" },
      { text: "Context Window", link: "/02-context-window/" },
      { text: "Configuration", link: "/03-always-loaded-context/" },
      { text: "Appendix", link: "/appendix/glossary" }
    ],
    sidebar: [
      {
        text: "Part 1: LLM Structural Problems",
        collapsed: false,
        items: [
          { text: "Overview: The 8 Problems", link: "/01-llm-structural-problems/" },
          { text: "Context Rot", link: "/01-llm-structural-problems/context-rot" },
          { text: "Lost in the Middle", link: "/01-llm-structural-problems/lost-in-the-middle" },
          { text: "Priority Saturation", link: "/01-llm-structural-problems/priority-saturation" },
          { text: "Hallucination", link: "/01-llm-structural-problems/hallucination" },
          { text: "Sycophancy", link: "/01-llm-structural-problems/sycophancy" },
          { text: "Knowledge Boundary", link: "/01-llm-structural-problems/knowledge-boundary" },
          { text: "Prompt Sensitivity", link: "/01-llm-structural-problems/prompt-sensitivity" },
          { text: "Instruction Decay", link: "/01-llm-structural-problems/instruction-decay" }
        ]
      },
      {
        text: "Part 2: Context Window",
        collapsed: false,
        items: [
          { text: "Overview", link: "/02-context-window/" },
          { text: "Token, Context, Context Window", link: "/02-context-window/token-context-basics" },
          { text: "What the LLM Sees", link: "/02-context-window/what-llm-sees" },
          { text: "Injection Timing", link: "/02-context-window/injection-timing" },
          { text: "Context Budget", link: "/02-context-window/context-budget" },
          { text: "Chat Session Lifecycle", link: "/02-context-window/chat-session" }
        ]
      },
      {
        text: "Part 3: Always-Loaded Context",
        collapsed: true,
        items: [
          { text: "Overview", link: "/03-always-loaded-context/" },
          { text: "CLAUDE.md Design", link: "/03-always-loaded-context/claude-md" },
          { text: "Hierarchical Merging", link: "/03-always-loaded-context/hierarchy" },
          { text: "CLAUDE.local.md", link: "/03-always-loaded-context/local-md" }
        ]
      },
      {
        text: "Part 4: Conditional Context",
        collapsed: true,
        items: [
          { text: "Overview", link: "/04-conditional-context/" },
          { text: "Rules Design", link: "/04-conditional-context/rules" },
          { text: "Glob Patterns", link: "/04-conditional-context/glob-patterns" }
        ]
      },
      {
        text: "Part 5: On-Demand Context",
        collapsed: true,
        items: [
          { text: "Overview", link: "/05-on-demand-context/" },
          { text: "Skills Design", link: "/05-on-demand-context/skills" },
          { text: "Agents Design", link: "/05-on-demand-context/agents" },
          { text: "Skills vs Agents", link: "/05-on-demand-context/skill-vs-agent" }
        ]
      },
      {
        text: "Part 6: Tool Context \u2014 MCP",
        collapsed: true,
        items: [
          { text: "Overview", link: "/06-tool-context/" },
          { text: "MCP Context Cost", link: "/06-tool-context/mcp-context-cost" },
          { text: "Tool Search", link: "/06-tool-context/tool-search" }
        ]
      },
      {
        text: "Part 7: Runtime Layer",
        collapsed: true,
        items: [
          { text: "Overview", link: "/07-runtime-layer/" },
          { text: "settings.json", link: "/07-runtime-layer/settings-json" },
          { text: "Hooks Lifecycle", link: "/07-runtime-layer/hooks" },
          { text: "Why Not in Context", link: "/07-runtime-layer/why-not-in-context" }
        ]
      },
      {
        text: "Part 8: Session Management",
        collapsed: true,
        items: [
          { text: "Overview", link: "/08-session-management/" },
          { text: "/compact vs /clear", link: "/08-session-management/compact-and-clear" },
          { text: "Why Memory Is a Problem", link: "/08-session-management/memory-problem" },
          { text: "What to Remember", link: "/08-session-management/what-to-remember" },
          { text: "When to Recall", link: "/08-session-management/when-to-recall" },
          { text: "Tool Comparison", link: "/08-session-management/tools-comparison" }
        ]
      },
      {
        text: "Part 9: Cross-LLM Principles",
        collapsed: true,
        items: [
          { text: "Overview", link: "/09-cross-llm-principles/" },
          { text: "Universal Patterns", link: "/09-cross-llm-principles/universal-patterns" },
          { text: "Prompt-Driven Development", link: "/09-cross-llm-principles/prompt-driven-development" },
          { text: "Cursor / Cline / Copilot", link: "/09-cross-llm-principles/cursor-cline-mapping" }
        ]
      },
      {
        text: "Appendix",
        collapsed: true,
        items: [
          { text: "Problems \xD7 Countermeasures Map", link: "/appendix/problem-countermeasure-map" },
          { text: "Lifecycle \xD7 Config Map", link: "/appendix/lifecycle-config-map" },
          { text: "Configuration Reference", link: "/appendix/claude-code-config-reference" },
          { text: "FAQ", link: "/appendix/faq" },
          { text: "Glossary", link: "/appendix/glossary" }
        ]
      }
    ],
    editLink: {
      pattern: "https://github.com/shuji-bonji/understanding-llm-through-claude-code/edit/main/docs/:path",
      text: "Edit this page on GitHub"
    }
  }
};

// docs/.vitepress/config.ts
var config_default = withMermaid(
  defineConfig({
    title: "Understanding LLMs Through Claude Code",
    description: "Understanding LLM structural constraints through Claude Code's design",
    base: "/understanding-llm-through-claude-code/",
    head: [
      // hreflang: English <-> Japanese
      ["link", { rel: "alternate", hreflang: "en", href: "https://shuji-bonji.github.io/understanding-llm-through-claude-code/" }],
      ["link", { rel: "alternate", hreflang: "ja", href: "https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/" }],
      ["link", { rel: "alternate", hreflang: "x-default", href: "https://shuji-bonji.github.io/understanding-llm-through-claude-code/" }],
      // OGP
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:site_name", content: "Understanding LLMs Through Claude Code" }],
      ["meta", { property: "og:locale", content: "en" }],
      ["meta", { property: "og:locale:alternate", content: "ja_JP" }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }]
    ],
    // i18n: English = root, Japanese = /ja/
    locales: {
      root: {
        label: "English",
        lang: "en",
        ...enConfig
      },
      ja: {
        label: "\u65E5\u672C\u8A9E (Japanese)",
        lang: "ja",
        link: "/ja/",
        ...jaConfig
      }
    },
    // Mermaid
    mermaid: {
      securityLevel: "loose",
      theme: "default",
      flowchart: { useMaxWidth: true },
      sequence: { useMaxWidth: true },
      mindmap: { useMaxWidth: true },
      timeline: { useMaxWidth: true }
    },
    mermaidPlugin: {
      class: "mermaid"
    },
    // Vite optimization
    vite: {
      optimizeDeps: {
        include: ["mermaid"]
      },
      build: {
        emptyOutDir: true
      }
    },
    // tempDir (avoid mount permission issues)
    tempDir: "/tmp/vitepress-temp",
    // Exclude files
    srcExclude: ["**/README.md", "**/README.ja.md"],
    // Sitemap
    sitemap: {
      hostname: "https://shuji-bonji.github.io/understanding-llm-through-claude-code/"
    },
    // Theme common
    lastUpdated: true,
    cleanUrls: true,
    ignoreDeadLinks: false,
    themeConfig: {
      socialLinks: [
        { icon: "github", link: "https://github.com/shuji-bonji/understanding-llm-through-claude-code" }
      ],
      search: {
        provider: "local"
      },
      footer: {
        message: "Released under the MIT License.",
        copyright: "Copyright \xA9 2025-2026 shuji-bonji"
      }
    }
  })
);
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy50cyIsICJkb2NzLy52aXRlcHJlc3MvbG9jYWxlcy9qYS50cyIsICJkb2NzLy52aXRlcHJlc3MvbG9jYWxlcy9lbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9zZXNzaW9ucy96ZW4taW5zcGlyaW5nLXJhbWFudWphbi9tbnQvdW5kZXJzdGFuZGluZy1sbG0tdGhyb3VnaC1jbGF1ZGUtY29kZS9kb2NzLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9zZXNzaW9ucy96ZW4taW5zcGlyaW5nLXJhbWFudWphbi9tbnQvdW5kZXJzdGFuZGluZy1sbG0tdGhyb3VnaC1jbGF1ZGUtY29kZS9kb2NzLy52aXRlcHJlc3MvY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9zZXNzaW9ucy96ZW4taW5zcGlyaW5nLXJhbWFudWphbi9tbnQvdW5kZXJzdGFuZGluZy1sbG0tdGhyb3VnaC1jbGF1ZGUtY29kZS9kb2NzLy52aXRlcHJlc3MvY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJztcbmltcG9ydCB7IHdpdGhNZXJtYWlkIH0gZnJvbSAndml0ZXByZXNzLXBsdWdpbi1tZXJtYWlkJztcbmltcG9ydCB7IGphQ29uZmlnIH0gZnJvbSAnLi9sb2NhbGVzL2phJztcbmltcG9ydCB7IGVuQ29uZmlnIH0gZnJvbSAnLi9sb2NhbGVzL2VuJztcblxuZXhwb3J0IGRlZmF1bHQgd2l0aE1lcm1haWQoXG5cdGRlZmluZUNvbmZpZyh7XG5cdFx0dGl0bGU6ICdVbmRlcnN0YW5kaW5nIExMTXMgVGhyb3VnaCBDbGF1ZGUgQ29kZScsXG5cdFx0ZGVzY3JpcHRpb246ICdVbmRlcnN0YW5kaW5nIExMTSBzdHJ1Y3R1cmFsIGNvbnN0cmFpbnRzIHRocm91Z2ggQ2xhdWRlIENvZGVcXCdzIGRlc2lnbicsXG5cblx0XHRiYXNlOiAnL3VuZGVyc3RhbmRpbmctbGxtLXRocm91Z2gtY2xhdWRlLWNvZGUvJyxcblxuXHRcdGhlYWQ6IFtcblx0XHRcdC8vIGhyZWZsYW5nOiBFbmdsaXNoIDwtPiBKYXBhbmVzZVxuXHRcdFx0WydsaW5rJywgeyByZWw6ICdhbHRlcm5hdGUnLCBocmVmbGFuZzogJ2VuJywgaHJlZjogJ2h0dHBzOi8vc2h1amktYm9uamkuZ2l0aHViLmlvL3VuZGVyc3RhbmRpbmctbGxtLXRocm91Z2gtY2xhdWRlLWNvZGUvJyB9XSxcblx0XHRcdFsnbGluaycsIHsgcmVsOiAnYWx0ZXJuYXRlJywgaHJlZmxhbmc6ICdqYScsIGhyZWY6ICdodHRwczovL3NodWppLWJvbmppLmdpdGh1Yi5pby91bmRlcnN0YW5kaW5nLWxsbS10aHJvdWdoLWNsYXVkZS1jb2RlL2phLycgfV0sXG5cdFx0XHRbJ2xpbmsnLCB7IHJlbDogJ2FsdGVybmF0ZScsIGhyZWZsYW5nOiAneC1kZWZhdWx0JywgaHJlZjogJ2h0dHBzOi8vc2h1amktYm9uamkuZ2l0aHViLmlvL3VuZGVyc3RhbmRpbmctbGxtLXRocm91Z2gtY2xhdWRlLWNvZGUvJyB9XSxcblx0XHRcdC8vIE9HUFxuXHRcdFx0WydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOnR5cGUnLCBjb250ZW50OiAnd2Vic2l0ZScgfV0sXG5cdFx0XHRbJ21ldGEnLCB7IHByb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogJ1VuZGVyc3RhbmRpbmcgTExNcyBUaHJvdWdoIENsYXVkZSBDb2RlJyB9XSxcblx0XHRcdFsnbWV0YScsIHsgcHJvcGVydHk6ICdvZzpsb2NhbGUnLCBjb250ZW50OiAnZW4nIH1dLFxuXHRcdFx0WydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOmxvY2FsZTphbHRlcm5hdGUnLCBjb250ZW50OiAnamFfSlAnIH1dLFxuXHRcdFx0WydtZXRhJywgeyBuYW1lOiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnlfbGFyZ2VfaW1hZ2UnIH1dLFxuXHRcdF0sXG5cblx0XHQvLyBpMThuOiBFbmdsaXNoID0gcm9vdCwgSmFwYW5lc2UgPSAvamEvXG5cdFx0bG9jYWxlczoge1xuXHRcdFx0cm9vdDoge1xuXHRcdFx0XHRsYWJlbDogJ0VuZ2xpc2gnLFxuXHRcdFx0XHRsYW5nOiAnZW4nLFxuXHRcdFx0XHQuLi5lbkNvbmZpZyxcblx0XHRcdH0sXG5cdFx0XHRqYToge1xuXHRcdFx0XHRsYWJlbDogJ1x1NjVFNVx1NjcyQ1x1OEE5RSAoSmFwYW5lc2UpJyxcblx0XHRcdFx0bGFuZzogJ2phJyxcblx0XHRcdFx0bGluazogJy9qYS8nLFxuXHRcdFx0XHQuLi5qYUNvbmZpZyxcblx0XHRcdH0sXG5cdFx0fSxcblxuXHRcdC8vIE1lcm1haWRcblx0XHRtZXJtYWlkOiB7XG5cdFx0XHRzZWN1cml0eUxldmVsOiAnbG9vc2UnLFxuXHRcdFx0dGhlbWU6ICdkZWZhdWx0Jyxcblx0XHRcdGZsb3djaGFydDogeyB1c2VNYXhXaWR0aDogdHJ1ZSB9LFxuXHRcdFx0c2VxdWVuY2U6IHsgdXNlTWF4V2lkdGg6IHRydWUgfSxcblx0XHRcdG1pbmRtYXA6IHsgdXNlTWF4V2lkdGg6IHRydWUgfSxcblx0XHRcdHRpbWVsaW5lOiB7IHVzZU1heFdpZHRoOiB0cnVlIH0sXG5cdFx0fSxcblx0XHRtZXJtYWlkUGx1Z2luOiB7XG5cdFx0XHRjbGFzczogJ21lcm1haWQnLFxuXHRcdH0sXG5cblx0XHQvLyBWaXRlIG9wdGltaXphdGlvblxuXHRcdHZpdGU6IHtcblx0XHRcdG9wdGltaXplRGVwczoge1xuXHRcdFx0XHRpbmNsdWRlOiBbJ21lcm1haWQnXSxcblx0XHRcdH0sXG5cdFx0XHRidWlsZDoge1xuXHRcdFx0XHRlbXB0eU91dERpcjogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0fSxcblxuXHRcdC8vIHRlbXBEaXIgKGF2b2lkIG1vdW50IHBlcm1pc3Npb24gaXNzdWVzKVxuXHRcdHRlbXBEaXI6ICcvdG1wL3ZpdGVwcmVzcy10ZW1wJyxcblxuXHRcdC8vIEV4Y2x1ZGUgZmlsZXNcblx0XHRzcmNFeGNsdWRlOiBbJyoqL1JFQURNRS5tZCcsICcqKi9SRUFETUUuamEubWQnXSxcblxuXHRcdC8vIFNpdGVtYXBcblx0XHRzaXRlbWFwOiB7XG5cdFx0XHRob3N0bmFtZTogJ2h0dHBzOi8vc2h1amktYm9uamkuZ2l0aHViLmlvL3VuZGVyc3RhbmRpbmctbGxtLXRocm91Z2gtY2xhdWRlLWNvZGUvJyxcblx0XHR9LFxuXG5cdFx0Ly8gVGhlbWUgY29tbW9uXG5cdFx0bGFzdFVwZGF0ZWQ6IHRydWUsXG5cdFx0Y2xlYW5VcmxzOiB0cnVlLFxuXHRcdGlnbm9yZURlYWRMaW5rczogZmFsc2UsXG5cblx0XHR0aGVtZUNvbmZpZzoge1xuXHRcdFx0c29jaWFsTGlua3M6IFtcblx0XHRcdFx0eyBpY29uOiAnZ2l0aHViJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9zaHVqaS1ib25qaS91bmRlcnN0YW5kaW5nLWxsbS10aHJvdWdoLWNsYXVkZS1jb2RlJyB9LFxuXHRcdFx0XSxcblx0XHRcdHNlYXJjaDoge1xuXHRcdFx0XHRwcm92aWRlcjogJ2xvY2FsJyxcblx0XHRcdH0sXG5cdFx0XHRmb290ZXI6IHtcblx0XHRcdFx0bWVzc2FnZTogJ1JlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4nLFxuXHRcdFx0XHRjb3B5cmlnaHQ6ICdDb3B5cmlnaHQgXHUwMEE5IDIwMjUtMjAyNiBzaHVqaS1ib25qaScsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH0pLFxuKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Nlc3Npb25zL3plbi1pbnNwaXJpbmctcmFtYW51amFuL21udC91bmRlcnN0YW5kaW5nLWxsbS10aHJvdWdoLWNsYXVkZS1jb2RlL2RvY3MvLnZpdGVwcmVzcy9sb2NhbGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvc2Vzc2lvbnMvemVuLWluc3BpcmluZy1yYW1hbnVqYW4vbW50L3VuZGVyc3RhbmRpbmctbGxtLXRocm91Z2gtY2xhdWRlLWNvZGUvZG9jcy8udml0ZXByZXNzL2xvY2FsZXMvamEudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Nlc3Npb25zL3plbi1pbnNwaXJpbmctcmFtYW51amFuL21udC91bmRlcnN0YW5kaW5nLWxsbS10aHJvdWdoLWNsYXVkZS1jb2RlL2RvY3MvLnZpdGVwcmVzcy9sb2NhbGVzL2phLnRzXCI7aW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUsIExvY2FsZVNwZWNpZmljQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJztcblxuZXhwb3J0IGNvbnN0IGphQ29uZmlnOiBMb2NhbGVTcGVjaWZpY0NvbmZpZzxEZWZhdWx0VGhlbWUuQ29uZmlnPiA9IHtcblx0ZGVzY3JpcHRpb246ICdMTE1cdTMwNkVcdTY5Q0JcdTkwMjBcdTc2ODRcdTUyMzZcdTdEMDRcdTMwOTIgQ2xhdWRlIENvZGUgXHUzMDZFXHU4QTJEXHU4QTA4XHUzMDkyXHU5MDFBXHUzMDU4XHUzMDY2XHU3NDA2XHU4OUUzXHUzMDU5XHUzMDhCJyxcblx0dGhlbWVDb25maWc6IHtcblx0XHRuYXY6IFtcblx0XHRcdHsgdGV4dDogJ1x1MzBEQlx1MzBGQ1x1MzBFMCcsIGxpbms6ICcvamEvJyB9LFxuXHRcdFx0eyB0ZXh0OiAnTExNXHUzMDZFXHU1NTRGXHU5ODRDJywgbGluazogJy9qYS8wMS1sbG0tc3RydWN0dXJhbC1wcm9ibGVtcy8nIH0sXG5cdFx0XHR7IHRleHQ6ICdcdTMwQjNcdTMwRjNcdTMwQzZcdTMwQURcdTMwQjlcdTMwQzgnLCBsaW5rOiAnL2phLzAyLWNvbnRleHQtd2luZG93LycgfSxcblx0XHRcdHsgdGV4dDogJ1x1OEEyRFx1NUI5QVx1MzBFQ1x1MzBBNFx1MzBFNFx1MzBGQycsIGxpbms6ICcvamEvMDMtYWx3YXlzLWxvYWRlZC1jb250ZXh0LycgfSxcblx0XHRcdHsgdGV4dDogJ1x1NEVEOFx1OTMzMicsIGxpbms6ICcvamEvYXBwZW5kaXgvZ2xvc3NhcnknIH0sXG5cdFx0XSxcblx0XHRzaWRlYmFyOiB7XG5cdFx0XHQnL2phLyc6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRleHQ6ICdQYXJ0IDE6IExMTVx1MzA2RVx1NjlDQlx1OTAyMFx1NzY4NFx1NTU0Rlx1OTg0QycsXG5cdFx0XHRcdFx0Y29sbGFwc2VkOiBmYWxzZSxcblx0XHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnXHU2OTgyXHU4OTgxXHVGRjFBOFx1MzA2NFx1MzA2RVx1NjlDQlx1OTAyMFx1NzY4NFx1NTU0Rlx1OTg0QycsIGxpbms6ICcvamEvMDEtbGxtLXN0cnVjdHVyYWwtcHJvYmxlbXMvJyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnQ29udGV4dCBSb3QnLCBsaW5rOiAnL2phLzAxLWxsbS1zdHJ1Y3R1cmFsLXByb2JsZW1zL2NvbnRleHQtcm90JyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnTG9zdCBpbiB0aGUgTWlkZGxlJywgbGluazogJy9qYS8wMS1sbG0tc3RydWN0dXJhbC1wcm9ibGVtcy9sb3N0LWluLXRoZS1taWRkbGUnIH0sXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdQcmlvcml0eSBTYXR1cmF0aW9uJywgbGluazogJy9qYS8wMS1sbG0tc3RydWN0dXJhbC1wcm9ibGVtcy9wcmlvcml0eS1zYXR1cmF0aW9uJyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnSGFsbHVjaW5hdGlvbicsIGxpbms6ICcvamEvMDEtbGxtLXN0cnVjdHVyYWwtcHJvYmxlbXMvaGFsbHVjaW5hdGlvbicgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1N5Y29waGFuY3knLCBsaW5rOiAnL2phLzAxLWxsbS1zdHJ1Y3R1cmFsLXByb2JsZW1zL3N5Y29waGFuY3knIH0sXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdLbm93bGVkZ2UgQm91bmRhcnknLCBsaW5rOiAnL2phLzAxLWxsbS1zdHJ1Y3R1cmFsLXByb2JsZW1zL2tub3dsZWRnZS1ib3VuZGFyeScgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1Byb21wdCBTZW5zaXRpdml0eScsIGxpbms6ICcvamEvMDEtbGxtLXN0cnVjdHVyYWwtcHJvYmxlbXMvcHJvbXB0LXNlbnNpdGl2aXR5JyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnSW5zdHJ1Y3Rpb24gRGVjYXknLCBsaW5rOiAnL2phLzAxLWxsbS1zdHJ1Y3R1cmFsLXByb2JsZW1zL2luc3RydWN0aW9uLWRlY2F5JyB9LFxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZXh0OiAnUGFydCAyOiBcdTMwQjNcdTMwRjNcdTMwQzZcdTMwQURcdTMwQjlcdTMwQzhcdTMwQTZcdTMwQTNcdTMwRjNcdTMwQzlcdTMwQTYnLFxuXHRcdFx0XHRcdGNvbGxhcHNlZDogZmFsc2UsXG5cdFx0XHRcdFx0aXRlbXM6IFtcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1x1Njk4Mlx1ODk4MScsIGxpbms6ICcvamEvMDItY29udGV4dC13aW5kb3cvJyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnXHUzMEM4XHUzMEZDXHUzMEFGXHUzMEYzXHUzMEZCXHUzMEIzXHUzMEYzXHUzMEM2XHUzMEFEXHUzMEI5XHUzMEM4XHUzMEZCXHUzMEIzXHUzMEYzXHUzMEM2XHUzMEFEXHUzMEI5XHUzMEM4XHUzMEE2XHUzMEEzXHUzMEYzXHUzMEM5XHUzMEE2JywgbGluazogJy9qYS8wMi1jb250ZXh0LXdpbmRvdy90b2tlbi1jb250ZXh0LWJhc2ljcycgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0xMTVx1MzA0Q1x1ODk4Qlx1MzA2Nlx1MzA0NFx1MzA4Qlx1MzA4Mlx1MzA2RScsIGxpbms6ICcvamEvMDItY29udGV4dC13aW5kb3cvd2hhdC1sbG0tc2VlcycgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1x1NkNFOFx1NTE2NVx1MzBCRlx1MzBBNFx1MzBERlx1MzBGM1x1MzBCMCcsIGxpbms6ICcvamEvMDItY29udGV4dC13aW5kb3cvaW5qZWN0aW9uLXRpbWluZycgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1x1MzBCM1x1MzBGM1x1MzBDNlx1MzBBRFx1MzBCOVx1MzBDOFx1MzBEMFx1MzBCOFx1MzBBN1x1MzBDM1x1MzBDOCcsIGxpbms6ICcvamEvMDItY29udGV4dC13aW5kb3cvY29udGV4dC1idWRnZXQnIH0sXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdDaGF0ID0gXHUzMEJCXHUzMEMzXHUzMEI3XHUzMEU3XHUzMEYzXHUzMDZFXHU3NTFGXHU1QjU4XHU2NzFGXHU5NTkzJywgbGluazogJy9qYS8wMi1jb250ZXh0LXdpbmRvdy9jaGF0LXNlc3Npb24nIH0sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRleHQ6ICdQYXJ0IDM6IFx1NUUzOFx1OTlEMFx1MzBCM1x1MzBGM1x1MzBDNlx1MzBBRFx1MzBCOVx1MzBDOCcsXG5cdFx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdcdTY5ODJcdTg5ODEnLCBsaW5rOiAnL2phLzAzLWFsd2F5cy1sb2FkZWQtY29udGV4dC8nIH0sXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdDTEFVREUubWQgXHUzMDZFXHU4QTJEXHU4QTA4XHU1MzlGXHU1MjQ3JywgbGluazogJy9qYS8wMy1hbHdheXMtbG9hZGVkLWNvbnRleHQvY2xhdWRlLW1kJyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnXHU5NjhFXHU1QzY0XHUzMERFXHUzMEZDXHUzMEI4JywgbGluazogJy9qYS8wMy1hbHdheXMtbG9hZGVkLWNvbnRleHQvaGllcmFyY2h5JyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnQ0xBVURFLmxvY2FsLm1kIFx1MzA2RVx1OTA0Qlx1NzUyOCcsIGxpbms6ICcvamEvMDMtYWx3YXlzLWxvYWRlZC1jb250ZXh0L2xvY2FsLW1kJyB9LFxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZXh0OiAnUGFydCA0OiBcdTY3NjFcdTRFRjZcdTRFRDhcdTMwNERcdTMwQjNcdTMwRjNcdTMwQzZcdTMwQURcdTMwQjlcdTMwQzgnLFxuXHRcdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnXHU2OTgyXHU4OTgxJywgbGluazogJy9qYS8wNC1jb25kaXRpb25hbC1jb250ZXh0LycgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1J1bGVzIFx1MzA2RVx1OEEyRFx1OEEwOFx1NTM5Rlx1NTI0NycsIGxpbms6ICcvamEvMDQtY29uZGl0aW9uYWwtY29udGV4dC9ydWxlcycgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0dsb2IgXHUzMEQxXHUzMEJGXHUzMEZDXHUzMEYzXHU4QTJEXHU4QTA4JywgbGluazogJy9qYS8wNC1jb25kaXRpb25hbC1jb250ZXh0L2dsb2ItcGF0dGVybnMnIH0sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRleHQ6ICdQYXJ0IDU6IFx1MzBBQVx1MzBGM1x1MzBDN1x1MzBERVx1MzBGM1x1MzBDOVx1MzBCM1x1MzBGM1x1MzBDNlx1MzBBRFx1MzBCOVx1MzBDOCcsXG5cdFx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdcdTY5ODJcdTg5ODEnLCBsaW5rOiAnL2phLzA1LW9uLWRlbWFuZC1jb250ZXh0LycgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1NraWxscyBcdTMwNkVcdThBMkRcdThBMDhcdTUzOUZcdTUyNDcnLCBsaW5rOiAnL2phLzA1LW9uLWRlbWFuZC1jb250ZXh0L3NraWxscycgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ0FnZW50cyBcdTMwNkVcdThBMkRcdThBMDhcdTUzOUZcdTUyNDcnLCBsaW5rOiAnL2phLzA1LW9uLWRlbWFuZC1jb250ZXh0L2FnZW50cycgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1NraWxscyB2cyBBZ2VudHMgXHU1MjI0XHU2NUFEXHU1N0ZBXHU2RTk2JywgbGluazogJy9qYS8wNS1vbi1kZW1hbmQtY29udGV4dC9za2lsbC12cy1hZ2VudCcgfSxcblx0XHRcdFx0XHRdLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGV4dDogJ1BhcnQgNjogXHUzMEM0XHUzMEZDXHUzMEVCXHUzMEIzXHUzMEYzXHUzMEM2XHUzMEFEXHUzMEI5XHUzMEM4IFx1MjAxNCBNQ1AnLFxuXHRcdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnXHU2OTgyXHU4OTgxJywgbGluazogJy9qYS8wNi10b29sLWNvbnRleHQvJyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnTUNQIFx1MzA2RVx1MzBCM1x1MzBGM1x1MzBDNlx1MzBBRFx1MzBCOVx1MzBDOFx1MzBCM1x1MzBCOVx1MzBDOCcsIGxpbms6ICcvamEvMDYtdG9vbC1jb250ZXh0L21jcC1jb250ZXh0LWNvc3QnIH0sXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdUb29sIFNlYXJjaCcsIGxpbms6ICcvamEvMDYtdG9vbC1jb250ZXh0L3Rvb2wtc2VhcmNoJyB9LFxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZXh0OiAnUGFydCA3OiBcdTMwRTlcdTMwRjNcdTMwQkZcdTMwQTRcdTMwRTBcdTMwRUNcdTMwQTRcdTMwRTRcdTMwRkMnLFxuXHRcdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnXHU2OTgyXHU4OTgxJywgbGluazogJy9qYS8wNy1ydW50aW1lLWxheWVyLycgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ3NldHRpbmdzLmpzb24gXHUzMDZFXHU1Rjc5XHU1MjcyJywgbGluazogJy9qYS8wNy1ydW50aW1lLWxheWVyL3NldHRpbmdzLWpzb24nIH0sXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdIb29rcyBcdTMwRTlcdTMwQTRcdTMwRDVcdTMwQjVcdTMwQTRcdTMwQUZcdTMwRUInLCBsaW5rOiAnL2phLzA3LXJ1bnRpbWUtbGF5ZXIvaG9va3MnIH0sXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdcdTMwNkFcdTMwNUNcdTMwQjNcdTMwRjNcdTMwQzZcdTMwQURcdTMwQjlcdTMwQzhcdTU5MTZcdTMwNkJcdTdGNkVcdTMwNEZcdTMwNkVcdTMwNEInLCBsaW5rOiAnL2phLzA3LXJ1bnRpbWUtbGF5ZXIvd2h5LW5vdC1pbi1jb250ZXh0JyB9LFxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0ZXh0OiAnUGFydCA4OiBcdTMwQkJcdTMwQzNcdTMwQjdcdTMwRTdcdTMwRjNcdTdCQTFcdTc0MDYnLFxuXHRcdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnXHU2OTgyXHU4OTgxJywgbGluazogJy9qYS8wOC1zZXNzaW9uLW1hbmFnZW1lbnQvJyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnL2NvbXBhY3QgdnMgL2NsZWFyJywgbGluazogJy9qYS8wOC1zZXNzaW9uLW1hbmFnZW1lbnQvY29tcGFjdC1hbmQtY2xlYXInIH0sXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdcdThBMThcdTYxQjZcdTMwNENcdTU1NEZcdTk4NENcdTMwNkJcdTMwNkFcdTMwOEJcdTc0MDZcdTc1MzEnLCBsaW5rOiAnL2phLzA4LXNlc3Npb24tbWFuYWdlbWVudC9tZW1vcnktcHJvYmxlbScgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1x1NEY1NVx1MzA5Mlx1OEExOFx1NjFCNlx1MzA1OVx1MzA3OVx1MzA0RFx1MzA0QicsIGxpbms6ICcvamEvMDgtc2Vzc2lvbi1tYW5hZ2VtZW50L3doYXQtdG8tcmVtZW1iZXInIH0sXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdcdTMwNDRcdTMwNjRcdTMwRkJcdTMwNjlcdTMwNDZcdTYwMURcdTMwNDRcdTUxRkFcdTMwNTlcdTMwNEInLCBsaW5rOiAnL2phLzA4LXNlc3Npb24tbWFuYWdlbWVudC93aGVuLXRvLXJlY2FsbCcgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1x1MzBDNFx1MzBGQ1x1MzBFQlx1NkJENFx1OEYwMycsIGxpbms6ICcvamEvMDgtc2Vzc2lvbi1tYW5hZ2VtZW50L3Rvb2xzLWNvbXBhcmlzb24nIH0sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRleHQ6ICdQYXJ0IDk6IFx1NEVENkxMTVx1MzA3OFx1MzA2RVx1NUZEQ1x1NzUyOCcsXG5cdFx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdcdTY5ODJcdTg5ODEnLCBsaW5rOiAnL2phLzA5LWNyb3NzLWxsbS1wcmluY2lwbGVzLycgfSxcblx0XHRcdFx0XHRcdHsgdGV4dDogJ1x1NjlDQlx1OTAyMFx1NzY4NFx1NTIzNlx1N0QwNFx1MzA2Rlx1NjY2RVx1OTA0RFx1NzY4NCcsIGxpbms6ICcvamEvMDktY3Jvc3MtbGxtLXByaW5jaXBsZXMvdW5pdmVyc2FsLXBhdHRlcm5zJyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnXHUzMEM0XHUzMEZDXHUzMEVCXHU2NTJGXHU2M0Y0XHUzMDRDXHUzMDZBXHUzMDQ0XHU3NEIwXHU1ODgzXHUzMDY3XHUzMDZFXHU1QjlGXHU4REY1JywgbGluazogJy9qYS8wOS1jcm9zcy1sbG0tcHJpbmNpcGxlcy9wcm9tcHQtZHJpdmVuLWRldmVsb3BtZW50JyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnQ3Vyc29yIC8gQ2xpbmUgLyBDb3BpbG90IFx1NUJGRVx1NUZEQ1x1ODg2OCcsIGxpbms6ICcvamEvMDktY3Jvc3MtbGxtLXByaW5jaXBsZXMvY3Vyc29yLWNsaW5lLW1hcHBpbmcnIH0sXG5cdFx0XHRcdFx0XSxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRleHQ6ICdcdTRFRDhcdTkzMzInLFxuXHRcdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnXHU2OUNCXHU5MDIwXHU3Njg0XHU1NTRGXHU5ODRDIFx1MDBENyBcdTVCRkVcdTdCNTZcdTMwREVcdTMwQzNcdTMwRDcnLCBsaW5rOiAnL2phL2FwcGVuZGl4L3Byb2JsZW0tY291bnRlcm1lYXN1cmUtbWFwJyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnXHUzMEU5XHUzMEE0XHUzMEQ1XHUzMEI1XHUzMEE0XHUzMEFGXHUzMEVCIFx1MDBENyBcdThBMkRcdTVCOUFcdTMwREVcdTMwQzNcdTMwRDcnLCBsaW5rOiAnL2phL2FwcGVuZGl4L2xpZmVjeWNsZS1jb25maWctbWFwJyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnQ2xhdWRlIENvZGUgXHU4QTJEXHU1QjlBXHUzMEVBXHUzMEQ1XHUzMEExXHUzMEVDXHUzMEYzXHUzMEI5JywgbGluazogJy9qYS9hcHBlbmRpeC9jbGF1ZGUtY29kZS1jb25maWctcmVmZXJlbmNlJyB9LFxuXHRcdFx0XHRcdFx0eyB0ZXh0OiAnRkFRJywgbGluazogJy9qYS9hcHBlbmRpeC9mYXEnIH0sXG5cdFx0XHRcdFx0XHR7IHRleHQ6ICdcdTc1MjhcdThBOUVcdTk2QzYnLCBsaW5rOiAnL2phL2FwcGVuZGl4L2dsb3NzYXJ5JyB9LFxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdH0sXG5cdFx0XHRdLFxuXHRcdH0sXG5cdFx0b3V0bGluZTogeyBsYWJlbDogJ1x1NzZFRVx1NkIyMScgfSxcblx0XHRsYXN0VXBkYXRlZDogeyB0ZXh0OiAnXHU2NzAwXHU3RDQyXHU2NkY0XHU2NUIwJyB9LFxuXHRcdGRvY0Zvb3RlcjogeyBwcmV2OiAnXHU1MjREXHUzMDc4JywgbmV4dDogJ1x1NkIyMVx1MzA3OCcgfSxcblx0XHRlZGl0TGluazoge1xuXHRcdFx0cGF0dGVybjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9zaHVqaS1ib25qaS91bmRlcnN0YW5kaW5nLWxsbS10aHJvdWdoLWNsYXVkZS1jb2RlL2VkaXQvbWFpbi9kb2NzLzpwYXRoJyxcblx0XHRcdHRleHQ6ICdHaXRIdWIgXHUzMDY3XHU3REU4XHU5NkM2XHUzMDU5XHUzMDhCJyxcblx0XHR9LFxuXHR9LFxufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Nlc3Npb25zL3plbi1pbnNwaXJpbmctcmFtYW51amFuL21udC91bmRlcnN0YW5kaW5nLWxsbS10aHJvdWdoLWNsYXVkZS1jb2RlL2RvY3MvLnZpdGVwcmVzcy9sb2NhbGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvc2Vzc2lvbnMvemVuLWluc3BpcmluZy1yYW1hbnVqYW4vbW50L3VuZGVyc3RhbmRpbmctbGxtLXRocm91Z2gtY2xhdWRlLWNvZGUvZG9jcy8udml0ZXByZXNzL2xvY2FsZXMvZW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Nlc3Npb25zL3plbi1pbnNwaXJpbmctcmFtYW51amFuL21udC91bmRlcnN0YW5kaW5nLWxsbS10aHJvdWdoLWNsYXVkZS1jb2RlL2RvY3MvLnZpdGVwcmVzcy9sb2NhbGVzL2VuLnRzXCI7aW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUsIExvY2FsZVNwZWNpZmljQ29uZmlnIH0gZnJvbSAndml0ZXByZXNzJztcblxuZXhwb3J0IGNvbnN0IGVuQ29uZmlnOiBMb2NhbGVTcGVjaWZpY0NvbmZpZzxEZWZhdWx0VGhlbWUuQ29uZmlnPiA9IHtcblx0ZGVzY3JpcHRpb246ICdVbmRlcnN0YW5kaW5nIExMTSBzdHJ1Y3R1cmFsIGNvbnN0cmFpbnRzIHRocm91Z2ggQ2xhdWRlIENvZGVcXCdzIGRlc2lnbicsXG5cdHRoZW1lQ29uZmlnOiB7XG5cdFx0bmF2OiBbXG5cdFx0XHR7IHRleHQ6ICdIb21lJywgbGluazogJy8nIH0sXG5cdFx0XHR7IHRleHQ6ICdMTE0gUHJvYmxlbXMnLCBsaW5rOiAnLzAxLWxsbS1zdHJ1Y3R1cmFsLXByb2JsZW1zLycgfSxcblx0XHRcdHsgdGV4dDogJ0NvbnRleHQgV2luZG93JywgbGluazogJy8wMi1jb250ZXh0LXdpbmRvdy8nIH0sXG5cdFx0XHR7IHRleHQ6ICdDb25maWd1cmF0aW9uJywgbGluazogJy8wMy1hbHdheXMtbG9hZGVkLWNvbnRleHQvJyB9LFxuXHRcdFx0eyB0ZXh0OiAnQXBwZW5kaXgnLCBsaW5rOiAnL2FwcGVuZGl4L2dsb3NzYXJ5JyB9LFxuXHRcdF0sXG5cdFx0c2lkZWJhcjogW1xuXHRcdFx0e1xuXHRcdFx0XHR0ZXh0OiAnUGFydCAxOiBMTE0gU3RydWN0dXJhbCBQcm9ibGVtcycsXG5cdFx0XHRcdGNvbGxhcHNlZDogZmFsc2UsXG5cdFx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdFx0eyB0ZXh0OiAnT3ZlcnZpZXc6IFRoZSA4IFByb2JsZW1zJywgbGluazogJy8wMS1sbG0tc3RydWN0dXJhbC1wcm9ibGVtcy8nIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnQ29udGV4dCBSb3QnLCBsaW5rOiAnLzAxLWxsbS1zdHJ1Y3R1cmFsLXByb2JsZW1zL2NvbnRleHQtcm90JyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ0xvc3QgaW4gdGhlIE1pZGRsZScsIGxpbms6ICcvMDEtbGxtLXN0cnVjdHVyYWwtcHJvYmxlbXMvbG9zdC1pbi10aGUtbWlkZGxlJyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ1ByaW9yaXR5IFNhdHVyYXRpb24nLCBsaW5rOiAnLzAxLWxsbS1zdHJ1Y3R1cmFsLXByb2JsZW1zL3ByaW9yaXR5LXNhdHVyYXRpb24nIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnSGFsbHVjaW5hdGlvbicsIGxpbms6ICcvMDEtbGxtLXN0cnVjdHVyYWwtcHJvYmxlbXMvaGFsbHVjaW5hdGlvbicgfSxcblx0XHRcdFx0XHR7IHRleHQ6ICdTeWNvcGhhbmN5JywgbGluazogJy8wMS1sbG0tc3RydWN0dXJhbC1wcm9ibGVtcy9zeWNvcGhhbmN5JyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ0tub3dsZWRnZSBCb3VuZGFyeScsIGxpbms6ICcvMDEtbGxtLXN0cnVjdHVyYWwtcHJvYmxlbXMva25vd2xlZGdlLWJvdW5kYXJ5JyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ1Byb21wdCBTZW5zaXRpdml0eScsIGxpbms6ICcvMDEtbGxtLXN0cnVjdHVyYWwtcHJvYmxlbXMvcHJvbXB0LXNlbnNpdGl2aXR5JyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ0luc3RydWN0aW9uIERlY2F5JywgbGluazogJy8wMS1sbG0tc3RydWN0dXJhbC1wcm9ibGVtcy9pbnN0cnVjdGlvbi1kZWNheScgfSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRleHQ6ICdQYXJ0IDI6IENvbnRleHQgV2luZG93Jyxcblx0XHRcdFx0Y29sbGFwc2VkOiBmYWxzZSxcblx0XHRcdFx0aXRlbXM6IFtcblx0XHRcdFx0XHR7IHRleHQ6ICdPdmVydmlldycsIGxpbms6ICcvMDItY29udGV4dC13aW5kb3cvJyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ1Rva2VuLCBDb250ZXh0LCBDb250ZXh0IFdpbmRvdycsIGxpbms6ICcvMDItY29udGV4dC13aW5kb3cvdG9rZW4tY29udGV4dC1iYXNpY3MnIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnV2hhdCB0aGUgTExNIFNlZXMnLCBsaW5rOiAnLzAyLWNvbnRleHQtd2luZG93L3doYXQtbGxtLXNlZXMnIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnSW5qZWN0aW9uIFRpbWluZycsIGxpbms6ICcvMDItY29udGV4dC13aW5kb3cvaW5qZWN0aW9uLXRpbWluZycgfSxcblx0XHRcdFx0XHR7IHRleHQ6ICdDb250ZXh0IEJ1ZGdldCcsIGxpbms6ICcvMDItY29udGV4dC13aW5kb3cvY29udGV4dC1idWRnZXQnIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnQ2hhdCBTZXNzaW9uIExpZmVjeWNsZScsIGxpbms6ICcvMDItY29udGV4dC13aW5kb3cvY2hhdC1zZXNzaW9uJyB9LFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogJ1BhcnQgMzogQWx3YXlzLUxvYWRlZCBDb250ZXh0Jyxcblx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdHsgdGV4dDogJ092ZXJ2aWV3JywgbGluazogJy8wMy1hbHdheXMtbG9hZGVkLWNvbnRleHQvJyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ0NMQVVERS5tZCBEZXNpZ24nLCBsaW5rOiAnLzAzLWFsd2F5cy1sb2FkZWQtY29udGV4dC9jbGF1ZGUtbWQnIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnSGllcmFyY2hpY2FsIE1lcmdpbmcnLCBsaW5rOiAnLzAzLWFsd2F5cy1sb2FkZWQtY29udGV4dC9oaWVyYXJjaHknIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnQ0xBVURFLmxvY2FsLm1kJywgbGluazogJy8wMy1hbHdheXMtbG9hZGVkLWNvbnRleHQvbG9jYWwtbWQnIH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0ZXh0OiAnUGFydCA0OiBDb25kaXRpb25hbCBDb250ZXh0Jyxcblx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdHsgdGV4dDogJ092ZXJ2aWV3JywgbGluazogJy8wNC1jb25kaXRpb25hbC1jb250ZXh0LycgfSxcblx0XHRcdFx0XHR7IHRleHQ6ICdSdWxlcyBEZXNpZ24nLCBsaW5rOiAnLzA0LWNvbmRpdGlvbmFsLWNvbnRleHQvcnVsZXMnIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnR2xvYiBQYXR0ZXJucycsIGxpbms6ICcvMDQtY29uZGl0aW9uYWwtY29udGV4dC9nbG9iLXBhdHRlcm5zJyB9LFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogJ1BhcnQgNTogT24tRGVtYW5kIENvbnRleHQnLFxuXHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdFx0eyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnLzA1LW9uLWRlbWFuZC1jb250ZXh0LycgfSxcblx0XHRcdFx0XHR7IHRleHQ6ICdTa2lsbHMgRGVzaWduJywgbGluazogJy8wNS1vbi1kZW1hbmQtY29udGV4dC9za2lsbHMnIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnQWdlbnRzIERlc2lnbicsIGxpbms6ICcvMDUtb24tZGVtYW5kLWNvbnRleHQvYWdlbnRzJyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ1NraWxscyB2cyBBZ2VudHMnLCBsaW5rOiAnLzA1LW9uLWRlbWFuZC1jb250ZXh0L3NraWxsLXZzLWFnZW50JyB9LFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogJ1BhcnQgNjogVG9vbCBDb250ZXh0IFx1MjAxNCBNQ1AnLFxuXHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdFx0eyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnLzA2LXRvb2wtY29udGV4dC8nIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnTUNQIENvbnRleHQgQ29zdCcsIGxpbms6ICcvMDYtdG9vbC1jb250ZXh0L21jcC1jb250ZXh0LWNvc3QnIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnVG9vbCBTZWFyY2gnLCBsaW5rOiAnLzA2LXRvb2wtY29udGV4dC90b29sLXNlYXJjaCcgfSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRleHQ6ICdQYXJ0IDc6IFJ1bnRpbWUgTGF5ZXInLFxuXHRcdFx0XHRjb2xsYXBzZWQ6IHRydWUsXG5cdFx0XHRcdGl0ZW1zOiBbXG5cdFx0XHRcdFx0eyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnLzA3LXJ1bnRpbWUtbGF5ZXIvJyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ3NldHRpbmdzLmpzb24nLCBsaW5rOiAnLzA3LXJ1bnRpbWUtbGF5ZXIvc2V0dGluZ3MtanNvbicgfSxcblx0XHRcdFx0XHR7IHRleHQ6ICdIb29rcyBMaWZlY3ljbGUnLCBsaW5rOiAnLzA3LXJ1bnRpbWUtbGF5ZXIvaG9va3MnIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnV2h5IE5vdCBpbiBDb250ZXh0JywgbGluazogJy8wNy1ydW50aW1lLWxheWVyL3doeS1ub3QtaW4tY29udGV4dCcgfSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRleHQ6ICdQYXJ0IDg6IFNlc3Npb24gTWFuYWdlbWVudCcsXG5cdFx0XHRcdGNvbGxhcHNlZDogdHJ1ZSxcblx0XHRcdFx0aXRlbXM6IFtcblx0XHRcdFx0XHR7IHRleHQ6ICdPdmVydmlldycsIGxpbms6ICcvMDgtc2Vzc2lvbi1tYW5hZ2VtZW50LycgfSxcblx0XHRcdFx0XHR7IHRleHQ6ICcvY29tcGFjdCB2cyAvY2xlYXInLCBsaW5rOiAnLzA4LXNlc3Npb24tbWFuYWdlbWVudC9jb21wYWN0LWFuZC1jbGVhcicgfSxcblx0XHRcdFx0XHR7IHRleHQ6ICdXaHkgTWVtb3J5IElzIGEgUHJvYmxlbScsIGxpbms6ICcvMDgtc2Vzc2lvbi1tYW5hZ2VtZW50L21lbW9yeS1wcm9ibGVtJyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ1doYXQgdG8gUmVtZW1iZXInLCBsaW5rOiAnLzA4LXNlc3Npb24tbWFuYWdlbWVudC93aGF0LXRvLXJlbWVtYmVyJyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ1doZW4gdG8gUmVjYWxsJywgbGluazogJy8wOC1zZXNzaW9uLW1hbmFnZW1lbnQvd2hlbi10by1yZWNhbGwnIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnVG9vbCBDb21wYXJpc29uJywgbGluazogJy8wOC1zZXNzaW9uLW1hbmFnZW1lbnQvdG9vbHMtY29tcGFyaXNvbicgfSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRleHQ6ICdQYXJ0IDk6IENyb3NzLUxMTSBQcmluY2lwbGVzJyxcblx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdHsgdGV4dDogJ092ZXJ2aWV3JywgbGluazogJy8wOS1jcm9zcy1sbG0tcHJpbmNpcGxlcy8nIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnVW5pdmVyc2FsIFBhdHRlcm5zJywgbGluazogJy8wOS1jcm9zcy1sbG0tcHJpbmNpcGxlcy91bml2ZXJzYWwtcGF0dGVybnMnIH0sXG5cdFx0XHRcdFx0eyB0ZXh0OiAnUHJvbXB0LURyaXZlbiBEZXZlbG9wbWVudCcsIGxpbms6ICcvMDktY3Jvc3MtbGxtLXByaW5jaXBsZXMvcHJvbXB0LWRyaXZlbi1kZXZlbG9wbWVudCcgfSxcblx0XHRcdFx0XHR7IHRleHQ6ICdDdXJzb3IgLyBDbGluZSAvIENvcGlsb3QnLCBsaW5rOiAnLzA5LWNyb3NzLWxsbS1wcmluY2lwbGVzL2N1cnNvci1jbGluZS1tYXBwaW5nJyB9LFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGV4dDogJ0FwcGVuZGl4Jyxcblx0XHRcdFx0Y29sbGFwc2VkOiB0cnVlLFxuXHRcdFx0XHRpdGVtczogW1xuXHRcdFx0XHRcdHsgdGV4dDogJ1Byb2JsZW1zIFx1MDBENyBDb3VudGVybWVhc3VyZXMgTWFwJywgbGluazogJy9hcHBlbmRpeC9wcm9ibGVtLWNvdW50ZXJtZWFzdXJlLW1hcCcgfSxcblx0XHRcdFx0XHR7IHRleHQ6ICdMaWZlY3ljbGUgXHUwMEQ3IENvbmZpZyBNYXAnLCBsaW5rOiAnL2FwcGVuZGl4L2xpZmVjeWNsZS1jb25maWctbWFwJyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ0NvbmZpZ3VyYXRpb24gUmVmZXJlbmNlJywgbGluazogJy9hcHBlbmRpeC9jbGF1ZGUtY29kZS1jb25maWctcmVmZXJlbmNlJyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ0ZBUScsIGxpbms6ICcvYXBwZW5kaXgvZmFxJyB9LFxuXHRcdFx0XHRcdHsgdGV4dDogJ0dsb3NzYXJ5JywgbGluazogJy9hcHBlbmRpeC9nbG9zc2FyeScgfSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0XSxcblx0XHRlZGl0TGluazoge1xuXHRcdFx0cGF0dGVybjogJ2h0dHBzOi8vZ2l0aHViLmNvbS9zaHVqaS1ib25qaS91bmRlcnN0YW5kaW5nLWxsbS10aHJvdWdoLWNsYXVkZS1jb2RlL2VkaXQvbWFpbi9kb2NzLzpwYXRoJyxcblx0XHRcdHRleHQ6ICdFZGl0IHRoaXMgcGFnZSBvbiBHaXRIdWInLFxuXHRcdH0sXG5cdH0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5YixTQUFTLG9CQUFvQjtBQUN0ZCxTQUFTLG1CQUFtQjs7O0FDQ3JCLElBQU0sV0FBc0Q7QUFBQSxFQUNsRSxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsSUFDWixLQUFLO0FBQUEsTUFDSixFQUFFLE1BQU0sc0JBQU8sTUFBTSxPQUFPO0FBQUEsTUFDNUIsRUFBRSxNQUFNLHlCQUFVLE1BQU0sa0NBQWtDO0FBQUEsTUFDMUQsRUFBRSxNQUFNLHdDQUFVLE1BQU0seUJBQXlCO0FBQUEsTUFDakQsRUFBRSxNQUFNLHdDQUFVLE1BQU0sZ0NBQWdDO0FBQUEsTUFDeEQsRUFBRSxNQUFNLGdCQUFNLE1BQU0sd0JBQXdCO0FBQUEsSUFDN0M7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNSLFFBQVE7QUFBQSxRQUNQO0FBQUEsVUFDQyxNQUFNO0FBQUEsVUFDTixXQUFXO0FBQUEsVUFDWCxPQUFPO0FBQUEsWUFDTixFQUFFLE1BQU0saUVBQWUsTUFBTSxrQ0FBa0M7QUFBQSxZQUMvRCxFQUFFLE1B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

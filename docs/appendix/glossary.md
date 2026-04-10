🌐 [日本語](../ja/appendix/glossary.md)

# Glossary

## LLM Structural Problems

| Term | Definition |
|:--|:--|
| **Context Rot** | Degradation of output quality as input token count increases |
| **Lost in the Middle** | Reduction in attention to information in the middle of context |
| **Priority Saturation** | Decrease in compliance with individual instructions as simultaneous instruction count increases |
| **Hallucination** | Generation of false content with confidence |
| **Sycophancy** | Tendency to agree with users at the expense of accuracy |
| **Knowledge Boundary** | Inability of LLMs to recognize the limits of their own knowledge |
| **Prompt Sensitivity** | Generation of different outputs from semantically equivalent prompts |
| **Instruction Decay** | Decrease in compliance with initial instructions during long conversations |

## Claude Code Features

| Term | Definition |
|:--|:--|
| **CLAUDE.md** | Persistent context file for documenting project knowledge and conventions |
| **`.claude/rules/`** | Rule files conditionally injected via glob patterns |
| **Skills** | Task-specific procedures deployed on demand |
| **Agents** | Sub-agents executed in independent context windows |
| **Hooks** | Context-external processing executed at lifecycle events |
| **MCP** | Model Context Protocol. Connection to external tools and services |
| **settings.json** | Configuration file for Claude Code runtime (not injected to LLM) |
| **`/compact`** | Command to summarize and compress conversation history |
| **`/clear`** | Command to reset a session |
| **Tool Search** | Mechanism for lazy-loading MCP tool definitions (automatically enabled when context exceeds 10%) |

## Technical Terms

| Term | Definition |
|:--|:--|
| **Context Window** | Maximum range of input an LLM can process at once (Claude 4.6 series: 1M tokens) |
| **Token** | Smallest unit processed by LLM. In Japanese, approximately 1-2 tokens per character |
| **Transformer** | Foundational architecture of modern LLMs. Features self-attention mechanisms |
| **RLHF** | Reinforcement Learning from Human Feedback |
| **RoPE** | Rotary Position Embedding. Method for encoding positional information |
| **Cross-Model QA** | Quality assurance technique for reviewing outputs across different models |
| **U-Curve** | Attention distribution pattern in context. High at beginning and end, low in middle |

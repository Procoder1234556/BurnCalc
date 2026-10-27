# Mandatory context7 MCP Usage

On every prompt, you MUST consult and use the `context7` MCP server tools:
- Before proposing or writing code, verifying APIs, selecting libraries, or answering technical questions, query `context7` via `call_mcp_tool`.
- Tools to use:
  1. `resolve-library-id`: Resolve library/framework/package IDs (e.g. Next.js, React, Tailwind, StyleX, Node, etc.).
  2. `query-docs`: Fetch exact, up-to-date documentation and usage patterns for any relevant library or API.
- Do not make assumptions or rely on stale memory when `context7` can provide current documentation.

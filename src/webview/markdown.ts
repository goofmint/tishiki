// @ts-expect-error -- marked is ESM-only; esbuild resolves it at bundle time
import { Marked } from "marked";

const FRONTMATTER_RE = /^---\n[\s\S]*?\n---\n/;

/** Strips YAML frontmatter from markdown content. */
export function stripFrontmatter(markdown: string): string {
  return markdown.replace(FRONTMATTER_RE, "");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface WikiLinkToken {
  type: "wikilink";
  raw: string;
  target: string;
  display: string;
}

/** Creates a configured Marked instance with WikiLink support. */
function createMarked(): Marked {
  const marked = new Marked();

  marked.use({
    extensions: [
      {
        name: "wikilink",
        level: "inline" as const,
        start(src: string) {
          return src.indexOf("[[");
        },
        tokenizer(src: string) {
          const match = /^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/.exec(src);
          if (match) {
            return {
              type: "wikilink",
              raw: match[0],
              target: match[1].trim(),
              display: match[2]?.trim() ?? match[1].trim(),
            };
          }
          return undefined;
        },
        renderer(token) {
          const t = token as unknown as WikiLinkToken;
          return `<a href="#" data-wiki-link="${escapeHtml(t.target)}">${escapeHtml(t.display)}</a>`;
        },
      },
    ],
  });

  return marked;
}

const markedInstance = createMarked();

/** Renders markdown to HTML with WikiLink support. Strips frontmatter first. */
export function renderMarkdown(markdown: string): string {
  const body = stripFrontmatter(markdown);
  const result = markedInstance.parse(body);
  if (typeof result === "string") {
    return result;
  }
  return "";
}

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold tracking-tight text-text">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 text-xl font-semibold text-text">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-base font-semibold text-text">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-pretty text-base leading-relaxed text-muted">{children}</p>
  ),
  strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-muted">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-base text-muted">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-4 border-l-2 border-border pl-4 text-sm text-muted">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children }) => (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm text-muted">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border bg-surface-muted px-3 py-2 text-left font-semibold text-text">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border border-border px-3 py-2">{children}</td>,
};

type LegalDocumentProps = {
  markdown: string;
};

export function LegalDocument({ markdown }: LegalDocumentProps) {
  return (
    <article className="legal-document">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}

import { Fragment, type ReactNode } from "react";

type Node = {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  url?: string;
  level?: number;
  format?: "ordered" | "unordered";
  children?: Node[];
};

const safeHref = (url?: string) => (url && /^(https?:|mailto:|tel:|\/)/.test(url) ? url : undefined);

function Inline({ nodes }: { nodes: Node[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        if (n.type === "link") {
          const href = safeHref(n.url);
          return href ? (
            <a key={i} href={href} rel="noopener noreferrer">
              <Inline nodes={n.children ?? []} />
            </a>
          ) : (
            <Inline key={i} nodes={n.children ?? []} />
          );
        }
        let el: ReactNode = n.text ?? "";
        if (n.bold) el = <strong>{el}</strong>;
        if (n.italic) el = <em>{el}</em>;
        if (n.underline) el = <u>{el}</u>;
        return <Fragment key={i}>{el}</Fragment>;
      })}
    </>
  );
}

/** Plain text of a blocks field, for places that can't take markup such as JSON-LD. */
export function blocksToText(content: unknown): string {
  if (!Array.isArray(content)) return "";
  const text = (n: Node): string => n.text ?? (n.children ?? []).map(text).join(n.type === "list" ? " " : "");
  return (content as Node[]).map(text).join("\n").trim();
}

export function Blocks({ content }: { content: unknown }) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <div className="space-y-3 text-neutral-700 [&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-neutral-900 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6">
      {(content as Node[]).map((b, i) => {
        const kids = b.children ?? [];
        switch (b.type) {
          case "heading": {
            const H = (b.level ?? 2) <= 2 ? "h2" : "h3";
            return (
              <H key={i}>
                <Inline nodes={kids} />
              </H>
            );
          }
          case "list": {
            const L = b.format === "ordered" ? "ol" : "ul";
            return (
              <L key={i}>
                {kids.map((li, j) => (
                  <li key={j}>
                    <Inline nodes={li.children ?? []} />
                  </li>
                ))}
              </L>
            );
          }
          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-gold-500 pl-4 italic">
                <Inline nodes={kids} />
              </blockquote>
            );
          case "paragraph":
            return (
              <p key={i}>
                <Inline nodes={kids} />
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
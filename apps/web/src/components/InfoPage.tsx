import type { ReactNode } from "react";

type Props = {
  title: string;
  intro?: string;
  effective?: string;
  children: ReactNode;
};

export function InfoPage({ title, intro, effective, children }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">{title}</h1>
      {intro && <p className="mt-3 text-lg text-neutral-600">{intro}</p>}
      {effective && <p className="mt-2 text-sm text-neutral-500">Effective date: {effective}</p>}
      <div className="mt-8 text-neutral-700 [&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_li]:mt-2 [&_ol]:mt-3 [&_ol]:list-[lower-alpha] [&_ol]:pl-6 [&_p]:mt-3 [&_strong]:text-neutral-900 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </div>
    </div>
  );
}

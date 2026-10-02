import React from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { ResultCard } from "./ResultCard";

interface CalculatorShellProps {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  subtitle: string;
  children: React.ReactNode;
  relatedTools?: Array<{ id: string; slug: string; title: string }>;
}

export function CalculatorShell({ breadcrumbs, title, subtitle, children, relatedTools }: CalculatorShellProps) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-ink-900 mb-3">
            {title}
          </h1>
          <p className="text-ink-600 text-lg">{subtitle}</p>
        </header>

        <div className="bg-white border border-ink-200 rounded-xl shadow-sm p-6 mb-8">
          {children}
        </div>

        {relatedTools && relatedTools.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-ink-900 mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTools.map((tool) => (
                <div key={tool.id} className="bg-white border border-ink-200 rounded-lg p-4 hover:border-brand-300 transition-colors">
                  <a href={`/${tool.id}/${tool.slug}`} className="font-medium text-brand-600 hover:text-brand-700">
                    {tool.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalculatorShell;
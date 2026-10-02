import React from "react";
import Link from "next/link";
import { ToolDefinition } from "@/types/tool";

interface ToolCardProps {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  className?: string;
}

export function ToolCard({ id, slug, title, shortDescription, category, className }: ToolCardProps) {
  return (
    <Link href={`/${category}/${slug}`} className={["group block bg-white border border-ink-200 rounded-lg p-6 hover:border-brand-300 hover:shadow-md transition-all", className].join(" ")}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-ink-900 group-hover:text-brand-600 transition-colors">
            {title}
          </h3>
          <p className="mt-1 text-sm text-ink-600 line-clamp-2">
            {shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ToolCard;
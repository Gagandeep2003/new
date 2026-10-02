import React from "react";
import Link from "next/link";
import { CategoryDefinition } from "@/types/tool";

interface CategoryCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  className?: string;
}

export function CategoryCard({ id, slug, title, description, icon, className }: CategoryCardProps) {
  return (
    <Link href={`/${slug}`} className={["group block bg-white border border-ink-200 rounded-lg p-6 hover:border-brand-300 hover:shadow-md transition-all", className].join(" ")}>
      <div className="text-4xl mb-4" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-ink-900 group-hover:text-brand-600 transition-colors mb-2">
        {title}
      </h3>
      <p className="text-sm text-ink-600 line-clamp-2">
        {description}
      </p>
    </Link>
  );
}

export default CategoryCard;
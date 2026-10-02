import React from "react";
import Link from "next/link";
import { Button } from "../Button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: { label: string; href: string };
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-6 bg-white border border-ink-200 rounded-lg">
      <div className="w-16 h-16 rounded-full bg-ink-100 flex items-center justify-center mx-auto mb-4 text-ink-400" aria-hidden="true">
        {icon || (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-semibold text-ink-900 mb-2">{title}</h3>
      <p className="text-ink-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <Link href={action.href}>
          <Button variant="primary">{action.label}</Button>
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
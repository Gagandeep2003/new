import React from "react";

export interface ResultCardProps {
  title?: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  explanation?: string;
  formula?: React.ReactNode;
  onCopy?: () => void;
  onReset?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function ResultCard({
  title = "Result",
  value,
  unit,
  subtitle,
  explanation,
  formula,
  onCopy,
  onReset,
  children,
  className,
}: ResultCardProps) {
  return (
    <div className={[ "bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-lg shadow-sm p-6", className].join(" ")}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-brand-700 uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex gap-2">
          {onCopy && (
            <button
              onClick={onCopy}
              className="text-sm text-brand-600 hover:text-brand-700 font-medium"
              aria-label="Copy result"
            >
              Copy
            </button>
          )}
          {onReset && (
            <button
              onClick={onReset}
              className="text-sm text-ink-500 hover:text-ink-700 font-medium"
              aria-label="Reset inputs"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl md:text-5xl font-display font-bold text-ink-900">
          {value}
        </span>
        {unit && (
          <span className="text-xl text-ink-500 font-medium">
            {unit}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-ink-600 mb-4">
          {subtitle}
        </p>
      )}

      {explanation && (
        <p className="text-ink-700 mb-4">
          {explanation}
        </p>
      )}

      {formula && (
        <div className="mt-4 pt-4 border-t border-brand-200">
          <h4 className="text-sm font-semibold text-ink-700 mb-2">
            How this was calculated
          </h4>
          {formula}
        </div>
      )}

      {children}
    </div>
  );
}

export default ResultCard;
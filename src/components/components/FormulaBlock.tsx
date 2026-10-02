import React from "react";

export interface FormulaBlockProps {
  label: string;
  formula: string | React.ReactNode;
}

export function FormulaBlock({ label, formula }: FormulaBlockProps) {
  const isReact = React.isValidElement(formula);

  return (
    <div className="bg-ink-50 border border-ink-200 rounded-lg p-4 my-4">
      {label && <p className="text-sm text-ink-500 mb-2">{label}</p>}
      <div className="font-mono text-base overflow-x-auto">
        {isReact ? formula : <code>{formula}</code>}
      </div>
    </div>
  );
}

export default FormulaBlock;
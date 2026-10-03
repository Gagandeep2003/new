import React from "react";

export interface ExampleBlockProps {
  title?: string;
  children: React.ReactNode;
}

export function ExampleBlock({ title = "Example", children }: ExampleBlockProps) {
  return (
    <div className="bg-brand-50 border border-brand-100 rounded-lg p-4 my-4">
      <h4 className="text-sm font-semibold text-brand-700 mb-2">{title}</h4>
      <div>{children}</div>
    </div>
  );
}

export default ExampleBlock;
import React from "react";

export interface DisclaimerProps {
  title?: string;
  content: string | React.ReactNode;
  variant?: "info" | "warning" | "danger" | "neutral";
}

export function Disclaimer({ title, content, variant = "neutral" }: DisclaimerProps) {
  const variantStyles = {
    neutral: "bg-ink-50 border-ink-200 text-ink-800",
    info: "bg-blue-50 border-blue-200 text-blue-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    danger: "bg-red-50 border-red-200 text-red-900",
  };

  return (
    <div className={["p-4 rounded-lg border", variantStyles[variant]].join(" ")}>
      {title && <h4 className="text-sm font-semibold mb-2">{title}</h4>}
      <p className="text-sm">{content}</p>
    </div>
  );
}

export default Disclaimer;
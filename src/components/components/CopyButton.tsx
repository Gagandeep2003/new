import React, { useState } from "react";

export interface CopyButtonProps {
  text: string;
  successText?: string;
  className?: string;
}

export function CopyButton({ text, successText = "Copied!", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(text));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={[ "inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
        copied ? "bg-green-600 text-white" : "bg-brand-100 text-brand-700 hover:bg-brand-200",
        className].join(" ")}
      aria-label="Copy to clipboard"
    >
      {copied ? successText : "Copy"}
    </button>
  );
}

export default CopyButton;
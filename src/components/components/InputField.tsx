import React, { useState } from "react";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  unit?: string;
  inputSize?: "sm" | "md" | "lg";
}

export function InputField({
  label,
  helperText,
  error,
  unit,
  inputSize = "md",
  id,
  className,
  ...props
}: InputFieldProps) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
  const hasError = !!error;

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  };

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-ink-700 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          className={[sizeStyles[inputSize], "w-full border rounded-md bg-white text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors", hasError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-ink-300", unit ? "pr-12" : "", className].join(" ")}
          aria-invalid={hasError}
          aria-describedby={helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 text-sm pointer-events-none">
            {unit}
          </span>
        )}
      </div>
      {helperText && (
        <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-ink-500">
          {helperText}
        </p>
      )}
      {hasError && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default InputField;
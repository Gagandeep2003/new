import React from "react";

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helperText?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export function SelectField({
  label,
  helperText,
  error,
  options,
  placeholder,
  id,
  className,
  ...props
}: SelectFieldProps) {
  const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;
  const hasError = !!error;

  return (
    <div className="w-full">
      <label htmlFor={selectId} className="block text-sm font-medium text-ink-700 mb-1.5">
        {label}
      </label>
      <select
        id={selectId}
        className={[ "w-full px-4 py-3 text-base border rounded-md bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors", hasError ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-ink-300", className].join(" ")}
        aria-invalid={hasError}
        aria-describedby={helperText ? `${selectId}-helper` : undefined}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && (
        <p id={`${selectId}-helper`} className="mt-1.5 text-sm text-ink-500">
          {helperText}
        </p>
      )}
      {hasError && (
        <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default SelectField;
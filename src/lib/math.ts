import { CalculationFunction, CalculationInputs, CalculationResult } from "@/types/tool";

/**
 * Math Calculator Module
 *
 * Provides pure, deterministic calculation functions for mathematical operations.
 * All functions are pure (no side effects) and can be safely cached.
 */

// ---------------------------------------------------------------------------
// Percentages
// ---------------------------------------------------------------------------

function percentage(input: number, percent: number): number {
  if (isNaN(input) || isNaN(percent)) throw new Error("Invalid input: both inputs must be numbers");
  if (percent < 0 || percent > 100) throw new Error(`Percentage must be between 0 and 100`);
  return (input * percent) / 100;
}

function percentageIncrease(base: number, increasePercent: number): number {
  if (isNaN(base) || isNaN(increasePercent)) throw new Error("Invalid input: both inputs must be numbers");
  if (increasePercent < 0) throw new Error("Increase percentage must be non-negative");
  return base * (1 + increasePercent / 100);
}

function percentageDecrease(base: number, decreasePercent: number): number {
  if (isNaN(base) || isNaN(decreasePercent)) throw new Error("Invalid input: both inputs must be numbers");
  if (decreasePercent < 0) throw new Error("Decrease percentage must be non-negative");
  return base * (1 - decreasePercent / 100);
}

function percentageDifference(a: number, b: number): number {
  if (isNaN(a) || isNaN(b)) throw new Error("Invalid input: both values must be numbers");
  const diff = Math.abs(a - b);
  const relDiff = diff / Math.max(Math.abs(a), Math.abs(b), 1);
  return relDiff * 100;
}

// ---------------------------------------------------------------------------
// Formatting Utilities
// ---------------------------------------------------------------------------

function formatNumber(value: number, precision: number = 2): string {
  if (isNaN(value)) throw new Error("Invalid number");
  return value.toFixed(precision);
}

function round(value: number, digits: number): number {
  if (digits < 0) throw new Error("Digits must be non-negative");
  return Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits);
}

// ---------------------------------------------------------------------------
// Export all functions
// ---------------------------------------------------------------------------

export {
  // Percentages
  percentage,
  percentageIncrease,
  percentageDecrease,
  percentageDifference,

  // Formatting
  formatNumber,
  round,
};

export function isInteger(n: number): boolean {
  return Number.isInteger(n);
}

export function isPositive(n: number): boolean {
  return n > 0;
}

export function isNonNegative(n: number): boolean {
  return n >= 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
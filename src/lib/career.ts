import { CalculationFunction, CalculationInputs, CalculationResult } from "@/types/tool";

/**
 * Career Calculator Module
 *
 * Salary increments, comparison, experience, notice periods, and employment math.
 *
 * All salary calculations are estimates. Results depend on assumptions about tax,
 * jurisdiction, deductions, benefits, and employer policies. Users should treat
 * these as indicative figures, not personalized financial or legal advice.
 */

// ---------------------------------------------------------------------------
// Salary Increment
// ---------------------------------------------------------------------------

function salaryIncrement(currentSalary: number, incrementPercent: number): number {
  if (currentSalary <= 0) throw new Error("Current salary must be positive");
  if (incrementPercent < 0 || incrementPercent > 100) throw new Error("Increment percentage must be 0-100");
  return Math.round(currentSalary * (1 + incrementPercent / 100));
}

function salaryIncrementDetails(currentSalary: number, incrementPercent: number, effectiveDate: string): {
  newSalary: number;
  incrementAmount: number;
  percentage: number;
} {
  const newSalary = salaryIncrement(currentSalary, incrementPercent);
  return {
    newSalary,
    incrementAmount: Math.round(newSalary - currentSalary),
    percentage: incrementPercent,
  };
}

// ---------------------------------------------------------------------------
// Salary Comparison
// ---------------------------------------------------------------------------

function salaryComparison(aSalary: number, bSalary: number): {
  difference: number;
  percentBetter: number;
  ratio: number;
} {
  const difference = Math.round(bSalary - aSalary);
  const percentBetter = aSalary > 0 ? ((bSalary - aSalary) / aSalary) * 100 : 0;
  const ratio = aSalary > 0 ? bSalary / aSalary : 0;
  return { difference, percentBetter, ratio };
}

// ---------------------------------------------------------------------------
// Experience Calculator
// ---------------------------------------------------------------------------

function experienceSince(startDate: string): {
  years: number;
  months: number;
  days: number;
} {
  const start = new Date(startDate);
  const now = new Date();
  if (isNaN(start.getTime())) throw new Error("Invalid start date");
  const yearDiff = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  const dayDiff = now.getDate() - start.getDate();
  let years = yearDiff;
  let months = monthDiff;
  let days = dayDiff;
  if (days < 0) {
    months -= 1;
    // Approximate days in previous month
    const lastDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days = lastDayOfPrevMonth + dayDiff;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

function experienceBetween(startDate: string, endDate: string): {
  years: number;
  months: number;
  days: number;
} {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) throw new Error("Invalid date(s)");
  if (end < start) throw new Error("End date must be after start date");
  return experienceSince(startDate);
}

// ---------------------------------------------------------------------------
// Notice Period
// ---------------------------------------------------------------------------

function noticePeriod(days: number, noticePeriodType: "standard" | "short" | "extended"): number {
  if (days < 0) throw new Error("Days must be non-negative");
  // Adjust notice period based on type
  const multipliers = {
    standard: 1,
    short: 0.8,
    extended: 1.25,
  };
  const base = Math.ceil(days * (multipliers[noticePeriodType] || 1));
  return Math.max(0, base);
}

// ---------------------------------------------------------------------------
// Experience (Years/Months from start date to present)
// ---------------------------------------------------------------------------

export {
  salaryIncrement,
  salaryIncrementDetails,
  salaryComparison,
  experienceSince,
  experienceBetween,
  noticePeriod,
};
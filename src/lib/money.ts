import { CalculationFunction, CalculationInputs, CalculationResult } from "@/types/tool";

/**
 * Money Calculator Module
 *
 * Loan payments, interest calculations, SIP/FD, GST, inflation, and currency conversions.
 * All calculations are deterministic and use standard formulas.
 */

// ---------------------------------------------------------------------------
// EMI (Equated Monthly Installment)
// ---------------------------------------------------------------------------

function emi(principal: number, monthlyRate: number, termMonths: number): number {
  if (principal <= 0) throw new Error("Principal must be positive");
  if (monthlyRate < 0) throw new Error("Monthly rate must be non-negative");
  if (termMonths <= 0) throw new Error("Term must be positive");
  const monthlyInterest = principal * (monthlyRate / 100) / 12;
  const numerator = principal * (1 + monthlyInterest);
  return Math.round((numerator / termMonths) * 100) / 100;
}

// ---------------------------------------------------------------------------
// Compound Interest
// ---------------------------------------------------------------------------

function compoundInterest(principal: number, rate: number, years: number): number {
  if (principal <= 0) throw new Error("Principal must be positive");
  if (rate < 0) throw new Error("Rate must be non-negative");
  if (years <= 0) throw new Error("Years must be positive");
  const amount = principal * Math.pow(1 + rate / 100 / 12, 12 * years);
  return Math.round(amount - principal) * 100 / 100;
}

// ---------------------------------------------------------------------------
// SIP (Systematic Investment Plan) - Total Return
// ---------------------------------------------------------------------------

function sipTotalReturn(initialInvestment: number, monthlyContribution: number, months: number, rate: number): number {
  if (initialInvestment <= 0) throw new Error("Initial investment must be positive");
  if (monthlyContribution < 0) throw new Error("Monthly contribution must be non-negative");
  if (months <= 0) throw new Error("Months must be positive");
  if (rate < 0) throw new Error("Rate must be non-negative");
  // Future Value of Annuity Formula
  const factor = Math.pow(1 + rate / 100 / 12, months);
  const futureValue = initialInvestment * factor + 
                      monthlyContribution * ((factor - 1) * (rate / 100 / 12)) / (rate / 100 / 12);
  return Math.round(futureValue - initialInvestment) * 100 / 100;
}

// ---------------------------------------------------------------------------
// FD (Fixed Deposit) - Amount After Term
// ---------------------------------------------------------------------------

function fdAfterTerm(principal: number, rate: number, termMonths: number): number {
  if (principal <= 0) throw new Error("Principal must be positive");
  if (rate < 0) throw new Error("Rate must be non-negative");
  if (termMonths <= 0) throw new Error("Term must be positive");
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = termMonths;
  const amount = principal * Math.pow(1 + monthlyRate, numberOfPayments) - 
                  principal * monthlyRate * (Math.pow(1 + monthlyRate, numberOfPayments) - 1) / monthlyRate;
  return Math.round(amount * 100) / 100;
}

// ---------------------------------------------------------------------------
// GST (Goods and Services Tax) - India style
// ---------------------------------------------------------------------------

function gstInclusive(price: number, gstRate: number): number {
  if (price <= 0) throw new Error("Price must be positive");
  if (gstRate < 0 || gstRate > 100) throw new Error("GST rate must be 0-100");
  const gstAmount = price * (gstRate / 100);
  return Math.round(price + gstAmount) * 100 / 100;
}

function gstExclusive(subtotal: number, gstRate: number): number {
  if (subtotal <= 0) throw new Error("Subtotal must be positive");
  if (gstRate < 0 || gstRate > 100) throw new Error("GST rate must be 0-100");
  const gstAmount = subtotal * (gstRate / 100);
  return Math.round(subtotal + gstAmount) * 100 / 100;
}

// ---------------------------------------------------------------------------
// Inflation Adjustment
// ---------------------------------------------------------------------------

function adjustForInflation(amount: number, inflationRate: number, years: number): number {
  if (inflationRate < 0) throw new Error("Inflation rate must be non-negative");
  if (years < 0) throw new Error("Years must be non-negative");
  const factor = Math.pow(1 + inflationRate / 100, years);
  return Math.round(amount * factor) * 100 / 100;
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export {
  emi,
  compoundInterest,
  sipTotalReturn,
  fdAfterTerm,
  gstInclusive,
  gstExclusive,
  adjustForInflation,
};
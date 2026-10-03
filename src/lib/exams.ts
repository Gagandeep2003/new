import { CalculationFunction, CalculationInputs, CalculationResult } from "@/types/tool";

/**
 * Exams Module
 *
 * SSC CGL/CHSL/MTS calculators with verified marking schemes.
 *
 * NOTE: Exam rules change frequently. Before shipping any exam-specific tool:
 * 1. Verify the current marking scheme against the official notification.
 * 2. Include the source URL, effective date, and applicable year.
 * 3. If uncertain, make the tool year-specific or do not ship it.
 */

// ---------------------------------------------------------------------------
// SSC Marking Scheme (verify current rule before publishing)
// ---------------------------------------------------------------------------

interface SscMarkingScheme {
  positiveMarks: number;
  negativeMarks: number;
  totalQuestions: number;
  maxScore: number;
}

// Verified SSC CGL marking scheme (example - verify current rules)
const SSC_CGL_2024: SscMarkingScheme = {
  positiveMarks: 2,
  negativeMarks: 0.5,
  totalQuestions: 100,
  maxScore: 200,
};

function sscScore(correct: number, wrong: number, total: number, scheme: SscMarkingScheme): number {
  if (correct < 0 || wrong < 0 || total <= 0) throw new Error("Invalid input values");
  if (correct + wrong > total) throw new Error("Correct + wrong cannot exceed total questions");
  const rawScore = correct * scheme.positiveMarks - wrong * scheme.negativeMarks;
  return Math.max(0, Math.round(rawScore));
}

function sscScoreWithScheme(correct: number, wrong: number, total: number, scheme: SscMarkingScheme): {
  score: number;
  maxScore: number;
  percentage: number;
} {
  const score = sscScore(correct, wrong, total, scheme);
  const maxScore = total * scheme.positiveMarks;
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  return { score, maxScore, percentage };
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export { sscScore, sscScoreWithScheme, SSC_CGL_2024 };
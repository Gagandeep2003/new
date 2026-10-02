import { ToolDefinition, ToolCategory } from "@/types/tool";
import * as math from "@/lib/math";
import * as everyday from "@/lib/everyday";
import * as student from "@/lib/student";
import * as career from "@/lib/career";
import * as money from "@/lib/money";
import * as developer from "@/lib/developer";

// Helper to create percentage calculator tool
function createPercentageCalculator(): ToolDefinition {
  return {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    shortDescription: "Calculate what X% of Y is, or find what percentage X is of Y.",
    category: "math",
    keywords: ["percentage", "percent", "calculate", "math"],
    aliases: ["percent calculator", "percentage finder"],
    inputs: [
      { id: "base", label: "Base Value", type: "number", placeholder: "e.g., 100", required: true, helperText: "The value to calculate percentage of" },
      { id: "percent", label: "Percentage (%)", type: "number", placeholder: "e.g., 15", min: 0, max: 100, step: 0.1, required: true, helperText: "The percentage to apply" },
    ],
    outputs: [
      { id: "result", label: "Result", type: "number", precision: 2, copyable: true },
    ],
    calculate: (inputs) => {
      const base = Number(inputs.base);
      const percent = Number(inputs.percent);
      if (isNaN(base) || isNaN(percent)) return { success: false, error: "Invalid input" };
      return { success: true, outputs: { result: math.percentage(base, percent) } };
    },
    formula: "Result = Base × Percentage / 100",
    explanation: "Multiply the base value by the percentage and divide by 100.",
    example: { inputs: { base: 200, percent: 15 }, outputs: { result: 30 }, description: "15% of 200 is 30" },
    assumptions: ["Percentage is capped at 100% for typical use cases"],
    relatedTools: ["percentage-increase", "percentage-decrease", "discount-calculator"],
    tags: ["math", "basic"],
  };
}

// Helper to create percentage increase calculator
function createPercentageIncrease(): ToolDefinition {
  return {
    id: "percentage-increase",
    slug: "percentage-increase-calculator",
    title: "Percentage Increase Calculator",
    shortDescription: "Calculate the new value after a percentage increase.",
    category: "math",
    keywords: ["percentage", "increase", "growth", "raise"],
    aliases: ["percent increase", "growth calculator"],
    inputs: [
      { id: "base", label: "Original Value", type: "number", placeholder: "e.g., 100", required: true },
      { id: "increasePercent", label: "Increase (%)", type: "number", placeholder: "e.g., 20", min: 0, step: 0.1, required: true },
    ],
    outputs: [
      { id: "result", label: "New Value", type: "number", precision: 2, copyable: true },
      { id: "increase", label: "Increase Amount", type: "number", precision: 2, copyable: true },
    ],
    calculate: (inputs) => {
      const base = Number(inputs.base);
      const increasePercent = Number(inputs.increasePercent);
      if (isNaN(base) || isNaN(increasePercent)) return { success: false, error: "Invalid input" };
      const newValue = math.percentageIncrease(base, increasePercent);
      return { success: true, outputs: { result: newValue, increase: newValue - base } };
    },
    formula: "New Value = Original × (1 + Increase% / 100)",
    explanation: "Add the percentage increase to 100% and multiply by the original value.",
    example: { inputs: { base: 100, increasePercent: 20 }, outputs: { result: 120, increase: 20 }, description: "A 20% increase on 100 gives 120" },
    assumptions: [],
    relatedTools: ["percentage-calculator", "percentage-decrease", "percentage-change"],
    tags: ["math", "basic"],
  };
}
// Helper to create age calculator
function createAgeCalculator(): ToolDefinition {
  return {
    id: "age-calculator",
    slug: "age-calculator",
    title: "Age Calculator",
    shortDescription: "Calculate exact age from date of birth.",
    category: "everyday",
    keywords: ["age", "birthday", "date of birth", "how old"],
    aliases: ["age finder", "birthday calculator"],
    inputs: [
      { id: "birthDate", label: "Date of Birth", type: "date", required: true, helperText: "Select your birth date" },
    ],
    outputs: [
      { id: "years", label: "Age (Years)", type: "number", precision: 0, copyable: true },
      { id: "months", label: "Months", type: "number", precision: 0, copyable: true },
      { id: "days", label: "Days", type: "number", precision: 0, copyable: true },
    ],
    calculate: (inputs) => {
      const birthDate = inputs.birthDate as string;
      if (!birthDate) return { success: false, error: "Birth date is required" };
      const birth = new Date(birthDate);
      const today = new Date();
      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();
// Helper to create EMI calculator
function createEMICalculator(): ToolDefinition {
  return {
    id: "emi-calculator",
    slug: "emi-calculator",
    title: "EMI Calculator",
    shortDescription: "Calculate Equated Monthly Installment for loans.",
    category: "money",
    keywords: ["emi", "loan", "monthly payment", "mortgage", "car loan"],
    aliases: ["loan calculator", "monthly payment calculator"],
    inputs: [
      { id: "principal", label: "Loan Amount", type: "number", placeholder: "e.g., 500000", min: 1000, required: true, helperText: "Total loan amount" },
      { id: "annualRate", label: "Annual Interest Rate (%)", type: "number", placeholder: "e.g., 8.5", min: 0, max: 50, step: 0.1, required: true },
      { id: "termYears", label: "Loan Term (Years)", type: "number", placeholder: "e.g., 20", min: 1, max: 50, required: true },
    ],
    outputs: [
      { id: "emi", label: "Monthly EMI", type: "currency", precision: 2, copyable: true },
      { id: "totalPayment", label: "Total Payment", type: "currency", precision: 2, copyable: true },
      { id: "totalInterest", label: "Total Interest", type: "currency", precision: 2, copyable: true },
    ],
    calculate: (inputs) => {
      const principal = Number(inputs.principal);
      const annualRate = Number(inputs.annualRate);
      const termYears = Number(inputs.termYears);
      if (isNaN(principal) || isNaN(annualRate) || isNaN(termYears)) return { success: false, error: "Invalid input" };
      const monthlyRate = annualRate / 12 / 100;
      const months = termYears * 12;
      const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
// Helper to create JSON formatter
function createJSONFormatter(): ToolDefinition {
  return {
    id: "json-formatter",
    slug: "json-formatter",
    title: "JSON Formatter & Validator",
    shortDescription: "Format, validate, and minify JSON. Works entirely in your browser.",
    category: "developer",
    keywords: ["json", "formatter", "validator", "minify", "beautify", "pretty print"],
    aliases: ["json beautifier", "json prettifier", "json lint"],
    inputs: [
      { id: "jsonInput", label: "JSON Input", type: "textarea", placeholder: "Paste JSON here...", required: true, helperText: "Enter valid or invalid JSON to format/validate" },
      { id: "indent", label: "Indent Size", type: "select", options: [{ value: "2", label: "2 spaces" }, { value: "4", label: "4 spaces" }, { value: "tab", label: "Tab" }], defaultValue: "2", required: true },
    ],
    outputs: [
      { id: "formatted", label: "Formatted JSON", type: "text", copyable: true },
      { id: "isValid", label: "Valid", type: "text", copyable: false },
      { id: "error", label: "Error", type: "text", copyable: false },
    ],
    calculate: (inputs) => {
      const jsonInput = inputs.jsonInput as string;
      const indent = inputs.indent as string;
      if (!jsonInput?.trim()) return { success: false, error: "Please enter JSON input" };
      try {
        const parsed = JSON.parse(jsonInput);
        const formatted = JSON.stringify(parsed, null, indent === "tab" ? "\t" : parseInt(indent));
        return { success: true, outputs: { formatted, isValid: "Yes", error: "" } };
      } catch (e) {
        return { success: true, outputs: { formatted: "", isValid: "No", error: e instanceof Error ? e.message : "Invalid JSON" } };
      }
    },
    formula: "Uses JSON.parse() and JSON.stringify() with configurable indentation",
    explanation: "Parses the input as JSON. If valid, formats it with the specified indentation. If invalid, returns the parse error.",
    example: { inputs: { jsonInput: '{"name":"John","age":30}', indent: "2" }, outputs: { formatted: '{\n  "name": "John",\n  "age": 30\n}', isValid: "Yes", error: "" }, description: "Compact JSON is formatted with 2-space indentation" },
    assumptions: ["Processing happens entirely in browser", "No data is sent to any server"],
    relatedTools: ["json-validator", "json-minifier", "base64-encoder", "url-encoder"],
    tags: ["developer", "json", "utility"],
  };
}

// Build the tools array
const allTools: ToolDefinition[] = [
  createPercentageCalculator(),
  createPercentageIncrease(),
  createAgeCalculator(),
  createEMICalculator(),
  createJSONFormatter(),
];

// Add tools to their categories
const toolsByCategory = new Map<ToolCategory, ToolDefinition[]>();
for (const tool of allTools) {
  const existing = toolsByCategory.get(tool.category) || [];
  existing.push(tool);
  toolsByCategory.set(tool.category, existing);
}

// Export flat array and registry functions
export const tools = allTools;

export function getAllTools(): ToolDefinition[] {
  return allTools;
}

export function getToolById(id: string): ToolDefinition | undefined {
  return allTools.find((t) => t.id === id);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return toolsByCategory.get(category) || [];
}

export function getPopularTools(limit: number = 6): ToolDefinition[] {
  return allTools.slice(0, limit);
}

export function getRelatedTools(toolId: string, limit: number = 3): ToolDefinition[] {
  const tool = getToolById(toolId);
  if (!tool) return [];
  return tool.relatedTools
    .map((id) => getToolById(id))
    .filter((t): t is ToolDefinition => t !== undefined)
    .slice(0, limit);
}
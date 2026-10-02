/**
 * Core type definitions for the tool registry and calculation engine.
 * These types form the contract between tool definitions and the UI.
 */

// ====================
// Input/Output Definitions
// ====================

export type InputType =
  | "number"
  | "integer"
  | "text"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "datetime-local"
  | "textarea"
  | "json";

export interface InputFieldDefinition {
  /** Unique identifier for this input field */
  id: string;
  /** Human-readable label */
  label: string;
  /** Type of input control */
  type: InputType;
  /** Placeholder text (never a substitute for label) */
  placeholder?: string;
  /** Default value */
  defaultValue?: string | number | boolean;
  /** For number/integer: minimum allowed value */
  min?: number;
  /** For number/integer: maximum allowed value */
  max?: number;
  /** For number/integer: step increment */
  step?: number;
  /** For select/radio: available options */
  options?: Array<{ value: string; label: string }>;
  /** Whether this field is required */
  required?: boolean;
  /** Helper text shown below the field */
  helperText?: string;
  /** Unit suffix displayed next to the input (e.g., "°C", "%") */
  unit?: string;
  /** Regex pattern for validation (text/textarea) */
  pattern?: string;
  /** Custom validation function name (for complex validations) */
  validate?: string;
  /** Whether this field should be hidden in certain conditions */
  conditional?: {
    field: string;
    value: string | number | boolean;
  };
}

export interface OutputFieldDefinition {
  id: string;
  label: string;
  type: "number" | "currency" | "percentage" | "text" | "date" | "duration" | "unit" | "table" | "formula";
  format?: "compact" | "full" | "scientific" | "currency" | "percentage" | "date" | "time";
  unit?: string;
  precision?: number;
  copyable?: boolean;
}

// ====================
// Calculation Functions
// ====================

/** Result of a calculation - can be success or error */
export interface CalculationResult<T = Record<string, unknown>> {
  success: boolean;
  /** Output values by field ID */
  outputs?: T;
  /** Human-readable error message */
  error?: string;
  /** Field-specific validation errors */
  fieldErrors?: Record<string, string>;
  /** Warnings that don't prevent calculation */
  warnings?: string[];
}

/** Input values provided by the user */
export interface CalculationInputs {
  [fieldId: string]: string | number | boolean | Date | null | undefined;
}

/** Pure calculation function signature */
export type CalculationFunction<TInputs extends CalculationInputs = CalculationInputs, TOutputs = Record<string, unknown>> = (
  inputs: TInputs,
) => CalculationResult<TOutputs>;

// ====================
// Tool Metadata
// ====================

export type ToolCategory = "math" | "everyday" | "student" | "career" | "money" | "developer" | "exams";

export interface ToolMetadata {
  /** Unique identifier (kebab-case) */
  id: string;
  /** URL-friendly slug */
  slug: string;
  /** Display title */
  title: string;
  /** Short description for cards/search */
  shortDescription: string;
  /** Category */
  category: ToolCategory;
  /** Keywords for search */
  keywords: string[];
  /** Alternative names/phrases users might search */
  aliases: string[];
  /** SEO title (defaults to title if not set) */
  seoTitle?: string;
  /** SEO description (defaults to shortDescription if not set) */
  seoDescription?: string;
  /** H1 heading on the tool page */
  h1?: string;
  /** Formula or methodology explanation */
  formula?: string;
  /** Plain-language explanation of how it works */
  explanation?: string;
  /** Worked example with inputs and outputs */
  example?: {
    inputs: Record<string, string | number>;
    outputs: Record<string, string | number>;
    description: string;
  };
  /** Assumptions and limitations */
  assumptions?: string[];
  /** Related tool IDs */
  relatedTools: string[];
  /** Tags for grouping/filtering */
  tags?: string[];
  /** Whether this tool requires dynamic external data */
  requiresExternalData?: boolean;
  /** Source/reference for regulated/exam tools */
  source?: {
    url: string;
    title: string;
    effectiveDate: string;
    notes?: string;
  };
  /** Version for cache invalidation */
  version?: number;
}

export interface ToolDefinition<TInputs extends CalculationInputs = CalculationInputs, TOutputs = Record<string, unknown>> extends ToolMetadata {
  /** Input field definitions */
  inputs: InputFieldDefinition[];
  /** Output field definitions */
  outputs: OutputFieldDefinition[];
  /** Pure calculation function */
  calculate: CalculationFunction<TInputs, TOutputs>;
}

// ====================
// Category Definitions
// ====================

export interface CategoryDefinition {
  id: ToolCategory;
  slug: string;
  title: string;
  description: string;
  icon: string; // SVG or component name
  order: number;
}

// ====================
// Search Types
// ====================

export interface SearchResult {
  tool: Pick<ToolMetadata, "id" | "slug" | "title" | "shortDescription" | "category" | "keywords">;
  score: number;
  matchedFields: string[];
}

export interface SearchSuggestion {
  text: string;
  type: "tool" | "category" | "action";
  toolId?: string;
  categoryId?: ToolCategory;
}

// ====================
// Registry Types
// ====================

export interface ToolRegistry {
  getTool(id: string): ToolDefinition | undefined;
  getToolsByCategory(category: ToolCategory): ToolDefinition[];
  getAllTools(): ToolDefinition[];
  getPopularTools(limit?: number): ToolDefinition[];
  search(query: string, limit?: number): SearchResult[];
  getRelatedTools(toolId: string, limit?: number): ToolDefinition[];
}
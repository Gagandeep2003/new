import type { CategoryDefinition, ToolCategory } from "@/types/tool";
import { ToolDefinition } from "@/types/tool";

/** Ordered list of all categories */
export const Categories: (CategoryDefinition & { tools: ToolDefinition[] })[] = [
  {
    id: "math",
    slug: "math",
    title: "Math",
    description: "Percentages, fractions, ratios, averages, and core arithmetic.",
    icon: "📐",
    order: 1,
    tools: [],
  },
  {
    id: "everyday",
    slug: "everyday",
    title: "Everyday",
    description: "Dates, ages, time zones, unit conversions, and daily calculations.",
    icon: "📅",
    order: 2,
    tools: [],
  },
  {
    id: "student",
    slug: "student",
    title: "Student",
    description: "Grade calculators, CGPA/GPA, attendance, marks, and exam scores.",
    icon: "🎓",
    order: 3,
    tools: [],
  },
  {
    id: "career",
    slug: "career",
    title: "Career",
    description: "Salary increments, experience, notice periods, and employment math.",
    icon: "💼",
    order: 4,
    tools: [],
  },
  {
    id: "money",
    slug: "money",
    title: "Money",
    description: "EMI, loans, SIP, FD, GST, inflation, and financial calculations.",
    icon: "💰",
    order: 5,
    tools: [],
  },
  {
    id: "developer",
    slug: "developer",
    title: "Developer",
    description: "JSON, Base64, URL, JWT, UUID, regex, timestamps, and color tools.",
    icon: "⚙️",
    order: 6,
    tools: [],
  },
  {
    id: "exams",
    slug: "exams",
    title: "Exams",
    description: "SSC and other exam calculators with verified marking schemes.",
    icon: "📝",
    order: 7,
    tools: [],
  },
];

/** Get a category by ID */
export function getCategory(categoryId: ToolCategory): (typeof Categories)[number] | undefined {
  return Categories.find((c) => c.id === categoryId);
}

/** Get a category by slug */
export function getCategoryBySlug(slug: string): (typeof Categories)[number] | undefined {
  return Categories.find((c) => c.slug === slug);
}

/** Get the order index for a category */
export const CategoryOrder = Categories.reduce(
  (acc, cat, index) => {
    acc[cat.id] = index;
    return acc;
  },
  {} as Record<ToolCategory, number>,
);
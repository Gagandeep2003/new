import { CalculationFunction, CalculationInputs, CalculationResult } from "@/types/tool";

/**
 * Student Calculator Module
 *
 * Grade, CGPA, GPA, SGPA, attendance, and exam score calculations.
 */

// ---------------------------------------------------------------------------
// Percentage from Marks
// ---------------------------------------------------------------------------

function percentageFromMarks(obtained: number, total: number): number {
  if (obtained < 0 || total <= 0) throw new Error("Obtained marks must be non-negative and total marks must be positive");
  if (obtained > total) throw new Error("Obtained marks cannot exceed total marks");
  return (obtained / total) * 100;
}

function marksFromPercentage(percentage: number, total: number): number {
  if (percentage < 0 || percentage > 100) throw new Error("Percentage must be between 0 and 100");
  if (total <= 0) throw new Error("Total marks must be positive");
  return Math.round((percentage / 100) * total);
}

// ---------------------------------------------------------------------------
// CGPA Calculations
// ---------------------------------------------------------------------------

/**
 * Calculates CGPA from grades using the standard Indian 10-point scale.
 * Input: Array of { credit, gradePoint } objects.
 * Formula: CGPA = sum(credit * gradePoint) / sum(credits)
 */
interface CGPAGrade {
  credit: number;
  gradePoint: number;
}

function cgpaFromGrades(grades: CGPAGrade[]): number {
  if (grades.length === 0) throw new Error("At least one grade is required");
  let totalCredits = 0;
  let weightedSum = 0;
  for (const g of grades) {
    if (g.credit <= 0) throw new Error("Credit must be positive");
    if (g.gradePoint < 0 || g.gradePoint > 10) throw new Error("Grade point must be 0-10");
    totalCredits += g.credit;
    weightedSum += g.credit * g.gradePoint;
  }
  return weightedSum / totalCredits;
}

/**
 * Converts CGPA to percentage using the standard formula:
 * Percentage = CGPA * 9.5
 * (Commonly used in Indian universities, but methodology should be stated)
 */
function cgpaToPercentage(cgpa: number, multiplier: number = 9.5): number {
  if (cgpa < 0 || cgpa > 10) throw new Error("CGPA must be between 0 and 10");
  if (multiplier <= 0) throw new Error("Multiplier must be positive");
  return cgpa * multiplier;
}

/**
 * Converts percentage to CGPA using inverse of standard formula.
 */
function percentageToCgpa(percentage: number, multiplier: number = 9.5): number {
  if (percentage < 0 || percentage > 100) throw new Error("Percentage must be between 0 and 100");
  if (multiplier <= 0) throw new Error("Multiplier must be positive");
  return Math.min(10, percentage / multiplier);
}

// ---------------------------------------------------------------------------
// GPA Calculations (US 4.0 Scale)
// ---------------------------------------------------------------------------

interface GPACourse {
  credits: number;
  grade: number; // 0.0 - 4.0
}

function gpaFromCourses(courses: GPACourse[]): number {
  if (courses.length === 0) throw new Error("At least one course is required");
  let totalCredits = 0;
  let weightedSum = 0;
  for (const c of courses) {
    if (c.credits <= 0) throw new Error("Credits must be positive");
    if (c.grade < 0 || c.grade > 4) throw new Error("Grade must be 0.0-4.0");
    totalCredits += c.credits;
    weightedSum += c.credits * c.grade;
  }
  return weightedSum / totalCredits;
}

// ---------------------------------------------------------------------------
// SGPA Calculations (Semester GPA)
// ---------------------------------------------------------------------------

function sgpaFromSubjects(subjects: CGPAGrade[]): number {
  return cgpaFromGrades(subjects);
}

// ---------------------------------------------------------------------------
// Attendance
// ---------------------------------------------------------------------------

function attendancePercentage(classesAttended: number, classesHeld: number): number {
  if (classesHeld <= 0) throw new Error("Classes held must be positive");
  if (classesAttended < 0) throw new Error("Classes attended cannot be negative");
  if (classesAttended > classesHeld) throw new Error("Attended cannot exceed held");
  return (classesAttended / classesHeld) * 100;
}

function requiredAttendance(targetPercentage: number, classesHeld: number, classesAttended: number): number {
  if (targetPercentage < 0 || targetPercentage > 100) throw new Error("Target percentage must be 0-100");
  if (classesHeld <= 0) throw new Error("Classes held must be positive");
  if (classesAttended < 0 || classesAttended > classesHeld) throw new Error("Invalid attendance values");
  const required = Math.ceil((targetPercentage / 100) * classesHeld);
  return Math.max(0, required - classesAttended);
}

// ---------------------------------------------------------------------------
// Exam Score
// ---------------------------------------------------------------------------

function examScore(correct: number, wrong: number, total: number, positiveMark: number, negativeMark: number): number {
  if (correct < 0 || wrong < 0 || total <= 0) throw new Error("Invalid input values");
  if (correct + wrong > total) throw new Error("Correct + wrong cannot exceed total questions");
  if (positiveMark <= 0) throw new Error("Positive mark must be positive");
  return correct * positiveMark - wrong * negativeMark;
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export {
  percentageFromMarks,
  marksFromPercentage,
  cgpaFromGrades,
  cgpaToPercentage,
  percentageToCgpa,
  gpaFromCourses,
  sgpaFromSubjects,
  attendancePercentage,
  requiredAttendance,
  examScore,
};
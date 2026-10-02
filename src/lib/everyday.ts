import { CalculationFunction, CalculationInputs, CalculationResult } from "@/types/tool";

/**
 * Everyday Calculator Module
 *
 * Handles date, time, duration, age, and unit conversions.
 */

// ---------------------------------------------------------------------------
// Date & Time
// ---------------------------------------------------------------------------

function dateAdd(dateStr: string, days: number): string {
  if (!dateStr) throw new Error("Date string is required");
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) throw new Error("Invalid date format");
  const result = new Date(date.getTime() + days * 86400000);
  return result.toISOString().split("T")[0];
}

function dateSubtract(dateStr: string, days: number): string {
  if (!dateStr) throw new Error("Date string is required");
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) throw new Error("Invalid date format");
  const result = new Date(date.getTime() - days * 86400000);
  return result.toISOString().split("T")[0];
}

function daysUntil(targetDate: string): number {
  if (!targetDate) throw new Error("Target date is required");
  const today = new Date();
  const target = new Date(targetDate);
  if (isNaN(target.getTime())) throw new Error("Invalid date format");
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function timeConvertedToHours(hours: number): string {
  if (hours < 0) throw new Error("Hours must be non-negative");
  return hours.toString();
}

// ---------------------------------------------------------------------------
// Age & Duration
// ---------------------------------------------------------------------------

function ageInYears(birthDate: string): number {
  if (!birthDate) throw new Error("Birth date is required");
  const birth = new Date(birthDate);
  const today = new Date();
  const diffMs = today.getTime() - birth.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.2425));
}

function durationInDays(durationSec: number): number {
  if (durationSec < 0) throw new Error("Duration must be non-negative");
  return Math.floor(durationSec / (1000 * 60 * 60 * 24));
}

function durationInHours(durationSec: number): number {
  if (durationSec < 0) throw new Error("Duration must be non-negative");
  return Math.floor(durationSec / (1000 * 60 * 60));
}

// ---------------------------------------------------------------------------
// Unit Conversions
// ---------------------------------------------------------------------------

function convertTemperature(celsius: number, from: string, to: string): number {
  const fromLower = from.toLowerCase();
  const toLower = to.toLowerCase();
  if (fromLower === "fahrenheit" || toLower === "fahrenheit") {
    return ((celsius * 9) / 5) + 32;
  }
  if (fromLower === "kelvin" || toLower === "kelvin") {
    return celsius + 273.15;
  }
  throw new Error(`Unsupported conversion pair: ${from} -> ${to}`);
}

function convertLength(meter: number, from: string, to: string): number {
  const fromLower = from.toLowerCase();
  const toLower = to.toLowerCase();
  if (fromLower === "meter" || toLower === "meter") {
    return meter;
  }
  const factors: Record<string, number> = {
    cm: 100,
    km: 1000,
    inch: 0.0254,
    mile: 1609.344,
  };
  const factor = factors[toLower];
  if (!factor) throw new Error(`Unsupported unit: ${to}`);
  return meter * factor;
}

// ---------------------------------------------------------------------------
// Working Days & Business Days
// ---------------------------------------------------------------------------

function workingDaysBetween(start: string, end: string): number {
  if (!start || !end) throw new Error("Both dates are required");
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) throw new Error("Invalid date format");
  const delta = endDate.getTime() - startDate.getTime();
  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  // Adjust for weekends (Mon-Sun)
  const monday = new Date(Date.now());
  const dayOfWeek = new Date(startDate).getDay(); // 0=Sun, 6=Sat
  const totalDays = Math.floor((days + dayOfWeek) / 7);
  const weekdays = totalDays - (dayOfWeek + totalDays) % 7;
  return Math.max(0, weekdays);
}

// ---------------------------------------------------------------------------
// Unit Conversion Registry
// ---------------------------------------------------------------------------

const UNITS: Record<string, string> = {
  // Length
  meter: "meter",
  kilometer: "km",
  centimeter: "cm",
  millimeter: "mm",
  inch: "in",
  foot: "ft",
  mile: "mi",
  yard: "yd",
  nanometer: "nm",
  micrometer: "µm",
  picometer: "pm",
  // Time
  second: "second",
  minute: "min",
  hour: "hour",
  day: "day",
  week: "week",
  month: "month",
  year: "year",
  // Temperature
  celsius: "celsius",
  fahrenheit: "fahrenheit",
  kelvin: "kelvin",
  // Weight
  kilogram: "kg",
  gram: "g",
  pound: "lb",
  ounce: "oz",
  ton: "ton",
  // Currency
  dollar: "USD",
  euro: "EUR",
  british_pound: "GBP",
  yen: "JPY",
  // Area
  square_meter: "sqm",
  square_feet: "sqft",
  hectare: "ha",
  // Volume
  liter: "liter",
  gallon: "gallon",
  cubic_metre: "m³",
  cubic_yard: "cy",
};

export {
  convertTemperature,
  convertLength,
  dateAdd,
  dateSubtract,
  daysUntil,
  timeConvertedToHours,
  ageInYears,
  durationInDays,
  durationInHours,
  workingDaysBetween,
  UNITS,
};

export function isUnitValid(unit: string): boolean {
  return Object.keys(UNITS).includes(unit);
}
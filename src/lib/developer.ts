import { CalculationFunction, CalculationInputs, CalculationResult } from "@/types/tool";

/**
 * Developer Tools Module
 *
 * JSON formatting, JSON validation/minification, Base64 encoding/decoding,
 * URL encoding/decoding, UUID generation, JWT decoding, and hex color conversion.
 */

// ---------------------------------------------------------------------------
// JSON Formatting
// ---------------------------------------------------------------------------

function formatJson(jsonString: string): string {
  if (typeof jsonString !== "string") throw new Error("Input must be a string");
  try {
    const obj = JSON.parse(jsonString);
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    throw new Error("Invalid JSON string");
  }
}

// ---------------------------------------------------------------------------
// JSON Validation
// ---------------------------------------------------------------------------

function validateJson(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// JSON Minifier
// ---------------------------------------------------------------------------

function minifyJson(jsonString: string): string {
  if (typeof jsonString !== "string") throw new Error("Input must be a string");
  try {
    const obj = JSON.parse(jsonString);
    // Remove whitespace
    return JSON.stringify(obj, null, 0);
  } catch {
    throw new Error("Invalid JSON string");
  }
}

// ---------------------------------------------------------------------------
// Base64 Encoding
// ---------------------------------------------------------------------------

function encodeBase64(data: string | Buffer): string {
  if (typeof data !== "string" && !(data instanceof Buffer)) {
    throw new Error("Input must be a string or Buffer");
  }
  return btoa(String(data));
}

function decodeBase64(encoded: string): string {
  if (typeof encoded !== "string") throw new Error("Input must be a string");
  try {
    return atob(encoded);
  } catch {
    throw new Error("Invalid Base64 string");
  }
}

// ---------------------------------------------------------------------------
// URL Encoding
// ---------------------------------------------------------------------------

function encodeUrl(str: string): string {
  return encodeURIComponent(str);
}

function decodeUrl(str: string): string {
  return decodeURIComponent(str);
}

// ---------------------------------------------------------------------------
// UUID Generation
// ---------------------------------------------------------------------------

function generateUUID(): string {
  // Using crypto.randomUUID() if available (modern browsers/Node 14+)
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  const chars = "0123456789abcdef"; // simplified - in production use crypto.randomBytes
  let u = "";
  for (let i = 0; i < 36; i++) {
    u += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return u;
}

// ---------------------------------------------------------------------------
// Color Conversion
// ---------------------------------------------------------------------------

function rgbToHex(r: number, g: number, b: number): string {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error("RGB values must be between 0 and 255");
  }
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export {
  formatJson,
  validateJson,
  minifyJson,
  encodeBase64,
  decodeBase64,
  encodeUrl,
  decodeUrl,
  generateUUID,
  rgbToHex,
};
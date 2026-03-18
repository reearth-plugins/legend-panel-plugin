/**
 * Converts a hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  const cleanHex = hex.replace("#", "");

  // Parse RGB values
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

/**
 * Calculates the relative luminance of a color
 * Based on WCAG 2.0 specification
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Determines if a color is light or dark based on luminance
 * Returns true if the color is dark, false if light
 * Threshold of 0.5 is commonly used for determining contrast
 */
export function isDarkColor(color: string): boolean {
  const rgb = hexToRgb(color);
  if (!rgb) return false;

  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  return luminance < 0.5;
}

/**
 * Color sets for different background types
 */
export const LIGHT_BACKGROUND_COLORS = {
  title: "#111827", // gray-900
  subtitle: "#62748E",
  legendText: "#314158",
  emptyTip: "#9CA3AF", // gray-400
};

export const DARK_BACKGROUND_COLORS = {
  title: "#F9FAFB", // gray-50
  subtitle: "#D1D5DB", // gray-300
  legendText: "#E5E7EB", // gray-200
  emptyTip: "#9CA3AF", // gray-400
};

/**
 * Gets the appropriate color set based on background color
 */
export function getColorSet(backgroundColor: string) {
  return isDarkColor(backgroundColor)
    ? DARK_BACKGROUND_COLORS
    : LIGHT_BACKGROUND_COLORS;
}

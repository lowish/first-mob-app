/**
 * Monochrome design tokens.
 *
 * One ground (paper), one action colour (ink), and four steps of gray in
 * between. Every surface in the app is picked from this list — no hues.
 */

import { Platform } from 'react-native';

export const Palette = {
  /** Page ground and text on ink. */
  paper: '#FFFFFF',
  /** Resting field fill. */
  fill: '#F4F4F4',
  /** Hairlines and dividers. */
  line: '#E4E4E4',
  /** Placeholders and micro-labels. */
  mist: '#9A9A9A',
  /** Secondary copy. */
  slate: '#6B6B6B',
  /** Pressed ink, tertiary links. */
  graphite: '#2E2E2E',
  /** Primary action and headings. */
  ink: '#0A0A0A',
} as const;

export const Radius = {
  /** Inputs and the primary button. */
  field: 16,
  /** Logo tile — a squircle, one step softer than the fields. */
  tile: 22,
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  },
});

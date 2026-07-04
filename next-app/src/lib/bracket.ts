// Static bracket shape derived from ko-solver/00_bracket.csv's match dependencies.
// Each round array lists match numbers top-to-bottom as they appear in the
// Wikipedia-style knockout bracket diagram, from the R32 (outer edge) inward.
export const LEFT_ROUNDS: number[][] = [
  [74, 77, 73, 75, 83, 84, 81, 82],
  [89, 90, 93, 94],
  [97, 98],
  [101],
];

export const RIGHT_ROUNDS: number[][] = [
  [76, 78, 79, 80, 86, 88, 85, 87],
  [91, 92, 95, 96],
  [99, 100],
  [102],
];

export const ROUND_LABELS = ["R32", "R16", "QF", "SF"];

export const FINAL_MATCH_NUMBER = 104;
export const THIRD_PLACE_MATCH_NUMBER = 103;

// Rendering constants, kept here (rather than in the Bracket component) so the
// rendered width can be computed once and reused as a page-wide max width.
export const MATCH_WIDTH = 44;
export const MATCH_HEIGHT = 22;
const GAP_PX = 8; // MUI's default theme spacing unit, used throughout Bracket.tsx as `gap: 1`

// Mirrors Bracket.tsx's layout: LEFT_ROUNDS' columns, the center Final/Third
// column, and the RIGHT_ROUNDS group are all top-level flex children of one row.
const roundsGroupWidth = ROUND_LABELS.length * MATCH_WIDTH + (ROUND_LABELS.length - 1) * GAP_PX;
const topLevelChildCount = ROUND_LABELS.length + 2; // left columns + center + right group

export const BRACKET_WIDTH =
  ROUND_LABELS.length * MATCH_WIDTH + // left round columns, individually
  MATCH_WIDTH + // center column
  roundsGroupWidth + // right round columns, grouped
  (topLevelChildCount - 1) * GAP_PX; // gaps between the top-level flex children

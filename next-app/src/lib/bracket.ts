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

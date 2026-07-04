// Regenerate results.types.d.ts (from the repo root) after changing the schema or data shape:
//   pnx json-schema-to-typescript -i ko-solver/03_results_schema.json -o next-app/src/data/results.types.d.ts
import raw from './results.json';
import type { ResultSet } from './results.types';

export const results = raw satisfies ResultSet[];

import { Box, Paper, Typography } from "@mui/material";
import type { SolvedMatch } from "@/data/results.types";
import {
  FINAL_MATCH_NUMBER,
  LEFT_ROUNDS,
  RIGHT_ROUNDS,
  ROUND_LABELS,
  THIRD_PLACE_MATCH_NUMBER,
} from "@/lib/bracket";
import FlagSpan from "./FlagSpan";

const MATCH_HEIGHT = 22;
const MATCH_WIDTH = 44;

function MatchBox({ match }: { match?: SolvedMatch }) {
  if (!match) return null;

  return (
    <Paper
      variant="outlined"
      sx={{
        width: MATCH_WIDTH,
        px: 0.25,
        py: 0.25,
        display: "flex",
        justifyContent: "center",
        gap: 0.25,
        borderStyle: match.known_result ? "solid" : "dashed",
      }}
    >
      <FlagSpan code={match.home} winner={match.home_winner} />
      <FlagSpan code={match.away} winner={!match.home_winner} />
    </Paper>
  );
}

function RoundColumn({
  matchNumbers,
  byNumber,
  label,
  columnHeight,
}: {
  matchNumbers: number[];
  byNumber: Map<number, SolvedMatch>;
  label: string;
  columnHeight: number;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          gap: "1px",
          height: columnHeight,
        }}
      >
        {matchNumbers.map((matchNumber) => (
          <MatchBox key={matchNumber} match={byNumber.get(matchNumber)} />
        ))}
      </Box>
    </Box>
  );
}

export default function Bracket({ matches }: { matches: SolvedMatch[] }) {
  const byNumber = new Map(matches.map((match) => [match.match_number, match]));
  const columnHeight = LEFT_ROUNDS[0].length * MATCH_HEIGHT + (LEFT_ROUNDS[0].length - 1) * 1;

  return (
    <Box>
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ display: "flex", gap: 1, width: "fit-content" }}>
        {LEFT_ROUNDS.map((round, index) => (
          <RoundColumn
            key={ROUND_LABELS[index]}
            matchNumbers={round}
            byNumber={byNumber}
            label={ROUND_LABELS[index]}
            columnHeight={columnHeight}
          />
        ))}
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 1, height: columnHeight }}>
          <Box sx={{pt: "75%"}}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, display: "block", textAlign: "center" }}>
              Final
            </Typography>
            <MatchBox match={byNumber.get(FINAL_MATCH_NUMBER)} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, display: "block", textAlign: "center" }}>
              Third place
            </Typography>
            <MatchBox match={byNumber.get(THIRD_PLACE_MATCH_NUMBER)} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 1 }}>
          {RIGHT_ROUNDS.map((round, index) => (
            <RoundColumn
              key={ROUND_LABELS[index]}
              matchNumbers={round}
              byNumber={byNumber}
              label={ROUND_LABELS[index]}
              columnHeight={columnHeight}
            />
          ))}
        </Box>
        </Box>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, display: "block", mt: 0.5 }}>
        Solid border = known result, dashed = predicted
      </Typography>
    </Box>
  );
}

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { PlayerResult, Results } from "@/data/results.types";
import CollapsibleBox from "./CollapsibleBox";

const COLLAPSED_ROW_COUNT = 10;

function computeRanks(players: PlayerResult[]): string[] {
  return players.map((player) => {
    const firstIndex = players.findIndex((p) => p.score === player.score);
    const tieCount = players.filter((p) => p.score === player.score).length;
    const rank = firstIndex + 1;
    return tieCount > 1 ? `${rank}=` : `${rank}`;
  });
}

export default function ResultsTable({
  results,
  highlightName,
}: {
  results: Results | null;
  highlightName: string;
}) {
  if (!results) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "33vh",
          width: "100%",
        }}
      >
        <Typography>Impossible with these results</Typography>
      </Box>
    );
  }

  const players = results.players.toSorted(
    ({ score: a }, { score: b }) => b - a,
  );
  const ranks = computeRanks(players);

  return (
    <CollapsibleBox collapsedHeight={COLLAPSED_ROW_COUNT * 33 + 33}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player, index) => (
              <TableRow
                key={player.name}
                selected={player.name === highlightName}
              >
                <TableCell>{ranks[index]}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell align="right">{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CollapsibleBox>
  );
}

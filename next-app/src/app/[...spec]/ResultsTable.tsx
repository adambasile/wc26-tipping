import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Results } from "@/data/results.types";

export default function ResultsTable({
  results,
  highlightName,
}: {
  results: Results | null;
  highlightName: string;
}) {
  if (!results) {
    return <p>No solution found</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.players.map((player) => (
            <TableRow key={player.name} selected={player.name === highlightName}>
              <TableCell>{player.name}</TableCell>
              <TableCell align="right">{player.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

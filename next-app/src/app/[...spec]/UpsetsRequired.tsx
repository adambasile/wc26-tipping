import { Box, Typography } from "@mui/material";
import type { SolvedMatch } from "@/data/results.types";
import FlagSpan from "./FlagSpan";

function isUpset(match: SolvedMatch): boolean {
  if (match.known_result) return false;
  const winnerRating = match.home_winner
    ? match.home_rating
    : match.away_rating;
  const loserRating = match.home_winner ? match.away_rating : match.home_rating;
  return winnerRating < loserRating;
}

export default function UpsetsRequired({
  matches,
}: {
  matches: SolvedMatch[];
}) {
  const upsets = matches.filter(isUpset);

  return (
    <Box>
      <Typography variant="subtitle1">
        {upsets.length === 0 ? "No" : upsets.length} upset
        {upsets.length === 1 ? "" : "s"} needed
      </Typography>
      {upsets.length === 0 ? (
        <Typography variant="body2">None</Typography>
      ) : (
        <Typography component="ul" sx={{ m: 0, pl: 2 }}>
          {upsets.map((match) => (
            <Typography component="li" key={match.match_number}>
              <FlagSpan code={match.home} winner={match.home_winner} />
              {" v "}
              <FlagSpan code={match.away} winner={!match.home_winner} />
            </Typography>
          ))}
        </Typography>
      )}
    </Box>
  );
}

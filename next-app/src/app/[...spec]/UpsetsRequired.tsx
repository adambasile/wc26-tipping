import { Box, Typography } from "@mui/material";
import type { SolvedMatch } from "@/data/results.types";
import { flagEmoji } from "@/lib/flags";

function isUpset(match: SolvedMatch): boolean {
  if (match.known_result) return false;
  const winnerRating = match.home_winner ? match.home_rating : match.away_rating;
  const loserRating = match.home_winner ? match.away_rating : match.home_rating;
  return winnerRating < loserRating;
}

export default function UpsetsRequired({ matches }: { matches: SolvedMatch[] }) {
  const upsets = matches.filter(isUpset);

  return (
    <Box>
      <Typography variant="subtitle1">Upsets required</Typography>
      {upsets.length === 0 ? (
        <Typography variant="body2">None</Typography>
      ) : (
        <Typography component="ul" sx={{ m: 0, pl: 2 }}>
          {upsets.map((match) => (
            <Typography component="li" key={match.match_number}>
              <Typography
                component="span"
                title={match.home}
                aria-label={match.home}
                sx={{ filter: match.home_winner ? undefined : "grayscale(1)", opacity: match.home_winner ? 1 : 0.4 }}
              >
                {flagEmoji(match.home)}
              </Typography>
              {" v "}
              <Typography
                component="span"
                title={match.away}
                aria-label={match.away}
                sx={{ filter: match.home_winner ? "grayscale(1)" : undefined, opacity: match.home_winner ? 0.4 : 1 }}
              >
                {flagEmoji(match.away)}
              </Typography>
            </Typography>
          ))}
        </Typography>
      )}
    </Box>
  );
}

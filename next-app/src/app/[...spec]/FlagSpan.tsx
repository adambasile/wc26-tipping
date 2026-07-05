import { Typography } from "@mui/material";
import { flagEmoji } from "@/lib/flags";

export default function FlagSpan({
  code,
  winner,
}: {
  code: string;
  winner: boolean;
}) {
  return (
    <Typography
      component="span"
      title={code}
      aria-label={code}
      sx={{
        lineHeight: 1,
        opacity: winner ? 1 : 0.2,
        filter: winner ? undefined : "grayscale(50%)",
      }}
    >
      {flagEmoji(code)}
    </Typography>
  );
}

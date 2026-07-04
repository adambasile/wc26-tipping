import { Typography } from "@mui/material";
import { flagEmoji } from "@/lib/flags";

export default function FlagSpan({ code, winner }: { code: string; winner: boolean }) {
  return (
    <Typography
      component="span"
      title={code}
      aria-label={code}
      sx={{
        lineHeight: 1,
        opacity: winner ? 1 : 0.4,
        filter: winner ? undefined : "grayscale(1)",
      }}
    >
      {flagEmoji(code)}
    </Typography>
  );
}

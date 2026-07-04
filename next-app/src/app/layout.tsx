import { Box, CssBaseline, Link, Typography } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { BRACKET_WIDTH } from "@/lib/bracket";

const HORIZONTAL_PADDING_PX = 16; // matches the Box's `px: 2` below, on each side
const SLOP_PX = 8;
const PAGE_MAX_WIDTH = BRACKET_WIDTH + HORIZONTAL_PADDING_PX * 2 + SLOP_PX;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              maxWidth: PAGE_MAX_WIDTH,
              mx: "auto",
              px: 2,
            }}
          >
            <Box sx={{ flexGrow: 1 }}>{children}</Box>
            <Typography component="footer" variant="body2" color="text.secondary" sx={{ py: 1 }}>
              An upset is when the lower-rated team wins, based on ratings from{" "}
              <Link href="https://eloratings.net" target="_blank" rel="noopener noreferrer">
                eloratings.net
              </Link>{" "}
              as of 29 June 2026. Each scenario shows the bracket that needs the smallest upsets to make it happen.
            </Typography>
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

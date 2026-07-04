"use client";

import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function CollapsibleBox({
  collapsedHeight,
  children,
}: {
  collapsedHeight: number;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ width: 300 }}>
      <Box sx={{ position: "relative", maxHeight: expanded ? undefined : collapsedHeight, overflow: "hidden" }}>
        {children}
        {!expanded && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 40,
              background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
              pointerEvents: "none",
            }}
          />
        )}
      </Box>
      <Button size="small" onClick={() => setExpanded((e) => !e)}>
        {expanded ? "Show less" : "Show more"}
      </Button>
    </Box>
  );
}

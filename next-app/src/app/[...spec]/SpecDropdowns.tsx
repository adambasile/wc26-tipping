"use client";

import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";

export type SpecDropdownOption = {
  slug: string;
  label: string;
  targetPath: string[];
};

export type SpecDropdownLevel = {
  options: SpecDropdownOption[];
  selectedSlug: string;
};

export default function SpecDropdowns({
  levels,
}: {
  levels: SpecDropdownLevel[];
}) {
  const router = useRouter();

  const handleChange =
    (level: SpecDropdownLevel) => (event: SelectChangeEvent) => {
      const option = level.options.find((o) => o.slug === event.target.value);
      if (!option) return;
      router.push(`/${option.targetPath.join("/")}`);
    };

  return (
    <Stack direction="row" spacing={2}>
      {levels.map((level, index) => (
        <FormControl key={index} size="small" sx={{ width: 200 }}>
          <Select
            value={level.selectedSlug}
            onChange={handleChange(level)}
            sx={{
              "& .MuiSelect-select": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            }}
          >
            {level.options.map((option) => (
              <MenuItem key={option.slug} value={option.slug}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Stack>
  );
}

"use client";
import { createTheme } from "@mantine/core";

// Style Imports
import { colors } from "@/styles/colors";

export const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  breakpoints: {
    xs: "30em",
    sm: "40em",
    md: "48em",
    lg: "70em",
    xl: "80em",
  },
  colors: colors,
  cursorType: "pointer",
});

import { useMantineTheme, getBreakpointValue } from "@mantine/core";

export const GetBreakpoints = () => {
  const theme = useMantineTheme();

  return {
    xs: getBreakpointValue("xs", theme?.breakpoints),
    sm: getBreakpointValue("sm", theme?.breakpoints),
    md: getBreakpointValue("md", theme?.breakpoints),
    lg: getBreakpointValue("lg", theme?.breakpoints),
    xl: getBreakpointValue("xl", theme?.breakpoints),
  };
};

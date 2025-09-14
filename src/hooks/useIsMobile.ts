import { useMemo } from "react";
import { useMediaQuery } from "@react-hook/media-query";

type Breakpoint =
  | "up-xs"
  | "up-sm"
  | "up-md"
  | "up-lg"
  | "up-xl"
  | "up-xxl"
  | "down-xs"
  | "down-sm"
  | "down-md"
  | "down-lg"
  | "down-xl"
  | "down-xxl";

const breakpoints = {
  xs: "0px",
  sm: "576px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  xxl: "1440px",
};

export function useIsMobile(query: string | Breakpoint = "(max-width:768px)") {
  const _query = useMemo(() => {
    switch (query) {
      case "up-xxl":
        return `(max-width:${breakpoints.xxl})`;
      case "up-xl":
        return `(max-width:${breakpoints.xl})`;
      case "up-lg":
        return `(max-width:${breakpoints.lg})`;
      case "up-md":
        return `(max-width:${breakpoints.md})`;
      case "up-sm":
        return `(max-width:${breakpoints.sm})`;
      case "up-xs":
        return `(max-width:${breakpoints.xs})`;
      case "down-xxl":
        return `(min-width:${breakpoints.xxl})`;
      case "down-xl":
        return `(min-width:${breakpoints.xl})`;
      case "down-lg":
        return `(min-width:${breakpoints.lg})`;
      case "down-md":
        return `(min-width:${breakpoints.md})`;
      case "down-sm":
        return `(min-width:${breakpoints.sm})`;
      case "down-xs":
        return `(min-width:${breakpoints.xs})`;
      default:
        return query;
    }
  }, [query]);

  const isMobileMediaQuery = useMediaQuery(_query);

  return isMobileMediaQuery;
}

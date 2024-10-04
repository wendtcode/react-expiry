import React from "react";
import { ExpiryContext } from "./ExpiryContext";
import { getDays } from "./utils";
import type { Options } from "./types";

export function useExpiry(options: Options) {
  const shouldRender = React.useContext(ExpiryContext);

  if (!shouldRender) {
    throw new Error("useExpiry must be used within an ExpiryProvider");
  }

  // Memoize the check result to avoid unnecessary re-computations
  return React.useMemo(() => shouldRender(options), [options, shouldRender]);
}

// Adding `ttl` convenience helper to useExpiry function
useExpiry.days = getDays;

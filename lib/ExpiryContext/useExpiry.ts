import React from "react";
import { ExpiryContext } from "./ExpiryContext";

export function useExpiry(options: {
  id: string;
  ttl?: number;
  expires?: Date;
}) {
  const shouldRender = React.useContext(ExpiryContext);

  if (!shouldRender) {
    throw new Error("useExpiry must be used within an ExpiryProvider");
  }

  // Memoize the check result to avoid unnecessary re-computations
  return React.useMemo(() => shouldRender(options), [options, shouldRender]);
}

import React from "react";
import { ExpiryContext } from "./ExpiryContext";
import { createSafeStorage, addSecondsToDate } from "./utils";

interface Props<TStorage extends Parameters<typeof createSafeStorage>[0]> {
  children: React.ReactNode;
  browserOnly?: boolean;
  defaultTTL?: number;
  keyPrefix?: string | ((id: string) => string);
  storage?: TStorage;
}

export function ExpiryProvider<
  TStorage extends Parameters<typeof createSafeStorage>[0]
>({
  children,
  defaultTTL = 0,
  keyPrefix = "expiry:",
  browserOnly = true,
  storage,
}: Props<TStorage>) {
  const shouldRender = React.useCallback(
    function checkExpiry({
      id,
      ttl = defaultTTL,
      expires,
    }: {
      id: string;
      ttl?: number;
      expires?: Date;
    }) {
      // Return true by default on the server, as localStorage does not exist
      if (typeof window === "undefined") {
        return !browserOnly;
      }

      const now = new Date();

      // Check global expiration
      if (expires && expires < now) {
        return false;
      }

      if (ttl > 0) {
        // Setup storage and key
        const safeStorage = createSafeStorage(storage ?? localStorage);
        const prefixedKey =
          typeof keyPrefix === "function" ? keyPrefix(id) : keyPrefix + id;

        // Check if a timestamp exists in localStorage for this component
        const storedTimestamp = safeStorage.getItem(prefixedKey);

        if (storedTimestamp) {
          const firstRender = new Date(storedTimestamp);
          const ttlExpiration = addSecondsToDate(firstRender, ttl);
          if (ttlExpiration < now) {
            return false;
          }
        } else {
          // If no timestamp is stored, save the current timestamp
          safeStorage.setItem(prefixedKey, now.toISOString());
        }
      }

      return true;
    },
    [browserOnly, defaultTTL, keyPrefix, storage]
  );

  return (
    <ExpiryContext.Provider value={shouldRender}>
      {children}
    </ExpiryContext.Provider>
  );
}

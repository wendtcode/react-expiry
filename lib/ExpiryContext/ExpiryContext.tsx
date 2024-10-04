import React from "react";

export const ExpiryContext = React.createContext<
  | ((options: { id: string; ttl?: number; expires?: Date }) => boolean)
  | undefined
>(undefined);

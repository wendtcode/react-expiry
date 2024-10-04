import React from "react";
import type { Options } from "./types";

export const ExpiryContext = React.createContext<
  ((options: Options) => boolean) | undefined
>(undefined);

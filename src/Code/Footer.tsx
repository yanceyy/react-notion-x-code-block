import React, { type ReactNode } from "react";

export function Footer({ children }: { children?: ReactNode }): ReactNode {
  return <>{children}</>;
}

Footer.displayName = "Footer";

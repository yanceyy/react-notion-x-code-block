import React, { type ReactNode } from "react";

export function Header({ children }: { children?: ReactNode }): ReactNode {
  return <div>{children}</div>;
}

Header.displayName = "Header";

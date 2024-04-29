import React from "react";

export const getReactChildren = <
  ExpectedChildren extends {
    [k in string]?: React.ReactNode;
  }
>(
  children: React.ReactNode
) => {
  return React.Children.toArray(children).reduce(
    (acc: Partial<ExpectedChildren>, child) => {
      if (React.isValidElement(child)) {
        // @ts-ignore
        acc[child.type.displayName] = child;
      }
      return acc;
    },
    {}
  );
};

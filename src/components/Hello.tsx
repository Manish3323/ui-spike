import * as React from "react";

interface HelloProps {
  name: string;
}

export const Hello = (props: HelloProps) => {
  return <h1>{props.name}</h1>;
};

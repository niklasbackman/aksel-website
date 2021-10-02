import React from "react";
import { withErrorBoundary } from "../error-boundary";

type FigmaType = {
  node: {
    embed: string;
  };
};

const Figma = ({ node }: FigmaType): JSX.Element => {
  const src = node.embed?.match(/src="(.+?)"/)?.[1];

  if (!src) return null;

  return (
    <iframe
      title="Figma embed frame"
      style={{ border: "none", width: "100%" }}
      src={src || ""}
      height="500px"
    />
  );
};

export default withErrorBoundary(Figma, "Figma Embed");

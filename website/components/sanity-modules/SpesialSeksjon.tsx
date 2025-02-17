import React from "react";
import { SanityKeyed } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";
import ComponentOverview from "./component-overview";
import IconSearch from "./icon-search";
import { ColorCategory } from "./color-category";

type SpesialT = SanityKeyed<{
  _type: "spesial_seksjon";
  modul?: "farge_kategori" | "ikonsok" | "endringslogg" | "komponentoversikt";
  logs?: any[];
  oversikt?: any;
  farge?: any;
}>;

const SpesialSeksjon = ({ node }: { node: SpesialT }): JSX.Element => {
  if (!node || !node.modul) {
    return null;
  }

  const GetModule = () => {
    switch (node.modul) {
      case "farge_kategori":
        return <ColorCategory node={node.farge} />;
      case "komponentoversikt":
        return <ComponentOverview node={node.oversikt} />;
      case "ikonsok":
        return <IconSearch />;
      default:
        return null;
    }
  };

  return <div className="mb-16">{GetModule()}</div>;
};

export default withErrorBoundary(SpesialSeksjon, "SpesialSeksjon");

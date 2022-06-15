import { createConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

export default createConfig({
  name: "default",
  title: "Aksel",

  projectId: "hnbe3yhs",
  dataset: "development",

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
});

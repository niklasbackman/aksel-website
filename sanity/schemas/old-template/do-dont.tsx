export default {
  title: "Do / Dont",
  name: "do_dont",
  type: "object",
  fields: [
    {
      title: "Tittel (vises bare internt i sanity)",
      name: "title",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("Do/dont må ha en enkel tittel"),
    },
    {
      type: "array",
      name: "blocks",
      title: "Do / donts",
      description: "Liste med do/donts",
      of: [{ type: "do_dont_block" }],
      validation: (Rule) =>
        Rule.required().error("Do/dont må ha noen do eller donts lagt til"),
    },
  ],
};

export const doDont = {
  title: "DoDont",
  name: "do_dont_block",
  type: "object",
  fields: [
    {
      title: "Fullwidth",
      description: "Tar opp ~ 40% eller 100% av tilgjengelig bredde",
      name: "fullwidth",
      type: "boolean",
      validation: (Rule) => Rule.required(),
      initialValue: false,
    },
    {
      title: "Bilde",
      name: "picture",
      type: "image",
      validation: (Rule) =>
        Rule.required().error("Do/dont må ha et bilde lagt til"),
      options: {
        hotspot: true,
      },
    },
    {
      title: "alt tekst for bilde",
      name: "alt",
      type: "string",
      validation: (Rule) => Rule.required().error("Do/dont må ha en alt-tekst"),
      options: {
        isHighlighted: true,
      },
    },
    {
      name: "description",
      title: "Fritekst",
      description:
        "Korte konsise beskrivelser. Bruk fullbredde bilde i dodont med egen tekst for lengre forklaringer",
      type: "text",
    },
    {
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Do", value: "do" },
          { title: "Dont", value: "dont" },
          { title: "Warning", value: "warning" },
        ],
        layout: "radio",
      },
      initialValue: "do",
      validation: (Rule) => Rule.required(),
    },
  ],
};

/*



*/

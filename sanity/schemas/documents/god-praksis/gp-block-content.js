import React from "react";
import { Warning, SuccessStroke, ExternalLink } from "@navikt/ds-icons";
import { styles, TitleRenderer } from "../../block-content";
import { allDocumentTypes } from "../../../config";

export default {
  title: "Block Content",
  name: "gp_blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        ...styles,
        {
          title: "Tittel <h2/>",
          value: "h2",
          blockEditor: {
            render: (props) => TitleRenderer(props, "medium", "2"),
          },
        },
        {
          title: "Tittel <h3/>",
          value: "h3",
          blockEditor: {
            render: (props) => TitleRenderer(props, "small", "3"),
          },
        },
        {
          title: "Tittel <h4/>",
          value: "heading4",
          blockEditor: {
            render: (props) => TitleRenderer(props, "xsmall", "4"),
          },
        },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          {
            title: "Code",
            value: "code",
            blockEditor: {
              render: (props) => (
                <code style={{ color: "#BA3A26" }}>{props.children}</code>
              ),
            },
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "Link til side i sanity",
            name: "internalLink",
            type: "object",
            blockEditor: {
              icon: () => <ExternalLink />,
            },
            fields: [
              {
                title: "Reference",
                name: "reference",
                type: "reference",
                to: [
                  ...allDocumentTypes.map((doc) => ({
                    type: doc,
                  })),
                ],
              },
            ],
          },
          {
            title: "External link",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
              {
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
              },
            ],
          },
        ],
      },
    },
    {
      type: "picture",
    },
    {
      type: "picture_text",
    },
    {
      type: "alert",
      icon: () => <Warning />,
    },
    {
      type: "figma_embed",
    },
    { type: "code_snippet", icon: () => <span>{`< />`}</span> },
    {
      type: "do_dont",
      icon: () => <SuccessStroke />,
    },
  ],
};

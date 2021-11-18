import React from "react";
import { Tag } from "@navikt/ds-react";
import { Edit } from "@navikt/ds-icons";

export function defaultPreview() {
  return {
    preview: {
      select: {
        title: "heading",
        status: "status",
        metadata: "metadata",
        id: "_id",
      },
      prepare(selection) {
        const { title, status, metadata, id } = selection;
        console.log(id);
        return {
          title: title,
          subtitle: id.includes("drafts.") ? "Draft" : "Publisert",
          media: id.includes("drafts.") ? (
            <Edit />
          ) : (
            <Tag
              size="small"
              variant="success"
              style={{ color: "black", padding: "0 1px" }}
            >
              Live
            </Tag>
          ),
          /* media: id.includes("drafts.") && console.log(title) ? "Draft" : "Publisert" */

          /* (
            <Tag
              size="small"
              variant={
                status === "published"
                  ? "success"
                  : status === "beta"
                  ? "info"
                  : "warning"
              }

              style={{ color: "black", padding: "0 1px" }}
            >
              {status === "published"
                ? "live"
                : status === "legacy"
                ? "dep"
                : status}
            </Tag> */
        };
      },
    },
  };
}

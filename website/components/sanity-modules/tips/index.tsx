import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { SectionContext } from "@/utils";
import { Edit, LightBulb } from "@navikt/ds-icons";
import { Detail, Link } from "@navikt/ds-react";
import cl from "classnames";
import React, { useContext } from "react";
import { withErrorBoundary } from "@/error-boundary";
import style from "./tips.module.css";

const Tips = ({ node }: { node: SanityT.Schema.tips }): JSX.Element => {
  const context = useContext(SectionContext);

  if (!node || !node.body) {
    return null;
  }

  if (node.eksperiment) {
    return (
      <div
        className={cl(
          style.tips,
          "relative-child linear max-w-2xl rounded-r border-l-[6px] border-l-green-200 bg-white px-4 py-4 shadow-small xs:px-8",
          {
            "my-8": context.withinSection,
            "my-16": !context.withinSection,
          }
        )}
      >
        <Detail
          className="flex items-center gap-1 font-semibold uppercase text-text-muted"
          spacing
        >
          <svg
            focusable="false"
            className="text-2xl"
            aria-label="tips"
            aria-hidden
            height="1em"
            width="1em"
            viewBox="0 0 24 24"
          >
            <path
              d="M13 6h-2v5.33L6 18h12l-5-6.67z"
              className="fill-green-200/30"
            ></path>
            <path
              className="fill-green-300"
              d="M20.8 18.4 15 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H8.04c-.42 0-.65.48-.39.81L9 6.5v4.17L3.2 18.4c-.49.66-.02 1.6.8 1.6h16c.82 0 1.29-.94.8-1.6zM6 18l5-6.67V6h2v5.33L18 18H6z"
            ></path>
          </svg>{" "}
          Hjelp ønskes
        </Detail>
        <SanityBlockContent blocks={node.body} noLastMargin />
        <Link
          as="button"
          className="svg-color-reset mt-3 flex w-fit gap-2 text-text"
          onClick={() => {
            const el = document.getElementById("feedback-forbedringer-button");
            if (el) {
              el?.focus?.();
              el?.click?.();
            }
          }}
        >
          Send feedback
          <Edit
            aria-hidden
            aria-label="send inn feedback"
            className="text-base"
          />
        </Link>
      </div>
    );
  }

  return (
    <div
      className={cl(
        style.tips,
        "relative-child linear max-w-2xl rounded-r border-l-[6px] border-l-gray-500 px-4 py-4 shadow-small xs:px-8",
        {
          "my-8": context.withinSection,
          "my-16": !context.withinSection,
        }
      )}
    >
      <Detail
        className="flex items-center gap-1 font-semibold text-text-muted"
        spacing
      >
        <LightBulb className="text-large" aria-label="tips" aria-hidden /> TIPS
      </Detail>
      <SanityBlockContent blocks={node.body} noLastMargin />
    </div>
  );
};

export default withErrorBoundary(Tips, "Tips");

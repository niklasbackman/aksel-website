import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import cl from "classnames";
import NextLink from "next/link";
import React from "react";
import { logNav } from "@/components";
import { RelatertInnhold as RelatertInnholdT } from "@/lib";
import { withErrorBoundary } from "@/error-boundary";

const RelatertInnhold = ({ node }: { node: RelatertInnholdT }): JSX.Element => {
  if (!node || node?.lenker?.length === 0) {
    return null;
  }

  const getHref = (x: any): string =>
    x?.intern ? `/${x.intern_lenke}` : x.ekstern_link;

  const getTag = (x: any): string => new URL(x.ekstern_link).hostname;

  return (
    <div
      className={cl(
        "relatedCard",
        "relative-child mb-16 gap-4",
        "grid w-full xs:grid-cols-2"
      )}
    >
      {node.lenker.map((x) => (
        <div
          key={x._key}
          className="algolia-ignore-index group relative cursor-pointer rounded border-2 border-transparent bg-white p-6 shadow-medium focus-within:border-focus focus-within:outline-none hover:border-link"
        >
          <NextLink href={getHref(x)} passHref>
            <Heading
              size="xsmall"
              as="a"
              onClick={(e) =>
                logNav(
                  "relatert-innhold",
                  window.location.pathname,
                  e.currentTarget.getAttribute("href")
                )
              }
              className="underline after:absolute after:inset-0 focus:text-link focus:outline-none group-hover:text-link group-hover:no-underline group-focus:no-underline"
            >
              {x.title}
            </Heading>
          </NextLink>
          <BodyShort
            size="small"
            className={cl("mt-2 text-text-muted", {
              "pb-7": x.tags !== "none" || x.ekstern_domene,
            })}
          >
            {x.description}
          </BodyShort>

          {(x.tags !== "none" || x.ekstern_domene) && (
            <Detail className="absolute bottom-6 mt-6 flex items-center gap-2 self-end break-words font-semibold uppercase text-text-muted">
              {x.ekstern_domene ? <>{getTag(x)}</> : x.tag}
            </Detail>
          )}
        </div>
      ))}
    </div>
  );
};

export default withErrorBoundary(RelatertInnhold, "RelatertInnhold");

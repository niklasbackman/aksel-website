import { getTemaSlug } from "@/lib";
import { BodyShort, Heading } from "@navikt/ds-react";
import NextLink from "next/link";
import { logNav } from "../..";
import { SanityT } from "@/lib";

export const ArtikkelCard = ({
  slug,
  source,
  heading,
  ingress,
}: Partial<
  (SanityT.Schema.aksel_artikkel | SanityT.Schema.aksel_blogg) & {
    slug: string;
    tema: string[];
    source: string;
  }
>) => {
  return (
    <NextLink
      href={{
        pathname: `/${slug}`,
        query: {
          tema: getTemaSlug(source),
        },
      }}
      passHref
    >
      <a
        onClick={(e) =>
          logNav(
            "artikkel-kort",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          )
        }
        className="group rounded bg-white px-4 py-4 shadow hover:ring-2 hover:ring-blue-500 focus:shadow-focus focus:outline-none md:py-5 md:px-6"
      >
        <Heading
          level="2"
          size="medium"
          className="hidden group-hover:underline md:block"
        >
          {heading}
        </Heading>
        <Heading level="2" size="small" className="block md:hidden">
          {heading}
        </Heading>
        {ingress && <BodyShort className="mt-1">{ingress}</BodyShort>}
      </a>
    </NextLink>
  );
};

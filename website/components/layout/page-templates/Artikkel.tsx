import { BodyShort, Heading, useClientLayoutEffect } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import {
  dateStr,
  Feedback,
  slugger,
  TableOfContents,
  UnderArbeid,
} from "../..";
import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";

const ArtikkelTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.ds_artikkel;
  title: string;
}): JSX.Element => {
  useClientLayoutEffect(() => {
    slugger.reset();
  });

  if (!data.innhold || !data.heading) {
    return null;
  }

  return (
    <>
      <Head>
        {data.heading && (
          <>
            <title>{`${data.heading} - ${title}`}</title>
            <meta property="og:title" content={`${data.heading} - ${title}`} />
          </>
        )}
      </Head>
      <div className="content-box">
        <div className="pt-8 pb-6">
          <Heading
            size="xlarge"
            level="1"
            spacing
            className="algolia-index-lvl1"
          >
            {data.heading}
          </Heading>

          <BodyShort
            size="small"
            as="span"
            className="flex items-center text-text-muted"
          >
            {`Oppdatert ${dateStr(data._updatedAt)}`}
          </BodyShort>
        </div>
      </div>
      <div className="relative flex max-w-full md:max-w-7xl">
        <TableOfContents changedState={data.innhold} />
        <div className="content-box">
          {data?.under_arbeid?.status ? (
            <UnderArbeid
              className="mt-12"
              text={data?.under_arbeid?.forklaring}
            />
          ) : (
            <SanityBlockContent className="mt-12" blocks={data.innhold} />
          )}
          <Feedback docId={data?._id} docType={data?._type} />
        </div>
      </div>
    </>
  );
};

export default ArtikkelTemplate;

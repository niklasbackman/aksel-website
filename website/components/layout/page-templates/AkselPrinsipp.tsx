import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyShort, Heading, Ingress } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import { dateStr, Feedback, UnderArbeid } from "../..";
import Footer from "../footer/Footer";
import AkselHeader from "../header/AkselHeader";

const AkselPrinsippTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_prinsipp;
  title: string;
}): JSX.Element => {
  if (!data.innhold || !data.heading) {
    return null;
  }

  const authors = (data?.contributors as any)?.map((x) => x?.title);

  return (
    <>
      <Head>
        <title>{`${data?.heading} - Prinsipp - ${title}`}</title>
        <meta property="og:title" content={`${data?.heading} - ${title}`} />
        <meta property="og:description" content={data?.ingress} />
        <meta property="og:type" content="article" />
      </Head>

      <AkselHeader variant="artikkel" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel bg-gray-50 pt-[8vw] pb-16 focus:outline-none xs:pb-32"
      >
        <div className="px-4">
          <div className="mx-auto max-w-prose xs:w-[90%]">
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 mt-1"
            >
              {data.heading}
            </Heading>
            {data?.ingress && (
              <Ingress className="mt-4">{data?.ingress}</Ingress>
            )}
            <div className="mt-6">
              <BodyShort size="small" as="address" className="not-italic">
                {authors?.[0] ?? ""}
              </BodyShort>
              <BodyShort size="small" as="span" className="text-text-muted">
                {dateStr(data._createdAt)}
              </BodyShort>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="mt-8 px-4">
            {data?.under_arbeid?.status ? (
              <UnderArbeid text={data?.under_arbeid?.forklaring} />
            ) : (
              <SanityBlockContent
                className="mx-auto max-w-prose xs:w-[90%]"
                blocks={data?.innhold ?? []}
                variant="aksel"
              />
            )}
          </div>
        </div>
        <div className="mt-16 px-4">
          <div className="mx-auto max-w-prose border-t border-gray-300 pt-8 xs:w-[90%]">
            <Feedback akselFeedback docId={data?._id} docType={data?._type} />
          </div>
        </div>
      </main>
      <Footer variant="aksel" />
    </>
  );
};

export default AkselPrinsippTemplate;

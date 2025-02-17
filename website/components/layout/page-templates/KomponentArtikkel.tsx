import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { ExternalLink } from "@navikt/ds-icons";
import { BodyShort, Heading, Tabs, Tag } from "@navikt/ds-react";
import cl from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  capitalize,
  dateStr,
  Feedback,
  logNav,
  slugger,
  TableOfContents,
  UnderArbeid,
} from "../..";

const KomponentArtikkelTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.komponent_artikkel;
  title: string;
}): JSX.Element => {
  const { query, push } = useRouter();

  const tabs = {
    bruk: "content_bruk",
    kode: "content_kode",
  };

  useEffect(() => {
    slugger.reset();
  });

  const basePath = `/designsystem/komponenter/${query.slug[1]}`;
  const activeTab = Object.keys(tabs).indexOf(query.slug?.[2] ?? "bruk");
  const tabKey = Object.keys(tabs)?.[activeTab];

  const npmPackage = data.linked_package as unknown as {
    title: string;
    github_link?: string;
    status: string;
  };

  return (
    <>
      <Head>
        <title>
          {data?.heading ? `${data?.heading} ${tabKey} - ${title}` : title}
        </title>
        <meta
          property="og:title"
          content={`${data.heading} - Designsystemet`}
        />
      </Head>

      <div className="content-box">
        <div className="py-8">
          <div className="flex flex-wrap gap-2"></div>
          <Heading
            size="xlarge"
            level="1"
            spacing
            className="algolia-index-lvl1 flex flex-wrap items-center gap-4"
          >
            {data.heading}
            {npmPackage?.title && (
              <Tag
                variant="info"
                size="small"
                className="border-transparent bg-gray-100 font-mono"
              >
                {npmPackage.title}
              </Tag>
            )}
          </Heading>
          <BodyShort
            as="div"
            size="small"
            className="mb-4 flex flex-wrap items-center justify-start gap-x-4 gap-y-3"
          >
            {npmPackage?.status && npmPackage.status !== "live" && (
              <Tag
                variant="info"
                size="small"
                className={cl("border-none capitalize", {
                  "bg-orange-400 capitalize text-text":
                    npmPackage.status === "alpha",
                  "bg-purple-400 text-text-inverted":
                    npmPackage.status === "beta",
                })}
              >
                {npmPackage.status}
              </Tag>
            )}
            <BodyShort
              size="small"
              as="span"
              className="flex items-center text-text-muted"
            >
              {`Oppdatert ${dateStr(data._updatedAt)}`}
            </BodyShort>
          </BodyShort>
          <BodyShort
            as="span"
            size="small"
            className="flex gap-4 text-text-muted"
          >
            {npmPackage?.title && (
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://yarnpkg.com/package/${npmPackage.title}`}
                className="flex items-center gap-1 underline hover:text-text hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
              >
                Yarn
                <ExternalLink aria-label="Gå til yarn pakke" />
              </a>
            )}
            {npmPackage?.github_link && (
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={npmPackage.github_link}
                className="flex items-center gap-1 underline hover:text-text hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
              >
                Kode
                <ExternalLink aria-label="Gå til github-kode" />
              </a>
            )}
            {data.figma_link && (
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={data.figma_link}
                className="flex items-center gap-1 underline hover:text-text hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
              >
                Figma
                <ExternalLink aria-label="Åpne i Figma" />
              </a>
            )}
          </BodyShort>
        </div>
      </div>
      <Tabs
        className="top-0 z-[1001]"
        value={tabKey}
        onChange={(x) => {
          const url = x === "bruk" ? basePath : `${basePath}/${x}`;
          push(url, undefined, { shallow: true });
          logNav("tabs", window.location.pathname, url);
        }}
      >
        <Tabs.List className="mx-0 px-2 md:mx-12 md:px-0">
          {Object.entries(tabs)
            .filter(([, val]) => !!data[val])
            .map(([key]) => (
              <Tabs.Tab
                as="button"
                key={key}
                value={key}
                label={capitalize(key)}
              />
            ))}
        </Tabs.List>
        {Object.entries(tabs)
          .filter(([, val]) => !!data[val])
          .map(([key, val]) => (
            <Tabs.Panel
              className="tabpanel relative max-w-full md:max-w-7xl"
              key={key + val}
              value={key}
            >
              <TableOfContents changedState={data[val]} />
              <div className="content-box">
                {data?.under_arbeid?.status ? (
                  <UnderArbeid
                    className="mt-12"
                    text={data?.under_arbeid?.forklaring}
                  />
                ) : (
                  <>
                    {data[val] && (
                      <SanityBlockContent
                        className="mt-12"
                        blocks={data[val]}
                      />
                    )}
                  </>
                )}
                <Feedback docId={data?._id} docType={data?._type} />
              </div>
            </Tabs.Panel>
          ))}
      </Tabs>
      <style jsx global>{`
        .tabpanel[data-state="active"] {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default KomponentArtikkelTemplate;

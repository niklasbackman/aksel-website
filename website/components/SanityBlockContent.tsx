import { BodyLong, Detail, Heading, Ingress, Link } from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import NextLink from "next/link";
import React, { createContext, useContext } from "react";
import cl from "classnames";
import {
  Alert,
  CodeExample,
  DoDont,
  Image,
  LevelTwoHeading,
  Sandbox,
  Snippet,
  Tips,
  IntroKomponent,
  RelatertInnhold,
  Anatomi,
  LiveDemo,
  UuSeksjon,
  GeneriskSeskjon,
  DoDontv2,
  Bilde,
  Kode,
  Tabell,
  AccordionV2,
  InstallasjonSeksjon,
  PropsSeksjon,
  SpesialSeksjon,
  Video,
  TokensSeksjon,
  PropTable,
} from ".";
import { ExternalLink } from "@navikt/ds-icons";

export const InlineCode = (props: React.HTMLAttributes<HTMLElement>) => (
  <code className="inline-code" {...props} />
);

export const KBD = (props: React.HTMLAttributes<HTMLElement>) => (
  <kbd className="inline-kbd" {...props} />
);

const serializers = {
  types: {
    /* V2 content structure */
    intro_komponent: ({ node }) => <IntroKomponent node={node} />,
    relatert_innhold: ({ node }) => <RelatertInnhold node={node} />,
    anatomi: ({ node }) => <Anatomi node={node} />,
    live_demo: ({ node }) => <LiveDemo node={node} />,
    uu_seksjon: ({ node }) => <UuSeksjon node={node} />,
    generisk_seksjon: ({ node }) => <GeneriskSeskjon node={node} />,
    riktekst_blokk: ({ node }) => <SanityBlockContent blocks={node.body} />,
    do_dont_v2: ({ node }) => <DoDontv2 node={node} />,
    bilde: ({ node }) => <Bilde node={node} />,
    alert_v2: ({ node }) => <Alert node={node} />,
    kode: ({ node }) => <Kode node={node} />,
    tabell: ({ node }) => <Tabell node={node} />,
    accordion_v2: ({ node }) => <AccordionV2 node={node} />,
    installasjon_seksjon: ({ node }) => <InstallasjonSeksjon node={node} />,
    props_seksjon: ({ node }) => <PropsSeksjon node={node} />,
    spesial_seksjon: ({ node }) => <SpesialSeksjon node={node} />,
    video: ({ node }) => <Video node={node} />,
    tokens: ({ node }) => <TokensSeksjon node={node} />,
    tips: ({ node }) => <Tips node={node} />,

    /* General page modules */
    ds_code_sandbox: ({ node }) => <Sandbox node={node} />,
    code_snippet: ({ node }) => <Snippet node={node} />,
    ds_code_example: ({ node }) => <CodeExample node={node} />,
    code_example_ref: ({ node }) => <CodeExample node={node.ref} />,
    prop_table: ({ node }) =>
      node?.komponenter?.length > 0 ? (
        <>
          {node.komponenter.map((prop) => (
            <PropTable komponent={prop as unknown as any} key={prop?._key} />
          ))}
        </>
      ) : null,
    do_dont: ({ node }) => <DoDont node={node} />,
    picture: ({ node }) => <Image node={node} />,

    block: ({ node, children }) => {
      const context: BlockContextT = useContext(BlockContext);
      const style = node.style;
      if (children && children.length === 1 && children[0] === "") return null;

      const textProps = { children };

      switch (style) {
        case "normal":
          return (
            <BodyLong
              size={context.size}
              spacing
              {...textProps}
              className={cl("algolia-index-body", {
                "last:mb-0": context.noLastMargin,
              })}
            />
          );

        case "detail":
          return (
            <Detail
              spacing
              size="small"
              {...textProps}
              className="algolia-index-detail"
            />
          );
        case "h2":
          return <LevelTwoHeading {...textProps} />;
        case "h3":
          return (
            <Heading
              {...textProps}
              className="algolia-index-lvl3 max-w-text"
              spacing
              level="3"
              size="medium"
            />
          );
        case "heading4":
          return (
            <Heading
              className="algolia-index-lvl4 max-w-text"
              spacing
              level="4"
              size="small"
              {...textProps}
            />
          );
        case "h4":
          return (
            <Heading
              className="algolia-index-lvl4 max-w-text"
              spacing
              level="4"
              size="small"
              {...textProps}
            />
          );
        case "ingress":
          return (
            <Ingress spacing className="algolia-index-ingress max-w-text">
              {children}
            </Ingress>
          );
        default:
          return (
            <BodyLong
              size={context.size}
              spacing
              {...textProps}
              className="algolia-index-body max-w-text"
            />
          );
      }
    },
  },
  list: (props: any) => {
    const context: BlockContextT = useContext(BlockContext);
    if (props?.type == "number") {
      return (
        <ol
          type="1"
          className={cl("aksel-list list-margin mb-7 max-w-text list-decimal", {
            "last:mb-0": context.noLastMargin,
          })}
        >
          {props.children}
        </ol>
      );
    }
    return (
      <ul
        className={cl("aksel-list list-margin mb-7 max-w-text list-disc", {
          "last:mb-0": context.noLastMargin,
        })}
      >
        {props.children}
      </ul>
    );
  },
  listItem: (props: any) => {
    return (
      <li className="ml-5 mb-1 max-w-[calc(theme(spacing.text)_-_1em)]">
        {props.children}
      </li>
    );
  },
  marks: {
    draft_only: () => null,
    kbd: (props) => <KBD>{props.children}</KBD>,
    code: (props) => <InlineCode>{props.children}</InlineCode>,
    link: ({ mark: { blank, href }, children }: { mark: any; children: any }) =>
      blank ? (
        <Link
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="break-normal"
        >
          {children} <ExternalLink title="åpner lenken i ny fane" />
        </Link>
      ) : (
        <NextLink href={href} passHref>
          <Link className="break-normal">{children}</Link>
        </NextLink>
      ),
    internalLink: ({ mark, children }: { mark: any; children: any }) => {
      const { slug = {} } = mark;
      if (!slug || !slug.current) return children;

      const href = `/${slug?.current}`;
      return (
        <NextLink href={href} passHref>
          <Link>{children}</Link>
        </NextLink>
      );
    },
  },
};

export type BlockContextT = {
  size: "medium" | "small";
  noLastMargin: boolean;
  variant: "ds" | "aksel";
};

export const BlockContext = createContext<BlockContextT>({
  size: "medium",
  noLastMargin: false,
  variant: "ds",
});

export const SanityBlockContent = ({
  blocks,
  size = "medium",
  noLastMargin = false,
  variant,
  ...rest
}: {
  blocks: any;
  size?: "medium" | "small";
  className?: string;
  noLastMargin?: boolean;
  variant?: "ds" | "aksel";
}) => {
  const context = useContext(BlockContext);

  return (
    <BlockContext.Provider
      value={{
        size,
        noLastMargin,
        variant: variant ?? context?.variant ?? "ds",
      }}
    >
      <BlockContent
        blocks={blocks ?? []}
        serializers={serializers}
        options={{ size: "small" }}
        className="aksel-artikkel__child"
        renderContainerOnSingleChild
        {...rest}
      />
    </BlockContext.Provider>
  );
};

import { BodyLong, Detail, Heading, Ingress, Link } from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import NextLink from "next/link";
import React, { createContext, useContext } from "react";
import cl from "classnames";
import {
  Alert,
  CodeExample,
  ColorCategory,
  DoDont,
  IconSearch,
  Image,
  ImageWithText,
  LevelTwoHeading,
  LinkPanel,
  PropTable,
  Sandbox,
  Snippet,
  Spacing,
  RelatedPagesCards,
  Table,
  Tips,
  Accordion,
  ComponentOverview,
  Changelog,
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
} from ".";

import * as Icons from "@navikt/ds-icons";
import * as Tokens from "@navikt/ds-tokens/dist/tokens";

export const InlineCode = (props: React.HTMLAttributes<HTMLElement>) => (
  <code
    className="text-mono rounded-md bg-deepblue-50 py-[2px] px-2 text-medium text-deepblue-500"
    {...props}
  />
);

export const KBD = (props: React.HTMLAttributes<HTMLElement>) => (
  <kbd
    className={cl(
      "my-0 mx-1 inline-block min-w-[2rem] rounded border-2 border-gray-900 bg-white py-1 px-2 text-center text-medium text-text shadow-[2px_2px_0_0_var(--navds-global-color-gray-800)]",
      "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
    )}
    {...props}
  />
);

export const DsIconAnnotation = {
  ds_icon: ({ mark }: { mark: { color?: string; name?: string } }) => {
    if (!mark.name) {
      return null;
    }

    const Ic = Icons?.[mark.name];
    const tokenColor = mark.color ? Tokens[mark.color] : "currentColor";

    return Ic ? (
      <Ic color={tokenColor} aria-hidden className="inline-block" />
    ) : null;
  },
};

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

    /* Unique page modules */
    ds_component_overview: ({ node }) => <ComponentOverview node={node} />,
    icon_search: () => <IconSearch />,
    changelogs_ref: ({ node }) => <Changelog node={node} />,

    /* General page modules */
    related_pages: ({ node }) => <RelatedPagesCards node={node} />,
    ds_code_sandbox: ({ node }) => <Sandbox node={node} />,
    code_snippet: ({ node }) => <Snippet node={node} />,
    ds_code_example: ({ node }) => <CodeExample node={node} />,
    code_example_ref: ({ node }) => <CodeExample node={node.ref} />,
    color_category_ref: ({ node }) => <ColorCategory node={node.ref} />,
    prop_table: ({ node }) => <PropTable node={node} />,
    do_dont: ({ node }) => <DoDont node={node} />,
    picture: ({ node }) => <Image node={node} />,
    picture_text: ({ node }) => <ImageWithText node={node} />,
    accordion: ({ node }) => <Accordion node={node} />,
    alert: ({ node }) => <Alert node={node} />,
    tips: ({ node }) => <Tips node={node} />,
    link_panel: ({ node }) => <LinkPanel node={node} />,
    spacing: ({ node }) => <Spacing node={node} />,
    table: ({ node }) => <Table node={node} />,
    accordion_v2: ({ node }) => <AccordionV2 node={node} />,
    installasjon_seksjon: ({ node }) => <InstallasjonSeksjon node={node} />,
    props_seksjon: ({ node }) => <PropsSeksjon node={node} />,
    spesial_seksjon: ({ node }) => <SpesialSeksjon node={node} />,

    block: ({ node, children }) => {
      const context: BlockContextT = useContext(BlockContext);
      const style = node.style;
      if (children && children.length === 1 && children[0] === "") return null;

      const textProps = { children };

      switch (style) {
        case "normal":
          if (context.isIngress) {
            return <Ingress {...textProps} className="index-ingress" />;
          }

          return (
            <BodyLong
              size={context.size}
              spacing
              {...textProps}
              className={cl("index-body", {
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
              className="index-detail"
            />
          );
        case "h2":
          return <LevelTwoHeading {...textProps} />;
        case "h3":
          return (
            <Heading
              {...textProps}
              className="index-lvl3"
              spacing
              level="3"
              size="medium"
            />
          );
        case "heading4":
          return (
            <Heading
              className="index-lvl4"
              spacing
              level="4"
              size="small"
              {...textProps}
            />
          );
        case "h4":
          return (
            <Heading
              className="index-lvl4 mt-9"
              spacing
              level="4"
              size="small"
              {...textProps}
            />
          );
        case "ingress":
          return (
            <Ingress spacing className="index-ingress">
              {children}
            </Ingress>
          );
        default:
          return (
            <BodyLong
              size={context.size}
              spacing
              {...textProps}
              className="index-body"
            />
          );
      }
    },
  },
  list: (props: any) => {
    if (props?.type == "number") {
      return (
        <ol type="1" className="list-margin mb-7 list-decimal">
          {props.children}
        </ol>
      );
    }
    return <ul className="list-margin mb-7 list-disc">{props.children}</ul>;
  },
  listItem: (props: any) => {
    return (
      <li className="ml-5 max-w-[calc(var(--text-max-width)_-_1em)]">
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
        <Link href={href} target="_blank" rel="noreferrer noopener">
          {children} (åpner lenken i ny fane)
        </Link>
      ) : (
        <NextLink href={href} passHref>
          <Link>{children}</Link>
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
    ...DsIconAnnotation,
  },
};

export type BlockContextT = {
  size: "medium" | "small";
  isIngress: boolean;
  noLastMargin: boolean;
};

export const BlockContext = createContext<BlockContextT>({
  size: "medium",
  isIngress: false,
  noLastMargin: false,
});

export const SanityBlockContent = ({
  blocks,
  size = "medium",
  isIngress = false,
  noLastMargin = false,
  ...rest
}: {
  blocks: any;
  size?: "medium" | "small";
  isIngress?: boolean;
  className?: string;
  noLastMargin?: boolean;
}) => (
  <BlockContext.Provider value={{ size, isIngress, noLastMargin }}>
    <BlockContent
      blocks={blocks ?? []}
      serializers={serializers}
      options={{ size: "small" }}
      renderContainerOnSingleChild
      {...rest}
    />
  </BlockContext.Provider>
);

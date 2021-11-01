import "@navikt/ds-css";
import { BodyLong, Detail, Heading, Ingress, Link } from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import NextjsLink from "next/link";
import React, { createContext, useContext } from "react";
import styled from "styled-components";
import {
  Alert,
  CodeExample,
  DoDont,
  Figma,
  IconSearch,
  Image,
  ImageWithText,
  LevelTwoHeading,
  LinkPanel,
  PropTable,
  Snippet,
  UuInteraction,
} from ".";

export const StyledCode = styled.code`
  color: var(--navds-color-gray-80);
  background-color: var(--navds-color-gray-10);
  border-radius: 2px;
  font-size: 1rem;
  padding: 0 4px;
`;

const StyledKbd = styled.code`
  display: inline-block;
  margin: 0 var(--navds-spacing-1);
  color: var(--navds-color-darkgray);
  border: 1px solid var(--navds-color-gray-40);
  border-radius: 3px;
  padding: 0.1rem 0.25rem;
  font-family: var(--font-family-code);
  font-size: 1rem;
`;

const serializers = {
  types: {
    icon_search: () => <IconSearch />,
    code_snippet: ({ node }) => <Snippet node={node} />,
    code_example_ref: ({ node }) => <CodeExample node={node.ref} />,
    prop_table: ({ node }) => <PropTable node={node} />,
    do_dont: ({ node }) => <DoDont node={node} />,
    uu_interaction: ({ node }) => <UuInteraction node={node} />,
    picture: ({ node }) => <Image node={node} />,
    picture_text: ({ node }) => <ImageWithText node={node} />,
    figma_embed: ({ node }) => <Figma node={node} />,
    alert: ({ node }) => <Alert node={node} />,
    link_panel: ({ node }) => <LinkPanel node={node} />,

    block: ({ node, children }) => {
      const context: BlockContextT = useContext(BlockContext);
      const style = node.style;

      switch (style) {
        case "normal":
          return (
            <>
              {context.isIngress ? (
                <Ingress>{children}</Ingress>
              ) : (
                <BodyLong size={context.size} spacing>
                  {children}
                </BodyLong>
              )}
            </>
          );
        case "detail":
          return (
            <Detail spacing size="small">
              {children}
            </Detail>
          );
        case "h2": {
          return <LevelTwoHeading>{children}</LevelTwoHeading>;
        }
        case "h3":
          return (
            <Heading spacing level="3" size="medium">
              {children}
            </Heading>
          );
        case "h4":
          return (
            <Heading spacing level="4" size="medium">
              {children}
            </Heading>
          );
        case "ingress":
          return <Ingress spacing>{children}</Ingress>;
        default:
          return children;
      }
    },
  },
  marks: {
    kbd: (props: any) => {
      return <StyledKbd>{props.children}</StyledKbd>;
    },
    code: (props: any) => {
      return <StyledCode>{props.children}</StyledCode>;
    },
    link: ({ mark, children }: { mark: any; children: any }) => {
      const { blank, href } = mark;

      return blank ? (
        <Link href={href} target="_blank" rel="noreferrer noopener">
          {children}
        </Link>
      ) : (
        <Link href={href}>{children}</Link>
      );
    },
    internalLink: ({ mark, children }: { mark: any; children: any }) => {
      const { slug = {} } = mark;
      if (!slug || !slug.current) return children;

      const href = `/${slug?.current}`;
      return (
        <NextjsLink href={href} passHref>
          <Link>{children}</Link>
        </NextjsLink>
      );
    },
  },
};

const MarginTopDiv = styled.div`
  margin-top: 3rem;
`;

export type BlockContextT = {
  size: "medium" | "small";
  isIngress: boolean;
};

export const BlockContext = createContext<BlockContextT>({
  size: "medium",
  isIngress: false,
});

export const SanityBlockContent = ({
  blocks,
  withMargin = false,
  size = "medium",
  isIngress = false,
}: {
  blocks: any;
  withMargin?: boolean;
  size?: "medium" | "small";
  isIngress?: boolean;
}): JSX.Element => {
  return (
    <>
      <BlockContext.Provider value={{ size, isIngress }}>
        {withMargin ? (
          <MarginTopDiv>
            <BlockContent
              blocks={blocks}
              serializers={serializers}
              size="small"
            />
          </MarginTopDiv>
        ) : (
          <BlockContent
            blocks={blocks}
            serializers={serializers}
            options={{ size: "small" }}
          />
        )}
      </BlockContext.Provider>
    </>
  );
};

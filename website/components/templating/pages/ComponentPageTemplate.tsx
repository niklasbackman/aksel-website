import React, { useLayoutEffect, useState } from "react";
import {
  Ingress,
  Title,
  Link,
  Header,
  ContentContainer,
} from "@navikt/ds-react";

import { useRouter } from "next/router";
import styled from "styled-components";
import { Tab, Tabs } from "../../Tabs";
import { SanityBlockContent } from "../SanityBlockContent";
import LastUpdated from "../../LastUpdated";
import StatusTag from "../../StatusTag";
import FigmaIcon from "../../assets/FigmaIcon";
import GithubIcon from "../../assets/GithubIcon";
import TableOfContents from "../../TableOfContents";
import Heading from "../layout/Heading";
import Sidebar from "../layout/Sidebar";
/* import * as NextLink from "next/link"; */

const Wrapper = styled.div`
  display: flex;
  margin-top: 56px;
  @media (max-width: 1068px) {
    display: block;
  }
`;

const MainContent = styled.div`
  flex-direction: column;
  width: 100%;
  position: relative;
  background-color: #f7f7f7;
  background-color: #f9f9f9;
  background-color: #fafafa;
`;

const SanityContent = styled.div`
  position: relative;
`;

const MaxW = styled.div`
  max-width: 700px;
  margin: 0;
  margin-right: auto;
  margin-left: var(--navds-spacing-8);
  padding: var(--navds-spacing-8);
`;

const Links = styled.div`
  display: flex;
  column-gap: 1rem;
  margin-left: var(--navds-spacing-4);
  a {
    text-decoration: none;
    color: var(--navds-color-darkgray);
    :hover {
      text-decoration: underline;
    }
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding-bottom: var(--navds-spacing-6);
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--navds-spacing-2);
  justify-content: space-between;
`;

const Inline = styled.span`
  display: inline-flex;
  column-gap: var(--navds-spacing-3);
  flex-wrap: wrap;
`;

const ComponentPageTemplate = ({ data }) => {
  const { query } = useRouter();

  const [toc, setToc] = useState([]);

  // TODO: Extract to custom hook?
  useLayoutEffect(() => {
    const tags = document.getElementsByTagName("h2");
    if (!tags) return;
    const toc = [];
    for (let item of tags) {
      toc.push({ heading: item.textContent, id: item.id });
    }
    setToc([...toc]);
  }, [query.slug]);

  const basePath = `/designsystem/${(query.slug as string[])
    .slice(0, 2)
    .join("/")}`;

  const tabs = {
    bruk: "usage",
    utvikling: "development",
    design: "design",
    tilgjengelighet: "accessibility",
  };

  const activeTab = query.slug[2] ?? "bruk";

  return (
    <>
      <Heading />
      <Wrapper>
        <Sidebar />

        <MainContent>
          <MaxW>
            <HeaderWrapper>
              <Title size="2xl" level={1} spacing>
                {data.heading}
              </Title>
              <StyledDiv>
                <Inline>
                  <StatusTag status={data.status} />
                  <LastUpdated date={data._updatedAt} />
                </Inline>
                <Links>
                  {data.npm_link && <Link href={data.npm_link}>NPM</Link>}
                  <Link href={data.github_link}>
                    Github <GithubIcon />
                  </Link>
                  <Link href={data.figma_link}>
                    Figma <FigmaIcon />
                  </Link>
                </Links>
              </StyledDiv>
            </HeaderWrapper>

            <Ingress spacing>{data.ingress}</Ingress>
          </MaxW>

          <Tabs>
            {Object.entries(tabs).map(
              ([key, value]) =>
                data[value] && (
                  <Tab
                    key={key}
                    path={`${basePath}${key === "bruk" ? "" : "/" + key}`}
                  >
                    {/* TODO: Fungerer UU her? Tar mye mindre plass en Tilgjengelighet for mobilvisning */}
                    {key === "tilgjengelighet" ? "UU" : key}
                  </Tab>
                )
            )}
          </Tabs>
          <SanityContent>
            <TableOfContents toc={toc} />
            <MaxW>
              <SanityBlockContent blocks={data[tabs[activeTab]]} />
            </MaxW>
          </SanityContent>
        </MainContent>
      </Wrapper>
    </>
  );
};

export default ComponentPageTemplate;

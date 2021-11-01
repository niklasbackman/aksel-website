import { NewTab } from "@navikt/ds-icons";
import React, { useContext } from "react";
import { CodeContext } from "./Example";
import * as S from "../code.styles";
import styled from "styled-components";
import CopyButton from "../CopyButton";

export const ScTabs = styled.div`
  background-color: #f7f7f7;
  padding: 1px;
  min-height: 50px;

  display: flex;
  justify-content: space-between;
  border: 1px solid var(--navds-color-gray-20);

  ul,
  li {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const ScFlex = styled.div`
  display: flex;
`;

const ScLinkButton = styled.a`
  ${S.ButtonCss}
  text-decoration: none;
  color: var(--navds-color-gray-90);

  :hover {
    outline: 2px solid var(--navds-color-gray-90);
    outline-offset: -2px;
  }

  :focus {
    text-decoration: underline;
  }
`;

export const ScButton = styled.button`
  ${S.ButtonCss}
`;

const CodeTabs = (): JSX.Element => {
  const { node, tabs, showPreview, activeTab, setActiveTab, fullscreenLink } =
    useContext(CodeContext);

  return (
    <>
      <ScTabs>
        <ul role="tablist">
          {showPreview && (
            <li role="presentation">
              <ScButton
                role="tab"
                className="navds-body-short navds-body--small"
                onClick={() => setActiveTab(-1)}
                aria-selected={activeTab === -1}
              >
                {"Preview"}
              </ScButton>
            </li>
          )}
          {tabs.map((tab, i) => (
            <li key={tab.content.toString()} role="presentation">
              <ScButton
                role="tab"
                className="navds-body-short navds-body--small"
                onClick={() =>
                  i === activeTab
                    ? setActiveTab(showPreview ? -1 : 0)
                    : setActiveTab(i)
                }
                aria-selected={i === activeTab}
              >
                {tab.name}
              </ScButton>
            </li>
          ))}
        </ul>

        <ScFlex>
          {activeTab !== -1 && (
            <CopyButton content={tabs[activeTab].content.toString()} inTabs />
          )}
          {showPreview && fullscreenLink && activeTab === -1 && (
            <ScLinkButton target="_blank" href={fullscreenLink}>
              <span className="sr-only">Åpne eksempel i ny tab</span>
              <NewTab focusable="false" role="presentation" />
            </ScLinkButton>
          )}
          {node.github && (
            <ScLinkButton
              className="navds-body-short navds-body--s"
              href={node.github}
            >
              Github
            </ScLinkButton>
          )}
        </ScFlex>
      </ScTabs>
    </>
  );
};

export default CodeTabs;

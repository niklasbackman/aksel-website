import { Add, Refresh, SettingsFilled } from "@navikt/ds-icons";
import { Label } from "@navikt/ds-react";
import React, { useContext } from "react";
import styled from "styled-components";
import { SandboxContext } from ".";
import { ScTabCss } from "./PropsPanel";

const ScTabs = styled.div`
  background-color: var(--navds-semantic-color-canvas-background-light);
  padding: 1px;
  min-height: 50px;

  display: flex;
  justify-content: space-between;
  border: 1px solid var(--navds-semantic-color-divider);
  align-items: center;

  ul,
  li {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  svg {
    font-size: 1.5rem;
  }
`;

const ScTabButton = styled.button`
  ${ScTabCss}
`;

const ScLabel = styled(Label)`
  padding: 0 1rem;
`;

const ScFlex = styled.div`
  display: flex;
`;

const Tabs = ({ reset }: { reset: () => void }) => {
  const { sandboxState, setSandboxState } = useContext(SandboxContext);

  const hideProps =
    !sandboxState.args ||
    ((!sandboxState.args.props ||
      Object.keys(sandboxState.args.props).length === 0) &&
      !sandboxState.args.variants);

  return (
    <ScTabs>
      <ScLabel>Sandkasse</ScLabel>
      <ScFlex>
        <ScTabButton onClick={() => reset()}>
          <span className="sr-only">Reset sandbox</span>
          <Refresh />
        </ScTabButton>
        <ScTabButton
          onClick={() =>
            setSandboxState({
              ...sandboxState,
              fullscreen: !sandboxState.fullscreen,
            })
          }
        >
          <span className="sr-only">
            {sandboxState.fullscreen
              ? "Lukk fullskjerm"
              : "Åpne sandbox i fullskjerm"}
          </span>
          <Add />
        </ScTabButton>
        {!hideProps && !sandboxState.inlineSettings && (
          <ScTabButton
            onClick={() =>
              setSandboxState({
                ...sandboxState,
                openSettings: !sandboxState.openSettings,
              })
            }
          >
            <span className="sr-only">Åpne props-panel</span>
            <SettingsFilled />
          </ScTabButton>
        )}
      </ScFlex>
    </ScTabs>
  );
};

export default Tabs;

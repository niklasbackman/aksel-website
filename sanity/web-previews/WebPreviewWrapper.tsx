import styled from "styled-components";
import React from "react";
import { HelpText, Button, Detail, Link } from "@navikt/ds-react";
import { CopyToClipboard } from "@navikt/ds-react-internal";
import { ExternalLink, Refresh } from "@navikt/ds-icons";

const StyledDiv = styled.div`
  iframe {
    height: 100%;
    width: 100%;
  }
  height: 100%;
  width: 100%;
`;

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
`;

const ScTop = styled.div`
  padding: 0.25rem 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--card-shadow-outline-color);
`;

export const WebPreviewWrapper = (props: { url: string; dev?: boolean }) => {
  const reloadIframe = () => {
    const el: HTMLIFrameElement | null =
      document &&
      (document.getElementById("preview-iframe") as HTMLIFrameElement);
    if (el) {
      el.src = el.src;
    }
  };

  return (
    <StyledWrapper>
      <ScTop>
        <Detail size="small" style={{ overflowX: "auto" }}>
          {props.url}
        </Detail>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {props.dev && (
            <Link href="https://doc.nais.io/device/">Krever NAISDevice</Link>
          )}
          <HelpText title="Hva er preview?">
            Preview prøver å vise innhold på den publiserte nettsiden. Dette er
            en litt skjør prosess som lett brekker, så kan forvente litt bugs og
            rare feil. Sjekk om du har noen feil i sanity først hvis preview
            brekker. Hvis disse feilene dukker opp for publisert versjon, ta
            kontakt med utvikler.
          </HelpText>
          <CopyToClipboard
            size="small"
            popoverText={"Kopierte lenke"}
            copyText={props.url}
          />
          <Button size="small" onClick={() => reloadIframe()}>
            <Refresh />
          </Button>
          <Button
            as="a"
            target="_blank"
            href={props.url}
            size="small"
            aria-label="opens preview in web"
          >
            <ExternalLink />
          </Button>
        </div>
      </ScTop>
      <StyledDiv>
        <iframe id="preview-iframe" src={props.url} frameBorder={0} />
      </StyledDiv>
    </StyledWrapper>
  );
};

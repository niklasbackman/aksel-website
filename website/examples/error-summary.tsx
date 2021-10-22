import React from "react";
import { ErrorSummary } from "@navikt/ds-react";

export const ErrorSummaryExample = () => (
  <>
    <ErrorSummary heading="Du må fikse disse feilene før du kan sende inn søknad.">
      <ErrorSummary.Item href="#1">
        Felt må fylles ut med alder
      </ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummary.Item>
    </ErrorSummary>
  </>
);

ErrorSummaryExample.react = `<ErrorSummary heading="Du må fikse disse feilene før du kan sende inn søknad.">
<ErrorSummary.Item href="#1">Felt må fylles ut med alder</ErrorSummary.Item>
<ErrorSummary.Item href="#2">
  Tekstfeltet må ha en godkjent e-mail
</ErrorSummary.Item>
</ErrorSummary>`;

export const ErrorSummarySmall = () => (
  <>
    <ErrorSummary
      size="small"
      heading="Du må fikse disse feilene før du kan sende inn søknad."
    >
      <ErrorSummary.Item href="#1">
        Felt må fylles ut med alder
      </ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummary.Item>
    </ErrorSummary>
  </>
);

ErrorSummarySmall.react = `<ErrorSummary size="small" heading="Du må fikse disse feilene før du kan sende inn søknad.">
<ErrorSummary.Item href="#1">Felt må fylles ut med alder</ErrorSummary.Item>
<ErrorSummary.Item href="#2">
  Tekstfeltet må ha en godkjent e-mail
</ErrorSummary.Item>
</ErrorSummary>`;

export const ErrorSummaryWithCustomHeading = () => (
  <>
    <ErrorSummary
      headingTag="h3"
      heading="Du må fikse disse feilene før du kan sende inn søknad."
    >
      <ErrorSummary.Item href="#1">
        Felt må fylles ut med alder
      </ErrorSummary.Item>
      <ErrorSummary.Item href="#2">
        Tekstfeltet må ha en godkjent e-mail
      </ErrorSummary.Item>
    </ErrorSummary>
  </>
);

ErrorSummaryWithCustomHeading.react = `<ErrorSummary headingTag="h3" heading="Du må fikse disse feilene før du kan sende inn søknad.">
<ErrorSummary.Item href="#1">Felt må fylles ut med alder</ErrorSummary.Item>
<ErrorSummary.Item href="#2">
  Tekstfeltet må ha en godkjent e-mail
</ErrorSummary.Item>
</ErrorSummary>`;

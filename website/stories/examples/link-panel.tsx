import React from "react";
import { LinkPanel } from "@navikt/ds-react";
import { ExampleComponent, BgColors } from "../../lib/types/types";

export const LinkPanelExample: ExampleComponent = () => (
  <>
    <LinkPanel href="#">
      <LinkPanel.Title>
        Jeg er selvstendig næringsdrivende eller frilanser
      </LinkPanel.Title>
    </LinkPanel>
  </>
);

LinkPanelExample.react = `<LinkPanel href="#">
<LinkPanel.Title>
  Jeg er selvstendig næringsdrivende eller frilanser
</LinkPanel.Title>
</LinkPanel>`;

export const LinkPanelMedDescription: ExampleComponent = () => (
  <>
    <LinkPanel href="#">
      <LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>
      <LinkPanel.Description>
        Om jobb, registrering, CV, dagpenger og feriepenger av dagpenger
      </LinkPanel.Description>
    </LinkPanel>
  </>
);

LinkPanelMedDescription.react = `<LinkPanel href="#">
<LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>
<LinkPanel.Description>
  Om jobb, registrering, CV, dagpenger og feriepenger av dagpenger
</LinkPanel.Description>
</LinkPanel>`;

export const LinkPanelUtenBorder: ExampleComponent = () => (
  <>
    <LinkPanel href="#" border={false}>
      <LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>
    </LinkPanel>
  </>
);

LinkPanelUtenBorder.react = `<LinkPanel href="#" border={false}>
<LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>
</LinkPanel>`;
LinkPanelUtenBorder.bg = BgColors.DEFAULT;

export const LinkPanelMedIllustrasjon: ExampleComponent = () => (
  <>
    <LinkPanel href="#">
      <div
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gap: "var(--navds-spacing-8)",
          alignItems: "center",
        }}
      >
        {Illustration}
        <div>
          <LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>
          <LinkPanel.Description>
            Om jobb, registrering, CV, dagpenger og feriepenger av dagpenger
          </LinkPanel.Description>
        </div>
      </div>
    </LinkPanel>
  </>
);

LinkPanelMedIllustrasjon.react = `<LinkPanel href="#">
<div
  style={{
    display: "grid",
    gridAutoFlow: "column",
    gap: "var(--navds-spacing-8)",
    alignItems: "center",
  }}
>
  {Illustration}
  <div>
    <LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>
    <LinkPanel.Description>
      Om jobb, registrering, CV, dagpenger og feriepenger av dagpenger
    </LinkPanel.Description>
  </div>
</div>
</LinkPanel>`;

const Illustration = (
  <>
    <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110">
      <defs>
        <path id="a" d="M.686.654h4.399v5.852H.686z"></path>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="transparent" d="M-287-1518H993V543H-287z"></path>
        <rect
          width="796"
          height="181"
          fill="transparent"
          rx="8"
          transform="translate(-45 -36)"
        ></rect>
        <circle cx="55" cy="55" r="55" fill="#CCDEE6"></circle>
        <g fill="#D8D8D8">
          <path
            fill="#337C9B"
            d="M32.034 5.834l-11.606 3.11-9.517 2.55-4.637 1.242 1.284 4.794 9.069 33.843 1.284 4.795 4.637-1.243 9.518-2.55 11.605-3.11c2.561-.686 4.063-3.389 3.353-6.037L37.956 9.385c-.71-2.648-3.361-4.238-5.922-3.551"
          ></path>
          <path
            fill="#38363A"
            d="M38.322 51.833l1.77-.474-12.12-45.233-1.77.474z"
          ></path>
          <path
            fill="#CE2128"
            d="M26.593 57.996l-1.179-.613-.713 1.12-.93-3.47 1.892-.507z"
          ></path>
        </g>
        <path
          fill="#FFF"
          d="M61.773 69.14l8.95 38.112a2.524 2.524 0 0 0 3.036 1.881l32.913-7.745a2.528 2.528 0 0 0 1.88-3.04L98.279 54.591a2.526 2.526 0 0 0-3.037-1.883L68.425 59.02l-6.652 10.12z"
        ></path>
        <path
          fill="#C0C0BE"
          d="M68.425 59.02l1.326 5.645a2.527 2.527 0 0 1-1.88 3.038l-6.098 1.436 6.652-10.12z"
        ></path>
        <path
          stroke="#8E9294"
          strokeLinecap="round"
          strokeWidth="2.152"
          d="M68.902 74.197l11.982-2.82m-10.721 8.19l24.874-5.853M71.424 84.937l24.873-5.853"
        ></path>
        <path
          stroke="#8E9294"
          strokeLinecap="round"
          strokeWidth="2.264"
          d="M72.685 90.307l24.873-5.854M73.857 95.297l24.873-5.853M75.021 100.7l24.874-5.853"
        ></path>
        <path
          fill="#CCDEE6"
          d="M21.698 86.68c-5.726-3.643-7.42-11.243-3.78-16.976 3.64-5.733 11.231-7.427 16.958-3.784 5.727 3.643 7.42 11.243 3.78 16.976-3.639 5.733-11.231 7.427-16.958 3.784z"
        ></path>
        <path
          fill="#C42B34"
          d="M9.283 106.905a2.772 2.772 0 0 1-.851-3.823l8.759-13.798a2.765 2.765 0 0 1 3.817-.852 2.77 2.77 0 0 1 .851 3.822l-8.758 13.799a2.764 2.764 0 0 1-3.818.852"
        ></path>
        <path
          fill="#2E3137"
          d="M19.032 90.912c-.86-.547-1.348-1.318-.801-2.179l1.826-2.877a1.841 1.841 0 0 1 2.546-.567 1.847 1.847 0 0 1 .566 2.547l-1.826 2.878c-.547.86-1.452.744-2.31.198"
        ></path>
        <path
          fill="#D84B55"
          d="M16.41 91l-8.266 13.021a.925.925 0 0 0 .283 1.275.92.92 0 0 0 1.272-.284l7.912-12.463c-.713-.47-1.083-1.039-1.2-1.549"
        ></path>
        <path
          fill="#2E3137"
          d="M27.811 87.523a11.115 11.115 0 0 1-1.117-.196 11.283 11.283 0 0 1-3.577-1.48c-5.295-3.369-6.866-10.423-3.502-15.723 3.366-5.301 10.412-6.874 15.709-3.504 5.296 3.368 6.866 10.422 3.5 15.723a11.317 11.317 0 0 1-2.86 3.053 11.4 11.4 0 0 1-4.72 2.029c-1.127.203-2.284.24-3.433.098m12.57-4.19c3.911-6.16 2.085-14.358-4.069-18.271-6.154-3.915-14.342-2.089-18.253 4.072-3.91 6.16-2.085 14.356 4.07 18.271 6.153 3.915 14.343 2.09 18.252-4.072"
        ></path>
        <path
          fill="#FFD399"
          d="M93.445 12.554c2.45 5.367.088 11.707-5.274 14.159-5.361 2.452-11.695.088-14.145-5.279-2.449-5.368-.088-11.707 5.275-14.16 5.361-2.452 11.695-.088 14.144 5.28"
        ></path>
        <path
          fill="#FFD399"
          d="M91.45 28.239l-4.274 1.954a2.697 2.697 0 0 1-3.574-1.334l-2.775-6.08a2.7 2.7 0 0 1 1.333-3.578l4.274-1.955a2.696 2.696 0 0 1 3.575 1.334l2.775 6.08a2.702 2.702 0 0 1-1.333 3.579"
        ></path>
        <path
          fill="#5A5C5D"
          d="M94.1 30.6l-6.9 3.156a1.255 1.255 0 0 1-1.043-2.284l6.902-3.155a1.253 1.253 0 1 1 1.04 2.282m1.275 2.794l-6.9 3.156a1.254 1.254 0 1 1-1.041-2.283l6.9-3.156a1.254 1.254 0 0 1 1.041 2.283m-1.682 1.387l-3.044 1.392c-.458.21-.4.889.09 1.006.685.164 1.425.11 2.115-.207a3.25 3.25 0 0 0 1.54-1.464c.233-.449-.241-.936-.701-.727"
        ></path>
        <g transform="rotate(-69 92.268 -44.056)">
          <mask id="b" fill="#fff">
            <use xlinkHref="#a"></use>
          </mask>
          <path
            fill="#C42B34"
            d="M.732 4.08l.397-1.844a1.999 1.999 0 1 1 3.91.842l-.396 1.846A2 2 0 1 1 .732 4.08"
            mask="url(#b)"
          ></path>
        </g>
        <path
          fill="#E1CFB4"
          d="M86.458 79.011l-1.334 7.43 6.268-4.21-2.12-2.355z"
        ></path>
        <path
          fill="#FECB86"
          d="M103.266 56.87l-1.644-1.073-14.841 22.72 1.643 1.072z"
        ></path>
        <path
          fill="#FAA736"
          d="M104.912 57.945l-1.644-1.074-14.841 22.72 1.644 1.073z"
        ></path>
        <path
          fill="#FECB86"
          d="M90.071 80.664l1.644 1.072 14.842-22.72-1.645-1.072zm-3.306-.951c.31.203.774-.055 1.188.215a.513.513 0 0 1 .152.15l.32-.488-1.644-1.073-.297.453s-.028.542.281.743"
        ></path>
        <path
          fill="#FAA736"
          d="M88.106 80.078c.205.277.111.67.548.956.44.286.764.042 1.098.118l.32-.488-1.648-1.075-.318.489z"
        ></path>
        <path
          fill="#FECB86"
          d="M89.752 81.152a.507.507 0 0 1 .198.08c.414.27.365.797.675 1 .311.204.794-.041.794-.041l.296-.454-1.644-1.073-.32.488z"
        ></path>
        <path
          fill="#535756"
          d="M85.123 86.44l2.22-1.488-1.749-1.14zm21.434-27.423l-4.935-3.22.437-.67 4.935 3.22z"
        ></path>
      </g>
    </svg>
  </>
);

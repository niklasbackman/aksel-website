import { Loader } from "@navikt/ds-react";
import Error from "next/error";
import Head from "next/head";
import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AmplitudeProvider, useScrollToHashOnPageLoad } from "../components";
import LayoutProvider from "../components/layout/LayoutProvider";
import "../styles/index.css";

const ScLoader = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

type PagePropsContextT = {
  pageProps: any;
  setPageData: React.Dispatch<any>;
};

export const PagePropsContext = createContext<PagePropsContextT>(null);

function App({
  Component,
  pageProps,
  router,
}: {
  Component: any;
  pageProps: any;
  router: any;
}): JSX.Element {
  const [pageData, setPageData] = useState(null);

  useScrollToHashOnPageLoad();

  useEffect(() => {
    setPageData(pageProps);
  }, [pageProps]);

  if (Component && router?.asPath.startsWith("/examples")) {
    return <Component {...pageProps} />;
  }

  if (
    !pageProps?.slug ||
    (!pageProps.validPath && pageProps.isDraft && !router.query.preview) ||
    (!pageProps.validPath && !pageProps.isDraft)
  ) {
    return <Error statusCode={404} />;
  }

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content={router.asPath.split("?")[0]} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <AmplitudeProvider>
        <PagePropsContext.Provider value={{ pageProps: pageData, setPageData }}>
          <LayoutProvider>
            {getLayout(
              <>
                <Component {...pageProps} />
                {router.query.preview && !pageData.page && (
                  <ScLoader>
                    <Loader
                      title="Laster inn innhold for preview"
                      size="2xlarge"
                    />
                    Laster inn innhold for preview...
                  </ScLoader>
                )}
              </>
            )}
          </LayoutProvider>
        </PagePropsContext.Provider>
      </AmplitudeProvider>
    </>
  );
}

export default App;

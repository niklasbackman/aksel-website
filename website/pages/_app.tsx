import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AmplitudeProvider,
  PagePropsContext,
  useScrollToHashOnPageLoad,
} from "../components";
import LayoutProvider from "../components/layout/LayoutProvider";
import "../styles/index.css";
import NotFound from "./404";

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

  /* Used for nextjs issue-demo */
  const demoRouter = useRouter();
  useEffect(() => {
    demoRouter.beforePopState(({ url, as }) => {
      console.log(JSON.stringify({ url, as }, null, 2));
      return true;
    });
  }, []);

  useEffect(() => {
    setPageData(pageProps);
  }, [pageProps]);

  if (
    Component &&
    ["/examples", "/sandboxes"].some((path) => router?.asPath.startsWith(path))
  ) {
    return <Component {...pageProps} />;
  }

  const getLayout = Component.getLayout ?? ((page) => page);

  const notFound =
    !pageProps?.slug ||
    (!pageProps.validPath && pageProps.isDraft && !pageProps.preview) ||
    (!pageProps.validPath && !pageProps.isDraft);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content={router.asPath.split("?")[0]} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <PagePropsContext.Provider value={{ pageProps: pageData, setPageData }}>
        <AmplitudeProvider>
          <LayoutProvider>
            {notFound ? (
              <NotFound />
            ) : (
              getLayout(
                <>
                  <Component {...pageProps} />
                </>
              )
            )}
          </LayoutProvider>
        </AmplitudeProvider>
      </PagePropsContext.Provider>
    </>
  );
}

export default App;

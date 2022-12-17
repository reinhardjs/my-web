import Head from "next/head";
import Format from "../layout/format";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  console.log(pageProps.metaTags);
  return (
    <>
      <Head>
        <script
          async={true}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3292440827260317"
          crossOrigin="anonymous"
        ></script>
        <meta
          data-rh="true"
          name="author"
          content="Reinhard Jonathan Silalahi"
        />
        <meta
          data-rh="true"
          name="robots"
          content="index,follow,max-image-preview:large"
        />
        <meta data-rh="true" name="referrer" content="unsafe-url" />

        {pageProps.metaTags && (
          <meta data-rh="true" property="og:type" content="article" />
        )}
        <meta
          data-rh="true"
          property="article:author"
          content={
            `Reinhard Jonathan Silalahi | ` + pageProps.metaTags?.host
          }
        />
        <meta
          data-rh="true"
          property="og:url"
          content={pageProps.metaTags?.resolvedUrl}
        />
        <meta
          data-rh="true"
          property="al:web:url"
          content={pageProps.metaTags?.resolvedUrl}
        />
        <meta
          data-rh="true"
          property="og:title"
          content={pageProps.metaTags?.articleTitle}
        />
        <meta
          data-rh="true"
          property="og:description"
          content={pageProps.metaTags?.articleDescription}
        />
        <meta
          data-rh="true"
          name="title"
          content={pageProps.metaTags?.articleTitle}
        />
        <meta
          data-rh="true"
          name="description"
          content={pageProps.metaTags?.articleDescription}
        />
        <meta
          data-rh="true"
          property="og:image"
          content={pageProps.metaTags?.firstArticleImage}
        ></meta>
      </Head>
      <Format>
        <Component {...pageProps} />
      </Format>
    </>
  );
}

export default MyApp;

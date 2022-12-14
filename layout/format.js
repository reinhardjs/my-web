import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";
import Script from "next/script";

export default function format({ children }) {
  return (
    <>
      <Head>
        <title>reinhardjs</title>
      </Head>
      <Header></Header>
      <main>{children}</main>
      {/* <Footer></Footer> */}
    </>
  );
}

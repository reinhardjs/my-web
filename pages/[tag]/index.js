import Head from "next/head";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

import ErrorComponent from "../../components/_child/error";
import Spinner from "../../components/_child/spinner";
import fetcher from "../../lib/fetcher";

export default function Page({ fallback }) {
  const router = useRouter();
  const { tag } = router.query;

  if (!tag) return undefined;

  const response = fetcher(`${tag}`);

  return (
    <SWRConfig value={{ fallback }}>
      <Article tag={tag} {...response}></Article>
    </SWRConfig>
  );
}

function Article({ data, isLoading, isError, tag, content, detail }) {
  const renderContent = () => {
    if (isLoading) return <Spinner></Spinner>;
    if (isError) return <ErrorComponent></ErrorComponent>;

    return (
      <>
        <p>List of posts with tag {tag}</p>
      </>
    );
  };

  const renderTag = (tag) => {
    if (!tag) return "";

    const tagSplits = tag.split("-");

    return tagSplits
      .map((element) => {
        return element.charAt(0).toUpperCase() + element.slice(1);
      })
      .join(" ");
  };

  return (
    <>
      <Head>
        <title>{renderTag(tag)}</title>
      </Head>
      {renderContent()}
    </>
  );
}

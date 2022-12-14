import fetcher from "../../lib/fetcher";
import Spinner from "../../components/_child/spinner";
import ErrorComponent from "../../components/_child/error";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
// import { SWRConfig } from "swr";

export default function Page() {
  const router = useRouter();
  const { postUrl, tag } = router.query;
  const { data, isLoading, isError } = fetcher(`posts/${postUrl}`);

  console.log(data);

  if (isLoading) return <Spinner></Spinner>;
  if (isError) return <ErrorComponent></ErrorComponent>;

  return <Article {...data.data}></Article>;
}

function Article({ content }) {
  return (
    <>
      <section className="container py-4 max-w-4xl md:mx-auto">
        <div className="post px-8">
          {/* <h1 className="font-bold text-4xl text-center pb-5">This is title</h1> */}
          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            <ReactMarkdown>{content || "No Description"}</ReactMarkdown>
          </div>
        </div>
      </section>
    </>
  );
}

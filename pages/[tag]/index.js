import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

import ErrorComponent from "../../components/_child/error";
import Spinner from "../../components/_child/spinner";
import fetcher from "../../lib/fetcher";

export default function Page() {
  const router = useRouter();
  const { tag } = router.query;

  const response = fetcher(`${tag}`);

  if (!response.data || !tag) return undefined;

  return <PostList tag={tag} {...response}></PostList>;
}

function PostList({ data, isLoading, isError, tag }) {
  const renderTag = (tag) => {
    if (!tag) return "";

    const tagSplits = tag.split("-");

    return tagSplits
      .map((element) => {
        return element.charAt(0).toUpperCase() + element.slice(1);
      })
      .join(" ");
  };

  const renderContent = () => {
    if (isLoading) return <Spinner></Spinner>;
    if (isError) return <ErrorComponent></ErrorComponent>;

    return (
      <section className="container mx-auto md:px-20">
        <h1 className="font-bold text-4xl py-12 text-center">
          {renderTag(tag)}
        </h1>

        {/* grid columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {data.data.map((value, index) => (
            <Post data={value} key={index} tag={renderTag(tag)}></Post>
          ))}
        </div>
      </section>
    );
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

function Post({ data, tag }) {
  const { tags, url, title, content } = data;

  var description = content;

  // res: https://codepen.io/kvendrik/pen/bGKeEE
  // escape h
  description = description.replace(/[\#]{6}(.+)/g, "");
  description = description.replace(/[\#]{5}(.+)/g, "");
  description = description.replace(/[\#]{4}(.+)/g, "");
  description = description.replace(/[\#]{3}(.+)/g, "");
  description = description.replace(/[\#]{2}(.+)/g, "");
  description = description.replace(/[\#]{1}(.+)/g, "");

  // escape img
  description = description.replace(/!\[.*?\]\((.*?)\)/g, "");

  // get first paragraph
  description = description.match(/^\s*(\n)?(.+)/gm)[0];

  description = description.substring(0, 123) + "...";

  return (
    <div className="item border-black border-[0.5px] rounded-2xl p-4">
      <div className="images">
        <Link href={`/${tags}/${url}`}>
          <a>
            <img
              alt={""}
              src={content.match(/!\[.*?\]\((.*?)\)/)[1]}
              className="rounded"
              width={500}
              height={350}
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          {/* <Link href={`/${tags}`}>
            <a className="rounded-full bg-gray-100 px-2.5 py-0.5">{tag}</a>
          </Link> */}
          {/* <Link href={`/${tags}/${url}`}>
            <a className="text-gray-800 hover:text-gray-600">
              {"  "}
              {}
            </a>
          </Link> */}
        </div>
        <div className="title">
          <Link href={`/${tags}/${url}`}>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {content
                .match(/^#+\s+.+/)
                .toString()
                .replace("#", "")
                .trim()}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{description}</p>
      </div>
    </div>
  );
}

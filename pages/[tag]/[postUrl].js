import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rangeParser from "parse-numeric-range";

import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import kotlin from "react-syntax-highlighter/dist/cjs/languages/prism/kotlin";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import go from "react-syntax-highlighter/dist/cjs/languages/prism/go";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
//import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
//import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
//import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
//import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";

import { useRouter } from "next/router";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import ErrorComponent from "../../components/_child/error";
import Spinner from "../../components/_child/spinner";
import fetcher from "../../lib/fetcher";
import Head from "next/head";

SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("kotlin", kotlin);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);
// SyntaxHighlighter.registerLanguage("tsx", tsx);
// SyntaxHighlighter.registerLanguage("typescript", typescript);
// SyntaxHighlighter.registerLanguage("scss", scss);
// SyntaxHighlighter.registerLanguage("markdown", markdown);

export default function Page() {
  const router = useRouter();
  const { postUrl, tag } = router.query;

  const { data, isLoading, isError } = fetcher(`posts/${postUrl}`);

  if (isLoading) return <Spinner></Spinner>;
  if (isError) return <ErrorComponent></ErrorComponent>;

  if (!data || !tag) return undefined;

  return <Article {...data.data}></Article>;
}

function LinkRenderer(props) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer noopener">
      {props.children}
    </a>
  );
}

function Article({ content }) {
  const syntaxTheme = oneDark;

  const MarkdownComponents = {
    code({ node, inline, className, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const hasMeta = node?.data?.meta;

      const applyHighlights = (applyHighlights) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, "");
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
            : "0";
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data = highlight.includes(applyHighlights) ? "highlight" : null;
          return { data };
        } else {
          return {};
        }
      };

      return match ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={"bash"}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={false}
          wrapLines={hasMeta ? true : false}
          useInlineStyles={true}
          lineProps={applyHighlights}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      );
    },
    a: LinkRenderer,
  };

  const articleTitle = content
    .match(/^#+\s+.+/)
    .toString()
    .replace("#", "")
    .trim();

  var articleDescription = content;

  // res: https://codepen.io/kvendrik/pen/bGKeEE
  // escape h
  articleDescription = articleDescription.replace(/[\#]{6}(.+)/g, "");
  articleDescription = articleDescription.replace(/[\#]{5}(.+)/g, "");
  articleDescription = articleDescription.replace(/[\#]{4}(.+)/g, "");
  articleDescription = articleDescription.replace(/[\#]{3}(.+)/g, "");
  articleDescription = articleDescription.replace(/[\#]{2}(.+)/g, "");
  articleDescription = articleDescription.replace(/[\#]{1}(.+)/g, "");

  // escape img
  articleDescription = articleDescription.replace(/!\[.*?\]\((.*?)\)/g, "");

  // get first paragraph
  articleDescription = articleDescription.match(/^\s*(\n)?(.+)/gm)[0];

  articleDescription = articleDescription.substring(0, 123).trim() + "...";

  const firstArticleImage = content.match(/!\[.*?\]\((.*?)\)/)[1];

  return (
    <>
      <Head>
        <meta
          data-rh="true"
          property="article:author"
          content={window.location.hostname}
        />
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
        <meta data-rh="true" property="og:type" content="article" />
        <meta data-rh="true" property="og:url" content={window.location.href} />
        <meta
          data-rh="true"
          property="al:web:url"
          content={window.location.href}
        />

        <meta data-rh="true" property="og:title" content={articleTitle} />
        <meta
          data-rh="true"
          property="og:description"
          content={articleDescription}
        />

        <meta data-rh="true" name="title" content={articleTitle} />
        <meta data-rh="true" name="description" content={articleDescription} />

        <meta
          data-rh="true"
          property="og:image"
          content={firstArticleImage}
        ></meta>

        <title>{articleTitle}</title>
      </Head>
      <section className="container -mt-2 md:mt-0 py-4 max-w-4xl md:mx-auto mb-24">
        <div className="post px-8">
          {/* <h1 className="font-bold text-4xl text-center pb-5">This is title</h1> */}
          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            <ReactMarkdown
              components={MarkdownComponents}
              remarkPlugins={[remarkGfm]}
            >
              {content || ""}
            </ReactMarkdown>
          </div>
        </div>
      </section>
    </>
  );
}

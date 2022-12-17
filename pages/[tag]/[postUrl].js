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
  console.log({ props });
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
  return (
    <>
      <section className="container py-4 max-w-4xl md:mx-auto mb-24">
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

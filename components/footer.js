import { ImLinkedin, ImTwitter, ImYoutube } from "react-icons/im";
import Link from "next/link";

export default function footer() {
  return (
    <footer className="bg-gray-50">
      <div className="container mx-auto flex justify-center py-4">
        <div className="py-5">
          <div className="flex gap-6 justify-center">
            <Link href={"https://www.linkedin.com/in/reinhardjsilalahi/"}>
              <a>
                <ImLinkedin color="#888888" />
              </a>
            </Link>
            <Link href={"https://twitter.com/reinhard_js"}>
              <a>
                <ImTwitter color="#888888" />
              </a>
            </Link>
            <Link href={"https://youtube.com/@reinhardjs"}>
              <a>
                <ImYoutube color="#888888" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

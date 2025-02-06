import { ImTwitter, ImYoutube, ImLinkedin } from "react-icons/im";
import Link from "next/link";
import Image from "next/image";

export default function header() {
  return (
    <header className="bg-gray-50 border-b border-gray-100">
      <div className="max-w-5xl mx-auto flex items-center flex-row justify-between text-center py-4 px-6">
        <div>
          <Link href={"/"}>
            <a>
              <Image width={35} height={35} src={"/logo.png"} alt={"Logo"} />
            </a>
          </Link>
          {/* <input type="text" className="input-text"  placeholder="Search..."/> */}
        </div>
        <div className="shrink w-80 sm:order-2"></div>
        <div className="order-3 flex justify-center">
          <div className="flex gap-6">
            <Link href={"https://www.linkedin.com/in/reinhardjsilalahi/"}>
              <a className="hover:text-gray-900 transition-colors">
                <ImLinkedin color="#888888" />
              </a>
            </Link>
            <Link href={"https://twitter.com/reinhard_js"}>
              <a className="hover:text-gray-900 transition-colors">
                <ImTwitter color="#888888" />
              </a>
            </Link>
            <Link href={"https://youtube.com/@sumaven"}>
              <a className="hover:text-gray-900 transition-colors">
                <ImYoutube color="#888888" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

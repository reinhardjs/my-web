import Link from "next/link";
import Section1 from "../components/section1";
import Section2 from "../components/section2";
import Section3 from "../components/section3";
import Section4 from "../components/section4";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.main}>
        <h1 className="text-4xl md:text-5xl font-black text-center pt-20 pb-12">
          Hi! {"I'm"} Reinhard Jonathan Silalahi
        </h1>

        <div className="max-w-3xl">
          <div className="text-center text-lg md:text-xl mt-0 pb-8">
            <p className="leading-10 pb-4">
              Welcome to my personal blog/journal site. Here you can find topics
              related to backend, kubernetes, android, and so on.
            </p>
            <p className="leading-10">Happy learning!</p>
          </div>
        </div>

        <div className={styles.grid}>
          <Link href="/learn-backend">
            <a className={styles.card}>
              <h2 className="text-lg font-bold mb-2 mt-0">
                Learn Backend &rarr;
              </h2>
              <p className="text-md">
                Here is my journey begins (again), you can find all of my
                backend learning journey here
              </p>
            </a>
          </Link>

          <Link href="/learn-kubernetes">
            <a className={styles.card}>
              <h2 className="text-lg font-bold mb-2 mt-0">
                Learn Kubernetes &rarr;
              </h2>
              <p className="text-md">
                All about deployment, scaling, and management with Kubernetes
              </p>
            </a>
          </Link>

          <Link href="/learn-android">
            <a className={styles.card}>
              <h2 className="text-lg font-bold mb-2 mt-0">
                Learn Android &rarr;
              </h2>
              <p className="text-md">
                Maybe you can find the reason here why i left Android Dev. But
                not so sure, I am still on it as a hobby.
              </p>
            </a>
          </Link>
        </div>
      </div>
      {/* <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4> */}
    </>
  );
}

import Link from "next/link";
import "./style.css";
import Button from "./components/LendingPageButton/button";
import { getServerSession } from "next-auth";

export default async function Home() {

  const session = await getServerSession()
  return (
    <div className="h-screen flex justify-center items-end Container">
      <div className="text-center h-full flex pt-56 w-3/4 justify-start items-center flex-col">
        <h1 className="text-6xl pb-20 text-gray-100">
          <strong>Welcome to NEWS CORE</strong>
        </h1>
        <p className="pl-10 text-xl w-3/4 text-left text-gray-100">
          At NEWS CORE, we're your gateway to the latest, most informative news from around the globe. Dive into a world of breaking headlines, in-depth analysis, and engaging stories. Our mission is to keep you informed, inspired, and connected.{" "}
          <strong>Join us on this journey of discovery and stay ahead with NEWS CORE!</strong>
        </p>
        <div className="flex gap-40 pt-20 w-full justify-center">
          <Link href="/newsfeed" className="bg-gray-100 w-3/12 rounded-md p-3 flex justify-center items-center">
            Browse news
          </Link>
          {!session && <Link href={'/signin'} className="signButton w-3/12 p-3 rounded-md"> Sign in</Link>}
        </div>
      </div>
    </div>
  );
}

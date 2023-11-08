import PostLoader from "@/app/components/NewsLoader/newsLoader";

export default function Loading() {
  return <div className="flex min-h-screen justify-stretch gap-10 p-10 items-center flex-row  flex-wrap"><PostLoader/><PostLoader/><PostLoader/><PostLoader/><PostLoader/><PostLoader/><PostLoader/></div>
}
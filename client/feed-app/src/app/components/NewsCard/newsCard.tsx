
import React from "react"

const NewsCard: React.FC<PreviewNews> = ({ title, pubDate, categories }) => {
  const formatted: any = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(pubDate).toLocaleDateString('en-GB', formatted);

  return (<div className="flex w-full flex-col bg-white p-6  justify-between items-start gap-3 ">
    <div className="text-cyan-800 hidden sm:block border-2 rounded-lg p-0.5 px-1 border-solid whitespace-normal border-cyan-300">{categories}</div>
    <strong className="max-w-2xl text-base sm:text-2xl ">

      {title}
    </strong>

    <p>Publish date:{date}</p>
  </div>)

}



export default NewsCard
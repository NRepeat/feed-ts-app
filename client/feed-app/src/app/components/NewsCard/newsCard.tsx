
import React, { FC, ReactNode, useEffect } from "react"
const NewsCard: React.FC<PreviewNews> = ({ title, pubDate, categories }) => {
  const formatted: any = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(pubDate).toLocaleDateString('en-GB', formatted);

  return (<div className="flex flex-col bg-white p-6  justify-between items-start gap-3 ">
    <div className="text-cyan-800 flex flex-row gap-2 border-2 rounded-lg p-0.5 px-1 border-solid max-w-md border-cyan-300">{categories.join(" ")}</div>
    <strong className=" max-w-md">

      {title}
    </strong>

    <p>Publish date:{date}</p>
  </div>)

}



export default NewsCard
import React from 'react'
const NewsCard: React.FC<PreviewNews> = ({ title, pubDate, categories }) => {

  return (<div><p>{title}{categories}{pubDate}</p></div>)

}



export default NewsCard
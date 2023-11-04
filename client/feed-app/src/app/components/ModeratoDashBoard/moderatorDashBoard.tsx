import React from 'react'
import Link from 'next/link';
import NewsCard from '../NewsCard/newsCard';

async function ModeratorDashBoard({ posts, role }: any) {


  return (
    <div>
      {posts.map((post: any,i:number) => <Link key={i} href={{
        pathname: '/moderator/edit',
        query: { news: post.guid },
      }} > <NewsCard categories={post.categories} pubDate={post.pubDate} title={post.title} /></Link>)}

    </div>
  )
}

export default ModeratorDashBoard
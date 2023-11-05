import React from 'react'
import Link from 'next/link';
import NewsCard from '../NewsCard/newsCard';

async function ModeratorDashBoard({ posts, role }: any) {


  return (
    <div>
      {posts.map((post: any, i: number) => <Link key={i} href={{
        pathname: '/moderator/edit',
        query: { news: post.guid },
      }} > <div className='w-full border-2 p-5 hover:bg-cyan-800'>  <NewsCard categories={post.categories} pubDate={post.pubDate} title={post.title} /></div></Link>)}

    </div>
  )
}

export default ModeratorDashBoard
import React from 'react'
import { postApi } from '../../api/postApi'
import NewsCard from '@/app/components/NewsCard/newsCard'
import Link from 'next/link'



export default async function page() {
  const posts = await postApi  .getAllPosts()
  return (
    <div>
      <ul>
        {posts.data.data.map((post) => {
          const encodedURL = encodeURIComponent(post.guid);
          return <li key={post.guid}>
            <Link href={`/FeedPage/${ encodedURL}`}>
              <NewsCard categories={post.categories} pubDate={post.pubDate} title={post.title} />
            </Link>
          </li>
        })}
      </ul>

    </div>
  )
}

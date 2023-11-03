import { postApi } from '../../../../api/postApi'
import NewsCard from '@/app/components/NewsCard/newsCard'
import Link from 'next/link'
import React from 'react'
import { postApi } from '../../api/postApi'
import SortableList from '@/app/components/SortList/sort';



export default async function page() {
  
  const posts = await postApi.getAllPosts()
  const posts = await postApi.getAllPosts().then((posts) => {
    return posts.data.data.sort((a: Post, b: Post) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    })
  })


  return (
    <div>

      <SortableList data={posts} />
    </div>
  )
}

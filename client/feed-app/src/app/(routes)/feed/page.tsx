
import React, { Suspense } from 'react'
import { postApi } from '@/app/api/postApi';
import SortableList from '@/app/components/SortList/sort';



export default async function page() {

  const posts = await postApi.getAllPosts().then((posts) => {
    return posts.data.data.sort((a: Post, b: Post) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    })
  })


  return (
    <div className=' overflow-x-hidden'>
      <Suspense ><SortableList data={posts} /></Suspense>

    </div>
  )
}

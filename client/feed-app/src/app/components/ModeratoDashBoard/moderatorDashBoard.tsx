import { postApi } from '@/app/api/postApi';
import React from 'react'
import SortableList from '../SortList/sort';
import EditPostS from '../EditPost/editPost';

async function ModeratorDashBoard() {
  const posts = await postApi.getAllPosts().then((posts) => {
    return posts.data.data.sort((a: Post, b: Post) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    })
  })
  const isModerator = true

  return (
    <div>
      <EditPostS posts={posts} />
      {/* <SortableList data={posts} isModerator={isModerator} /> */}
    </div>
  )
}

export default ModeratorDashBoard
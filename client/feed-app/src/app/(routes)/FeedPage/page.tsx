import React from 'react'
import { postApi } from '../../../../api/postApi'

export default function page() {

  async function fetchData() {
    try {
      const posts = await postApi.getAllPosts();
      console.log(posts.data[0].title);
      return posts 
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  const posts = fetchData()

  return (
    <div>page</div>
  )
}

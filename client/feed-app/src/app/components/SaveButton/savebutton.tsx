"use client"

import { postApi } from '@/app/api/postApi'
import { useRouter } from 'next/navigation';
import React from 'react'

interface ISaveButton {

  news: INews

}
interface INews {
  news: {
    post: Post,
    newNews: string,
    newsId: string
  }
}
function SaveButton({ news }: ISaveButton) {
  const router = useRouter();
  const handleSave = async ({ news }: INews) => {
    news.post.contentEncoded = news.newNews
    const newPost = news.post
    const res = await postApi.update(news.newsId, newPost
    )
    if (res) {
      alert("Post updated successfully")
      router.push('/moderator')
    }
    else {
      alert("Post didn't updated ")
    }

  }

  return (
    <button className='h-9 w-full text-white  text-3xl' onClick={() => handleSave(news)}>Save</button>
  )
}

export default SaveButton
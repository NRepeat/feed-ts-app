"use client"

import { postApi } from '@/app/api/postApi'
import { useRouter } from 'next/navigation';
import React from 'react'

function SaveButton({ news }: any) {
  const router = useRouter();
  const handleSave = async (news: any) => {
    news.post.data.data.contentEncoded = news.newNews
    const newPost = news.post.data.data
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
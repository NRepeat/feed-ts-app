"use client"
import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';
import { useSearchParams } from "next/navigation";
import { postApi } from "@/app/api/postApi";
export default function EditPostS() {
  const [news, setNews] = useState('')
  console.log("🚀 ~ file: editPost.tsx:8 ~ EditPostS ~ news:", news)
  const searchParams = useSearchParams()
  const search: any = searchParams.get('news')



  useEffect(() => {
    async function fetchNews() {
      try {
        const news = await postApi.getNews(encodeURIComponent(search))
        setNews(news.data.data.contentEncoded)

      } catch (error) {
        console.log(error)

      }

    }
    fetchNews()
  }, [])
  const handleTitleChange = (e: any) => {
    setNews(e.target.value);

  };
  return (
    <div className='flex'>
      <div className='w-1/2'>
        {parse(news)}
      </div>
      <textarea className='w-1/2 min-h-screen overflow-auto  ' value={news} onChange={handleTitleChange} />
    </div>
  );
}

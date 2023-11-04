"use client"
import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';
import { useSearchParams } from "next/navigation";
import { postApi } from "@/app/api/postApi";
import SaveButton from "../SaveButton/savebutton";

export default function EditPostS() {
  const [news, setNews] = useState('')
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
      <div style={{ height: "93vh" }} className='w-1/2  overflow-auto  p-5' >
        {parse(news)}
      </div>
      <textarea style={{ height: "93vh", maxHeight: "93vh" }} className='w-1/2  overflow-auto  p-5 ' value={news} onChange={handleTitleChange} />

      <div onMouseEnter={() => {
        const group = document.querySelector('.group');
        if (group) {
          group.classList.add('bg-blue-500');
        }
      }}
        onMouseLeave={() => {
          const group = document.querySelector('.group');
          if (group) {
            group.classList.remove('bg-blue-500');
          }
        }
        } className='fixed bottom-0 w-full h-20 flex justify-center items-center bg-black group'>
   
        <SaveButton  news={news}></SaveButton>

      </div>
    </div>
  );
}

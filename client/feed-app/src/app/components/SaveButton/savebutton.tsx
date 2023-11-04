import { postApi } from '@/app/api/postApi'
import React from 'react'

function SaveButton(news:any) {

  const handleSave = async (news: any) => {
    await postApi.update(news)
  }
  return (
    <button  className='h-9 w-full text-white  text-3xl' onClick={()=>handleSave(news)}>Save</button>
  )
}

export default SaveButton
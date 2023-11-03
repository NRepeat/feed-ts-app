"use client"
import { postApi } from '@/app/api/postApi';
import React, { useState } from "react";
import parse, { DOMNode, Element, HTMLReactParserOptions, domToReact } from 'html-react-parser';
export default function EditPostS({ posts }) {
  const [newTitle, setNewTitle] = useState(posts[0].contentEncoded);


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);

  };



  return (
    <div className='flex'>
      <div className='w-1/2'>
        {parse(newTitle)}

      </div>
      <textarea className='w-1/2 min-h-screen overflow-auto  ' type="text" value={newTitle} onChange={handleTitleChange} />
    </div>
  );
}

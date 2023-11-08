import React from 'react';

interface EditButtonsProps {
  openModal: (index: number) => void;
  handleDelete: (pageId: string) => Promise<void>;
  i: number;
  post: Post;
}

function EditButtons({ openModal, handleDelete, i, post }: EditButtonsProps) {
  return (
    <div className='flex pl-2 mt-2 mb-2 flex-row w-full gap-2' key={i + 1}>
      <button
        onClick={() => openModal(i)}
        className='w-1/2 p-3 border-2 hover:text-white hover:bg-cyan-800 hover:border-black border-cyan-800'
      >
        <strong className='text-3xl'>Edit card</strong>
      </button>
      <button
        onClick={() => handleDelete(post.guid)}
        className='w-1/2 border-2 p-3 hover:text-white hover:bg-cyan-800 hover:border-black border-cyan-800'
      >
        <strong className='text-3xl'>Delete card</strong>
      </button>
    </div>
  );
}

export default EditButtons;

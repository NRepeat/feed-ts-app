"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Pagination from '../Pagination/pagination';
import { paginate } from '../SortList/paginatiom';
import NewsCard from '../NewsCard/newsCard';
import { Modal, Box } from '@mui/material';
import { postApi } from '@/app/api/postApi';

function ModeratorDashboard({ posts, role }: any) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [poostData, setPostData] = useState(posts)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const openModal = (index) => {
    setEditedPost({ ...poostData[index] });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setEditedPost({ ...editedPost, [field]: value });
  };

  const saveChanges = async () => {
    await postApi.update(editedPost.guid, editedPost);
    setModalIsOpen(false);

    const updatedPosts = posts.map((post) => {
      if (post.guid === editedPost.guid) {
        return editedPost;
      } else {
        return post;
      }
    });

    setPostData(updatedPosts);
  };


  const saveCurrentPage = (page: number) => {
    localStorage.setItem('currentPage', page.toString());
  };

  const loadCurrentPage = () => {
    const savedPage = localStorage.getItem('currentPage');

    return savedPage ? parseInt(savedPage, 10) : 1;
  };

  useEffect(() => {
    const initialPage = loadCurrentPage();
    setCurrentPage(initialPage);
    setPostData(paginate(posts, currentPage, pageSize))

  }, []);

  useEffect(() => {
    setPostData(paginate(posts, currentPage, pageSize))
  }, [currentPage]);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    saveCurrentPage(page);
  };
  const handleDelete = async (pageId: string) => {
    await postApi.delete(pageId)
    window.location.reload();
  }
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      {poostData.map((post: any, i: number) => (
        <div key={i}>
          <Link href={{ pathname: '/moderator/edit', query: { news: post.guid } }}>
            <div className='flex justify-between w-full border-2 p-5 hover-bg-cyan-800 hover:bg-cyan-800'>
              <NewsCard categories={post.categories} pubDate={post.pubDate} title={post.title} />
            </div>
          </Link>
          <div className='flex pl-2 mt-2 mb-2 flex-row w-full gap-2' key={i + 1}>
            <button onClick={() => openModal(i)} className='w-1/2 p-3 border-2 hover:text-white hover:bg-cyan-800 hover:border-black border-cyan-800'>
              <strong className='text-3xl'>Edit card</strong>
            </button>
            <button onClick={() => handleDelete(post.guid)} className='w-1/2 border-2 p-3 hover:text-white hover:bg-cyan-800 hover:border-black border-cyan-800'>
              <strong className='text-3xl'>Delete card</strong>
            </button>
          </div>
        </div>
      ))}
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "50%" }}>
          <h2 className='text-center text-3xl'> <strong>Edit Fields</strong> </h2>
          <div className='flex flex-col gap-5 pt-5 pb-5'>
            <input
              className='border-2 p-2'
              type="text"
              value={editedPost.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
            />
            <input
              className='border-2 p-2'
              type="text"
              value={editedPost.categories}
              onChange={(e) => handleFieldChange('categories', e.target.value)}
            />
            <input
              className='border-2 p-2 '
              type="text"
              value={editedPost.pubDate}
              onChange={(e) => handleFieldChange('pubDate', e.target.value)}
            />

          </div>
          <div className='flex justify-between'>
            <button className='border-2 p-2  hover:bg-green-600 hover:text-white' onClick={saveChanges}>Save Changes</button>
            <button className='border-2 p-2 hover:bg-black hover:text-white' onClick={closeModal}>Close Modal</button>
          </div>

        </Box>
      </Modal>
      <Pagination
        items={posts.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default ModeratorDashboard;

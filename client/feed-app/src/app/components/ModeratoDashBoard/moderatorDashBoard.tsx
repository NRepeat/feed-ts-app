"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Pagination from '../Pagination/pagination';
import { paginate } from '../SortList/paginatiom';
import NewsCard from '../NewsCard/newsCard';
import { postApi } from '@/app/api/postApi';
import ModalEdit from '../modalEdit/modalEdit';
import EditButtons from '../EditButtons/editButtons';
const pageSize = 4;


interface Posts {
  posts: Post[]
}

function ModeratorDashboard({ posts }: Posts) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedPost, setEditedPost] = useState<Post>({
    title: '',
    guid: '',
    categories: [],
    pubDate: '',
    link: '',
    creator: '',
    contentEncoded: '',
    contentSnippet: '',
  });
  const [poostData, setPostData] = useState(posts)
  const [currentPage, setCurrentPage] = useState(1);
  const openModal = (index: number) => {
    setEditedPost({ ...poostData[index] });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFieldChange = (field: string, value: string) => {
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

  }, [currentPage,posts]);

  useEffect(() => {
    setPostData(paginate(posts, currentPage, pageSize))
  }, [currentPage,posts]);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    saveCurrentPage(page);
  };
  const handleDelete = async (pageId: string) => {
    await postApi.delete(pageId)
    window.location.reload();
  }

  return (
    <div>
      {poostData.map((post: Post, i: number) => (
        <div key={i}>
          <Link href={{ pathname: '/moderator/edit', query: { news: post.guid } }}>
            <div className='flex justify-between w-full border-2 p-5 hover-bg-cyan-800 hover:bg-cyan-800'>
              <NewsCard categories={post.categories} pubDate={post.pubDate} title={post.title} />
            </div>
          </Link>
          <EditButtons handleDelete={handleDelete} openModal={openModal} i={i} post={post} key={i} />
        </div>
      ))}
      <ModalEdit closeModal={closeModal}
        editedPost={editedPost}
        handleFieldChange={handleFieldChange}
        modalIsOpen={modalIsOpen}
        saveChanges={saveChanges} />
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

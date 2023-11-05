"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Pagination from '../Pagination/pagination';
import { paginate } from '../SortList/paginatiom';
import NewsCard from '../NewsCard/newsCard';

function ModeratorDashboard({ posts, role }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

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
  }, []);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    saveCurrentPage(page);
  };

  const data = paginate(posts, currentPage, pageSize);

  return (
    <div>
      {data.map((post: any, i: number) => (
        <Link key={i} href={{ pathname: '/moderator/edit', query: { news: post.guid } }}>
          <div className='w-full border-2 p-5 hover-bg-cyan-800'>
            <NewsCard categories={post.categories} pubDate={post.pubDate} title={post.title} />
          </div>
        </Link>
      ))}

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

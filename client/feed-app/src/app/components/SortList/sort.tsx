"use client"
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import NewsCard from "../NewsCard/newsCard";
import Pagination from "../Pagination/pagination";
import { paginate } from "./paginatiom";
const pageSize = 8;

interface List {
  posts: Post[]
}


function SortableList({ posts }: List) {
  const [sortType, setSortType] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const saveCurrentPage = (page: number) => {
    localStorage.setItem('currentFeedPage', page.toString());
  };
  const loadCurrentPage = () => {
    const savedPage = localStorage.getItem('currentFeedPage')
    return savedPage ? parseInt(savedPage, 10) : 1;
  }; const onPageChange = (page: number) => {
    saveCurrentPage(page);
    setCurrentPage(page);
  };
  useEffect(() => {
    setCurrentPage(loadCurrentPage())
  }, [])
  const sortedAndFilteredPosts = useMemo(() => {
    let filteredPosts = posts;
    if (searchTerm) {
      filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    switch (sortType) {
      case "date":
        filteredPosts.sort((a: Post, b: Post) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        break;
      case "title":
        filteredPosts.sort((a: any, b: any) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return paginate(filteredPosts, currentPage, pageSize);
  }, [posts, sortType, searchTerm,  currentPage]);
  return (
    <div className=" flex flex-col justify-center items-center ">
      <div className="flex justify-between w-full ">
        <div className="w-fit pt-5  pl-10">
          <select className="p-2 rounded-sm text-cyan-800 border-2" onChange={(e) => setSortType(e.target.value)}>
            <option value="default">Default</option>
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>

        <div className="w-96 pt-5 pr-10">
          <input
            className="p-2 w-full rounded-sm placeholder:text-cyan-800 border-2"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <h1 className="mr-12 hidden sm:block sm:text-3xl ">
        <strong >Technology Blog</strong>
      </h1>
      <ul className="flex min-h-screen w-full justify-center p-5 items-center flex-col lg:flex-row  flex-wrap">
        {sortedAndFilteredPosts.map((post: Post) => (
          <li className="lg:w-2/5 lg:pr-10 w-full pl-2 pr-0 " key={post.guid}>
            <Link href={`/newsfeed/${encodeURIComponent(post.guid)}`}>
              <div style={{ minHeight: '250px' }} className="bg-white  flex p-2 mt-5 rounded border-solid border-2 border-y-slate-400 border-x-cyan-400">
                <NewsCard categories={post.categories} pubDate={post.pubDate} title={post.title} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pr-7">
        <Pagination
          items={posts.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>

    </div>
  );
}

export default SortableList;
"use client"
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import NewsCard from "../NewsCard/newsCard";
import Pagination from "../Pagination/pagination";
import { paginate } from "./paginatiom";

interface List {
  data: Post[]
}


function SortableList({ data }) {




  const pageSize = 6;
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

  }, [onPageChange])



  const sortedAndFilteredPosts = useMemo(() => {
    let filteredPosts = data;

    if (searchTerm) {
      filteredPosts = data.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortType) {
      case "date":
        filteredPosts.sort((a: Post, b: Post) => new Date(b.pubDate) - new Date(a.pubDate));

        break;
      case "title":
        filteredPosts.sort((a: any, b: any) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return paginate(filteredPosts, currentPage, pageSize);
  }, [data, sortType, searchTerm, pageSize, currentPage]);

  return (
    <div className="w-screen flex flex-col justify-center items-center">
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

    <ul className="flex min-h-screen w-full justify-stretch p-5 items-center flex-row flex-wrap">
      {sortedAndFilteredPosts.map((post) => (
        <li className="w-1/2 p-2" key={post.guid}>
          <Link href={`/feed/${encodeURIComponent(post.guid)}`}>
            <div className="bg-white min-w-max h-52 flex p-2 mt-5 rounded border-solid border-2 border-x-cyan-400">
              <NewsCard categories={post.categories} pubDate={post.pubDate} title={post.title} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
      <Pagination
        items={data.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default SortableList;
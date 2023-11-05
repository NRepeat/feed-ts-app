'use client'
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import NewsCard from "../NewsCard/newsCard";
import useSortableData from "@/app/hooks/sortHook";
import useSearch from "@/app/hooks/searchHook";
import Pagination from "../Pagination/pagination";
import { paginate } from "./paginatiom";
interface SortableListProps {
  data: Post[];
}

function SortableList({ data }: SortableListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
 
  const onPageChange = (page:number) => {
    setCurrentPage(page);
  };
  const paginatedPosts = paginate(data, currentPage, pageSize);
  const { data: sortedData, sortData, toggleSortDirection, isAscending, isSortByTitle } = useSortableData(data );
  const { filteredData, searchQuery, handleSearch } = useSearch(sortedData);




  useEffect(() => {
    localStorage.setItem("sortOrder", "descending");
    const savedSortOrder = localStorage.getItem("sortOrder");
    if (savedSortOrder) {
      if (savedSortOrder === "ascending") {
        sortData((a: Post, b: Post) => {
          const dateA = new Date(a.pubDate).getTime();
          const dateB = new Date(b.pubDate).getTime();
          return dateB - dateA;
        });
      } else if (savedSortOrder === "descending") {
        sortData((a: Post, b: Post) => {
          const dateA = new Date(a.pubDate).getTime();
          const dateB = new Date(b.pubDate).getTime();
          return dateA - dateB;
        });
      } else {
        sortData((a: Post, b: Post) => a.title.localeCompare(b.title));
      }
    }
  }, []);

  const sortDataByDate = () => {
    sortData((a: Post, b: Post) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });
  };

  const sortDataByTitle = () => {
    sortData((a: Post, b: Post) => a.title.localeCompare(b.title));
  };

  const handleSortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    if (selectedSort === "dateReverse") {
      toggleSortDirection();
      sortDataByDate();
      localStorage.setItem("sortOrder", isAscending ? "ascending" : "descending");
    } else if (selectedSort === "date") {
      toggleSortDirection();
      sortDataByDate();
      localStorage.setItem("sortOrder", isAscending ? "ascending" : "descending");
    } else if (selectedSort === "title") {
      sortDataByTitle();
      localStorage.setItem("sortOrder", isSortByTitle ? "title" : "notTitle");
    }
  }, [toggleSortDirection, sortDataByDate, isAscending, sortDataByTitle, isSortByTitle]);


 
  console.log("🚀 ~ file: sort.tsx:78 ~ SortableList ~  paginatedPosts :",  paginatedPosts )
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div className="flex justify-between w-full ">
        <div className="w-fit pt-5  pl-10">
          <select className=" p-2  rounded-sm text-cyan-800 border-2" onChange={handleSortChange}>
            <option value="dateReverse">Sort by date descending</option>
            <option value="date">Sort by date ascending</option>
            <option value="title">Sort by title</option>

          </select>
       
        </div>
        
        <div className="w-96 pt-5  pr-10">
          <input
            className="p-2 w-full rounded-sm placeholder:text-cyan-800 border-2 "
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>


      <ul className="flex min-h-screen justify-stretch  p-5 items-center flex-row flex-wrap  ">
        {filteredData.map((post: Post) => (
          <li  className='w-1/2' key={post.guid}>
            <Link href={`/feed/${encodeURIComponent(post.guid)}`}>
              <div  className="bg-white w-10/12 flex p-2 mt-5 h-52 rounded border-solid border-2 border-x-cyan-400">

                <NewsCard categories={post.categories} pubDate={post.pubDate} title={post.title} />
              </div>
            </Link>

          </li>
        ))}
      </ul>
      <Pagination
       items={data.length} // 100
       currentPage={currentPage} // 1
       pageSize={pageSize} // 10
       onPageChange={onPageChange}
        />
    </div>
  );
}
export default SortableList;

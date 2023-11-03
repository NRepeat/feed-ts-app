"use client"

import React, { useState, useEffect } from "react";
import useSortableData from "../../hooks/sortHook";
import Link from "next/link";
import NewsCard from "../NewsCard/newsCard";
import useSearch from "@/app/hooks/searchHook";


interface SortableListProps {
  data: Post[];
}

function SortableList({ data }: SortableListProps): JSX.Element {
  const { data: sortedData, sortData, toggleSortDirection, isAscending, isSortByTitle } = useSortableData(data);

  const { filteredData, searchQuery, handleSearch } = useSearch(sortedData);

  useEffect(() => {

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

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
  };

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

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <select onChange={handleSortChange}>
      <option value="dateReverse">Сортировать по дате по убыванию</option>

        <option value="date">Сортировать по дате по возрастанию</option>
        <option value="title">Сортировать по заголовку</option>
      </select>

      <ul>
        {filteredData.map((post: Post) => {
          const encodedURL = encodeURIComponent(post.guid);
          return (
            <li key={post.guid}>
              <Link href={`/FeedPage/${encodedURL}`}>
                <NewsCard categories={post.categories} pubDate={post.pubDate} title={post.title} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SortableList;

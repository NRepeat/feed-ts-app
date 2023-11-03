"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import NewsCard from "../NewsCard/newsCard";
import useSortableData from "@/app/hooks/sortHook";
import useSearch from "@/app/hooks/searchHook";
import EditPostForm from "../EditPostFormProps/editPostFormProps";
import { postApi } from "@/app/api/postApi";
import { useSession } from "next-auth/react";


interface SortableListProps {
  data: Post[];
  isModerator: boolean
}

function SortableList({ data, isModerator }: SortableListProps): JSX.Element {
  const { data: sortedData, sortData, toggleSortDirection, isAscending, isSortByTitle } = useSortableData(data);
const session = useSession()
  console.log("🚀 ~ file: sort.tsx:20 ~ SortableList ~ session:", session)
  const { filteredData, searchQuery, handleSearch } = useSearch(sortedData);
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
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

  const handleEditPost = (postId: string) => {
    setEditingPostId(postId);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
  };

  const handleSaveEdit = () => {

    setEditingPostId(null);
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
        {filteredData.map((post: Post) => (
          <li key={post.guid}>
            {isModerator && editingPostId === post.guid ? (
              <div>
                <EditPostForm
                  initialTitle={post.title}
                  onSave={(newTitle) => {
                    const { guid } = post
    
                    const props = {
                      newTitle, guid
                    }
                    postApi.update(props)
                    setEditingPostId(null);
                  }}
                  onCancel={() => setEditingPostId(null)}
                />
              </div>
            ) : (
              <div>
                <Link href={`/FeedPage/${encodeURIComponent(post.guid)}`}>
                  <NewsCard categories={post.categories} pubDate={post.pubDate} title={post.title} />
                </Link>
                {isModerator && (
                  <button onClick={() => handleEditPost(post.guid)}>Редактировать</button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SortableList;

import { useState } from "react";

function useSortableData(initialData: Post[]) {
  const [data, setData] = useState([...initialData]);
  const [isAscending, setIsAscending] = useState(true);
  const [isSortByTitle, setIsSortByTitle] = useState(true);

  const sortData = (sortFunction: (a: Post, b: Post) => number) => {
    const sorted = [...data].sort(sortFunction);

    if (!isAscending) {
      sorted.reverse();
    }

    if (!isSortByTitle) {
      sorted.reverse();
    }

    setData(sorted);
  };

  const toggleSortDirection = () => {
    setIsAscending(!isAscending);
  };

  const toggleSortByTitle = () => {
    setIsSortByTitle(!isSortByTitle);
  };

  return { data, sortData, toggleSortDirection, toggleSortByTitle, isAscending, isSortByTitle };
}

export default useSortableData;

import { useState, useEffect } from "react";

function useSearch(data:Post[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handleSearch = (query:string) => {
    setSearchQuery(query);
  };

  return { filteredData, searchQuery, handleSearch };
}

export default useSearch;

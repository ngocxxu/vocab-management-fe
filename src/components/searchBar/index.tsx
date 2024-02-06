import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import "./style.scss";

type TSearchBar = {
  onSearch: (input: string) => void;
};

export const SearchBar = ({ onSearch }: TSearchBar) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      onSearch(input);
    }
  };

  return (
    <div className="search-box">
      <button type="button" className="btn-search">
        <IconSearch />
      </button>
      <input
        onKeyDown={handleKeyDown}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="input-search"
        placeholder="Search..."
      />
    </div>
  );
};

import { IconSearch } from "@tabler/icons-react";
import "./style.scss";

export const SearchBar = () => {
  return (
    <div className="search-box">
      <button type="button" className="btn-search">
        <IconSearch />
      </button>
      <input type="text" className="input-search" placeholder="Search..." />
    </div>
  );
};

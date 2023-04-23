import "./searchbar.css";
import { useState } from "react";

const SearchBar = (props) => {
  const [text, setText] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    props.handleSearchBySkill(text);
  };

  return (
    <form id="search" onSubmit={handleSearch}>
      <input
        placeholder="Search request by skill"
        type="text"
        name="text"
        className="input"
        value={text || ""}
        onChange={(e) => setText(e.target.value)}
      />
      <button id="searchButton">
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
};

export default SearchBar;

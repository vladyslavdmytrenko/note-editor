import React from "react";

import "./style.css";

function Search() {
  return (
    <div className="header-search">
      <input
        className="header-search_input"
        type="text"
        id="search"
        name="search"
        placeholder="Search"
      />
    </div>
  );
}

export default Search;

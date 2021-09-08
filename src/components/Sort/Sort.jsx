import React from "react";

import "./style.css";
import SortIcon from "../../icon/sort.svg";

function Sort() {
  return (
    <div className="header-sort">
      <button className="btn-icon">
        <span>Title</span>
        <img src={SortIcon} alt="search" className="icon" />
      </button>
      <button className="btn-icon">
        <span>Date</span>
        <img src={SortIcon} alt="search" className="icon" />
      </button>
    </div>
  );
}

export default Sort;

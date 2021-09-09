import React, { useContext, useState } from "react";

import "./style.css";
import SortNoneIcon from "../../icon/sort.svg";
import SortDescIcon from "../../icon/sort-down.svg";
import SortAscIcon from "../../icon/sort-ascending.svg";
import { NoteContext } from "../../context/NoteContext";

function Sort() {
  const { sortNotes, typeSort } = useContext(NoteContext);

  const handleOnChange = (e) => {
    sortNotes(e.target.value);
  };

  const renderSwitch = (param) => {
    switch (param) {
      case "desc_date":
        return SortDescIcon;
      case "desc_title":
        return SortDescIcon;
      case "asc_date":
        return SortAscIcon;
      case "asc_title":
        return SortAscIcon;
      default:
        return SortNoneIcon;
    }
  };

  return (
    <form className="header-sort" onChange={handleOnChange}>
      <div className="drop-containter">
        <div className="btn-icon">
          <span>Date</span>
          <img
            src={
              typeSort.includes("date") ? renderSwitch(typeSort) : SortNoneIcon
            }
            alt="search"
            className="icon"
          />
        </div>
        <div className="drop-list">
          <div className="drop-item">
            <input name="sort" type="radio" id="none_date" value="none_date" />
            <label htmlFor="none_date">none</label>
          </div>
          <div className="drop-item">
            <input name="sort" type="radio" id="desc_date" value="desc_date" />
            <label htmlFor="desc_date">desc</label>
          </div>
          <div className="drop-item">
            <input name="sort" type="radio" id="asc_date" value="asc_date" />
            <label htmlFor="asc_date">asc</label>
          </div>
        </div>
      </div>
      <div className="drop-containter">
        <div className="btn-icon">
          <span>Title</span>
          <img
            src={
              typeSort.includes("title") ? renderSwitch(typeSort) : SortNoneIcon
            }
            alt="search"
            className="icon"
          />
        </div>
        <div className="drop-list">
          <div className="drop-item">
            <input
              name="sort"
              type="radio"
              id="none_title"
              value="none_title"
            />
            <label htmlFor="none_title">none</label>
          </div>
          <div className="drop-item">
            <input
              name="sort"
              type="radio"
              id="desc_title"
              value="desc_title"
            />
            <label htmlFor="desc_title">desc</label>
          </div>
          <div className="drop-item">
            <input name="sort" type="radio" id="asc_title" value="asc_title" />
            <label htmlFor="asc_title">asc</label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Sort;

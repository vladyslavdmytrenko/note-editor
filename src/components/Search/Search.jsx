import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./style.css";

import { NoteContext } from "../../context/NoteContext";

function Search() {
  const { notes } = useContext(NoteContext);
  const [ focus, setFocus ] = useState(false);
  const [ searchArr, setSearchArr ] = useState([]);

  const handlerChange = e => {
    console.log(e.target.value);
    if (!e.target.value.length) setSearchArr([]);  
    const filter = notes.filter(i => i.title.includes(e.target.value));
    console.log(filter);
    setSearchArr(filter);
  }

  return (
    <div className="header-search">
      <input
        className="header-search_input"
        type="text"
        id="search"
        name="search"
        placeholder="Search"
        onChange={ handlerChange }
        onFocus={ e => setFocus(true)}
      />
      <div className={`drop-down-list ${!focus ? 'hide': ''}`}>
        <ul>
          {searchArr.length
            ? searchArr.map((i) => {
                return (
                  <li key={i.id}>
                    <NavLink to={`/${i.id}`} activeClassName="active">
                      {i.title}
                    </NavLink>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}

export default Search;

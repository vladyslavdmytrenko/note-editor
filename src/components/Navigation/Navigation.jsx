import React, { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";

import "./style.css";
import { NoteContext } from "../../context/NoteContext";

function Navigation() {
  const { notes, addNote } = useContext(NoteContext);
  const history = useHistory();
  const newNote = (e) => {
    e.preventDefault();
    const id = addNote("New note");
    history.push(id);
  };
  return (
    <nav className="nav">
      <ul>
        <li key="new">
          <NavLink to="/create-note" activeClassName="active" onClick={newNote}>
            New +
          </NavLink>
        </li>
        {notes.length
          ? notes.map((i) => {
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
    </nav>
  );
}

export default Navigation;

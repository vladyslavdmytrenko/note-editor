import React, { createContext, useEffect, useState } from "react";
import { idGenerator } from "../utils/idGenerator";

export const NoteContext = createContext();

const NoteContextProvider = (props) => {
  const initialState = JSON.parse(localStorage.getItem("notes")) || [];
  const [notes, setNotes] = useState(initialState);
  const [redirectId, setRedirectId] = useState();
  const [typeSort, setTypeSort] = useState("none_date");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (title = "New note", description = "") => {
    const id = idGenerator();
    setTypeSort("none_date");
    setNotes([{ id, title, description, timestamp: Date.now() }, ...notes]);
    return id;
  };

  const getNoteById = (id) => notes.find((note) => note.id === id);

  const updateNote = (id, title, description) => {
    const newNotes = notes.map((note) =>
      note.id === id ? { ...note, id, title, description } : note
    );
    setNotes(newNotes);
  };

  const removeNote = (id) => {
    const newArr = notes.filter((note, i, notes) => {
      if (note.id === id) {
        if (notes.length > i + 1) {
          setRedirectId(notes[i + 1].id);
        }
        return false;
      }

      return true;
    });
    setNotes(newArr);
  };

  const getRedirectTo = () => {
    let path = redirectId;
    setRedirectId(null);
    if (!path && notes.length > 0) path = notes[0].id;
    return path;
  };

  const sortNotes = (newTypeSort) => {
    const newArr = [...notes].sort((a, b) => {
      switch (newTypeSort) {
        case "desc_date":
          if (a.timestamp > b.timestamp) return -1;
          if (a.timestamp < b.timestamp) return 1;
          return 0;
        case "asc_date":
          if (a.timestamp < b.timestamp) return -1;
          if (a.timestamp > b.timestamp) return 1;
          return 0;
        case "desc_title":
          if (a.title > b.title) return -1;
          if (a.title < b.title) return 1;
          return 0;
        case "asc_title":
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        default:
          break;
      }
    });
    setTypeSort(newTypeSort);
    setNotes(newArr);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        getNoteById,
        updateNote,
        removeNote,
        getRedirectTo,
        sortNotes,
        typeSort,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;

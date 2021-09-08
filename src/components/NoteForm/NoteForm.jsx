import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import "./style.css";
import deleteIcon from "../../icon/delete.svg";
import { NoteContext } from "../../context/NoteContext";

function NoteForm() {
  const { getNoteById, updateNote, removeNote } = useContext(NoteContext);
  const id = useLocation().pathname.substring(1);
  const formData = getNoteById(id);
  const [title, setTitle] = useState(formData.title);
  const [description, setDescription] = useState(formData.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNote(id, title, description);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleRemoveNote = () => {
    removeNote(id);
  };

  return (
    <form className="note_form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" value={title} onChange={handleTitle} />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        value={description}
        onChange={handleDescription}
      />
      <button type="submit">SAVE</button>
      <button onClick={handleRemoveNote} className="btn-delete">
        <img src={deleteIcon} alt="" />
      </button>
    </form>
  );
}

export default NoteForm;

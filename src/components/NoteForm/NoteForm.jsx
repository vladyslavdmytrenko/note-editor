import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./style.css";
import deleteIcon from "../../icon/delete.svg";
import { NoteContext } from "../../context/NoteContext";

const useValidation = (value, validations) => {
  const [minLength, setMinLength] = useState(false);
  const [maxLength, setMaxLength] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    for (let validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLength(
                `must be more than ${validations[validation]} characters`
              )
            : setMinLength(false);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLength(
                `must be less than ${validations[validation]} characters`
              )
            : setMaxLength(false);
          break;
        default:
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (minLength || maxLength) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [minLength, maxLength]);

  return { isValid, minLength, maxLength };
};

const useInput = (initValue, validations) => {
  const [value, setValue] = useState(initValue);
  const [isOnBlur, SetIsOnBlur] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    SetIsOnBlur(true);
  };

  return {
    isOnBlur,
    value,
    onChange,
    onBlur,
    ...valid,
  };
};

function NoteForm() {
  const { getNoteById, updateNote, removeNote } = useContext(NoteContext);
  const id = useLocation().pathname.substring(1);
  const formData = getNoteById(id);
  const title = useInput(formData.title, {
    minLength: 3,
    maxLength: 120,
  });
  const description = useInput(formData.description, {
    minLength: 5,
    maxLength: 500,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNote(id, title.value, description.value);
  };

  const handleRemoveNote = () => {
    removeNote(id);
  };

  return (
    <form className="note_form" onSubmit={handleSubmit}>
      <label htmlFor="title">
        Title
        {!title.isValid ? (
          <span className="error">
            {title.minLength} {title.maxLength}
          </span>
        ) : null}
      </label>
      <input
        type="text"
        name="title"
        className={!title.isValid ? "invalid" : null}
        value={title.value}
        onChange={(e) => title.onChange(e)}
        onBlur={(e) => title.onBlur(e)}
      />
      <label htmlFor="description">
        Description
        {!description.isValid ? (
          <span className="error">
            {description.minLength} {description.maxLength}
          </span>
        ) : null}
      </label>
      <textarea
        name="description"
        className={!description.isValid ? "invalid" : null}
        value={description.value}
        onChange={(e) => description.onChange(e)}
        onBlur={(e) => description.onBlur(e)}
      />

      <button type="submit" disabled={!description.isValid || !title.isValid}>
        SAVE
      </button>
      <button onClick={handleRemoveNote} className="btn-delete">
        <img src={deleteIcon} alt="" />
      </button>
    </form>
  );
}

export default NoteForm;

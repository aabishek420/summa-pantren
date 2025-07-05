import React, { useState, useEffect } from "react";
import { createNote, updateNote } from "../utils/api";

export default function NoteForm({ idToken, noteToEdit, onSaved }) {
  const [note, setNote] = useState({ notestitle: "", notescontent: "" });

  useEffect(() => {
    if (noteToEdit) {
      setNote({
        notestitle: noteToEdit.notestitle,
        notescontent: noteToEdit.notescontent,
      });
    } else {
      setNote({ notestitle: "", notescontent: "" });
    }
  }, [noteToEdit]);

  const handleChange = (e) =>
    setNote({ ...note, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noteToEdit) {
      await updateNote(noteToEdit.noteid, note, idToken);
    } else {
      await createNote(note, idToken);
    }
    onSaved();
    setNote({ notestitle: "", notescontent: "" });
  };

  return (
    <div className="mb-4">
      <h4>{noteToEdit ? "✏️ Edit Note" : "📝 Create Note"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            name="notestitle"
            className="form-control"
            placeholder="Title"
            value={note.notestitle}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="notescontent"
            className="form-control"
            placeholder="Note content"
            rows="3"
            value={note.notescontent}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          {noteToEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

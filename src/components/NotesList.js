import React from "react";
import { deleteNote } from "../utils/api";

export default function NotesList({ idToken, notes, onEdit, onDeleteDone }) {
  const handleDelete = async (id) => {
    await deleteNote(id, idToken);
    onDeleteDone();
  };

  return (
    <div>
      <h4 className="mb-3">📚 Your Notes</h4>
      {notes.length === 0 ? (
        <p className="text-muted">No notes found.</p>
      ) : (
        <div className="row">
          {notes.map((note) => (
            <div className="col-md-4 mb-3" key={note.noteid}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{note.notestitle}</h5>
                  <p className="card-text">{note.notescontent}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => onEdit(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(note.noteid)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

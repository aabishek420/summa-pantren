import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Register from "./components/Register";
import Login from "./components/Login";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import Logout from "./components/Logout";
import { fetchNotes } from "./utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  // Monitor Firebase Auth state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setIdToken(token);
        setEmail(user.email);
        localStorage.setItem("idToken", token);
        localStorage.setItem("email", user.email);
      } else {
        setIdToken(null);
        setEmail(null);
        localStorage.removeItem("idToken");
        localStorage.removeItem("email");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (idToken) {
      loadNotes();
    }
  }, [idToken]);

  const handleLogin = async (token, userEmail) => {
    setIdToken(token);
    setEmail(userEmail);
    localStorage.setItem("idToken", token);
    localStorage.setItem("email", userEmail);
  };

  const handleLogout = () => {
    setIdToken(null);
    setEmail(null);
    setNoteToEdit(null);
    setNotes([]);
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
    const auth = getAuth();
    auth.signOut();
  };

  const loadNotes = async () => {
    try {
      const data = await fetchNotes(idToken);
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load notes:", err);
    }
  };

  if (idToken) {
    return (
      <div className="container py-4">
        <div className="d-flex justify-content-end mb-3">
          <Logout onLogout={handleLogout} />
        </div>
        <NoteForm
          idToken={idToken}
          noteToEdit={noteToEdit}
          onSaved={() => {
            setNoteToEdit(null);
            loadNotes();
          }}
        />
        <NotesList
          idToken={idToken}
          notes={notes}
          onEdit={setNoteToEdit}
          onDeleteDone={loadNotes}
        />
      </div>
    );
  }

  return (
    <div className={`container slider-container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className={`form-container ${isSignUpMode ? "sign-up" : "sign-in"}`}>
        {isSignUpMode ? <Register /> : <Login onLogin={handleLogin} />}
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>If you already have an account, log in and continue your journey!</p>
            <button className="btn ghost" onClick={() => setIsSignUpMode(false)}>Login</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>If you're new, sign up and start taking notes with us!</p>
            <button className="btn ghost" onClick={() => setIsSignUpMode(true)}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

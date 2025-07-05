// App.js
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Register from "./components/Register";
import Login from "./components/Login";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import Logout from "./components/Logout";
import ForgotPassword from "./components/ForgotPassword";
import { fetchNotes } from "./utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setIdToken(token);
        setEmail(user.email);
        localStorage.setItem("idToken", token);
        localStorage.setItem("email", user.email);
      } else {
        setIdToken(null);
        setEmail(null);
        localStorage.clear();
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (idToken) loadNotes();
  }, [idToken]);

  const handleLogin = (token, userEmail) => {
    setIdToken(token);
    setEmail(userEmail);
    localStorage.setItem("idToken", token);
    localStorage.setItem("email", userEmail);
  };

  const handleLogout = () => {
    getAuth().signOut();
    setIdToken(null);
    setEmail(null);
    setNotes([]);
    setNoteToEdit(null);
    localStorage.clear();
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
    <div
      className={`container slider-container ${isSignUpMode ? "sign-up-mode" : ""} ${isForgotPassword ? "forgot-password-mode" : ""}`}
    >
      <div className={`form-container ${isSignUpMode ? "sign-up" : "sign-in"}`}>
        {isForgotPassword ? (
          <ForgotPassword onBack={() => setIsForgotPassword(false)} />
        ) : isSignUpMode ? (
          <Register />
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <button
              className="btn btn-link mt-2"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password?
            </button>
          </>
        )}
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Already have an account? Log in now!</p>
            <button className="btn ghost" onClick={() => setIsSignUpMode(false)}>
              Login
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            {isForgotPassword ? (
              <>
                <h1>Forgot Your Password?</h1>
                <p>Enter your email to reset your password and get back on track.</p>
                <button
                  className="btn ghost"
                  onClick={() => setIsForgotPassword(false)}
                >
                  Back to Login
                </button>
              </>
            ) : (
              <>
                <h1>Hello, Friend!</h1>
                <p>New here? Sign up and get started!</p>
                <button
                  className="btn ghost"
                  onClick={() => setIsSignUpMode(true)}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

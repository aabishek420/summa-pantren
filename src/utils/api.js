const BASE_URL = "http://localhost:8080";

export async function registerUser(user) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function loginBackend(idToken) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { Authorization: `Bearer ${idToken}` },
  });
  return res.text();
}

export async function fetchNotes(idToken) {
  const res = await fetch(`${BASE_URL}/notes`, {
    headers: { Authorization: `Bearer ${idToken}` },
  });
  return res.json();
}

export async function createNote(note, idToken) {
  const res = await fetch(`${BASE_URL}/notes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function updateNote(noteid, note, idToken) {
  const res = await fetch(`${BASE_URL}/notes/update/${noteid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(note),
  });
  return res.json();
}

export async function deleteNote(noteid, idToken) {
  const res = await fetch(`${BASE_URL}/notes/delete/${noteid}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${idToken}` },
  });
  return res.text();
}

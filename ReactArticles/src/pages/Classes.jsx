import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Classes.module.css";

export default function Classes({ setPage, user }) {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    max_participants: ""
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  function fetchClasses() {
    axios
      .get("http://localhost:8801/api/classes")
      .then(res => {
        const sorted = [...res.data].sort((a, b) => a.name.localeCompare(b.name));
        setClasses(sorted);
      })
      .catch(() => setMsg("Error fetching classes"));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd(e) {
    e.preventDefault();
    setMsg("");
    if (!form.name || !form.description || !form.max_participants) {
      setMsg("Please fill all fields");
      return;
    }
    axios
      .post("http://localhost:8801/api/classes", form)
      .then(() => {
        setMsg("Class added!");
        setForm({ name: "", description: "", max_participants: "" });
        fetchClasses();
      })
      .catch(() => setMsg("Error adding class"));
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8801/api/classes/${id}`)
      .then(() => fetchClasses())
      .catch(() => setMsg("Error deleting class"));
  }

  return (
    <div className={`${styles.container} ${styles.bgGym}`}>
      <div className={styles.bgOverlay}>
        <header className={styles.header}>
          <div className={styles.logo}>Gym Manager</div>
          <nav className={styles.nav}>
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("classes")}>Classes</button>
            <button onClick={() => setPage("mybookings")}>My Bookings</button>
            <button onClick={() => setPage("login")}>Logout</button>
          </nav>
        </header>

        <main className={styles.main}>
          <h2>All Classes</h2>
          <form className={styles.form} onSubmit={handleAdd}>
            <input
              name="name"
              placeholder="Class Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <input
              name="max_participants"
              placeholder="Max Participants"
              type="number"
              min="1"
              value={form.max_participants}
              onChange={handleChange}
            />
            <button type="submit">Add Class</button>
          </form>
          <div className={styles.msg}>{msg}</div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Max Participants</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>{c.max_participants}</td>
                  <td>
                    <button
                      className={styles.delete}
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        <footer className={styles.footer}>
          &copy; {new Date().getFullYear()} Gym Manager Project
        </footer>
      </div>
    </div>
  );
}

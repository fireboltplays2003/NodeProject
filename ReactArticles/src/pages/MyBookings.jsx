import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyBookings.module.css";

export default function MyBookings({ setPage, user }) {
  const [bookings, setBookings] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:8801/api/bookings/${user.id}`)
      .then((res) => setBookings(res.data))
      .catch(() => setMsg("Error loading bookings"));
  }, [user]);

  function handleCancel(bookingId) {
    axios
      .delete(`http://localhost:8801/api/bookings/${bookingId}`)
      .then(() => {
        setBookings(bookings.filter((b) => b.id !== bookingId));
      })
      .catch(() => setMsg("Error cancelling booking"));
  }

  return (
    <div className={styles.container}>
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
        <h2>My Bookings</h2>
        {msg && <div className={styles.msg}>{msg}</div>}
        {bookings.length === 0 ? (
          <p>You have no bookings yet.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Description</th>
                <th>Max Participants</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.name}</td>
                  <td>{b.description}</td>
                  <td>{b.max_participants}</td>
                  <td>
                    <button
                      className={styles.cancel}
                      onClick={() => handleCancel(b.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Gym Manager Project
      </footer>
    </div>
  );
}

import React from "react";
import styles from "./Home.module.css";

export default function Home({ setPage, user }) {
  return (
    <div className={styles.homeContainer}>
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
        <h1>Welcome to the Gym Management System</h1>
        <section className={styles.projectDesc}>
          <h2>About the Project</h2>
          <p>
            This application allows you to manage users, class bookings, trainers, and gym classes.
            The platform is built with Node.js, Express, React, and MySQL, featuring a responsive, user-friendly interface.
          </p>
        </section>
        <section className={styles.developers}>
          <h2>Developers</h2>
          <ul>
            <li>Stephanos Khoury</li>
            <li>Elias Dabbagh</li>
          </ul>
        </section>
        {user && (
          <section className={styles.userSection}>
            <h3>Logged in as: <span className={styles.user}>{user.username}</span></h3>
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()} Gym Manager Project
      </footer>
    </div>
  );
}

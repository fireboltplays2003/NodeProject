import React, { useState } from "react";
import axios from "axios";
import styles from "./LoginRegister.module.css";

export default function LoginRegister({ setPage, setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    full_name: ""
  });
  const [message, setMessage] = useState("");

  function validUsername(username) {
    return /^[A-Za-z]{2,}$/.test(username);
  }
  function validPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,8}$/.test(password);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (!validUsername(form.username)) {
      setMessage("Username must be at least 2 letters, only A-Z.");
      return;
    }
    if (!validPassword(form.password)) {
      setMessage("Password: 3–8 chars, at least one letter and one digit.");
      return;
    }

    if (isLogin) {
      try {
        const res = await axios.post("http://localhost:8801/api/users/login", {
          username: form.username,
          password: form.password
        });
        setUser(res.data.user);
        setPage("home");
      } catch (err) {
        setMessage(
          err.response?.data?.message || "Login failed. Try again."
        );
      }
    } else {
      if (!form.email || !form.full_name) {
        setMessage("Please fill all fields.");
        return;
      }
      try {
        await axios.post("http://localhost:8801/api/users/register", form);
        setMessage("Registration successful! You can now login.");
        setIsLogin(true);
        setForm({ ...form, password: "" });
      } catch (err) {
        setMessage(
          err.response?.data?.message || "Registration failed. Try again."
        );
      }
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <div className={styles.msg}>{message && <span>{message}</span>}</div>
      </form>
      <div className={styles.toggleLink}>
        {isLogin ? (
          <span>
            Not registered?{" "}
            <button type="button" onClick={() => setIsLogin(false)}>
              Register
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <button type="button" onClick={() => setIsLogin(true)}>
              Login
            </button>
          </span>
        )}
      </div>
    </div>
  );
}

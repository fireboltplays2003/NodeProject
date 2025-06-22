// routes/LoginRegister.js
const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

// POST /api/users/register
router.post("/register", (req, res) => {
  const { username, password, email, full_name } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    !full_name ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({ success: false, message: "Missing or invalid fields" });
  }

  // Check if username already exists
  db.query(
    "SELECT id FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Register error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
      }
      if (results.length > 0) {
        return res.status(409).json({ success: false, message: "Username already exists" });
      }
        
      // Insert new user
      db.query(
        "INSERT INTO users (username, password, email, full_name) VALUES (?, ?, ?, ?)",
        [username, password, email, full_name],
        (err2) => {
          if (err2) {
            console.error("Register error:", err2);
            return res.status(500).json({ success: false, message: "Server error" });
          }
          return res.status(201).json({ success: true, message: "User registered successfully" });
        }
      );
    }
  );
});

// POST /api/users/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid username or password" });
      }
      const user = { ...results[0] };
      delete user.password; // Do not send password back!
      return res.json({ success: true, user });
    }
  );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

// GET /api/classes — get all classes
router.get("/", (req, res) => {
  db.query("SELECT * FROM classes", (err, results) => {
    if (err) {
      console.error("Error fetching classes:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    res.json(results);
  });
});

// POST /api/classes — add a new class
router.post("/", (req, res) => {
  const { name, description, max_participants } = req.body;
  if (!name || !description || !max_participants) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }
  db.query(
    "INSERT INTO classes (name, description, max_participants) VALUES (?, ?, ?)",
    [name, description, max_participants],
    (err, results) => {
      if (err) {
        console.error("Error adding class:", err);
        return res.status(500).json({ success: false, message: "Server error" });
      }
      res.status(201).json({ success: true, message: "Class added" });
    }
  );
});

// DELETE /api/classes/:id — delete a class
router.delete("/:id", (req, res) => {
  const classId = req.params.id;
  db.query(
    "DELETE FROM classes WHERE id = ?",
    [classId],
    (err, results) => {
      if (err) {
        console.error("Error deleting class:", err);
        return res.status(500).json({ success: false, message: "Server error" });
      }
      res.json({ success: true, message: "Class deleted" });
    }
  );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");
const db = dbSingleton.getConnection();

// GET /api/bookings/:userId — get all bookings for a user (with class info)
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT b.id, b.class_id, c.name, c.description, c.max_participants
    FROM class_bookings b
    JOIN classes c ON b.class_id = c.id
    WHERE b.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    res.json(results);
  });
});

// DELETE /api/bookings/:bookingId — cancel a booking
router.delete("/:bookingId", (req, res) => {
  const bookingId = req.params.bookingId;
  db.query(
    "DELETE FROM class_bookings WHERE id = ?",
    [bookingId],
    (err, results) => {
      if (err) {
        console.error("Error deleting booking:", err);
        return res.status(500).json({ success: false, message: "Server error" });
      }
      res.json({ success: true, message: "Booking cancelled" });
    }
  );
});

module.exports = router;

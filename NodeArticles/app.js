//Stephanos Khoury , Elias Dabbagh
const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/LoginRegister"); // The router we'll make below
const classesRouter = require("./routes/classes");
const bookingsRouter = require("./routes/bookings");

const app = express();
const PORT = 8801;

app.use(cors());
app.use(express.json());
app.use("/images",express.static("images"));
// Mount the users router (handles /api/users/register and /api/users/login)
app.use("/api/users", usersRouter);
app.use("/api/classes", classesRouter);
app.use("/api/bookings", bookingsRouter);

// Serve frontend static files (optional, for deployment)



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;

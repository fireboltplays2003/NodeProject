import React, { useState } from "react";
import LoginRegister from "./pages/LoginRegister";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import MyBookings from "./pages/MyBookings";
// import Classes from "./pages/Classes"; // Add when you have it
// import MyBookings from "./pages/MyBookings"; // Add when you have it

function App() {
  const [page, setPage] = useState("login"); // possible values: 'login', 'home', etc.
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {page === "login" && (
        <LoginRegister setPage={setPage} setUser={setUser} />
      )}
      {page === "home" && <Home user={user} setPage={setPage} />}
      {page === "classes" && <Classes user={user} setPage={setPage} />}
      {page === "mybookings" && <MyBookings user={user} setPage={setPage} />}
    </div>
  );
}

export default App;

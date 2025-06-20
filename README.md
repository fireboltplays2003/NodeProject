## 🏋️ Gym Management System – Full Stack Web App

### 📦 Description

This full stack project enables users to register, log in, view available gym classes, and manage their class bookings. The application consists of a Node.js + MySQL backend and a React frontend. The system handles user authentication, class management, and real-time booking capabilities with a clean and modular interface.

---

### 📂 Project Structure

```
FinalProject/
├── NodeArticles/           → Backend (Express + MySQL)
├── ReactArticles/          → Frontend (React)
├── gym.sql                 → SQL file to create database schema and seed data
├── ERD.drawio              → ERD diagram in editable format
└── ERD.png                 → ERD image for quick view
```

---

### 🔌 Backend Features – `NodeArticles/`

* **User Authentication**

  * POST `/register` → Register a new user
  * POST `/login` → Validate login credentials and return user data
* **Class Management**

  * GET `/classes` → List all gym classes
  * POST `/add-class` → Add a new class
  * DELETE `/delete-class/:classId` → Remove a class by ID
* **Bookings**

  * POST `/book-class` → Book a user into a class
  * GET `/my-bookings/:userId` → Retrieve bookings for a specific user
  * DELETE `/cancel-booking/:bookingId` → Cancel a specific booking

📁 All routes are handled in:

* `classes.js`
* `bookings.js`
* `LoginRegister.js`

📌 **Database** is managed using `mysql2`, and the connection is configured in `app.js`.

---

### 🎨 Frontend Features – `ReactArticles/`

* Register and login forms using `useState` and custom validation
* Home dashboard with available class list
* Book classes directly from the UI
* View and cancel your existing bookings
* Component-based structure with CSS Modules for styling

📁 Key Components:

* `LoginRegister.jsx` – user auth
* `Home.jsx` – class listing
* `MyBookings.jsx` – booking management
* `Classes.jsx` – admin class control

---

### 🛠️ Technologies Used

#### Backend:

* Node.js
* Express.js
* MySQL2
* Express-Session
* CORS
* Body-Parser

#### Frontend:

* React
* Axios
* CSS Modules

---

### 🧪 How to Run the Project Locally

#### 1. 🛠 Set up the Backend

```bash
cd NodeArticles
npm install
node app.js
```

☑️ Make sure MySQL is running and import `gym.sql` to set up the database.

#### 2. 🎨 Set up the Frontend

```bash
cd ReactArticles
npm install
npm start
```

---

### 👥 Developers

* **Stephanos Khoury** – [`stephan042003@gmail.com`](mailto:stephan042003@gmail.com)
* **Elias Dabbagh** – [`rula.elias2004@gmail.com`](mailto:rula.elias2004@gmail.com)

> Programmer credits also appear in `app.js` as comments.

---

### 📸 ERD Preview

![ERD](./ERD.png)



---

Let me know if you'd like this saved as a downloadable `.md` file or want a version in Hebrew too.

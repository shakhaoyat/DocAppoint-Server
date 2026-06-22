# 🏥 DocAppoint — Backend Server

**Live Server URL:** [https://doc-appoint-server-neon.vercel.app](https://doc-appoint-server-neon.vercel.app)

**Client Site:** [https://doc-appoint-client-two.vercel.app](https://doc-appoint-client-two.vercel.app)

DocAppoint Server is the REST API backend for the DocAppoint doctor appointment booking platform. Built with Node.js and Express, it handles all appointment and doctor data operations, connected to a MongoDB Atlas database.

---

## ✨ Features

- 📋 **Appointment Management** — Full CRUD API for creating, reading, updating, and deleting patient appointments stored in MongoDB.

- 🔍 **User-Scoped Queries** — The `GET /appointments` endpoint filters results by the logged-in user's email via query parameter, ensuring each patient only sees their own bookings.

- 🩺 **Doctor Listings** — Serves the full list of doctors and individual doctor details from the `doctors` collection, powering the browse and search pages on the client.

- 🛡️ **Error Handling** — Every route is wrapped in try/catch with meaningful error responses and appropriate HTTP status codes (200, 404, 500).

- ⚡ **Fast & Lightweight** — Built on Express.js with minimal dependencies for quick cold starts and low latency, ideal for deployment on free-tier platforms like Render.

- 🌐 **CORS Enabled** — Cross-origin requests are configured to allow seamless communication with the Next.js frontend regardless of deployment environment.

- 🗄️ **MongoDB Atlas Integration** — Uses the official MongoDB Node.js driver with Server API versioning for stable, production-ready database connections.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| Driver | mongodb (official Node.js driver) |
| Config | dotenv |
| Deployment | Render |

---

## 📡 API Endpoints

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/appointments` | Book a new appointment |
| `GET` | `/appointments?email=` | Get appointments for a specific user |
| `PUT` | `/appointments/:id` | Update an existing appointment |
| `DELETE` | `/appointments/:id` | Delete an appointment |

### Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/all-appointments` | Get all doctors |
| `GET` | `/all-appointments/:id` | Get a single doctor by ID |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account and connection string

### Installation

```bash
git clone https://github.com/your-username/doc-appoint-server.git
cd doc-appoint-server
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### Run the Server

```bash
node index.js
```

Server will start at `http://localhost:5000`

---

## 📁 Project Structure

```
doc-appoint-server/
├── index.js        # Main server file — all routes and DB connection
├── .env            # Environment variables (not committed)
├── .gitignore
└── package.json
```

---

## 📦 Dependencies

```json
{
  "express": "^4.x",
  "mongodb": "^6.x",
  "dotenv": "^16.x",
  "cors": "^2.x"
}
```

---

## 👨‍💻 Author

**Shakhaoyat Hossain Chad**
- GitHub: [@your-username](https://github.com/your-username)
- Email: shakhaoyathossain.12@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

# 🚀 EMS — Event Management System

🌐 **Live Demo:** https://application-ems-client.onrender.com
**API: Visit if site is not loading. Hosting can be shut down because of innactivity** https://application-ems-api.onrender.com/events

**Test credentials:**

email: test@example.com
password: Password_123

---

A **full-stack Event Management System (EMS)** built with **NestJS** for the backend and **React + Vite** for the frontend in a **Turborepo monorepo** architecture.  
The application uses **PostgreSQL** as the primary database and runs easily with **Docker & Docker Compose**.

---

## 🧰 Tech Stack

| Layer            | Technology              |
| ---------------- | ----------------------- |
| Backend          | NestJS, TypeScript      |
| Frontend         | React, Vite, TypeScript |
| Database         | PostgreSQL              |
| Monorepo         | Turborepo               |
| Containerization | Docker & Docker Compose |

---

## 📦 Project Structure

```
application-ems-fullstack
│
├── apps
│   ├── api        # NestJS backend
│   └── client     # Vite + React frontend
│
├── packages       # Shared packages / configs
│
├── docker-compose.yml
├── turbo.json
└── package.json
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

Make sure you have installed:

- Docker
- Docker Compose
- Node.js **v20+** (optional for local development)

---

## 📥 Clone the Repository

```bash
git clone https://github.com/orest-krp/application-ems-fullstack.git
cd application-ems-fullstack
```

---

## ⚙️ Environment Setup

Create a `.env` file in the **root directory**.

You can copy the example configuration:

```bash
cp env.example .env
```

Example `.env` file:

```env
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=db

VITE_API_URL=http://localhost:8000

PORT=8000
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://myuser:mypassword@db:5432/db?schema=public

JWT_ACCESS_SECRET=secret_key
JWT_REFRESH_SECRET=secret_key
JWT_ACCESS_EXPIRATION_TIME=5m
JWT_REFRESH_EXPIRATION_TIME=7d

JWT_INVITATION=secret_key

GROQ_API_KEY=secret_key
```

## 🐳 Running the Application with Docker

### Build Docker Images

Run this **only the first time** or after Dockerfile changes.

```bash
docker compose build
```

---

### Start All Services

```bash
docker compose up -d
```

The `-d` flag runs containers in **detached mode** (background).

---

### Start & Build in One Command

```bash
docker compose up --build
```

---

### Check Running Containers

```bash
docker compose ps
```

---

### View Logs

```bash
docker compose logs -f
```

---

### Stop the Application

```bash
docker compose down
```

---

## 🌐 Access the Application

Once the containers are running:

| Service     | URL                   |
| ----------- | --------------------- |
| Frontend    | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| PostgreSQL  | localhost:5432        |

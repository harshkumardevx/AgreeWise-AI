<div align="center">

# 🛡️ AgreeWise AI

### AI-Powered Contract Analysis Platform

Analyze legal agreements using Artificial Intelligence.
Generate summaries, detect risky clauses, calculate risk scores, and receive practical recommendations within seconds.

---

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Groq](https://img.shields.io/badge/Groq-AI-orange?style=for-the-badge)](https://groq.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)]()

</div>

---

# 🌐 Live Demo

### 🚀 Frontend

https://agree-wise-ai.vercel.app/

### ⚡ Backend API

https://agreewise-ai.onrender.com

---

# 📸 Preview

> Add screenshots after deployment.

```
docs/
│
├── home.png
├── dashboard.png
├── upload.png
├── report.png
└── history.png
```

---

# ✨ Features

## 🤖 AI Contract Analysis

- AI-powered agreement summary
- Clause explanation
- Risk detection
- Risk score generation
- Smart recommendations

---

## 📄 Document Management

- Upload PDF contracts
- Cloudinary storage
- View uploaded documents
- Analysis history
- Report management

---

## 🔒 Authentication

- JWT Authentication
- Secure Login
- User Registration
- Protected Routes
- Password Hashing

---

## 📊 Dashboard

- Analytics Overview
- Total Documents
- Reports
- Average Risk
- Recent Analysis
- Risk Distribution Chart

---

## 📑 Reports

- AI Summary
- Risk Score
- Clause Analysis
- Recommendations
- Report Details

---

## 🎨 Premium UI

- Black + Gold Theme
- Responsive Design
- Framer Motion Animations
- Modern Dashboard
- Glassmorphism
- Dark Mode

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Shadcn UI
- Framer Motion
- React Router
- Recharts
- React Hot Toast
- React Dropzone
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Cloudinary

---

## AI

- Groq API
- GPT OSS 120B

---

# 📂 Project Structure

```
AgreeWise-AI/

│

├── client/
│   ├── public/
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── App.jsx
│
├── server/
│
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/agreewise-ai.git
```

```
cd agreewise-ai
```

---

## Client

```
cd client

npm install

npm run dev
```

---

## Server

```
cd server

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Client (.env)

```
VITE_API_URL=http://localhost:5000/api
```

---

## Server (.env)

```
PORT=5000

MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

GROQ_API_KEY=

GROQ_MODEL=openai/gpt-oss-120b
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/signup

POST /api/auth/login
```

---

## Documents

```
POST /api/document/upload

GET /api/document

DELETE /api/document/:id
```

---

## Reports

```
POST /api/report/analyze/:documentId

GET /api/report

GET /api/report/:id
```

---

# 🧠 AI Workflow

```
User Uploads PDF

        │

        ▼

Extract Text

        │

        ▼

Groq AI Analysis

        │

        ▼

Summary

Risk Score

Clauses

Recommendations

        │

        ▼

Save Report

        │

        ▼

Dashboard
```

---

# 🚀 Future Improvements

- AI Chat with Agreement
- OCR for Scanned PDFs
- DOCX Support
- Multi-language Analysis
- Team Workspace
- Export PDF
- Email Reports
- Version History
- AI Comparison Between Contracts

---

# 🤝 Contributing

Contributions are welcome.

1. Fork Repository

2. Create Feature Branch

3. Commit Changes

4. Push Branch

5. Open Pull Request

---

# 👨‍💻 Author

**Harsh Kumar**

B.Tech Computer Science Engineering

GitHub:
https://github.com/harshkumardevx

LinkedIn:
https://linkedin.com/in/harsh-kumar-devx


---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It helps others discover the project.

---

<div align="center">

Made with ❤️ using React, Node.js, MongoDB and Groq AI.

</div>

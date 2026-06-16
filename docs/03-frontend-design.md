# User Management Platform - Frontend Documentation

## Project Overview

Frontend application built using:

* React 19
* Vite
* React Router DOM
* Axios
* Bootstrap 5

Purpose:

Provide UI screens for:

* User Registration
* User Login
* Forgot Password
* Dashboard
* Backend API Integration

---

# Technology Stack

| Component        | Version |
| ---------------- | ------- |
| React            | 19.x    |
| Vite             | Latest  |
| Axios            | Latest  |
| React Router DOM | Latest  |
| Bootstrap        | 5.x     |

---

# Frontend Setup

## Create React Project

```bash
npm create vite@latest frontend -- --template react
```

Choose:

```text
React
JavaScript
```

---

## Navigate to Project

```bash
cd frontend
```

---

## Install Dependencies

### Axios

```bash
npm install axios
```

### React Router

```bash
npm install react-router-dom
```

### Bootstrap

```bash
npm install bootstrap
```

---

# Start Application

```bash
npm run dev
```

Application URL:

```text
http://localhost:5173
```

---

# Frontend Structure

```text
frontend/

├── package.json
├── vite.config.js
├── public
│
└── src
    │
    ├── main.jsx
    ├── App.jsx
    │
    ├── services
    │   └── api.js
    │
    ├── components
    │   └── Navbar.jsx
    │
    └── pages
        ├── Login.jsx
        ├── Register.jsx
        ├── ForgotPassword.jsx
        └── Dashboard.jsx
```

---

# Bootstrap Configuration

## File

```text
src/main.jsx
```

Added:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

---

# Axios Configuration

## File

```text
src/services/api.js
```

Purpose:

Centralized backend communication.

Code:

```javascript
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/users"
});

export default API;
```

---

# React Router Configuration

## File

```text
src/App.jsx
```

Routes:

```text
/
                → Login Page

/register
                → Registration Page

/forgot-password
                → Forgot Password Page

/dashboard
                → Dashboard Page
```

---

# Navbar Component

## File

```text
src/components/Navbar.jsx
```

Purpose:

Common navigation across application.

Links:

```text
Login
Register
Forgot Password
Dashboard
```

---

# Login Page

## File

```text
src/pages/Login.jsx
```

Features:

* Username Input
* Password Input
* Login Button
* Register Navigation
* Forgot Password Navigation

API:

```text
POST /api/users/login
```

Success Flow:

```text
Login
   ↓
Backend Validation
   ↓
Login Successful
   ↓
Navigate Dashboard
```

---

# Registration Page

## File

```text
src/pages/Register.jsx
```

Features:

* First Name
* Last Name
* Email
* Mobile
* Username
* Password

API:

```text
POST /api/users/register
```

Success Response:

```text
User Registered Successfully
```

---

# Forgot Password Page

## File

```text
src/pages/ForgotPassword.jsx
```

Features:

* Username
* Email
* New Password

API:

```text
POST /api/users/forgot-password
```

Success Response:

```text
Password Reset Successful
```

---

# Dashboard Page

## File

```text
src/pages/Dashboard.jsx
```

Current Features:

```text
Welcome Message

Frontend:
React

Backend:
Spring Boot

Database:
PostgreSQL

Logout Button
```

Current Data:

```text
Static Data
```

Planned Enhancement:

```text
Fetch Real User Profile
```

API:

```text
GET /api/users/profile/{username}
```

---

# Backend Integration

Frontend communicates with backend using Axios.

Example:

```javascript
API.post("/login", form)
```

Base URL:

```text
http://localhost:8080/api/users
```

---

# Authentication Flow

## Registration

```text
Register Page
      ↓
Axios
      ↓
POST /register
      ↓
Spring Boot
      ↓
PostgreSQL
```

---

## Login

```text
Login Page
      ↓
POST /login
      ↓
Validation
      ↓
Dashboard
```

---

## Forgot Password

```text
Forgot Password
        ↓
POST /forgot-password
        ↓
Password Updated
```

---

# Current Status

Completed:

```text
✅ React Setup
✅ Vite Setup
✅ Axios Configuration
✅ Bootstrap Configuration
✅ React Router
✅ Navbar
✅ Registration Page
✅ Login Page
✅ Forgot Password Page
✅ Dashboard Page
✅ Backend Integration
```

---

# Pending Enhancements

## User Profile Integration

Backend API:

```text
GET /api/users/profile/{username}
```

Dashboard:

```text
Display:

First Name
Last Name
Email
Mobile
Username
Created Date
```

---

## JWT Authentication

Planned:

```text
Login
    ↓
Generate JWT
    ↓
Store Token
    ↓
Protected Routes
```

---

## Session Management

Planned:

```text
Local Storage

OR

Session Storage
```

---

## UI Improvements

Planned:

```text
Better Forms
Toast Messages
Validation Messages
Responsive Design
Professional Dashboard
```

---

# Git Ignore

Frontend .gitignore should include:

```gitignore
node_modules/
dist/
.vscode/
.idea/
.DS_Store
.env
```

---

# Git Commit History

Frontend Setup:

```bash
git commit -m "Setup React frontend with Vite"
```

Authentication Pages:

```bash
git commit -m "Implemented frontend authentication flow"
```

Bootstrap UI:

```bash
git commit -m "Enhanced frontend with Bootstrap UI and navigation"
```

Profile API Preparation:

```bash
git commit -m "Added user profile API integration support"
```

---

# Next Phase

Phase 2:

```text
User Profile API Integration
JWT Authentication
Protected Routes
Session Management
```

Phase 3:

```text
Dockerize Frontend
Dockerize Backend
Docker Compose
```

Phase 4:

```text
Kubernetes
Helm
AKS
Monitoring
CI/CD
```

## Frontend Completion Status

```text
Core Functionality     100%
Authentication Flow   100%
UI Enhancement         80%
Security               20%
DevOps                  0%
```

# User Management Platform - Frontend

## Overview

Frontend application developed using React and Vite.

The application allows users to:

* Register
* Login
* Reset Password
* Access Dashboard
* View Profile Information

---

## Technology Stack

* React
* Vite
* React Router DOM
* Axios
* Bootstrap 5

---

## Project Structure

src/

components/

* Navbar.jsx

pages/

* Login.jsx
* Register.jsx
* ForgotPassword.jsx
* Dashboard.jsx

services/

* api.js

App.jsx

main.jsx

---

## Features

### Registration

Allows users to create a new account.

Fields:

* First Name
* Last Name
* Email
* Mobile
* Username
* Password

---

### Login

Allows registered users to login.

Fields:

* Username
* Password

---

### Forgot Password

Allows users to reset password.

Fields:

* Username
* Email
* New Password

---

### Dashboard

Displays:

* Welcome Message
* Application Information
* Logout Option

---

## API Integration

Backend URL

http://localhost:8080/api/users

Configured using Axios.

---

## Running Application

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run dev
```

Application URL:

http://localhost:5173

---

## Testing

### Registration

Navigate to:

http://localhost:5173/register

Create user account.

---

### Login

Navigate to:

http://localhost:5173

Login using registered credentials.

---

### Forgot Password

Navigate to:

http://localhost:5173/forgot-password

Reset password.

---

### Dashboard

Verify dashboard loads after successful login.

---

## Current Status

Completed Features:

* Registration
* Login
* Forgot Password
* Dashboard
* Profile Integration
* Logout

Frontend Status:

Completed

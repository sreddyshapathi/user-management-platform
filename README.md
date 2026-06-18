# User Management Platform - Project Documentation

## Project Overview

User Management Platform is a full-stack web application developed using React, Spring Boot, and PostgreSQL.

The application allows users to:

* Register new accounts
* Login using username and password
* Reset forgotten passwords
* View user profile information
* Access dashboard after successful login

---

# Technology Stack

## Frontend

* React
* Vite
* React Router DOM
* Axios
* Bootstrap 5

## Backend

* Spring Boot 3
* Spring Web
* Spring Data JPA
* Spring Validation
* Spring Security
* BCrypt Password Encryption
* Swagger OpenAPI

## Database

* PostgreSQL

## Build Tools

* Maven
* NodeJS
* NPM

## Version Control

* Git
* GitHub

---

# Application Architecture

User
|
v
React Frontend
|
| REST API Calls
v
Spring Boot Backend
|
| JPA/Hibernate
v
PostgreSQL Database

Swagger UI
|
v
Backend API Testing

---

# Frontend Structure

frontend/

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

# Backend Structure

backend/

src/main/java/com/sudhakar/user_management

controller/

* UserController.java

service/

* UserService.java

repository/

* UserRepository.java

entity/

* User.java

dto/

* UserRegistrationRequest.java
* LoginRequest.java
* ForgotPasswordRequest.java
* UserProfileResponse.java

config/

* SecurityConfig.java

---

# Features Implemented

## User Registration

Endpoint:

POST

/api/users/register

Functionality:

* Register new user
* Username validation
* Email validation
* Mobile validation
* Password encryption using BCrypt

Response:

User Registered Successfully

---

## User Login

Endpoint:

POST

/api/users/login

Functionality:

* Validate username
* Validate password
* Authenticate user

Response:

Login Successful

---

## Forgot Password

Endpoint:

POST

/api/users/forgot-password

Functionality:

* Verify username
* Verify email
* Reset password
* Encrypt new password

Response:

Password Reset Successful

---

## User Profile

Endpoint:

GET

/api/users/profile/{username}

Functionality:

* Retrieve user profile information

Response:

JSON Profile Data

---

# Database Design

Table Name:

users

Columns:

id

first_name

last_name

email

mobile

username

password

created_at

---

# Password Security

Passwords are never stored in plain text.

Spring Security BCryptPasswordEncoder is used.

Example:

$2a$10$xxxxxxxxxxxxxxxx

---

# Swagger Documentation

Swagger URL

http://localhost:8080/swagger-ui/index.html

Available APIs:

POST /register

POST /login

POST /forgot-password

GET /profile/{username}

---

# Frontend Pages

## Login Page

URL:

/

Features:

* Username
* Password
* Login Button
* Register Link
* Forgot Password Link

---

## Register Page

URL:

/register

Features:

* First Name
* Last Name
* Email
* Mobile
* Username
* Password

---

## Forgot Password Page

URL:

/forgot-password

Features:

* Username
* Email
* New Password

---

## Dashboard

URL:

/dashboard

Features:

* Welcome Message
* Application Information
* Logout Button

---

# API Integration

Axios Configuration

Backend Base URL:

http://localhost:8080/api/users

Frontend communicates with backend using REST APIs.

---

# Testing Performed

## Backend Testing

Swagger API Testing

Register API

Login API

Forgot Password API

Profile API

## Frontend Testing

Registration Page

Login Page

Dashboard Navigation

Forgot Password Page

Logout Functionality

## Database Testing

Verified user creation

Verified encrypted password storage

Verified profile retrieval

---

# Local Setup

## Backend

cd backend

./mvnw spring-boot:run

Runs on:

http://localhost:8080

---

## Frontend

cd frontend

npm install

npm run dev

Runs on:

http://localhost:5173

---

# Database Verification

Connect PostgreSQL

psql -U postgres

Select Database

\c user_management

View Users

select * from users;

Count Users

select count(*) from users;

Search User

select * from users
where username='your_username';

---

# Current Project Status

Backend

Completed

Frontend

Completed

Database

Completed

Swagger

Completed

Password Encryption

Completed

Profile API

Completed

Application Testing

Completed

---

# Future Enhancements

Docker

Docker Compose

GitHub Actions

Azure VM Deployment

Terraform Infrastructure

Azure AKS Deployment

Monitoring and Logging

CI/CD Pipeline

---

# Project Outcome

Successfully developed a Full Stack User Management Application using:

React

Spring Boot

PostgreSQL

Swagger

Spring Security

BCrypt Password Encryption

The application is fully functional and portfolio ready.


## Architecture

Architecture diagram will be added here.

## Technology Stack

* React
* Spring Boot
* PostgreSQL
* Docker
* Kubernetes
* Helm
* Azure Kubernetes Service

## Project Structure

frontend/
backend/
database/
docker/
k8s/
helm/
docs/

User
 |
 v
React Frontend (Vite)
 |
 | REST API
 v
Spring Boot Backend
 |
 | JPA/Hibernate
 v
PostgreSQL Database

Swagger UI
 |
 v
Backend API Testing


Technologies Used:
Frontend
---------
React
Vite
Bootstrap
Axios
React Router

Backend
--------
Spring Boot
Spring Data JPA
Spring Security
Swagger OpenAPI
BCrypt

Database
--------
PostgreSQL

Build Tools
-----------
Maven
NodeJS

Version Control
---------------
Git
GitHub

# Backend Design and Implementation Guide

## Overview

The backend application is developed using Spring Boot 3 and PostgreSQL.

The purpose of the backend is to provide REST APIs for:

* User Registration
* User Login
* Password Management
* User Profile Management

---

# Technology Stack

| Component   | Version  |
| ----------- | -------- |
| Java        | 21       |
| Spring Boot | 3.5.x    |
| Maven       | 3.9.x    |
| PostgreSQL  | 18.x     |
| Hibernate   | JPA      |
| Lombok      | Latest   |
| BCrypt      | Security |
| Git         | Latest   |

---

# Environment Setup

## Verify Java

```bash
java -version
```

## Verify Maven

```bash
./mvnw -version
```

---

# Project Creation

Spring Initializr Configuration

Project: Maven

Language: Java

Packaging: Jar

Java: 21

Group:

com.sudhakar

Artifact:

user-management

Package:

com.sudhakar.user_management

---

# Dependencies

Implemented Dependencies

* Spring Web
* Spring Data JPA
* PostgreSQL Driver
* Lombok
* Validation
* Spring Security Crypto (BCrypt)

---

# Project Structure

```text
backend/

├── src/main/java/com/sudhakar/user_management
│
├── controller
│   └── UserController.java
│
├── service
│   └── UserService.java
│
├── repository
│   └── UserRepository.java
│
├── entity
│   └── User.java
│
├── dto
│   ├── UserRegistrationRequest.java
│   └── LoginRequest.java
│
├── config
│   └── ApplicationConfig.java
│
└── UserManagementApplication.java
```

---

# Database

Database:

user_management

Table:

users

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile VARCHAR(20) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Application Configuration

application.properties

```properties
spring.application.name=user-management

spring.datasource.url=jdbc:postgresql://localhost:5432/user_management
spring.datasource.username=shapathisudhakarreddy
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.port=8080
```

---

# Entity Layer

Implemented:

User.java

Purpose:

Maps Java entity to users database table.

---

# DTO Layer

Implemented:

* UserRegistrationRequest.java
* LoginRequest.java

Purpose:

Transfer request payloads from API layer to service layer.

---

# Repository Layer

Implemented:

UserRepository.java

Methods:

* existsByUsername()
* existsByEmail()
* existsByMobile()
* findByUsername()

---

# Service Layer

Implemented:

UserService.java

Responsibilities:

* User Registration
* User Login
* Duplicate Validation
* Password Encryption
* Authentication

---

# Security

Implemented BCrypt Password Encryption

Configuration:

ApplicationConfig.java

Password Storage Example

Before:

```text
Password123
```

After BCrypt:

```text
$2a$10$A6Z8Yn567Dp6rPSFbUexkOeNJco352ntam4inOJnc9vSjEFkwjZYq
```

Benefits:

* Passwords are not stored in plain text.
* Industry-standard password hashing.
* Secure authentication mechanism.

---

# Implemented APIs

## Register User

Endpoint

POST /api/users/register

Request

```json
{
  "firstName":"Sudhakar",
  "lastName":"Reddy",
  "email":"sudhakar@gmail.com",
  "mobile":"9876543210",
  "username":"sudhakar",
  "password":"Password123"
}
```

Response

```text
User Registered Successfully
```

---

## Login User

Endpoint

POST /api/users/login

Request

```json
{
  "username":"sudhakar",
  "password":"Password123"
}
```

Response

```text
Login Successful
```

---

# Testing

Application Startup

```bash
./mvnw spring-boot:run
```

Registration Testing

```bash
curl -X POST http://localhost:8080/api/users/register
```

Login Testing

```bash
curl -X POST http://localhost:8080/api/users/login
```

---

# Database Verification

```bash
psql -d user_management
```

Verify User Data

```sql
SELECT * FROM users;
```

Verify BCrypt Password

```sql
SELECT username,password FROM users;
```

---

# Current Status

Completed

* Java Installation
* Maven Setup
* PostgreSQL Setup
* Database Creation
* Users Table Creation
* Spring Boot Project Creation
* Entity Layer
* DTO Layer
* Repository Layer
* Service Layer
* Controller Layer
* Registration API
* Login API
* BCrypt Password Encryption
* PostgreSQL Persistence Testing
* GitHub Repository Integration

## Forgot Password API

Endpoint

POST /api/users/forgot-password

Request

```json
{
  "username":"sudhakar",
  "email":"sudhakar@gmail.com",
  "newPassword":"NewPassword123"
}
```

Response

```text
Password Reset Successful
```

Purpose

Allows a registered user to reset their password by validating username and email address.

Security

The new password is encrypted using BCrypt before being stored in PostgreSQL.

---

# Next Phase

Pending

* Forgot Password API
* Request Validation
* Global Exception Handling
* Swagger Documentation
* React Frontend
* Dockerization
* Docker Compose
* Kubernetes Deployment
* Helm Charts
* AKS Deployment
* Prometheus
* Grafana
* CI/CD Pipeline

---

# Git Commit History

Commit 1

Initial backend project setup

Commit 2

Implemented user registration API

Commit 3

Implemented login API

Commit 4

Implemented BCrypt password encryption

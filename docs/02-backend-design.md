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

| Component   | Version |
| ----------- | ------- |
| Java        | 21      |
| Spring Boot | 3.5.x   |
| Maven       | 3.9.x   |
| PostgreSQL  | 18.x    |
| Hibernate   | JPA     |
| Lombok      | Latest  |
| Git         | Latest  |

---

# Environment Setup

## Verify Java

```bash
java -version
```

Expected:

```text
openjdk version "21.x"
```

---

## Verify Maven

```bash
./mvnw -version
```

Expected:

```text
Apache Maven 3.9.x
Java version: 21
```

---

# Project Creation

Spring Initializr Configuration:

Project: Maven

Language: Java

Spring Boot: 3.5.x

Packaging: Jar

Java: 21

Group:

```text
com.sudhakar
```

Artifact:

```text
user-management
```

Package:

```text
com.sudhakar.user_management
```

---

# Dependencies

Added Dependencies:

* Spring Web
* Spring Data JPA
* PostgreSQL Driver
* Lombok
* Validation
* Spring Security (removed temporarily for development)

---

# Project Structure

```text
backend/

├── pom.xml
├── mvnw
├── src
│
├── controller
│
├── service
│
├── repository
│
├── entity
│
├── dto
│
├── exception
│
└── config
```

---

# PostgreSQL Setup

## Create Database

```sql
CREATE DATABASE user_management;
```

Verify:

```sql
\l
```

---

# Database Schema

File:

```text
database/scripts/schema.sql
```

Schema:

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

Apply Schema:

```bash
psql -d user_management -f database/scripts/schema.sql
```

---

# Spring Boot Configuration

File:

```text
src/main/resources/application.properties
```

Configuration:

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

```text
User.java
```

Purpose:

Maps Java object to users database table.

Annotations Used:

* @Entity
* @Table
* @Id
* @GeneratedValue
* @Column

---

# DTO Layer

Implemented:

```text
UserRegistrationRequest.java
```

Purpose:

Accept registration payload from API requests.

---

# Repository Layer

Implemented:

```text
UserRepository.java
```

Purpose:

Database operations using Spring Data JPA.

Methods:

* existsByUsername()
* existsByEmail()
* existsByMobile()

---

# Service Layer

Implemented:

```text
UserService.java
```

Responsibilities:

* Validate duplicates
* Create user
* Save user to database

Validations:

* Duplicate Username
* Duplicate Email
* Duplicate Mobile

---

# Controller Layer

Implemented:

```text
UserController.java
```

Endpoint:

POST

```text
/api/users/register
```

Purpose:

Accept registration requests and invoke service layer.

---

# Registration API

Request:

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

Response:

```text
User Registered Successfully
```

---

# Testing

Application Startup:

```bash
./mvnw spring-boot:run
```

API Testing:

```bash
curl -X POST http://localhost:8080/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "firstName":"Sudhakar",
  "lastName":"Reddy",
  "email":"sudhakar@gmail.com",
  "mobile":"9876543210",
  "username":"sudhakar",
  "password":"Password123"
}'
```

Expected Output:

```text
User Registered Successfully
```

---

# Database Verification

Connect:

```bash
psql -d user_management
```

Verify:

```sql
SELECT * FROM users;
```

Result:

```text
id
first_name
last_name
email
mobile
username
password
created_at
```

---

# Current Status

Completed:

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
* PostgreSQL Persistence Testing

---

# Next Phase

Pending:

* Login API
* Password Encryption (BCrypt)
* Forgot Password API
* Validation Framework
* Exception Handling
* Swagger Documentation
* React Frontend
* Dockerization
* Kubernetes Deployment
* Helm Charts
* AKS Deployment
* Monitoring Integration

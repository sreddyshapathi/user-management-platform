# Dockerization Documentation

## Project

**User Management Platform**

A full-stack application developed using:

* React
* Spring Boot
* PostgreSQL

The application has been successfully containerized using Docker and Docker Compose.

---

# Objective

Containerize the complete application and run all services using Docker Compose.

Instead of running:

* React manually
* Spring Boot manually
* PostgreSQL manually

the complete application can now be started using a single command.

---

# Docker Architecture

```
                    Docker Compose
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
      ▼                    ▼                    ▼
 React Frontend      Spring Boot API      PostgreSQL
     (Nginx)            (Java 21)         Database
```

Frontend communicates with Backend using REST APIs.

Backend communicates with PostgreSQL using Spring Data JPA.

Docker Compose creates a private Docker network allowing containers to communicate using service names.

---

# Docker Files Created

## Backend

```
backend/

Dockerfile

.dockerignore
```

---

## Frontend

```
frontend/

Dockerfile

nginx.conf

.dockerignore
```

---

## Project Root

```
docker-compose.yml
```

---

# Backend Dockerfile

Purpose

* Build Spring Boot application
* Package executable JAR
* Run using Java 21 runtime

Used Multi Stage Build

Stage 1

* Maven Build Image

Stage 2

* Eclipse Temurin Java Runtime

Benefits

* Smaller Docker Image
* Faster Startup
* Production Ready

---

# Frontend Dockerfile

Purpose

Build React Application

Serve React Application using Nginx

Multi Stage Build

Stage 1

NodeJS

* npm install
* npm run build

Stage 2

Nginx

Serves static files from

```
/usr/share/nginx/html
```

---

# nginx.conf

Purpose

Support React Router.

Important configuration

```
try_files $uri $uri/ /index.html;
```

This prevents

404 errors

when refreshing pages such as

/dashboard

/register

/forgot-password

---

# Docker Ignore

Backend

```
target

.git

.idea

.vscode
```

Frontend

```
node_modules

dist

.git

.idea

.vscode
```

Purpose

Reduce Docker Build Context

Improve Build Performance

---

# Docker Images

Created Images

Backend

```
user-management-backend:v1
```

Frontend

```
user-management-frontend:v1
```

PostgreSQL

```
postgres:16
```

---

# Docker Compose

Services

## PostgreSQL

Image

```
postgres:16
```

Database

```
user_management
```

Port

```
5432
```

Persistent Volume

```
postgres_data
```

---

## Backend

Image

```
user-management-backend:v1
```

Port

```
8080
```

Environment Variables

Datasource URL

```
jdbc:postgresql://postgres:5432/user_management
```

Container communicates with PostgreSQL using Docker Network.

---

## Frontend

Image

```
user-management-frontend:v1
```

Port

```
3000
```

Frontend communicates with Backend using REST APIs.

---

# Docker Network

Docker Compose automatically creates a private bridge network.

Containers communicate using service names.

Example

Instead of

```
localhost
```

Backend uses

```
postgres
```

Example

```
jdbc:postgresql://postgres:5432/user_management
```

---

# Docker Volume

Created Volume

```
postgres_data
```

Purpose

Persist PostgreSQL data even after containers are restarted.

---

# CORS Configuration

Problem

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:8080
```

Different Origins caused browser CORS errors.

Solution

Configured Spring Security CORS.

Allowed Origin

```
http://localhost:3000
```

Allowed Methods

* GET
* POST
* PUT
* DELETE
* OPTIONS

---

# Docker Commands Used

Build Backend

```
cd backend

docker build -t user-management-backend:v1 .
```

Build Frontend

```
cd frontend

docker build -t user-management-frontend:v1 .
```

Run Docker Compose

```
docker compose up -d
```

Stop Containers

```
docker compose down
```

View Running Containers

```
docker ps
```

View Images

```
docker images
```

Container Logs

```
docker compose logs backend

docker compose logs frontend

docker compose logs postgres
```

Restart Containers

```
docker compose restart
```

---

# Issues Encountered

## Docker Daemon Not Running

Error

Cannot connect to Docker daemon

Solution

Started Docker Desktop.

---

## Backend Container Exited

Cause

Database connection.

Solution

Docker Compose.

---

## PostgreSQL Connection

Cause

Used localhost.

Solution

Changed datasource URL to

```
postgres
```

inside Docker Compose.

---

## CORS Error

Cause

React application blocked by browser.

Solution

Added CORS configuration inside Spring Security.

---

## Password Validation

Backend validation required minimum 8 characters.

Corrected test data.

---

# Testing

Backend

Swagger

```
http://localhost:8080/swagger-ui/index.html
```

Verified

* Registration
* Login
* Forgot Password
* Profile

Frontend

```
http://localhost:3000
```

Verified

* Registration
* Login
* Dashboard
* Forgot Password

Database

Verified data stored successfully inside PostgreSQL container.

---

# Project Status

Completed

✔ React Application

✔ Spring Boot Application

✔ PostgreSQL

✔ Swagger

✔ Docker

✔ Docker Compose

✔ Nginx

✔ CORS

✔ Multi Container Application

---

# Next Phase

Kubernetes

Tasks

* Install Minikube
* Kubernetes Deployments
* Services
* ConfigMaps
* Secrets
* Persistent Volumes
* Ingress
* Helm Charts
* GitHub Actions
* Azure AKS

---

# Conclusion

The User Management Platform has been successfully containerized using Docker.

The application consists of three containers:

* React Frontend
* Spring Boot Backend
* PostgreSQL Database

Docker Compose orchestrates all services, enabling the entire application stack to start with a single command.

This implementation follows modern containerization practices and provides a solid foundation for deploying the application to Kubernetes and Azure Kubernetes Service (AKS).

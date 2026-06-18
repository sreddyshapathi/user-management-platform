
+--------------------+
|      User          |
| (Web Browser)      |
+---------+----------+
          |
          v
+--------------------+
| React Frontend     |
| Vite + Bootstrap   |
| Port : 5173        |
+---------+----------+
          |
          | HTTP REST API
          |
          v
+--------------------+
| Spring Boot API    |
| Port : 8080        |
| UserController     |
| UserService        |
| UserRepository     |
+---------+----------+
          |
          |
          v
+--------------------+
| PostgreSQL         |
| users table        |
+--------------------+

          ^
          |
+--------------------+
| Swagger UI         |
| API Testing        |
+--------------------+


Local deloyment :
MacBook
│
├── Frontend
│   ├── React
│   ├── Vite
│   └── localhost:5173
│
├── Backend
│   ├── Spring Boot
│   ├── Swagger
│   └── localhost:8080
│
└── PostgreSQL
    └── user_management DB



Cloud platform:
React Frontend
      │
      ▼
Spring Boot Backend
      │
      ▼
PostgreSQL Database

Docker
      │
      ▼
Kubernetes
      │
      ▼
AKS
      │
      ▼
Prometheus + Grafana


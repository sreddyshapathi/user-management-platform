# Database Design

## Overview

PostgreSQL is used as the primary relational database for the User Management Platform.

The database stores user registration and authentication information.

---

## Users Table

| Column     | Data Type    | Description            |
| ---------- | ------------ | ---------------------- |
| id         | BIGSERIAL    | Primary Key            |
| first_name | VARCHAR(100) | User First Name        |
| last_name  | VARCHAR(100) | User Last Name         |
| email      | VARCHAR(255) | Unique Email           |
| mobile     | VARCHAR(20)  | Unique Mobile Number   |
| username   | VARCHAR(100) | Unique Username        |
| password   | VARCHAR(255) | Encrypted Password     |
| created_at | TIMESTAMP    | Registration Timestamp |

---

## Constraints

* Unique Username
* Unique Email
* Unique Mobile Number
* Mandatory Password
* Mandatory First Name

---

## Future Enhancements

* User Roles
* Audit Columns
* Password History
* Account Locking

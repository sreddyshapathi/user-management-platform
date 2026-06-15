# API Documentation

## Register User

POST /api/users/register

Request:

{
"firstName": "Sudhakar",
"lastName": "Reddy",
"email": "[test@gmail.com](mailto:test@gmail.com)",
"mobile": "9876543210",
"username": "sudhakar",
"password": "Password123"
}

Response:

201 Created

---

## Login User

POST /api/users/login

Request:

{
"username": "sudhakar",
"password": "Password123"
}

Response:

200 OK

---

## Reset Password

POST /api/users/reset-password

Response:

200 OK

---

## Get User Profile

GET /api/users/{id}

Response:

200 OK

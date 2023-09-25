<!-- @format -->

# API Documentation

## Introduction

This API documentation provides details about the endpoints and functionality of the authentication and session management system.

### Authentication Endpoints

#### 1. Login

- **Endpoint:** `/login`
- **Method:** POST
- **Description:** Authenticate a user by university ID and password and provide a JWT token for authorization.
- **Request Body:**
  - `universityId` (string): User's university ID.
  - `password` (string): User's password.
- **Response:**
  - `token` (string): JWT token for authorized access.

#### 2. Register (Signup)

- **Endpoint:** `/register`
- **Method:** POST
- **Description:** Register a new user by providing a university ID and password.
- **Request Body:**
  - `universityId` (string): User's university ID.
  - `password` (string): User's password.
- **Response:**
  - `message` (string): Success message.

#### 3. Dean Signup

- **Endpoint:** `/dean-signup`
- **Method:** POST
- **Description:** Register a new Dean by providing a university ID and password.
- **Request Body:**
  - `universityId` (string): Dean's university ID.
  - `password` (string): Dean's password.
- **Response:**
  - `token` (string): JWT token for authorized access.

#### 4. Dean Login

- **Endpoint:** `/dean-login`
- **Method:** POST
- **Description:** Authenticate a Dean by university ID and password and provide a JWT token for authorization.
- **Request Body:**
  - `universityId` (string): Dean's university ID.
  - `password` (string): Dean's password.
- **Response:**
  - `token` (string): JWT token for authorized access.

#### 5. Student B Login

- **Endpoint:** `/student-b-login`
- **Method:** POST
- **Description:** Authenticate a Student B by university ID and password and provide a JWT token for authorization.
- **Request Body:**
  - `universityId` (string): Student B's university ID.
  - `password` (string): Student B's password.
- **Response:**
  - `token` (string): JWT token for authorized access.

### Session Endpoints

#### 6. Get Available Sessions

- **Endpoint:** `/available`
- **Method:** GET
- **Description:** Retrieve a list of available sessions that are not booked by any student.
- **Response:**
  - Array of session objects.

#### 7. Create a New Session

- **Endpoint:** `/create`
- **Method:** POST
- **Description:** Create a new session for students to book.
- **Request Body:**
  - `slot` (string): Details of the session slot.
- **Response:**
  - `message` (string): Success message.
  - `session` (object): Details of the created session.

#### 8. Book a Session

- **Endpoint:** `/book`
- **Method:** POST
- **Description:** Allow a student to book a session.
- **Request Body:**
  - `sessionId` (string): ID of the session to be booked.
- **Response:**
  - `message` (string): Success message.

#### 9. Dean Views Pending Sessions

- **Endpoint:** `/pending-for-dean`
- **Method:** GET
- **Description:** Retrieve pending sessions for a Dean.
- **Response:**
  - Array of pending session objects.

#### 10. Dean Views Pending Sessions

- **Endpoint:** `/pending`
- **Method:** GET
- **Description:** Retrieve pending sessions for Dean's view.
- **Response:**
  - Array of session objects.

## Authentication

To access the authentication endpoints (Login, Register, Dean Signup, Dean Login, Student B Login), provide the necessary data in the request body and obtain a JWT token for authorized access.

## Sessions

The session endpoints (Get Available Sessions, Create a New Session, Book a Session, Dean Views Pending Sessions) allow students and Deans to manage sessions for booking and viewing. Ensure proper authorization for accessing these endpoints.

---

**Note:** This API documentation provides a high-level overview of the available endpoints and their functionality. Please refer to the API's specific documentation for more detailed information on request and response formats, error handling, and any additional features specific to your project.

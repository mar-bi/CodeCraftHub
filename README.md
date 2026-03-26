# 📚 CodeCraftHub - Personal Learning Platform

![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)
![Express](https://img.shields.io/badge/Express-v4.18+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

A simple and intuitive REST API platform for developers to track and manage their learning courses. Built with Node.js and Express, perfect for learning REST API fundamentals.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#️-installation)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Example Usage](#-example-usage)
- [Project Structure](#-project-structure)
- [License](#-license)
- [Contributing](#-contributing)
- [Author](#-author)
- [Show your support](#-show-your-support)

## 🎯 Project Overview

CodeCraftHub is a lightweight personal learning management system designed specifically for developers who want to:

- Track courses they're learning
- Monitor progress across multiple courses
- Set and track completion goals
- Organize learning paths

**Why this project?**

- 🚀 Perfect for learning REST API development
- 💾 Uses simple JSON file storage (no database required)
- 🔧 Easy to understand and modify
- 📖 Well-documented and beginner-friendly

## ✨ Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete courses
- 📊 **Status Tracking**: Monitor course progress (Not Started, In Progress, Completed)
- 🎯 **Goal Setting**: Set target completion dates
- 🔍 **Filtering**: Filter courses by status
- 💾 **Persistent Storage**: Data saved in JSON format
- 🌐 **RESTful API**: Follow REST best practices
- ⚡ **Lightweight**: No database setup required
- 📝 **Detailed Responses**: Informative success/error messages

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.x or higher)
- **npm** (usually comes with Node.js)
- A code editor (VS Code, Sublime Text, etc.)
- API testing tool (Postman, Insomnia, or cURL)

Check your versions:

```bash
node --version
npm --version
```

## 🛠️ Installation

Step 1: Clone or Download the Project

Option A: Clone with Git

```bash
git clone https://github.com/yourusername/codecrafthub.git
cd codecrafthub
```

Option B: Manual Setup

```bash
mkdir CodeCraftHub
cd CodeCraftHub
```

Step 2: Initialize the Project
If starting from scratch:

```bash
npm init -y
```

Step 3: Install Dependencies

```bash
npm install express
npm install --save-dev nodemon
```

Step 4: Create Project Structure

```bash
# Create directories
mkdir routes controllers utils data

# Create files (Unix/Mac/Linux)
touch server.js routes/courses.js controllers/courseController.js utils/fileHandler.js data/courses.json

# For Windows (PowerShell)

New-Item -ItemType File server.js, routes/courses.js, controllers/courseController.js, utils/fileHandler.js, data/courses.json
```

Step 5: Initialize Data File
Add the following to data/courses.json:

```json
{
  "courses": [],
  "lastId": 0
}
```

Step 6: Copy the Code
Copy all the code files from the implementation guide into their respective locations.

## 🚀 Running the Application

Development Mode (with auto-restart)

```bash
npm run dev
```

Production Mode

```bash
npm start
```

You should see:

```bash
🚀 CodeCraftHub is running on http://localhost:3000
📚 API available at http://localhost:3000/api/courses
```

Verify Installation

Open your browser or use cURL:

```
curl http://localhost:3000
```

Expected response:

```json
{
  "message": "Welcome to CodeCraftHub API",
  "version": "1.0.0",
  "endpoints": {
    "courses": "/api/courses"
  }
}
```

## 📖 API Documentation

Base URL:

```
http://localhost:3000/api
```

### Endpoints Overview

| Method | Endpoint                  | Description           | Auth Required |
| ------ | ------------------------- | --------------------- | ------------- |
| GET    | `/courses`                | Get all courses       | No            |
| GET    | `/courses/stats`          | Get course statistics | No            |
| GET    | `/courses/:id`            | Get specific course   | No            |
| GET    | `/courses/status/:status` | Get courses by status | No            |
| POST   | `/courses`                | Create new course     | No            |
| PUT    | `/courses/:id`            | Update course         | No            |
| DELETE | `/courses/:id`            | Delete course         | No            |

### 1. Get All Courses

**Endpoint:** `GET /api/courses`

**Description:** Retrieve all courses in your learning path.

**Request:**

```bash
curl http://localhost:3000/api/courses
```

**Response:** `200 OK`

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Node.js Masterclass",
      "description": "Learn Node.js from scratch to advanced",
      "targetCompletionDate": "2024-12-31",
      "status": "In Progress",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "React Complete Guide",
      "description": "Master React and build modern web apps",
      "targetCompletionDate": "2024-11-30",
      "status": "Not Started",
      "createdAt": "2024-01-16T14:20:00.000Z"
    }
  ]
}
```

### 2. Get Course by ID

**Endpoint**: `GET /api/courses/:id`

**Description:** Retrieve a specific course by its ID.

**Parameters:** `id`

(path parameter) - The course ID

**Request:**

```bash
curl http://localhost:3000/api/courses/1
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Node.js Masterclass",
    "description": "Learn Node.js from scratch to advanced",
    "targetCompletionDate": "2024-12-31",
    "status": "In Progress",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response:** `404 Not Found`

```json
{
  "success": false,
  "message": "Course not found"
}
```

### 3. Get Courses by Status

**Endpoint:** `GET /api/courses/status/:status`

**Description:** Filter courses by their current status.

**Valid Status Values:**

```
 - Not Started
 - In Progress
 - Completed
```

**Request:**

```bash
# URL encode spaces as %20

curl http://localhost:3000/api/courses/status/In%20Progress
```

**Response:** `200 OK`

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "Node.js Masterclass",
      "description": "Learn Node.js from scratch to advanced",
      "targetCompletionDate": "2024-12-31",
      "status": "In Progress",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error Response:** `400 Bad Request`

```json
{
  "success": false,
  "message": "Invalid status. Must be one of: Not Started, In Progress, Completed"
}
```

### 4. Create New Course

**Endpoint:** `POST /api/courses`

**Description:** Add a new course to your learning path.

**Request Body:**

```json
{
  "name": "Python for Data Science",
  "description": "Learn Python programming for data analysis and machine learning",
  "targetCompletionDate": "2024-10-15",
  "status": "Not Started"
}
```

**Required Fields:**

`name`
(string) - Course name

`description`
(string) - Course description

`targetCompletionDate`
(string) - Target date in YYYY-MM-DD format

**Optional Fields:**

`status`
(string) - Default: "Not Started"

**Request:**

```bash
curl -X POST http://localhost:3000/api/courses \
 -H "Content-Type: application/json" \
 -d '{
"name": "Python for Data Science",
"description": "Learn Python programming for data analysis",
"targetCompletionDate": "2024-10-15",
"status": "Not Started"
}'
```

**Response:** `201 Created`

```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": 3,
    "name": "Python for Data Science",
    "description": "Learn Python programming for data analysis",
    "targetCompletionDate": "2024-10-15",
    "status": "Not Started",
    "createdAt": "2024-01-17T09:15:00.000Z"
  }
}
```

**Error Response:** `400 Bad Request`

```json
{
  "success": false,
  "message": "Please provide name, description, and target completion date"
}
```

### 5. Update Course

**Endpoint:** `PUT /api/courses/:id`

**Description:** Update an existing course. You can update one or multiple fields.

**Parameters:**
`id`
(path parameter) - The course ID

**Request Body** (all fields optional):

```json
{
  "name": "Updated Course Name",
  "description": "Updated description",
  "targetCompletionDate": "2024-12-31",
  "status": "In Progress"
}
```

**Request:**

```bash
curl -X PUT http://localhost:3000/api/courses/1 \
 -H "Content-Type: application/json" \
 -d '{
"status": "Completed"
}'
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "id": 1,
    "name": "Node.js Masterclass",
    "description": "Learn Node.js from scratch to advanced",
    "targetCompletionDate": "2024-12-31",
    "status": "Completed",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-20T16:45:00.000Z"
  }
}
```

**Error Response:** `404 Not Found`

```json
{
  "success": false,
  "message": "Course not found"
}
```

### 6. Delete Course

**Endpoint:** `DELETE /api/courses/:id`

**Description:** Remove a course from your learning path.

**Parameters:**

`id`
(path parameter) - The course ID

**Request:**

`curl -X DELETE http://localhost:3000/api/courses/1`

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Course deleted successfully",
  "data": {
    "id": 1,
    "name": "Node.js Masterclass",
    "description": "Learn Node.js from scratch to advanced",
    "targetCompletionDate": "2024-12-31",
    "status": "Completed",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response:**

`404 Not Found`

```json
{
  "success": false,
  "message": "Course not found"
}
```

### 7. Get Course Statistics

**Endpoint:** `GET /api/courses/stats`

**Description:** Get overview statistics about all your courses including total count, breakdown by status, and completion rate.

**Request:**

```bash
curl http://localhost:3000/api/courses/stats
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "totalCourses": 8,
    "byStatus": {
      "Not Started": 3,
      "In Progress": 3,
      "Completed": 2
    },
    "completionRate": "25.00%"
  }
}
```

**Response Fields:**

- `totalCourses` - Total number of courses in your learning path
- `byStatus` - Breakdown of courses by their current status
  - `Not Started` - Courses you haven't begun yet
  - `In Progress` - Courses you're currently working on
  - `Completed` - Courses you've finished
- `completionRate` - Percentage of completed courses

## 💡 Example Usage

### Using cURL

Complete Workflow Example

```bash
# 1. Create a new course

curl -X POST http://localhost:3000/api/courses \
 -H "Content-Type: application/json" \
 -d '{
"name": "Docker & Kubernetes",
"description": "Master containerization and orchestration",
"targetCompletionDate": "2024-09-30",
"status": "Not Started"
}'

# 2. Get all courses

curl http://localhost:3000/api/courses

# 3. Update course status

curl -X PUT http://localhost:3000/api/courses/1 \
 -H "Content-Type: application/json" \
 -d '{"status": "In Progress"}'

# 4. Get courses in progress

curl http://localhost:3000/api/courses/status/In%20Progress

# 5. Mark course as completed

curl -X PUT http://localhost:3000/api/courses/1 \
 -H "Content-Type: application/json" \
 -d '{"status": "Completed"}'

# 6. Delete a course

curl -X DELETE http://localhost:3000/api/courses/1

# 7. Get stats

curl http://localhost:3000/api/courses/stats
```

### Using JavaScript (Fetch API)

```js
// Get all courses
fetch("http://localhost:3000/api/courses")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Create a new course
fetch("http://localhost:3000/api/courses", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "GraphQL Fundamentals",
    description: "Learn GraphQL from basics to advanced",
    targetCompletionDate: "2024-08-20",
    status: "Not Started",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Update a course
fetch("http://localhost:3000/api/courses/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    status: "In Progress",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Delete a course
fetch("http://localhost:3000/api/courses/1", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Get stats
fetch("http://localhost:3000/api/courses/stats")
  .then((response) => response.json())
  .then((data) => {
    console.log(`Total Courses: ${data.data.totalCourses}`);
    console.log(`Completion Rate: ${data.data.completionRate}`);
    console.log("Status Breakdown:", data.data.byStatus);
  })
  .catch((error) => console.error("Error:", error));
```

## 📊 Project structure

```
CodeCraftHub/
├── app.js # Main application file
├── routes/
│ └── courses.js # Course routes
├── controllers/
│ └── courseController.js # Business logic
├── utils/
│ └── fileHandler.js # JSON file operations
├── data/
│ └── courses.json # Data storage
├── scripts/
│ └── seedData.js # Testing script
├── package.json # Dependencies
├── example_workflow.md # Simple testing description
├── README.md
└── .gitignore
```

## 📜 License

MIT License © 2024 CodeCraftHub

This project is open source and available under the [MIT License](LICENSE).

**You are free to:**

- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Use privately

**Conditions:**

- 📋 Include license and copyright notice

See the [LICENSE](LICENSE) file for full details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Created and maintained by [Marina B.](https://github.com/mar-bi)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you learn REST APIs!

# Course Selling Website

A simple course selling website similar to Udemy. This project includes two types of users: Admins and Users, and it supports basic course management and purchasing functionalities.

## Description

This project involves creating a course selling app with the following features:
- Admins can sign up and create courses.
- Users can sign up, view available courses, and purchase courses.
- Authentication for this project is done by sending the username and password in the headers for each authenticated request.

The data is stored persistently using MongoDB.

## Features

### Admin Routes

#### POST /admin/signup

- **Description:** Creates a new admin account.
- **Input Body:**
  ```json
  {
    "username": "admin",
    "password": "pass"
  }

- **Output**
  ```json
  {
    "message": "Admin created successfully"
  }

#### POST /admin/courses

- **Description:** Creates a new admin account.
- **Input Body:**
  ```json
    {
    "username": "username",
    "password": "password"
  }


- **Output**
  ```json
    {
    "title": "course title",
    "description": "course description",
    "price": 100,
    "imageLink": "https://linktoimage.com"
    }

 #### GET /admin/courses

- **Description:** Creates a new admin account.
- **Input Body:**
  ```json
    {
    "username": "username",
    "password": "password"
  }


- **Output**
  ```json
        {
      "courses": [
        {
          "id": 1,
          "title": "course title",
          "description": "course description",
          "price": 100,
          "imageLink": "https://linktoimage.com",
          "published": true
        },
      ]
    }
  
##  Similarily we have various User Routes as 
- POST /users/signup
- GET /users/courses
- POST /users/courses/
- GET /users/purchasedCourses


## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/akashrajakku/Course-Selling-Site.git
   cd Course-Selling-Site
   
2. **Install dependencies:**
   ```bash
   npm install

3. **Setup MongoDB:**
   - Make sure you have a running instance of MongoDB.

4. **Run the application:**
   - Navigate to "course-selling-site" directory in terminal and execute index.js file in root directory
   ```bash
   node index.js

5. **API Testing:**
  - Use Postman or any other API client to test the endpoints.



  



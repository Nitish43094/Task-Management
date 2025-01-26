# Task Management Application

## Project Description
The "Task Management Application" is a web-based platform designed to help users efficiently manage their tasks and boost productivity. This project enables users to create, update, delete, and track tasks seamlessly with a clean and intuitive user interface.

## Features
- "User Authentication": Secure login and registration system to protect user data.
- "Create Tasks": Users can add new tasks with details like title, description, priority, and due date.
- "Update Tasks": Edit task details whenever needed.
- "Delete Tasks": Remove completed or unnecessary tasks.
- "Task Filtering": Filter tasks based on priority, status, or due date.
- "Responsive Design": Optimized for both desktop and mobile devices.
- "Email Notifications": Send OTP (One-Time Password) for user authentication.
- "Image Uploads": Store and manage task-related images using Cloudinary.
- 
## Tech Stack
- Frontend:
  - HTML
  - CSS
  - JavaScript
  - React.js
  - Tailwind CSS

- Backend:
  - Node.js
  - Express.js

- Database:
  - MongoDB

- Cloud Services:
  - Cloudinary (for image storage)
  - Nodemailer (for sending emails)

## Installation

### Prerequisites
- Node.js installed on your machine.
- MongoDB setup locally or remotely.
- Cloudinary account and API credentials.
  
### Steps to Run Locally
1. Clone the repository:
   git clone https://github.com/Nitish43094/Task-Management.git
   
3. Navigate to the project directory:
   cd Task-Management / cd myapp
4. Install dependencies for both frontend and backend:
   npm install
   
6. Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAIL_SERVICE=your_email_service
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```
7. Start the server:
   npm run start
8. Open your browser and navigate to `http://localhost:5173`.

## Folder Structure
```
Task-Management/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── public/
└── README.md
```

## Contributions
Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request. Ensure your code follows the best practices and is well-documented.

## Contact
For any queries or suggestions, reach out to:
- Email: www.nitish93369@gmail.com
- LinkedIn: https://www.linkedin.com/in/nitish-kushwaha-415748229

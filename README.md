# BookTurf

## 📌 Summary

**BookTurf** is a web application that allows users to browse sports turfs, view details such as available slots, and seamlessly book them. The app ensures secure user authentication, session management, and provides a smooth booking flow by integrating a modern frontend with a robust backend.

## 📑 Postman API Documentation

👉 [View Full API Documentation](https://dev-8422777.postman.co/workspace/Dev-'s-Workspace~b5bade04-018b-4406-809b-81409132049e/collection/46470135-8dd8d23d-b044-4f2d-bd43-28d4b381e165?action=share&creator=46470135&active-environment=46470135-ae6bd976-28ad-42d2-bc23-7483c396dce8)

## 🛠 Tech Stack

### Frontend
- **React** → Component-based UI for smooth rendering and navigation
- **Tailwind CSS** → Utility-first styling for a responsive and modern interface
- **Redux Toolkit** → State management for authentication, booking data, and global states
- **Axios** → For handling HTTP requests to the backend APIs
- **React Router** → Enables page routing and navigation
- **React Hook Form** → Efficient form handling and validation

### Backend
- **Node.js + Express.js** → REST API server to handle requests and manage booking logic
- **MongoDB (Mongoose)** → Database for storing users, turfs, and bookings
- **JWT (jsonwebtoken)** → Secure authentication using JSON Web Tokens
- **bcryptjs** → Password hashing to secure user credentials
- **cookie-parser** → Handle cookies for session management
- **CORS** → Enable cross-origin requests between frontend and backend
- **dotenv** → Manage environment variables for secure configuration

### Deployment
- **Frontend** → Deployed on **Vercel** for fast and scalable hosting
- **Backend** → Deployed on **Railway**, connected to MongoDB Atlas

## 🔄 Application Flow

### 1. Browse Turfs
- Users land on the homepage and see a list of available turfs
- Each turf displays basic information like name, location, and available slots

### 2. View Turf Details
- Clicking a turf opens its details page
- Slots availability, pricing, and booking options are shown

### 3. Booking Action
- When the user clicks **"Book Now"**, the app checks if the user is logged in
- **If logged in** → Redirected to the booking confirmation screen
- **If not logged in** → Redirected to the login screen

### 4. Authentication & Session
- New users can sign up (passwords securely hashed with **bcrypt**)
- Returning users can log in (sessions handled using **JWT** + cookies)

### 5. Final Booking Confirmation
- Once confirmed, booking details are stored in MongoDB
- The user gets access to their bookings history

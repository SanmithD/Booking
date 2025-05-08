# 🗓️ Activity Booking API

A simple REST API built with Node.js, Express, and MongoDB that allows users to register, log in, view public activities, and book them after authentication using JWT.

---

## 🚀 Features

- ✅ User Registration & Login with JWT
- ✅ Publicly available list of activities (cricket, movies, etc.)
- ✅ Authenticated users can book activities
- ✅ Users can view their booked activities

---

📦 
```
server/
├── controllers/
│   ├── auth.controllers.js
│   ├── activity.controllers.js
│   └── booking.controllers.js
├── models/
│   ├── user.model.js
│   ├── activity.model.js
│   └── booking.model.js
├── middleware/
│   ├── auth.middleware.js
│   └── validation.middleware.js
├── routes/
│   ├── auth.routes.js
│   ├── activity.routes.js
│   └── booking.routes.js
├── .env
├── server.js
```

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/SanmithD/Booking.git
cd bookings
cd server

```
### 2. Install dependencies

```
npm install
```
### 3. Sign up
Name <br/>
Email <br/>
Phone_number <br/>
Password <br/>

### 4. Login
Email <br/>
Password <br/>

### 5. Set Generated token

Set generated jwt token in headers section

```
Authorization : Bearer ${token}

```

### 6. API

API endpoint hosted in render

```
https://booking-6byb.onrender.com

```
use api's for sign up

```
https://booking-6byb.onrender.com/api/auth/signup
```
```
{
  "name": "john doe",
  "email": "johndoe@gmail.com",
  "phone_number": "9876543210",
  "password": "12345"
}
```

For Login
```
https://booking-6byb.onrender.com/api/auth/login
```
```
{
  "email": "johndoe@gmail.com",
  "password": "12345"
}
```

For Profile
```
https://booking-6byb.onrender.com/api/auth/profile
```

For add activity
```
https://booking-6byb.onrender.com/api/activity/addActivity
```
```
{
  "title": "Cricket",
  "description": "local 5lacks cricket match",
  "location": "Mangalore ",
  "date_time": "2025-05-25T15:30:00Z"
}
```

For Available activities

```
https://booking-6byb.onrender.com/api/activity/
```
For get particular activity 

```
https://booking-6byb.onrender.com/api/activity/activityById/${id}
```
For book a activity
```
https://booking-6byb.onrender.com/api/booking/book/${activityId}
```
For get booked activity
```
https://booking-6byb.onrender.com/api/booking/get
```

For cancel booking
```
https://booking-6byb.onrender.com/api/booking/cancel/${id}
```
Thank you for this opportunity
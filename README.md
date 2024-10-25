

# CTAXI - Taxi Booking App
![image](https://github.com/user-attachments/assets/4aeb6578-0208-4ace-a6da-41f5a98ec279)


This is a taxi booking app project developed using **React**, **Node.js**, **Express**, and **MySQL**. It provides features for both users and admins, allowing users to book taxis and admins to manage drivers.

## Features

### For Users:
- **Select Pickup Location**: Users can select their location to find available drivers nearby.
- **View Available Drivers**: Displays a list of available drivers, including details such as name, vehicle color, and license plate.
- **Call Driver**: Users can directly call the driver using the provided phone number.
- **Language Support**: The app supports both **English** and **Sinhala**.

### For Admins:
- **Driver Management**: Admins can add, update, and delete driver details from the database.
- **Login/Logout Functionality**: Secure authentication for admins.
- **Driver Availability Status**: Manage the availability of drivers in real-time.

## Tech Stack

- **Frontend**: React, Material UI, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL, phpMyAdmin
- **State Management**: React's useState and useEffect hooks
- **Language Support**: i18n for language switching (English and Sinhala)

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/NIPUN0BUGS/CTAXI-user.git
   ```

2. Navigate to the project directory:
   ```bash
   cd taxi-booking-app
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   npm install
   ```

6. Start the frontend server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000` for the frontend and `http://localhost:8081` for the backend.

## Configuration

- Ensure that your MySQL server is running and update the database connection settings in the `config/db.js` file.
- Create necessary tables for managing drivers and locations in MySQL.

## Project Structure

```
/backend         # Backend code (Node.js + Express)
  /routes        # API routes
  /controllers   # Controller logic for handling API requests
  /models        # Database models (MySQL)
/frontend        # Frontend code (React + Material UI)
/admin           # Admin panel code for driver management
```

## API Endpoints

- `GET /drivers?location=<pickupLocation>`: Get available drivers for the selected location.
- `POST /drivers`: Add a new driver (admin).
- `PUT /drivers/:id`: Update driver details (admin).
- `DELETE /drivers/:id`: Delete a driver (admin).

## License

This project is licensed under the MIT License.

---

This example README provides a clear overview of your project, its features, and how to set it up. You can modify the details as necessary to better match your specific implementation.

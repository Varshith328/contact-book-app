# Full-Stack Contact Book App

A simple and responsive web application for managing contacts, built with the MERN stack (but using SQLite instead of MongoDB).

## Features

-   **Add Contacts**: A validated form to add new contacts.
-   **View Contacts**: A paginated list to display all contacts.
-   **Delete Contacts**: Remove contacts from the database.
-   **Responsive UI**: Works seamlessly on both desktop and mobile devices.

## Tech Stack

-   **Frontend**: React.js
-   **Backend**: Node.js, Express.js
-   **Database**: SQLite

## Project Setup and Installation

### Prerequisites

-   Node.js (v18+ recommended)
-   npm (or yarn)

### Instructions

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd contact-book-app
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    # The database file 'contacts.db' will be created automatically on first run
    npm run dev
    ```
    The backend server will be running on `http://localhost:5000`.

3.  **Setup the Frontend:**
    *Open a new terminal window.*
    ```bash
    cd frontend
    npm install
    npm start
    ```
    The React development server will open at `http://localhost:3000`.

Your application is now fully running!

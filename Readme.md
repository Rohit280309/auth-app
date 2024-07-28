# Auth App

## Overview

Auth App is a full-stack authentication application built with React, TypeScript, Node.js, and MongoDB. It provides a robust authentication system with features like user registration, login, token management, and secure password handling.

## Technologies Used

- **Frontend:** Vite, React, TypeScript
- **Backend:** Node.js, Express, Typescript
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens), Google Signin
- **Other:** bcrypt for password hashing

## Features

- User registration and login
- JWT-based authentication
- Password hashing and security
- Token management (access and refresh tokens)
- Secure API endpoints
- Google Signin

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB

### Google Login Setup

1. Go to [text](https://console.cloud.google.com/). Create a new project
2. Navigate to Api & Services > Credentials >  Create Credentials > OAuth Client Id
3. Select Web application from the dropdown
4. Add URI on Authorized Javascript origins = http://localhost:5173, http://localhost (both) 
5. Add URI on Authorized Redirect URIs = http://localhost:5173, http://localhost (both) 
6. Click create and copy the client id and paste it in client/.env
7. Go to OAuth consent screen add test users (your email) 

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/Rohit280309/auth-app.git
    ```

2. Navigate to the server directory:

    ```bash
    cd auth-app/server
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the `server` directory and add the variables from the `.env.example` file and modify the details:

    `server .env variables`
    ```
    PORT="5000"
    EMAIL="youremail@gmail.com"
    PASSWORD="Your gmail app password"
    CLIENT="http://localhost:5173"
    DB_URL="mongodb://127.0.0.1:27017/AuthMern"
    ACCESS_TOKEN_SECRET="Your access token secret"
    REFRESH_TOKEN_SECRET="Your refresh token secret"
    ```

5. Start the server:

    ```bash
    npm run dev
    ```

### Frontend Setup

1. Navigate to the client directory:

    ```bash
    cd auth-app/client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the `client` directory and add the variables from the `.env.example` file and modify the details:
    
    `client .env variables`
    ```
    VITE_SOME_GOOGLE_CLIENT_ID="your google client id"
    VITE_SOME_API="http://localhost:5000/api"
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and go to `http://localhost:5173` to access the app.

## Contributing

Feel free to open issues or submit pull requests to improve the app. Ensure that your contributions align with the project's coding standards and include appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please contact kumbharrohit2803@gmail.com.


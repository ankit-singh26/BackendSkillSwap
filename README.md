 "# BackendSkillSwap" 
 # BackendSkillSwap

## Overview
BackendSkillSwap is the backend service for the SkillSwap application. It provides RESTful APIs to manage user skills, swaps, authentication, and other core functionalities.

## Features
- User registration and authentication
- Skill management (add, update, delete skills)
- Swap requests between users
- Middleware for validation and authentication
- Organized routes and models for maintainability

## Tech Stack
- Node.js
- Express.js
- MongoDB / Mongoose
- JWT for authentication
- Other dependencies as per `package.json`

## Getting Started

### Prerequisites
- Node.js installed (v14 or higher recommended)
- MongoDB instance running (local or cloud)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/ankit-singh26/BackendSkillSwap.git
    ```
2. Navigate to the project directory:
    ```bash
    cd BackendSkillSwap/server
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add your environment variables:
    ```
    PORT=your_port_number
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

### Running the Server
```bash
npm start

The server should now be running on http://localhost:<PORT>.

API Endpoints
(Add details about your API endpoints here)

Contributing
Contributions are welcome! Please open issues and submit pull requests.

License
MIT License

Created by Ankit Singh

# Employee Management System

This project is an Employee Management System built using Vite + React on the client-side and Node.js + Express on the server-side. It allows users to register, add, view, update, and delete employee records. Passwords are stored in encrypted form using Bcrypt.js, and Jsonwebtoken is used to verify user identity.

## Project Structure

The project is divided into two main folders:

- **Client**: Contains the frontend code.
- **Server**: Contains the backend code including APIs and other backend functionalities.

## Getting Started

### Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the server folder:
   ```
   cd server
   ```

3. Install server dependencies:
   ```
   npm install
   ```

4. Open another terminal and navigate to the client folder:
   ```
   cd client
   ```

5. Install client dependencies:
   ```
   npm install
   ```

### Running the Application

To run the application, follow these steps:

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd client
   npm run dev
   ```

The server will run on port 8000, and the client will run on a port specified by Vite (usually 3000).

## Usage

Once the application is running, you can access the Employee Management System in your web browser. Register a new user to get started, and then you can add, view, update, and delete employee records as needed. You can also add images of employees using external links.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

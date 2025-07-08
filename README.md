# React CRUD Application

A simple React application with basic CRUD (Create, Read, Update, Delete) functionality for managing users.

## Features

- **Create**: Add new users with name, email, and phone number
- **Read**: Display all users in a responsive grid layout
- **Update**: Edit existing user information
- **Delete**: Remove users with confirmation dialog
- **Persistent Storage**: Data is saved to localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface

## Technologies Used

- React 18
- TypeScript
- CSS3 with modern styling
- UUID for unique ID generation
- localStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd tstimage
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Adding a User
1. Click the "Add New User" button in the header
2. Fill in the form with the user's information
3. Click "Add" to save the user

### Editing a User
1. Click the "Edit" button on any user card
2. Modify the information in the form
3. Click "Update" to save changes

### Deleting a User
1. Click the "Delete" button on any user card
2. Confirm the deletion in the dialog

## Project Structure

```
src/
├── components/
│   ├── UserForm.tsx      # Form component for adding/editing users
│   ├── UserForm.css      # Styles for the form
│   ├── UserList.tsx      # Component to display user list
│   └── UserList.css      # Styles for the user list
├── types/
│   └── index.ts          # TypeScript type definitions
├── App.tsx               # Main application component
├── App.css               # Main application styles
├── index.tsx             # Application entry point
└── index.css             # Global styles
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Data Persistence

The application uses localStorage to persist user data. This means:
- Data will persist between browser sessions
- Data is stored locally on your device
- No server or database required

## Contributing

Feel free to submit issues and enhancement requests! 
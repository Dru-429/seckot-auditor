# Secko Auditor 🛡️

A modern, security auditing web application built for developers and clients to scan GitHub repositories for vulnerabilities and security issues.

## 🎯 Features

- **JWT-based Authentication**: Secure signup and login system
- **Role-based Access**: Different UI for Developers (technical logs) and Clients (plain English reports)
- **Security Scanning**: Integrate with Armoriq to scan GitHub repositories
- **Security Scoring**: Automatic calculation of security scores (0-100)
- **Notion-inspired UI**: Clean, minimal design with high-contrast elements
- **PDF Export**: Generate and download audit reports as PDFs
- **Real-time Scanning**: Live updates during vulnerability scanning
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📁 Project Structure

```
secko-auditor/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema with JWT support
│   │   └── Scan.js          # Scan results schema
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── scan.js          # Scan operation routes
│   ├── controllers/
│   │   ├── authController.js    # Auth business logic
│   │   └── scanController.js    # Scan business logic
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── utils/
│   │   └── armoriqService.js    # Armoriq SDK integration
│   ├── server.js            # Express server setup
│   ├── package.json         # Backend dependencies
│   └── .env.example         # Environment variables template
│
└── frontend/
    ├── public/
    │   └── index.html       # HTML entry point
    ├── src/
    │   ├── components/
    │   │   ├── UI.js            # Shadcn UI components
    │   │   ├── AuthForms.js     # Login/Signup forms
    │   │   ├── ScanComponents.js    # Scan input & history
    │   │   └── ResultsView.js   # Results display (Dev & Client)
    │   ├── hooks/
    │   │   ├── useAuth.js       # Authentication hook
    │   │   └── useScan.js       # Scan management hook
    │   ├── pages/
    │   │   ├── Auth.js          # Login/Signup page
    │   │   ├── Dashboard.js     # Main dashboard
    │   │   └── Results.js       # Results page
    │   ├── utils/
    │   │   ├── api.js           # API client with interceptors
    │   │   └── helpers.js       # Utility functions (PDF, translations)
    │   ├── App.js              # Main React app
    │   ├── index.js            # React entry point
    │   └── index.css           # Global styles
    ├── tailwind.config.js   # Tailwind CSS configuration
    ├── postcss.config.js    # PostCSS configuration
    ├── package.json         # Frontend dependencies
    └── .env.example         # Environment variables template
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **MongoDB** (local or cloud instance)
- **npm** or **yarn** package manager

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/secko-auditor
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Armoriq Configuration
   ARMORIQ_API_KEY=your_armoriq_api_key_here
   ARMORIQ_API_URL=https://api.armoriq.com/v1
   
   # Frontend Configuration
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   # On Windows
   mongod
   
   # On macOS
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   ```

6. **Start the backend server**
   ```bash
   npm start
   # or for development with hot reload
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

   App will open at `http://localhost:3000`

## 📚 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new account |
| POST | `/api/auth/login` | Login to account |
| GET | `/api/auth/me` | Get current user (requires auth) |
| PUT | `/api/auth/profile` | Update user profile (requires auth) |


### Scan Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/scan` | Create new scan (requires auth) |
| GET | `/api/scan` | Get all user scans (requires auth) |
| GET | `/api/scan/:scanId` | Get specific scan (requires auth) |
| GET | `/api/scan/:scanId/status` | Get scan status (requires auth) |
| DELETE | `/api/scan/:scanId` | Delete scan (requires auth) |

## 📊 Scoring Algorithm

Security Score = 100 - (critical×20 + high×10 + medium×5 + low×2 + info×1)

Score Grades:
- **A (90-100)**: Excellent security
- **B (75-89)**: Good security
- **C (60-74)**: Fair security
- **D (40-59)**: Poor security
- **F (0-39)**: Critical security issues

**Happy Auditing! 🛡️**

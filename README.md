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

## 🔧 Customization

### Adding New Vulnerability Types

Edit `src/utils/helpers.js` and add to the `translateVulnerability` function:

```javascript
export const translateVulnerability = (technicalTerm) => {
  const translations = {
    'Your Vulnerability': 'Plain English Translation',
    // ... existing entries
  };
  return translations[technicalTerm] || technicalTerm;
};
```

### Modifying Scan Logic

The Armoriq SDK integration is in `backend/utils/armoriqService.js`. Replace the `simulateScan` method with actual API calls:

```javascript
async triggerScan(githubUrl) {
  // Replace with actual Armoriq API call
  const response = await axios.post(`${this.baseURL}/scans`, {
    repositoryUrl: githubUrl,
  }, {
    headers: { Authorization: `Bearer ${this.apiKey}` }
  });
  return response.data;
}
```

## 🧪 Testing the Application

### Test Credentials
```
Email: test@example.com
Password: testPassword123
Role: developer or client
```

### Sample GitHub URLs to Scan
```
https://github.com/facebook/react
https://github.com/microsoft/vscode
https://github.com/nodejs/node
```

## 📦 Deployment

### Backend (Node.js)

**Heroku Deployment:**
```bash
# Login to Heroku
heroku login

# Create new app
heroku create secko-auditor-backend

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_url"
heroku config:set JWT_SECRET="your_secret_key"

# Deploy
git push heroku main
```

**Docker Deployment:**
```dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend (React)

**Vercel Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Netlify Deployment:**
```bash
# Build the app
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### CORS Errors
- Update `FRONTEND_URL` in backend `.env`
- Ensure both servers are running
- Check browser console for specific errors

### Token Not Persisting
- Clear browser localStorage
- Check token expiration time in `.env`
- Verify JWT_SECRET is consistent

### Scan Not Completing
- Check Armoriq API configuration
- Verify GitHub URL is public
- Check backend console for errors

## 📖 API Documentation

See [API Reference](#-api-endpoints) section above for complete endpoint documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Author

Built as a senior full-stack engineering project - Secko Auditor Team

## 📧 Support

For support, please open an issue on GitHub or contact support@secko-auditor.com

---

## 🚀 Quick Start Checklist

- [ ] Clone repository
- [ ] Install backend dependencies (`cd backend && npm install`)
- [ ] Install frontend dependencies (`cd frontend && npm install`)
- [ ] Create `.env` files from `.env.example` in both directories
- [ ] Start MongoDB
- [ ] Start backend server (`npm start` in backend)
- [ ] Start frontend server (`npm start` in frontend)
- [ ] Visit `http://localhost:3000`
- [ ] Create account and select role
- [ ] Start scanning!

## 🎯 Roadmap

- [ ] Real-time scan progress updates
- [ ] Scan scheduling and automation
- [ ] Team collaboration features
- [ ] Advanced filtering and search
- [ ] Custom scanning rules
- [ ] Integration with CI/CD pipelines
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Scan history analytics
- [ ] Vulnerability remediation suggestions

---

**Happy Auditing! 🛡️**

# ✅ Secko Auditor - Pre-Launch Checklist

Use this checklist to verify your setup before launching Secko Auditor.

---

## 📋 Environment Setup

### Prerequisites Installation
- [ ] Node.js v16+ installed (`node --version` shows v16.0.0+)
- [ ] npm v7+ installed (`npm --version` shows v7.0.0+)
- [ ] MongoDB installed locally OR MongoDB Atlas account created
- [ ] Git installed (optional but recommended)

### MongoDB Setup
- [ ] MongoDB service is running
  - **Windows**: Check Services for "MongoDB Server"
  - **macOS**: `brew services list` shows mongodb running
  - **Linux**: `sudo systemctl status mongod`
- [ ] Can connect to MongoDB
  - Run: `mongosh`
  - Type: `show dbs`
  - Result: Lists databases

### Project Downloaded
- [ ] Project folder exists at expected location
- [ ] All subdirectories present:
  - [ ] `/backend` folder
  - [ ] `/frontend` folder
  - [ ] All model, routes, controllers folders in backend
  - [ ] All components, pages, hooks folders in frontend

---

## 🔧 Backend Setup

### Dependencies & Configuration
- [ ] Navigated to `backend` directory
- [ ] `npm install` completed successfully
- [ ] `node_modules` folder exists
- [ ] `.env` file created from `.env.example`
  - [ ] `MONGODB_URI` set correctly
  - [ ] `JWT_SECRET` set (use a strong secret)
  - [ ] `PORT` set to 5000 (or custom port)
  - [ ] `ARMORIQ_API_KEY` set (or placeholder for demo)

### Backend Files Verification
- [ ] `server.js` exists
- [ ] `models/User.js` exists
- [ ] `models/Scan.js` exists
- [ ] `routes/auth.js` exists
- [ ] `routes/scan.js` exists
- [ ] `controllers/authController.js` exists
- [ ] `controllers/scanController.js` exists
- [ ] `middleware/auth.js` exists
- [ ] `utils/armoriqService.js` exists

### Backend Port Check
- [ ] Port 5000 is available
  - **Windows**: `netstat -ano | findstr :5000` should be empty
  - **macOS**: `lsof -i :5000` should be empty
  - **Linux**: `sudo lsof -i :5000` should be empty

### Test Backend Startup
- [ ] Run: `npm start` in backend directory
- [ ] Expected output:
  ```
  MongoDB connected successfully
  Secko Auditor Backend running on port 5000
  ```
- [ ] No error messages
- [ ] Press Ctrl+C to stop

---

## 🎨 Frontend Setup

### Dependencies & Configuration
- [ ] Navigated to `frontend` directory
- [ ] `npm install` completed successfully
- [ ] `node_modules` folder exists
- [ ] `.env` file created from `.env.example`
  - [ ] `REACT_APP_API_URL` set to `http://localhost:5000/api`

### Frontend Files Verification
- [ ] `src/App.js` exists
- [ ] `src/pages/Auth.js` exists
- [ ] `src/pages/Dashboard.js` exists
- [ ] `src/pages/Results.js` exists
- [ ] `src/components/UI.js` exists
- [ ] `src/components/AuthForms.js` exists
- [ ] `src/components/ScanComponents.js` exists
- [ ] `src/components/ResultsView.js` exists
- [ ] `src/hooks/useAuth.js` exists
- [ ] `src/hooks/useScan.js` exists
- [ ] `src/utils/api.js` exists
- [ ] `src/utils/helpers.js` exists
- [ ] `tailwind.config.js` exists
- [ ] `public/index.html` exists

### Frontend Port Check
- [ ] Port 3000 is available
  - **Windows**: `netstat -ano | findstr :3000` should be empty
  - **macOS**: `lsof -i :3000` should be empty
  - **Linux**: `sudo lsof -i :3000` should be empty

### Test Frontend Startup
- [ ] Backend must be running
- [ ] Run: `npm start` in frontend directory
- [ ] Expected: Browser opens to `http://localhost:3000`
- [ ] Expected: Login page appears with "Secko Auditor" title
- [ ] No error messages in browser console
- [ ] Press Ctrl+C to stop

---

## 🔐 Security & Authentication

### JWT Setup
- [ ] JWT_SECRET is not empty in backend `.env`
- [ ] JWT_SECRET is strong (10+ characters, mixed case, numbers)
- [ ] JWT_EXPIRE is set (default: 7d)

### Database Security
- [ ] MongoDB connection is established
- [ ] Credentials are correct in MONGODB_URI
- [ ] Connection string has no typos

### Password Hashing
- [ ] Bcrypt is in `package.json` dependencies
- [ ] User model has password hashing in pre-save

---

## 🗄️ Database Verification

### MongoDB Collections
- [ ] Connect to MongoDB: `mongosh`
- [ ] Select database: `use secko-auditor`
- [ ] Verify collections exist (after first signup):
  - [ ] `db.users.find()` returns results or empty
  - [ ] `db.scans.find()` returns results or empty
- [ ] Check user object structure
- [ ] Check scan object structure

### Database Indexes
- [ ] Index on users.email exists
- [ ] Index on scans.userId exists
- [ ] Index on scans.status exists

---

## 🧪 API Testing

### Authentication Endpoints
- [ ] **POST** `/api/auth/signup`
  - [ ] Send: `{ email: "test@example.com", password: "test123", role: "developer" }`
  - [ ] Expect: 201 status, token, user object
  - [ ] Verify user created in MongoDB

- [ ] **POST** `/api/auth/login`
  - [ ] Send: `{ email: "test@example.com", password: "test123" }`
  - [ ] Expect: 200 status, token, user object

- [ ] **GET** `/api/auth/me`
  - [ ] Send: Authorization header with token
  - [ ] Expect: 200 status, user object

### Scan Endpoints
- [ ] **POST** `/api/scan`
  - [ ] Send: `{ githubUrl: "https://github.com/facebook/react" }` with token
  - [ ] Expect: 201 status, scan object with status: "scanning"

- [ ] **GET** `/api/scan`
  - [ ] Send: Authorization header with token
  - [ ] Expect: 200 status, array of scans

- [ ] **GET** `/api/scan/:scanId/status`
  - [ ] Wait 2-3 seconds
  - [ ] Send: Authorization header with token
  - [ ] Expect: 200 status, scan with status and score

### Health Check
- [ ] **GET** `/api/health`
  - [ ] Expected: 200 status, `{ status: "Server is running" }`

---

## 🎯 Frontend User Flow

### Authentication Flow
- [ ] Can access login page
- [ ] Can sign up with email and password
- [ ] Role selection appears after signup
- [ ] Can select "Developer" or "Client" role
- [ ] Can login with credentials
- [ ] Token saved to localStorage
- [ ] Redirected to dashboard after login

### Dashboard Flow
- [ ] Dashboard loads with sidebar
- [ ] Scan history displays (empty initially)
- [ ] Can click "New Scan" button
- [ ] Can enter GitHub URL
- [ ] Can submit scan

### Scanning Flow
- [ ] Scanning animation appears
- [ ] Wait for scan to complete
- [ ] Results page displays after completion
- [ ] Score displays prominently
- [ ] Vulnerabilities list appears
- [ ] Different view for Developer vs Client role

### Results View - Developer
- [ ] Technical details visible
- [ ] File paths and line numbers shown
- [ ] Vulnerability types displayed
- [ ] Raw JSON report available
- [ ] Severity badges shown

### Results View - Client
- [ ] Plain English descriptions shown
- [ ] Score with grade (A-F) displayed
- [ ] Security status summary visible
- [ ] Simplified terminology used
- [ ] Next steps guide shown

### PDF Export
- [ ] "Download Report" button visible
- [ ] Can click to generate PDF
- [ ] PDF downloads successfully
- [ ] PDF contains audit results

---

## 🐛 Error Handling

### Network Errors
- [ ] Disconnect from internet
- [ ] Frontend shows error message
- [ ] Can reconnect and retry
- [ ] Connection restored message shows

### Invalid Credentials
- [ ] Try login with wrong password
- [ ] Error message displays
- [ ] Can retry login
- [ ] No sensitive info leaked

### Invalid GitHub URL
- [ ] Try submitting invalid URL
- [ ] Error message displays
- [ ] Can enter valid URL

### Token Expiration (if testing)
- [ ] Wait for token to expire
- [ ] Should be redirected to login
- [ ] Can login again

---

## 📊 Performance Checks

### Frontend Performance
- [ ] Page load time < 3 seconds
- [ ] Animations smooth (60 FPS)
- [ ] No console errors
- [ ] No console warnings
- [ ] Browser DevTools shows good performance

### Backend Performance
- [ ] API responses < 500ms
- [ ] Database queries efficient
- [ ] No memory leaks
- [ ] Logs show proper flow

### Network
- [ ] No CORS errors
- [ ] Proper Content-Type headers
- [ ] Compression enabled (gzip)

---

## 📝 Documentation Review

- [ ] `README.md` read and understood
- [ ] `SETUP.md` followed for installation
- [ ] `QUICK_REFERENCE.md` bookmarked for reference
- [ ] `ARCHITECTURE.md` reviewed for system understanding
- [ ] `PROJECT_SUMMARY.md` reviewed for overview

---

## 🚀 Pre-Deployment Checklist

### Code Quality
- [ ] No console errors in backend logs
- [ ] No console errors in browser
- [ ] No console warnings (optional)
- [ ] Code follows consistent style

### Configuration
- [ ] All `.env` variables set
- [ ] No hardcoded secrets in code
- [ ] Appropriate NODE_ENV set

### Testing
- [ ] Created test user account
- [ ] Ran test scan
- [ ] Downloaded test PDF
- [ ] Tested with both roles

### Documentation
- [ ] All README files complete
- [ ] Comments in code are clear
- [ ] Setup instructions are accurate

### Security
- [ ] JWT_SECRET is strong
- [ ] Password hashing working
- [ ] CORS configured correctly
- [ ] No sensitive data in localStorage

---

## 🎉 Final Verification

- [ ] Backend running without errors
- [ ] Frontend running without errors
- [ ] Can create account
- [ ] Can login to account
- [ ] Can view dashboard
- [ ] Can run security scan
- [ ] Can view results
- [ ] Can download PDF report
- [ ] Application behaves as expected

---

## ✨ Ready to Deploy!

If all items are checked:
✅ Your Secko Auditor installation is complete and working!

### Next Steps:
1. Deploy backend to production server
2. Deploy frontend to CDN/hosting
3. Configure production MongoDB
4. Set up HTTPS/SSL certificates
5. Monitor application performance
6. Gather user feedback

---

## 📞 Troubleshooting Quick Links

If you encounter issues:
- See `SETUP.md` - Troubleshooting section
- See `QUICK_REFERENCE.md` - Common Issues table
- Check browser DevTools console for errors
- Check backend terminal for error logs
- Review error message carefully

---

**Date Completed**: _______________

**Tested By**: _______________

**Notes**:
```
[Space for additional notes]




```

---

**Congratulations! 🎉 Secko Auditor is ready to go!**

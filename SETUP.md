# Secko Auditor - Setup Guide 🛠️

Complete step-by-step setup instructions for Secko Auditor on Windows, macOS, and Linux.

## Prerequisites

### Required Software
- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **MongoDB** v5 or higher ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/))
- **npm** (comes with Node.js) or **Yarn** ([Download](https://yarnpkg.com/))

### Optional Software
- **Docker** & **Docker Compose** for containerized setup
- **VS Code** or any code editor

## ✅ Verification Checklist

Before proceeding, verify installations:

```bash
# Check Node.js
node --version
# Expected: v16.0.0 or higher

# Check npm
npm --version
# Expected: v7.0.0 or higher

# Check MongoDB (if installed locally)
mongod --version
# Expected: v5.0.0 or higher

# Check Git
git --version
# Expected: git version 2.x.x or higher
```

---

## 🖥️ Windows Setup

### Step 1: Download and Install Prerequisites

1. **Node.js**
   - Visit [nodejs.org](https://nodejs.org/)
   - Download LTS version
   - Run installer with default settings
   - Verify: Open PowerShell and run `node --version`

2. **MongoDB**
   - Visit [mongodb.com](https://www.mongodb.com/try/download/community)
   - Download Windows installer
   - Run installer and select "Install MongoDB as a Service"
   - MongoDB will start automatically

3. **Git** (Optional but recommended)
   - Visit [git-scm.com](https://git-scm.com/)
   - Download Windows installer
   - Run with default settings

### Step 2: Clone and Setup Project

1. **Open PowerShell or Command Prompt**
   ```powershell
   # Navigate to your desired directory
   cd Desktop
   ```

2. **Clone the repository**
   ```powershell
   git clone <repository-url>
   cd auditor
   ```

3. **Run setup script (PowerShell)**
   ```powershell
   # Make sure you're in the auditor directory
   cd backend
   npm install
   cp .env.example .env
   cd ../frontend
   npm install
   cp .env.example .env
   cd ..
   ```

### Step 3: Configure Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/secko-auditor
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
ARMORIQ_API_KEY=your_armoriq_api_key_here
ARMORIQ_API_URL=https://api.armoriq.com/v1
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Verify MongoDB is Running

```powershell
# MongoDB should be running as a service
# Verify by checking Services (services.msc)
# Look for "MongoDB Server"

# Or test connection
mongosh
# Type: exit
```

### Step 5: Start the Application

**Terminal 1 - Backend:**
```powershell
cd auditor\backend
npm start
# Expected: "Secko Auditor Backend running on port 5000"
```

**Terminal 2 - Frontend:**
```powershell
cd auditor\frontend
npm start
# Expected: Opens http://localhost:3000 in browser
```

---

## 🍎 macOS Setup

### Step 1: Install Prerequisites

1. **Node.js**
   ```bash
   # Using Homebrew (recommended)
   brew install node
   
   # Or download from nodejs.org
   ```

2. **MongoDB**
   ```bash
   # Using Homebrew
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   
   # Or download from mongodb.com
   ```

3. **Git** (usually pre-installed)
   ```bash
   git --version
   ```

### Step 2: Clone and Setup Project

```bash
# Navigate to desired directory
cd ~/Documents

# Clone repository
git clone <repository-url>
cd auditor

# Setup Backend
cd backend
npm install
cp .env.example .env

# Setup Frontend
cd ../frontend
npm install
cp .env.example .env
```

### Step 3: Configure Environment Variables

Edit `.env` files in both backend and frontend directories with your preferred editor (nano, vim, or VS Code).

**Backend/Frontend setup same as Windows** (see Step 3 above)

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd auditor/backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd auditor/frontend
npm start
```

---

## 🐧 Linux Setup (Ubuntu/Debian)

### Step 1: Install Prerequisites

1. **Update system packages**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Node.js**
   ```bash
   # Using NodeSource repository (recommended)
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Or using snap
   sudo snap install node --classic
   ```

3. **MongoDB**
   ```bash
   # Add MongoDB repository
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   
   # Install and start MongoDB
   sudo apt update
   sudo apt install -y mongodb-org
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

4. **Git**
   ```bash
   sudo apt install -y git
   ```

### Step 2: Clone and Setup Project

```bash
# Navigate to desired directory
cd ~/

# Clone repository
git clone <repository-url>
cd auditor

# Setup Backend
cd backend
npm install
cp .env.example .env

# Setup Frontend
cd ../frontend
npm install
cp .env.example .env
```

### Step 3: Configure Environment Variables

```bash
# Edit backend .env
nano backend/.env

# Edit frontend .env
nano frontend/.env
```

**Add the same configuration as Windows** (see Step 3 above)

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd auditor/backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd auditor/frontend
npm start
```

---

## 🐳 Docker Setup (All Platforms)

### Prerequisites
- Docker & Docker Compose installed

### Setup Steps

1. **Navigate to project root**
   ```bash
   cd auditor
   ```

2. **Create environment files**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit backend/.env and add ARMORIQ_API_KEY
   
   # Frontend
   cd ../frontend
   cp .env.example .env
   cd ..
   ```

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **Verify services are running**
   ```bash
   docker-compose ps
   ```

5. **View logs**
   ```bash
   # All services
   docker-compose logs -f
   
   # Backend only
   docker-compose logs -f backend
   
   # Frontend only
   docker-compose logs -f frontend
   ```

6. **Stop services**
   ```bash
   docker-compose down
   ```

---

## 🚀 Accessing the Application

Once setup is complete:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **API Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 📝 Creating Your First Account

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Click "Sign Up"
3. Enter email and password (min 6 characters)
4. Select role: **Developer** or **Client**
5. Click "Sign Up"
6. Start scanning GitHub repositories!

---

## 🧪 Test Scan

Try scanning these popular repositories:

```
https://github.com/facebook/react
https://github.com/nodejs/node
https://github.com/vuejs/vue
https://github.com/torvalds/linux
```

---

## 🛠️ Troubleshooting

### MongoDB Connection Error

**Error**: `Cannot connect to MongoDB`

**Solution**:
```bash
# Verify MongoDB is running
Windows: Check Services for "MongoDB Server"
macOS: brew services list
Linux: sudo systemctl status mongod

# If not running, start it:
Windows: services.msc → MongoDB Server → Start
macOS: brew services start mongodb-community
Linux: sudo systemctl start mongod
```

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find process using the port
Windows: netstat -ano | findstr :5000
macOS: lsof -i :5000
Linux: sudo lsof -i :5000

# Kill the process
Windows: taskkill /PID <PID> /F
macOS: kill -9 <PID>
Linux: sudo kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

### Node Modules Not Installing

**Error**: `npm install fails`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# On Windows PowerShell, use rmdir for directories:
rmdir -r node_modules
del package-lock.json
npm install
```

### Token Errors

**Error**: `401 Unauthorized / Invalid token`

**Solution**:
- Clear browser localStorage: DevTools → Application → Storage → Local Storage → Clear
- Log out and log back in
- Check JWT_SECRET is same in backend .env

### Frontend Not Connecting to Backend

**Error**: `Cannot POST /api/scan`

**Solution**:
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend .env
- Verify CORS is configured in backend/server.js
- Check browser console for detailed error

---

## 📊 Development Tips

### Enable Debug Mode

**Backend**:
```bash
# Windows PowerShell
$env:DEBUG='*'; npm start

# macOS/Linux
DEBUG=* npm start
```

**Frontend**:
```bash
# React DevTools browser extension recommended
```

### Hot Reload

Both frontend and backend support hot reload:
- **Backend**: Uses `nodemon` (if running `npm run dev`)
- **Frontend**: Built-in React hot reload

### Database Inspection

```bash
# Connect to MongoDB shell
mongosh

# Use database
use secko-auditor

# View collections
show collections

# Query users
db.users.find()

# Query scans
db.scans.find()
```

---

## 🔐 Security Notes for Development

⚠️ **Important**: These are development settings only.

For production:
1. Use strong, random JWT_SECRET
2. Enable HTTPS
3. Use environment-specific configurations
4. Implement rate limiting
5. Add input validation and sanitization
6. Use production MongoDB (Atlas or similar)
7. Enable CORS for specific domains only

---

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## ✨ Next Steps After Setup

1. Create an account with your email
2. Select your role (Developer or Client)
3. Go to Dashboard
4. Click "New Scan"
5. Paste a GitHub repository URL
6. Watch the security scan in real-time
7. View detailed results based on your role
8. Download PDF report

---

## 🆘 Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Review backend console logs
3. Check browser DevTools console
4. Open an issue on GitHub with:
   - OS and version
   - Node.js version
   - Error message
   - Steps to reproduce

---

**Happy Auditing! 🛡️**

For questions or support, contact: support@secko-auditor.com

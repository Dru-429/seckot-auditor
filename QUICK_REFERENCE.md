# Secko Auditor - Developer's Quick Reference 📖

## 🚀 Quick Start (5 minutes)

```bash
# Backend Setup
cd backend
npm install
cp .env.example .env
npm start

# Frontend Setup (new terminal)
cd frontend
npm install
cp .env.example .env
npm start

# Open http://localhost:3000
```

---

## 📁 File Structure Quick Map

```
Backend Routes:
  POST   /api/auth/signup              → Sign up new user
  POST   /api/auth/login               → Login user
  GET    /api/auth/me                  → Get current user
  PUT    /api/auth/profile             → Update profile
  POST   /api/scan                     → Create scan
  GET    /api/scan                     → Get all user scans
  GET    /api/scan/:scanId             → Get specific scan
  GET    /api/scan/:scanId/status      → Get scan status
  DELETE /api/scan/:scanId             → Delete scan

Frontend Pages:
  /auth                → Login/Signup
  /dashboard           → Main dashboard
  /results/:scanId     → Scan results
```

---

## 🔑 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/secko-auditor
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
ARMORIQ_API_KEY=your_api_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🧩 Key Components

### Authentication
```javascript
// Login
POST /api/auth/login
Body: { email, password }
Response: { token, user }

// Usage in Frontend
const { user, login, logout } = useAuth();
```

### Scanning
```javascript
// Create Scan
POST /api/scan
Auth: Bearer <token>
Body: { githubUrl }
Response: { scan { _id, status, score } }

// Usage in Frontend
const { createScan, scans } = useScan();
```

### UI Components
```javascript
import {
  Button, Card, Input, Badge,
  ProgressBar, Modal, Table,
  LoadingSpinner
} from './components/UI';
```

---

## 🎨 Styling Quick Reference

### Colors
- Primary: `slate-900` (#0f172a)
- Background: `white` (#ffffff)
- Border: `slate-200` (#e2e8f0)
- Success: `green-600`
- Danger: `red-600`
- Warning: `yellow-600`

### Common Classes
```jsx
// Card
<Card className="p-6 border border-slate-200 rounded-lg">

// Button
<Button variant="default|outline|ghost|danger" size="sm|md|lg">

// Badge
<Badge severity="critical|high|medium|low|info">

// Input
<Input type="text|email|password" placeholder="" error={error} />
```

---

## 📡 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Additional details"
}
```

---

## 🐛 Common Debugging

### Check if backend is running
```bash
curl http://localhost:5000/health
```

### Check if MongoDB is connected
```bash
mongosh
use secko-auditor
db.users.find()
```

### View backend logs
```bash
# Terminal running backend
# Errors will show up here
```

### View frontend logs
```bash
# Browser DevTools → Console tab
# Errors and logs appear here
```

---

## 🔄 Development Workflow

1. **Make changes** to files
2. **Save file** → Auto-reload in dev mode
3. **Test functionality** in browser or API client
4. **Check console** for errors
5. **Fix issues** and repeat

---

## 📊 User Roles

### Developer Role
- See technical vulnerability details
- View file paths and line numbers
- Access raw scan JSON
- Technical terminology

### Client Role
- Plain English descriptions
- Visual progress bars
- High-level summaries
- Simplified language

---

## 🛡️ Security Score Formula

```
Score = 100 - (critical×20 + high×10 + medium×5 + low×2 + info×1)
Minimum: 0, Maximum: 100
```

### Grade Mapping
```
A: 90-100  (Excellent)
B: 75-89   (Good)
C: 60-74   (Fair)
D: 40-59   (Poor)
F: 0-39    (Critical)
```

---

## 🔗 Useful Commands

### Backend
```bash
npm start          # Start production server
npm run dev        # Start with auto-reload
npm install        # Install dependencies
npm audit          # Check vulnerabilities
```

### Frontend
```bash
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run tests
npm install        # Install dependencies
```

### Git
```bash
git clone <url>    # Clone repository
git add .          # Stage changes
git commit -m ""   # Commit with message
git push           # Push to remote
```

### Docker
```bash
docker-compose up -d      # Start services
docker-compose down       # Stop services
docker-compose logs -f    # View logs
docker-compose ps         # List running services
```

---

## 💾 Database Collections

### users
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  role: String ("developer" | "client"),
  profileDetails: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### scans
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  githubUrl: String,
  score: Number (0-100),
  status: String ("pending" | "scanning" | "completed" | "failed"),
  vulnerabilities: Array,
  summary: Object { critical, high, medium, low, info },
  rawReport: Object,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Common Tasks

### Add New Endpoint
```javascript
// routes/newFeature.js
router.post('/', auth, newFeatureController.create);

// server.js
app.use('/api/newfeature', newFeatureRoutes);
```

### Add New UI Component
```javascript
// components/NewComponent.js
export const NewComponent = ({ prop }) => (
  <div>Content</div>
);

// pages/Page.js
import { NewComponent } from '../components/NewComponent';
```

### Add New Hook
```javascript
// hooks/useNewFeature.js
export const useNewFeature = () => {
  // Hook logic
};

// pages/Page.js
const { data } = useNewFeature();
```

---

## ⚠️ Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Port in use | Another process using port | Kill process or change PORT |
| CORS error | Backend/Frontend mismatch | Check FRONTEND_URL and API_URL |
| Token invalid | JWT_SECRET changed | Use same secret or clear localStorage |
| MongoDB error | Service not running | Start MongoDB service |
| Module not found | Dependencies not installed | Run npm install |

---

## 📚 Resources

- **Docs**: `README.md` - Full documentation
- **Setup**: `SETUP.md` - Installation guide
- **API**: See [API Endpoints](#-api-endpoints) in README
- **Code**: Well-commented source files

---

## 🎓 Learning Path

1. Read `README.md` for overview
2. Follow `SETUP.md` for installation
3. Start backend and frontend
4. Test endpoints with Postman or curl
5. Review component structure in frontend
6. Study hook implementation in `src/hooks/`
7. Explore API routes in `backend/routes/`

---

## 🚀 Ready to Code?

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm start

# Open http://localhost:3000
# Start building! 🚀
```

---

**Happy Coding! 💻**

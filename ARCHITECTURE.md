# 🏗️ Secko Auditor - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT BROWSER                              │
│                    (React Application)                           │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ HTTP/HTTPS
                     │ REST API
                     │ JSON
                     │
┌────────────────────▼────────────────────────────────────────────┐
│                    FRONTEND LAYER                                │
│                   (React 18 + Tailwind)                          │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐       │
│  │  Auth.js    │  │ Dashboard.js │  │  Results.js      │       │
│  │             │  │              │  │                  │       │
│  │ Login/Signup│  │ Scan History │  │ Dev/Client View  │       │
│  └─────────────┘  └──────────────┘  └──────────────────┘       │
│         │                │                    │                  │
│         └────────────────┼────────────────────┘                  │
│                          │                                       │
│                    ┌─────▼──────┐                                │
│                    │  useAuth   │  Custom Hooks                  │
│                    │  useScan   │                                │
│                    └─────┬──────┘                                │
│                          │                                       │
│                    ┌─────▼──────┐                                │
│                    │   api.js   │  Axios Client                  │
│                    │ interceptor│  Token Management              │
│                    └─────┬──────┘                                │
└─────────────────────────┬──────────────────────────────────────┘
                          │
         ┌────────────────┴────────────────┐
         │                                  │
         │ REST API Calls                  │
         │ JWT Authorization               │
         │                                  │
┌────────▼─────────────────────────────────▼────────────────────┐
│                    BACKEND LAYER                              │
│                  (Node.js + Express)                          │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Routes (REST API)                          │  │
│  │  ┌──────────────┐         ┌──────────────────────┐    │  │
│  │  │ auth.js      │         │ scan.js              │    │  │
│  │  │              │         │                      │    │  │
│  │  │ POST /signup │         │ POST   /api/scan     │    │  │
│  │  │ POST /login  │         │ GET    /api/scan     │    │  │
│  │  │ GET  /me     │         │ GET    /scan/:id     │    │  │
│  │  │ PUT  /profile│         │ DELETE /scan/:id     │    │  │
│  │  └──────────────┘         └──────────────────────┘    │  │
│  └────────────────────────────────────────────────────────┘  │
│                          │                                    │
│  ┌──────────────────────▼──────────────────────────────────┐  │
│  │           Controllers (Business Logic)                   │  │
│  │  ┌────────────────────┐     ┌──────────────────────┐   │  │
│  │  │authController.js   │     │scanController.js     │   │  │
│  │  │                    │     │                      │   │  │
│  │  │ • signup logic     │     │ • createScan         │   │  │
│  │  │ • login logic      │     │ • getUserScans       │   │  │
│  │  │ • token gen        │     │ • getScanById        │   │  │
│  │  │ • profile update   │     │ • deleteScan         │   │  │
│  │  └────────────────────┘     └──────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘ │
│                          │                                     │
│  ┌──────────────────────▼──────────────────────────────────┐  │
│  │         Middleware (Cross-cutting Concerns)             │  │
│  │  ┌────────────────────────────────────────────────┐    │  │
│  │  │ auth.js - JWT Verification                    │    │  │
│  │  │ • Token validation                            │    │  │
│  │  │ • User extraction                             │    │  │
│  │  │ • Authorization enforcement                   │    │  │
│  │  └────────────────────────────────────────────────┘    │  │
│  └────────────────────────────────────────────────────────┘  │
│                          │                                     │
│  ┌──────────────────────▼──────────────────────────────────┐  │
│  │            Data Layer (Models)                          │  │
│  │  ┌──────────────────┐     ┌──────────────────────┐    │  │
│  │  │ User.js          │     │ Scan.js              │    │  │
│  │  │                  │     │                      │    │  │
│  │  │ • email          │     │ • userId             │    │  │
│  │  │ • password (hash)│     │ • githubUrl          │    │  │
│  │  │ • role           │     │ • score              │    │  │
│  │  │ • profile        │     │ • vulnerabilities    │    │  │
│  │  │ • timestamps     │     │ • summary            │    │  │
│  │  │                  │     │ • status             │    │  │
│  │  │ Methods:         │     │ • timestamps         │    │  │
│  │  │ • matchPassword()│     │                      │    │  │
│  │  │ • pre-save hash  │     │ Indexes:             │    │  │
│  │  └──────────────────┘     │ • userId + date      │    │  │
│  │                           │ • status             │    │  │
│  │                           └──────────────────────┘    │  │
│  └────────────────────────────────────────────────────────┘  │
│                          │                                     │
│  ┌──────────────────────▼──────────────────────────────────┐  │
│  │            Utilities & Services                         │  │
│  │  ┌──────────────────────────────────────────────┐      │  │
│  │  │ armoriqService.js                            │      │  │
│  │  │                                              │      │  │
│  │  │ • validateGitHubUrl()                        │      │  │
│  │  │ • triggerScan()                              │      │  │
│  │  │ • calculateSecurityScore()                   │      │  │
│  │  │ • initializeSDK()                            │      │  │
│  │  └──────────────────────────────────────────────┘      │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ server.js - Main Entry Point                            │  │
│  │ • Express app setup                                     │  │
│  │ • CORS configuration                                    │  │
│  │ • Route registration                                    │  │
│  │ • Error handling                                        │  │
│  │ • Server startup                                        │  │
│  └─────────────────────────────────────────────────────────┘  │
└────────────────────┬──────────────────────────────────────────┘
                     │
                     │ Database Queries
                     │ Connection Pool
                     │
┌────────────────────▼──────────────────────────────────────────┐
│                    DATABASE LAYER                             │
│                   (MongoDB)                                   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          Collections & Indexes                       │   │
│  │                                                       │   │
│  │  users collection                                    │   │
│  │  ├── Index: email (unique)                           │   │
│  │  ├── Index: _id                                      │   │
│  │  └── Documents: user records                         │   │
│  │                                                       │   │
│  │  scans collection                                    │   │
│  │  ├── Index: userId, createdAt (compound)             │   │
│  │  ├── Index: status                                   │   │
│  │  └── Documents: scan records                         │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### Authentication Flow
```
┌──────────┐
│  Browser │
└────┬─────┘
     │
     │ 1. User submits email/password/role
     │
     ▼
┌──────────────────────────┐
│   Frontend (Auth.js)     │
│ - Form validation        │
│ - Input sanitization     │
└────────┬─────────────────┘
         │
         │ 2. POST /api/auth/signup
         │
         ▼
┌──────────────────────────────────┐
│  Backend (authController.js)     │
│ - Validate inputs                │
│ - Check if user exists           │
│ - Hash password                  │
│ - Create user in DB              │
└────────┬─────────────────────────┘
         │
         │ 3. JWT Token Generated
         │
         ▼
┌──────────────────────────┐
│   Backend Response       │
│ {                        │
│   token: "jwt_string",   │
│   user: {...}            │
│ }                        │
└────────┬─────────────────┘
         │
         │ 4. Store token in localStorage
         │
         ▼
┌──────────────────────────┐
│  Frontend (Dashboard)    │
│ - Redirect to dashboard  │
│ - Show user welcome      │
│ - Load scan history      │
└──────────────────────────┘
```

### Scanning Flow
```
┌──────────┐
│  Browser │
└────┬─────┘
     │
     │ 1. User enters GitHub URL
     │
     ▼
┌──────────────────────────┐
│  Frontend (ScanInput)    │
│ - Validate URL format    │
│ - Show scanning animation│
└────────┬─────────────────┘
         │
         │ 2. POST /api/scan (with token)
         │
         ▼
┌────────────────────────────────────┐
│ Backend Auth Middleware            │
│ - Verify JWT token                 │
│ - Extract user ID                  │
└────────┬─────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│ scanController.createScan()        │
│ - Create scan record (pending)     │
│ - Save to DB                       │
└────────┬─────────────────────────┘
         │
         │ 3. Async: Trigger scan
         │    (Non-blocking)
         │
         ▼
┌────────────────────────────────────┐
│ armoriqService.triggerScan()       │
│ - Validate GitHub URL              │
│ - Call Armoriq API / Simulate      │
│ - Get vulnerability data           │
└────────┬─────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│ Score Calculation                  │
│ - Parse vulnerabilities            │
│ - Calculate score (0-100)          │
│ - Update scan status (completed)   │
│ - Save to DB                       │
└────────┬─────────────────────────┘
         │
         │ 4. Poll for results
         │    (Frontend every 2s)
         │
         ▼
┌────────────────────────────────────┐
│ GET /api/scan/:id/status           │
│ - Return current status            │
│ - Return score & vulnerabilities   │
└────────┬─────────────────────────┘
         │
         │ 5. Status = "completed"
         │
         ▼
┌────────────────────────────────────┐
│ Frontend (Results.js)              │
│ - Fetch full scan details          │
│ - Render based on role             │
│ - Developer: Technical view        │
│ - Client: Plain English view       │
└────────────────────────────────────┘
```

---

## Component Hierarchy

```
App.js (Main Router)
├── Auth Page
│   ├── LoginForm
│   ├── SignupForm
│   └── RoleSelector
│
├── Dashboard Page
│   ├── Sidebar
│   │   ├── Logo
│   │   ├── Navigation
│   │   └── User Info
│   │
│   └── Main Content
│       ├── ScanInput
│       │   └── Input Component
│       │
│       └── ScanHistoryList
│           ├── ScanItem (repeated)
│           │   ├── Score
│           │   ├── URL
│           │   ├── Date
│           │   └── Actions
│           └── LoadingSpinner
│
└── Results Page
    ├── Header
    │   ├── Back Button
    │   ├── Title
    │   └── Download PDF Button
    │
    └── ResultsView
        ├── DeveloperView (if role === 'developer')
        │   ├── Score Summary
        │   ├── Technical Logs
        │   │   └── VulnerabilityCard (repeated)
        │   │       ├── Type
        │       ├── Severity Badge
        │       ├── File Path
        │       └── Description
        │   └── Raw Report (JSON)
        │
        └── ClientView (if role === 'client')
            ├── Score Card (A-F Grade)
            ├── Security Status Summary
            ├── Issues Found (Plain English)
            │   └── TranslatedIssue (repeated)
            │       ├── Plain Title
            │       ├── Severity Badge
            │       ├── Description
            │       └── Location
            └── Next Steps Guide
```

---

## State Management Flow

```
App.js
├── useAuth Hook
│   ├── user state (null | userData)
│   ├── loading state
│   ├── error state
│   └── Methods:
│       ├── signup(email, password, role)
│       ├── login(email, password)
│       ├── logout()
│       └── getCurrentUser()
│
└── useScan Hook
    ├── scans state (array)
    ├── currentScan state (object | null)
    ├── loading state
    ├── error state
    └── Methods:
        ├── createScan(githubUrl)
        ├── getUserScans()
        ├── getScanById(scanId)
        ├── getScanStatus(scanId)
        └── deleteScan(scanId)
```

---

## API Communication Layer

```
┌─────────────────────────────────┐
│  Frontend Components (React)    │
│                                 │
│  useAuth() / useScan() Hooks    │
└────────────────┬────────────────┘
                 │
                 │ Calls API methods
                 │
┌────────────────▼────────────────┐
│  utils/api.js (Axios Client)    │
│                                 │
│  - Base URL: http://localhost:  │
│    5000/api                     │
│                                 │
│  - Request Interceptor          │
│    ├── Add Bearer token         │
│    └── Set headers              │
│                                 │
│  - Response Interceptor         │
│    ├── Parse JSON               │
│    └── Error handling           │
│                                 │
│  - Methods:                     │
│    ├── authAPI.*                │
│    └── scanAPI.*                │
└────────────────┬────────────────┘
                 │
                 │ HTTP Requests
                 │
        ┌────────▼─────────┐
        │  Express Server  │
        │  (port 5000)     │
        └─────────────────┘
```

---

## Security Layers

```
┌─────────────────────────────────────┐
│    1. Frontend Validation           │
│   - Input format validation         │
│   - Email format check              │
│   - URL validation                  │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│    2. Network Security              │
│   - HTTPS (production)              │
│   - CORS configuration              │
│   - Token headers                   │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│    3. Authentication Layer          │
│   - JWT token verification          │
│   - User ID extraction              │
│   - Token expiry check              │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│    4. Backend Validation            │
│   - Input type checking             │
│   - Business logic validation       │
│   - Data sanitization               │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│    5. Database Security             │
│   - Password hashing (bcrypt)       │
│   - Data encryption at rest         │
│   - Access control                  │
│   - Query parameterization          │
└─────────────────────────────────────┘
```

---

## Deployment Architecture

```
┌──────────────────────────────────────────────────┐
│            Production Environment                │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │         Frontend (Vercel/Netlify)          │ │
│  │                                            │ │
│  │ - Static SPA build                         │ │
│  │ - CDN distribution                         │ │
│  │ - https://secko-auditor.com                │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │      Backend (Heroku/AWS/DigitalOcean)     │ │
│  │                                            │ │
│  │ - Node.js application                      │ │
│  │ - Health checks                            │ │
│  │ - Auto-scaling                             │ │
│  │ - https://api.secko-auditor.com            │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │       Database (MongoDB Atlas)              │ │
│  │                                            │ │
│  │ - Managed MongoDB service                  │ │
│  │ - Automated backups                        │ │
│  │ - Replication                              │ │
│  │ - Security: IP whitelist, SSL              │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Error Handling Flow

```
Frontend Request
     │
     ▼
┌─────────────────┐
│ API call made   │
└────────┬────────┘
         │
         ├─ Success ─→ Handle response
         │
         └─ Error ──────────┐
                             ▼
                  ┌──────────────────────┐
                  │ Check error type     │
                  └────┬────┬────┬───────┘
                       │    │    │
          ┌────────────┘    │    └────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
    Network Error    4xx Error        5xx Error
    (Show retry)    (Show message)    (Show error)
          │                 │                 │
          └────────────┬────┴────────────────┘
                       │
                       ▼
          Display user-friendly error
          Log to console (dev)
          Update UI state
```

---

## Performance Optimization Strategies

```
Frontend:
├── Code Splitting (React.lazy)
├── Image Optimization
├── CSS Minification (Tailwind)
├── Bundle Analysis
└── Caching (localStorage for tokens)

Backend:
├── Database Indexing
│   ├── userId + createdAt
│   └── status
├── Query Optimization
├── Connection Pooling
├── Caching (if needed)
└── Async Processing

Network:
├── GZIP Compression
├── HTTP/2 or HTTP/3
├── CDN for static assets
└── API Rate Limiting
```

---

This architecture provides:
- ✅ Scalability
- ✅ Maintainability  
- ✅ Security
- ✅ Performance
- ✅ Separation of Concerns

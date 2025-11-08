# Sharing This Dashboard With Your Team

## 🎯 Overview

Your teammates can work on this dashboard in **three ways**:

### 1️⃣ **Full Setup** (Recommended for Development)
- Complete environment with MongoDB
- Can modify data and see changes
- Best for active development

### 2️⃣ **Static Data Mode** (Quickest for Demos)
- No MongoDB required
- Uses pre-exported JSON files
- Perfect for presentations and quick testing

### 3️⃣ **Use Your Deployed Server** (For Viewing Only)
- Access via: https://heatdashboard.preview.emergentagent.com
- No setup needed
- Cannot modify data

---

## 📋 What You Need to Share

### Required Files (Commit to Git)

```
urban-heat-explorer/
├── backend/
│   ├── server.py
│   ├── geotiff_processor.py
│   ├── requirements.txt
│   └── .env.example          ← Create this (see below)
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example          ← Create this (see below)
├── data/
│   └── static/               ← **IMPORTANT: All JSON files**
│       ├── metrics.json
│       ├── timeseries.json
│       ├── regional_breakdown.json
│       ├── hotspots.geojson
│       ├── land_use.json
│       └── heat_distribution.json
├── scripts/
│   └── export_data.py        ← Script to update static data
├── README.md
├── TEAM_SETUP.md            ← Setup guide for teammates
└── .gitignore
```

---

## 🔐 Environment Variables (Don't Commit!)

### Create `.env.example` Files

**Backend** (`backend/.env.example`):
```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017/urban_heat_db
DB_NAME=urban_heat_db

# CORS Configuration (add your URLs)
CORS_ORIGINS=http://localhost:3000

# Server Configuration
HOST=0.0.0.0
PORT=8001

# Optional: Use static data instead of MongoDB
USE_STATIC_DATA=false
```

**Frontend** (`frontend/.env.example`):
```env
# Backend API URL
# For local development:
REACT_APP_BACKEND_URL=http://localhost:8001

# For production:
# REACT_APP_BACKEND_URL=https://your-production-url.com

# Optional settings
REACT_APP_ENABLE_VISUAL_EDITS=false
ENABLE_HEALTH_CHECK=false
```

**Instructions for teammates**:
```bash
# Copy example files and customize
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit .env files with their own values
```

---

## 📊 Static Data Files (Share These!)

The `/data/static/` folder contains all the data your dashboard needs. These files should be:

✅ **Committed to Git**
✅ **Shared with teammates**
✅ **Updated when you change data**

### Updating Static Data

When you make changes to data sources, regenerate the static files:

```bash
cd scripts
python export_data.py
```

This will update all JSON files in `/data/static/` with current data.

Then commit the changes:
```bash
git add data/static/
git commit -m "Update: latest heat data"
git push
```

---

## 👥 Team Workflow

### For You (Project Owner)

1. **Make changes** to the dashboard
2. **Update static data** (if data changed):
   ```bash
   python scripts/export_data.py
   ```
3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Feature: description"
   git push origin main
   ```

### For Teammates

1. **Clone repository**:
   ```bash
   git clone <your-repo-url>
   cd urban-heat-explorer
   ```

2. **Choose setup mode**:
   - **Option A**: Full setup with MongoDB (see TEAM_SETUP.md)
   - **Option B**: Quick setup with static data (see below)

3. **Pull latest changes**:
   ```bash
   git pull origin main
   ```

---

## ⚡ Quick Setup for Teammates (Static Data Mode)

**No MongoDB required!** Perfect for presentations and demos.

### 1. Install Dependencies

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd ../frontend
yarn install
```

### 2. Configure Environment

**Backend** (`backend/.env`):
```env
MONGO_URL=mongodb://localhost:27017/urban_heat_db
DB_NAME=urban_heat_db
CORS_ORIGINS=http://localhost:3000
HOST=0.0.0.0
PORT=8001
USE_STATIC_DATA=true    ← KEY: This enables static mode
```

**Frontend** (`frontend/.env`):
```env
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_ENABLE_VISUAL_EDITS=false
ENABLE_HEALTH_CHECK=false
```

### 3. Run the Dashboard

```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Terminal 2: Frontend
cd frontend
yarn start
```

### 4. Access
- Dashboard: http://localhost:3000
- API: http://localhost:8001/api/

✅ **No MongoDB needed!** The backend reads from `/data/static/` files.

---

## 🎤 For Presentations

### Option 1: Run Locally
```bash
# Start backend and frontend (as shown above)
# Present from http://localhost:3000
```

### Option 2: Use Your Production Server
```
# Just open in browser:
https://heatdashboard.preview.emergentagent.com

# No setup needed!
```

### Option 3: Deploy Their Own
See README.md for deployment options (Docker, Heroku, AWS, etc.)

---

## 🔍 Verifying Setup

After setup, teammates should verify:

```bash
# Test backend API
curl http://localhost:8001/api/
# Should return: {"message":"Urban Heat & Greenness Dashboard API"...}

# Test metrics endpoint
curl http://localhost:8001/api/metrics
# Should return JSON with heat data

# Frontend should load at http://localhost:3000
```

---

## 📝 .gitignore Configuration

Make sure these are in your `.gitignore`:

```gitignore
# Environment variables (NEVER commit these!)
.env
backend/.env
frontend/.env

# Virtual environments
venv/
backend/venv/
env/

# Node modules
node_modules/
frontend/node_modules/

# Build output
build/
dist/
frontend/build/

# Python cache
__pycache__/
*.pyc
*.pyo

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp

# Logs
*.log
npm-debug.log*

# MongoDB data (if running locally)
data/db/

# DO commit these:
# data/static/    ← Important: These are shared!
```

---

## 🚨 Important Notes

### What to Commit ✅
- All source code (`backend/`, `frontend/src/`)
- Static data files (`data/static/*.json`)
- Dependencies (`requirements.txt`, `package.json`)
- Documentation (`README.md`, `TEAM_SETUP.md`)
- Example env files (`.env.example`)

### What NOT to Commit ❌
- `.env` files (contain sensitive info)
- `node_modules/`
- `venv/`
- Personal MongoDB data
- API keys or credentials
- Build output folders

### Data Sharing Strategy
1. **Static JSON files** → Commit to Git (in `/data/static/`)
2. **Environment variables** → Each teammate creates their own
3. **MongoDB** → Optional (static mode works without it)

---

## 🎓 Training Your Team

### Share These Resources
1. **TEAM_SETUP.md** - Detailed setup instructions
2. **README.md** - Complete documentation
3. **This file** - Collaboration workflow

### Quick Start Video Script
```
1. Clone the repo
2. Copy .env.example files
3. Install dependencies (pip & yarn)
4. Run backend: uvicorn server:app --reload
5. Run frontend: yarn start
6. Open http://localhost:3000
```

---

## 🤝 Collaboration Tips

### For Pull Requests
```bash
# Teammate workflow:
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add: description"
git push origin feature/new-feature
# Create PR on GitHub
```

### For Data Updates
```bash
# You update data:
python scripts/export_data.py
git add data/static/
git commit -m "Data: update heat metrics"
git push

# Teammates pull:
git pull origin main
# Their dashboards automatically use new data!
```

---

## 📞 Support for Teammates

If teammates have issues:

1. Check TEAM_SETUP.md troubleshooting section
2. Verify .env configuration
3. Check Python/Node versions
4. Try static data mode first (simpler)
5. Contact you for server access if needed

---

## ✅ Final Checklist for Sharing

Before pushing to GitHub:

- [ ] Create `.env.example` files (no secrets!)
- [ ] Run `python scripts/export_data.py` to update static data
- [ ] Commit all `/data/static/` files
- [ ] Update README.md with your repo URL
- [ ] Test clone + setup on another machine
- [ ] Create TEAM_SETUP.md with instructions
- [ ] Add .gitignore to exclude .env files
- [ ] Document any custom configuration
- [ ] Test static data mode works
- [ ] Verify production URL still works

---

**Your dashboard is now ready for team collaboration!** 🎉

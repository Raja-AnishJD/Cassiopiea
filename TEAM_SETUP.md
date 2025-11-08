# Team Setup Guide - Urban Heat Dashboard

This guide will help your teammates set up and run the dashboard on their own machines.

## 🚀 Quick Start for Team Members

### Option 1: Full Setup (With MongoDB)

**For teammates who want the complete experience:**

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd urban-heat-explorer
   ```

2. **Install Prerequisites**
   - Node.js v18+ (https://nodejs.org/)
   - Python 3.9+ (https://www.python.org/)
   - MongoDB 5.0+ (https://www.mongodb.com/try/download/community)
   - Yarn: `npm install -g yarn`

3. **Backend Setup**
   ```bash
   cd backend
   
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Create .env file
   cat > .env << 'EOF'
   MONGO_URL=mongodb://localhost:27017/urban_heat_db
   DB_NAME=urban_heat_db
   CORS_ORIGINS=http://localhost:3000
   HOST=0.0.0.0
   PORT=8001
   EOF
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   
   # Install dependencies
   yarn install
   
   # Create .env file
   cat > .env << 'EOF'
   REACT_APP_BACKEND_URL=http://localhost:8001
   REACT_APP_ENABLE_VISUAL_EDITS=false
   ENABLE_HEALTH_CHECK=false
   EOF
   ```

5. **Run the Application**
   
   **Terminal 1 - Start MongoDB:**
   ```bash
   mongod --dbpath /path/to/your/data/directory
   # OR if MongoDB is a service:
   # macOS: brew services start mongodb-community
   # Linux: sudo systemctl start mongod
   # Windows: net start MongoDB
   ```
   
   **Terminal 2 - Start Backend:**
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn server:app --host 0.0.0.0 --port 8001 --reload
   ```
   
   **Terminal 3 - Start Frontend:**
   ```bash
   cd frontend
   yarn start
   ```

6. **Access the Dashboard**
   - Open browser: http://localhost:3000
   - Backend API: http://localhost:8001/api/
   - API Docs: http://localhost:8001/docs

---

### Option 2: Static Data Mode (No MongoDB Required)

**For quick demos or teammates who don't want to install MongoDB:**

The dashboard can run with static JSON files in `/data/static/`.

1. **Clone and Install** (Steps 1, 3, 4 from Option 1)

2. **Backend in Static Mode**
   ```bash
   cd backend
   
   # .env file for static mode
   cat > .env << 'EOF'
   # MongoDB not required - using static files
   MONGO_URL=mongodb://localhost:27017/urban_heat_db
   DB_NAME=urban_heat_db_static
   CORS_ORIGINS=http://localhost:3000
   HOST=0.0.0.0
   PORT=8001
   USE_STATIC_DATA=true
   EOF
   ```

3. **Run Without MongoDB**
   ```bash
   # Terminal 1 - Backend only
   cd backend
   uvicorn server:app --host 0.0.0.0 --port 8001 --reload
   
   # Terminal 2 - Frontend
   cd frontend
   yarn start
   ```

---

## 📁 Data Files Included

All necessary data is stored in `/data/static/`:

- `metrics.json` - Regional statistics
- `timeseries.json` - Historical trends (2018-2025)
- `regional_breakdown.json` - Multi-region comparison
- `hotspots.geojson` - Map markers
- `land_use.json` - Pie chart data
- `heat_distribution.json` - Bar chart data

**These files are committed to the repo** - no external data needed!

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Find process using port 8001
lsof -i :8001
# Kill it
kill -9 <PID>
```

### MongoDB Connection Failed
- Option A: Start MongoDB service
- Option B: Use Static Data Mode (no MongoDB needed)

### Module Not Found Errors
```bash
# Backend
cd backend && pip install -r requirements.txt

# Frontend
cd frontend && yarn install
```

### CORS Errors
Make sure backend `.env` has:
```
CORS_ORIGINS=http://localhost:3000
```

---

## 🎯 For Presentations

### Option A: Run Locally
Follow Option 1 or 2 above, then present from http://localhost:3000

### Option B: Use Production Server
You can present directly from:
```
https://heatdashboard.preview.emergentagent.com
```

### Option C: Deploy Your Own
See main README.md for deployment options:
- Docker
- Heroku
- AWS
- Vercel (frontend only)

---

## 👥 Team Collaboration

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes, then commit
git add .
git commit -m "Add: description of changes"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Code Structure
- `backend/server.py` - Main API
- `backend/geotiff_processor.py` - Data processing
- `frontend/src/pages/Dashboard.jsx` - Main dashboard
- `frontend/src/components/` - React components

---

## 📊 Adding Your Own Data

1. **Update Static Files**
   Edit files in `/data/static/` with your data

2. **Update Location References**
   Edit `backend/geotiff_processor.py`:
   ```python
   self.reference_locations = [
       (lat, lng, "type", heat, ndvi),
       # Add your locations
   ]
   ```

3. **Restart Backend**
   ```bash
   # Kill and restart uvicorn
   ```

---

## 🆘 Need Help?

1. Check main README.md
2. Review API docs: http://localhost:8001/docs
3. Check console logs (browser DevTools)
4. Contact the project lead

---

## ✅ Verification Checklist

Before presenting, verify:
- [ ] Backend responding: http://localhost:8001/api/
- [ ] Frontend loading: http://localhost:3000
- [ ] All 3 tabs working (Learn, Knowledge, Map)
- [ ] Map click functionality
- [ ] Charts displaying data
- [ ] No console errors

---

**Questions?** Refer to the main README.md or contact your team lead.

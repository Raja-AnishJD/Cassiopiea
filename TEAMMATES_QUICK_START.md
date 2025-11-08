# Quick Start for Teammates - Frontend Only

## 🎯 You DON'T Need Backend or MongoDB!

**Your team lead is hosting the backend API.** You just need to run the frontend!

---

## ⚡ 5-Minute Setup

### Step 1: Install Node.js & Yarn

**Check if you have them**:
```bash
node --version   # Should show v18+
yarn --version   # Should show v1.22+
```

**Don't have them?**
- Node.js: https://nodejs.org/ (Download LTS version)
- Yarn: `npm install -g yarn`

---

### Step 2: Clone the Repository

```bash
git clone <your-repo-url>
cd urban-heat-explorer/frontend
```

**Note**: You ONLY need the `frontend` folder!

---

### Step 3: Install Dependencies

```bash
yarn install
```

This will take 1-2 minutes.

---

### Step 4: Configure Backend URL

Create a `.env` file in the `frontend` folder:

```bash
# Copy the example file
cp .env.example .env
```

The `.env` file should contain:
```env
REACT_APP_BACKEND_URL=https://heatdashboard.preview.emergentagent.com
REACT_APP_ENABLE_VISUAL_EDITS=false
ENABLE_HEALTH_CHECK=false
```

**IMPORTANT**: The backend URL points to your team lead's hosted API. Don't change it!

---

### Step 5: Run the Dashboard

```bash
yarn start
```

Wait 30 seconds, then your browser will automatically open to:
```
http://localhost:3000
```

---

## ✅ That's It!

You should see the Urban Heat Explorer dashboard loading.

**What's happening behind the scenes?**
- Frontend runs on YOUR computer (localhost:3000)
- Data comes from your team lead's API (hosted on cloud)
- No backend setup needed on your side!

---

## 🧪 Verify It's Working

### Test 1: Check if API is reachable
Open this URL in your browser:
```
https://heatdashboard.preview.emergentagent.com/api/
```

You should see:
```json
{
  "message": "Urban Heat & Greenness Dashboard API",
  "version": "1.0.0"
}
```

✅ If you see this, the backend is working!

### Test 2: Check your frontend
Once `yarn start` completes, go to `http://localhost:3000`

You should see:
- Welcome modal (first time)
- Dashboard with charts and data
- Interactive map

✅ If you see the dashboard, everything is working!

---

## 🐛 Troubleshooting

### Issue: "Failed to load dashboard data"

**Solution 1: Check backend is up**
```bash
curl https://heatdashboard.preview.emergentagent.com/api/
```
If this fails, contact your team lead (backend might be down)

**Solution 2: Check your .env file**
Make sure `REACT_APP_BACKEND_URL` is correct:
```env
REACT_APP_BACKEND_URL=https://heatdashboard.preview.emergentagent.com
```

**Solution 3: Restart frontend**
```bash
# Kill the terminal (Ctrl+C)
# Run again:
yarn start
```

---

### Issue: "Port 3000 already in use"

Someone else is using port 3000. Kill it:

**Mac/Linux**:
```bash
lsof -ti:3000 | xargs kill -9
```

**Windows**:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Then run `yarn start` again.

---

### Issue: "Module not found" errors

Dependencies might not have installed correctly:

```bash
# Delete node_modules and reinstall
rm -rf node_modules
yarn install
yarn start
```

---

### Issue: "Cannot find module 'react'"

You're in the wrong directory. Make sure you're in the `frontend` folder:

```bash
cd frontend
yarn install
yarn start
```

---

## 🎤 For Presentations

### Option 1: Run from your laptop
```bash
cd frontend
yarn start
# Present from http://localhost:3000
```

### Option 2: Use the live URL directly
Just open in browser:
```
https://heatdashboard.preview.emergentagent.com
```

No setup needed!

---

## 🔄 Getting Updates

When your team lead pushes updates:

```bash
cd frontend
git pull origin main
yarn install  # Install any new dependencies
yarn start
```

---

## 📱 What You Can Do

With this setup, you can:
- ✅ View the dashboard
- ✅ Interact with all features
- ✅ Test the UI
- ✅ Make frontend code changes
- ✅ Present from your laptop
- ✅ Work offline (after initial data load)

**What you CANNOT do**:
- ❌ Change backend API
- ❌ Modify data sources
- ❌ Add new API endpoints

(For those, contact your team lead)

---

## 💻 Making Frontend Changes

If you want to modify the UI:

1. **Make changes** in `src/` files
2. **See live updates** (hot reload is enabled)
3. **Test** your changes at http://localhost:3000
4. **Commit** when satisfied:
   ```bash
   git add src/
   git commit -m "Update: description"
   git push origin your-branch-name
   ```

---

## 🆘 Need Help?

1. **Check this file** - Most issues are covered here
2. **Check browser console** - Press F12, look for errors
3. **Ask your team lead** - They control the backend

---

## 📋 Summary

**What you installed**:
- Node.js + Yarn

**What you run**:
- Frontend only (`yarn start`)

**Where data comes from**:
- Your team lead's hosted backend

**Total setup time**: ~5 minutes

**Requirements**: Just Node.js (NO Python, NO MongoDB!)

---

✅ **Enjoy working on the dashboard!**

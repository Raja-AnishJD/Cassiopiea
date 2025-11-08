# For Teammates: Frontend-Only Setup

> **You don't need to set up the backend!** Your team lead is hosting it.

## Quick Start (5 minutes)

### 1. Prerequisites
Install these if you don't have them:
- **Node.js** v18+ (https://nodejs.org/)
- **Yarn**: `npm install -g yarn`

### 2. Clone Repository
```bash
git clone <repo-url>
cd urban-heat-explorer/frontend
```

### 3. Install & Configure
```bash
# Install dependencies
yarn install

# Create environment file
cp .env.example .env
```

The `.env` file already points to the hosted backend - don't change it!

### 4. Run
```bash
yarn start
```

Open http://localhost:3000 in your browser.

## ✅ Verification

**Test the backend is accessible**:
```bash
curl https://heatdashboard.preview.emergentagent.com/api/
```

Should return:
```json
{"message": "Urban Heat & Greenness Dashboard API", ...}
```

**If frontend loads**, you're all set! 🎉

## 📖 Full Documentation

See [TEAMMATES_QUICK_START.md](TEAMMATES_QUICK_START.md) for:
- Detailed troubleshooting
- How to make UI changes
- Presentation tips
- Getting updates

## 🎯 What This Setup Gives You

- ✅ Run dashboard locally
- ✅ Make frontend changes
- ✅ Present from your laptop
- ✅ All data from hosted backend
- ❌ No Python needed
- ❌ No MongoDB needed
- ❌ No backend setup needed

## 🆘 Problems?

1. Check [TEAMMATES_QUICK_START.md](TEAMMATES_QUICK_START.md) troubleshooting section
2. Verify backend is up: https://heatdashboard.preview.emergentagent.com/api/
3. Contact your team lead

---

**That's it! You're ready to work on the dashboard.** 🚀

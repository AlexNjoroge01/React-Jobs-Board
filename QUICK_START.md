# Quick Start - What You Need to Do

## ✅ Code Changes (Already Done!)

I've already set up all the code for you:
- ✅ Created Vercel serverless functions (`api/jobs/index.js` and `api/jobs/[id].js`)
- ✅ Added `@vercel/kv` package to `package.json`
- ✅ Created `vercel.json` configuration
- ✅ Created detailed setup guide (`VERCEL_SETUP_GUIDE.md`)

## 🎯 What YOU Need to Do (3 Simple Steps)

### Step 1: Install the New Package
```bash
npm install
```
This installs `@upstash/redis` that we added.

### Step 2: Set Up Upstash Redis from Marketplace (5 minutes)

1. **Go to Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Click "Storage"** in the left sidebar
3. **Scroll to Marketplace section** - Look for **"Upstash"**
   - It says: "Serverless DB (Redis, Vector, Queue, Search)"
   - Click the arrow (→) or "Create" button
4. **Or go directly to Marketplace**: [vercel.com/marketplace](https://vercel.com/marketplace) → Search "Upstash"
5. **Click "Add Integration"** or **"Create"**
6. **Select your project** (or create one first)
7. **Name your database** (e.g., "jobs-board-redis")
8. **Click "Create"** - Environment variables are added automatically!

### Step 3: Deploy to Vercel

**Option A: Via Dashboard (Easiest)**
1. Push your code to GitHub
2. Go to Vercel Dashboard → "Add New" → "Project"
3. Import your GitHub repo
4. **Environment variables are already set!** (Upstash adds them automatically)
5. Click "Deploy"

**Option B: Via CLI**
```bash
npm install -g vercel
vercel login
vercel
# Environment variables should be pulled automatically if Upstash is linked
vercel --prod
```

## 📖 Full Instructions

See `VERCEL_SETUP_GUIDE.md` for detailed step-by-step instructions with screenshots guidance.

## 🎉 That's It!

Once deployed, your app will:
- ✅ Work without JSON Server
- ✅ Store data in Vercel KV (persists!)
- ✅ Allow recruiters to add/edit/delete jobs
- ✅ Show full functionality to anyone who visits

## 💡 What is Upstash Redis?

It's a serverless Redis database that stores your jobs data. Think of it as a key-value store:
- **Key**: "jobs"
- **Value**: Array of job objects

Free tier: 10,000 commands/day (plenty for a portfolio!)

**Note**: Vercel KV is now available through the Marketplace as Upstash Redis - same functionality, just accessed differently!

---

**Need help?** Check `VERCEL_SETUP_GUIDE.md` for troubleshooting!


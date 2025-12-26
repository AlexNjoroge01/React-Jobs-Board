# Vercel Setup Guide for Jobs Board (Updated for Marketplace)

## What is Upstash Redis?

**Upstash Redis** is a serverless Redis database that works perfectly with Vercel. Since Vercel KV is now available through the Marketplace via Upstash, we'll use Upstash Redis directly.

Think of it like a simple database that stores data in key-value pairs:
- **Key**: A unique identifier (like "jobs")
- **Value**: The actual data (like an array of job objects)

It's perfect for this project because:
- ✅ Free tier: 10,000 commands per day
- ✅ Fast and reliable
- ✅ No complex database setup needed
- ✅ Automatically scales with your app
- ✅ Data persists even when functions restart
- ✅ Easy integration through Vercel Marketplace

---

## Step-by-Step Setup Instructions

### Step 1: Create a Vercel Account (if you don't have one)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with GitHub (recommended) or email
4. Complete the verification process

---

### Step 2: Add Upstash Redis from Marketplace

1. **Log into Vercel Dashboard**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)

2. **Navigate to Storage/Marketplace**
   - In the left sidebar, click on **"Storage"** tab
   - You'll see a message: "KV and Postgres are now available through the Marketplace"
   - Look for **"Upstash"** in the Marketplace section
   - It should say: "Serverless DB (Redis, Vector, Queue, Search)"
   - Click the right arrow (→) or "Create" button next to Upstash

3. **Alternative: Go Directly to Marketplace**
   - You can also go to: [vercel.com/marketplace](https://vercel.com/marketplace)
   - Search for "Upstash"
   - Click on "Upstash Redis" or "Upstash"

4. **Install Upstash Integration**
   - Click **"Add Integration"** or **"Create"**
   - You'll be prompted to:
     - **Select a project** (or create one first)
     - **Name your database** (e.g., "jobs-board-redis")
     - Choose a **region** (closest to you)
   - Click **"Create"** or **"Add"**

5. **Get Connection Details**
   - After creation, Upstash will automatically add environment variables to your Vercel project:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`
   - These are automatically configured - you don't need to copy them manually!

---

### Step 3: Verify Environment Variables

1. **Go to Your Project in Vercel Dashboard**
   - Click on your project name
   - Click on **"Settings"** tab
   - Click on **"Environment Variables"** in the left menu

2. **Verify Variables Exist**
   - You should see:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`
   - If they're not there, the integration might not be complete - try adding Upstash again

---

### Step 4: Deploy Your Project to Vercel

#### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Add Vercel serverless functions with Upstash Redis"
   git push origin main
   ```

2. **Import Project in Vercel**
   - In Vercel Dashboard, click **"Add New"** → **"Project"**
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Project**
   - **Framework Preset**: Vite (should be auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - Click **"Deploy"**

4. **Link Upstash Redis** (if not already linked)
   - During or after deployment, go to **"Storage"** tab
   - You should see your Upstash Redis database
   - Make sure it's linked to your project

5. **Wait for deployment** (usually 1-2 minutes)

#### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Link your project if asked

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

### Step 5: Test Your Deployment

1. **Visit your deployed site**
   - Vercel will give you a URL like: `https://your-project.vercel.app`

2. **Test the functionality:**
   - ✅ View jobs on homepage
   - ✅ Click "View All Jobs"
   - ✅ View individual job details
   - ✅ Add a new job
   - ✅ Edit an existing job
   - ✅ Delete a job

3. **Check if data persists:**
   - Add a job
   - Refresh the page
   - The job should still be there!

---

## Troubleshooting

### Issue: "Redis client not configured" error

**Solution**: 
1. Make sure Upstash Redis is added through Marketplace
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set
4. If missing, go back to Storage → Marketplace → Add Upstash again
5. Redeploy your project

### Issue: Can't find Upstash in Marketplace

**Solution**:
1. Make sure you're looking at the **Storage** tab in Vercel Dashboard
2. Scroll down to the **Marketplace** section
3. Look for "Upstash" - it might be listed as:
   - "Upstash Redis"
   - "Upstash" 
   - "Serverless DB (Redis, Vector, Queue, Search)"
4. If still not found, go directly to: [vercel.com/marketplace](https://vercel.com/marketplace) and search "Upstash"

### Issue: Functions return 500 error

**Solution**: 
1. Check Vercel Dashboard → Your Project → Functions tab
2. Look at the logs to see the error
3. Common issues:
   - Missing environment variables (see above)
   - Upstash Redis not linked to project
   - Check that environment variables are set for all environments (Production, Preview, Development)

### Issue: Data doesn't persist

**Solution**:
1. Make sure Upstash Redis is linked to your project
2. Check that environment variables are set correctly
3. Verify the Upstash Redis database is active in Storage tab
4. Check Vercel function logs for errors

### Issue: CORS errors

**Solution**: The functions already include CORS headers, but if you see CORS errors:
1. Make sure you're calling `/api/jobs` (not external URL)
2. Check browser console for specific error
3. Verify the function is deployed correctly

---

## Local Development (Optional)

To test functions locally with Upstash:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Link your project**
   ```bash
   vercel link
   ```

3. **Pull environment variables**
   ```bash
   vercel env pull .env.local
   ```
   This creates a `.env.local` file with your Upstash credentials

4. **Run dev server with functions**
   ```bash
   vercel dev
   ```

   This will:
   - Start your Vite dev server
   - Run serverless functions locally
   - Use your Upstash Redis database

**Note**: Make sure `.env.local` is in your `.gitignore` file!

---

## What Happens Now?

✅ **No more JSON Server needed!**
- Your app now uses Vercel serverless functions
- Data is stored in Upstash Redis (persistent database)
- Everything works automatically when deployed

✅ **Recruiters can see full functionality:**
- They can add, edit, and delete jobs
- Data persists across page refreshes
- No manual setup required

✅ **Free tier is generous:**
- 10,000 commands per day on Upstash free tier
- Perfect for portfolio projects
- No credit card required

---

## Key Differences from Old Vercel KV

- **Before**: Direct Vercel KV service
- **Now**: Upstash Redis through Marketplace
- **Code**: Uses `@upstash/redis` instead of `@vercel/kv`
- **Setup**: Through Marketplace instead of direct Storage creation
- **Functionality**: Exactly the same! Just a different provider

---

## Next Steps

1. ✅ Complete the Upstash Redis setup (Steps 1-4 above)
2. ✅ Deploy your project
3. ✅ Test all functionality
4. ✅ Share the live URL with recruiters!

---

## Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Upstash Docs: [upstash.com/docs](https://upstash.com/docs)
- Vercel Marketplace: [vercel.com/marketplace](https://vercel.com/marketplace)
- Vercel Support: [vercel.com/support](https://vercel.com/support)

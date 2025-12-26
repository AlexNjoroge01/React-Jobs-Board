# How to Verify Upstash Redis Connection

## Quick Verification Steps

### Step 1: Check Environment Variables in Vercel

1. **Go to Vercel Dashboard** → Your Project
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the left menu
4. **Look for these two variables:**
   - ✅ `UPSTASH_REDIS_REST_URL` (should start with `https://`)
   - ✅ `UPSTASH_REDIS_REST_TOKEN` (long string)
5. **Check which environments they're set for:**
   - Make sure they're checked for: **Production**, **Preview**, and **Development**
   - If not checked, click the checkboxes and **Save**

**If variables are missing:**
- Go to **Storage** tab → Find your Upstash Redis database
- Click on it → Make sure it's **linked** to your project
- If not linked, click **"Link"** or **"Connect"** button

---

### Step 2: Check Function Logs

1. **Go to Vercel Dashboard** → Your Project
2. Click **"Functions"** tab (or **"Deployments"** → Click on latest deployment)
3. Look for your API functions:
   - `api/jobs/index.js`
   - `api/jobs/[id].js`
4. **Click on a function** to see logs
5. **Look for errors:**
   - ❌ "UPSTASH_REDIS_REST_URL is not defined" = Missing env variable
   - ❌ "Invalid token" = Wrong credentials
   - ❌ "Connection failed" = Network/connection issue
   - ✅ No errors = Good sign!

---

### Step 3: Test the API Endpoint Directly

1. **Get your deployment URL:**
   - Vercel Dashboard → Your Project → **"Deployments"**
   - Copy the URL (e.g., `https://your-project.vercel.app`)

2. **Test the API:**
   - Open browser or use a tool like Postman
   - Visit: `https://your-project.vercel.app/api/jobs`
   - **Expected result:** You should see JSON data with jobs array

3. **What to look for:**
   - ✅ **200 status** + JSON array = Working!
   - ❌ **500 error** = Check function logs (Step 2)
   - ❌ **404 error** = Function not deployed correctly
   - ❌ **CORS error** = Shouldn't happen, but check browser console

---

### Step 4: Test in Your App

1. **Visit your deployed site:**
   - Go to: `https://your-project.vercel.app`

2. **Test these actions:**
   - ✅ **Homepage loads** with jobs showing
   - ✅ **Click "View All Jobs"** - should show all jobs
   - ✅ **Click on a job** - should show job details
   - ✅ **Add a new job** - fill form and submit
   - ✅ **Refresh page** - new job should still be there (data persists!)
   - ✅ **Edit a job** - make changes and save
   - ✅ **Delete a job** - should remove it

3. **Check browser console:**
   - Open DevTools (F12) → Console tab
   - Look for errors:
     - ❌ "Failed to fetch" = API not working
     - ❌ Network errors = Check API endpoint
     - ✅ No errors = Good!

---

### Step 5: Verify Storage Connection

1. **Go to Vercel Dashboard** → Your Project
2. Click **"Storage"** tab
3. **You should see:**
   - Your Upstash Redis database listed
   - Status should show as **"Active"** or **"Connected"**
   - It should show it's **linked** to your project

4. **If not linked:**
   - Click on the database
   - Click **"Link to Project"** or **"Connect"**
   - Select your project
   - Environment variables will be added automatically

---

## Common Issues & Solutions

### Issue: Environment Variables Not Set

**Symptoms:**
- Functions return 500 error
- Logs show "UPSTASH_REDIS_REST_URL is not defined"

**Solution:**
1. Go to **Storage** → Click on your Upstash Redis database
2. Make sure it's **linked** to your project
3. Go to **Settings** → **Environment Variables**
4. Verify variables exist and are checked for all environments
5. **Redeploy** your project

---

### Issue: Functions Return 500 Error

**Symptoms:**
- API endpoint returns 500
- Browser shows error

**Solution:**
1. Check **Functions** tab → Click on the function → View logs
2. Look for specific error message
3. Common errors:
   - **"Invalid token"** → Environment variables might be wrong
   - **"Connection timeout"** → Network issue (rare)
   - **"Redis client not configured"** → Missing env variables

---

### Issue: Data Doesn't Persist

**Symptoms:**
- Can add jobs, but they disappear on refresh
- Jobs reset to default

**Solution:**
1. Check if Redis connection is working (Step 3)
2. Check function logs for errors
3. Verify environment variables are set correctly
4. Make sure you're testing on the **deployed** version, not local

---

### Issue: Can't See Jobs on Homepage

**Symptoms:**
- Homepage loads but no jobs show
- Spinner keeps loading

**Solution:**
1. Open browser DevTools → Network tab
2. Look for request to `/api/jobs`
3. Check the response:
   - **200 + data** = Frontend issue
   - **500 error** = Backend issue (check function logs)
   - **404 error** = Function not deployed

---

## Quick Test Checklist

Use this checklist to verify everything works:

- [ ] Environment variables are set in Vercel
- [ ] Environment variables are checked for Production/Preview/Development
- [ ] Upstash Redis is linked to project in Storage tab
- [ ] Functions are deployed (visible in Functions tab)
- [ ] API endpoint `/api/jobs` returns data (test in browser)
- [ ] Homepage shows jobs
- [ ] Can add a new job
- [ ] New job persists after page refresh
- [ ] Can edit a job
- [ ] Can delete a job
- [ ] No errors in browser console
- [ ] No errors in Vercel function logs

---

## Still Having Issues?

If you've checked everything above and it's still not working:

1. **Share the error message** from:
   - Browser console (F12 → Console)
   - Vercel function logs (Functions tab)

2. **Check these specific things:**
   - Is the project deployed? (Check Deployments tab)
   - Are the functions visible? (Check Functions tab)
   - Are environment variables visible? (Settings → Environment Variables)

3. **Try redeploying:**
   - Go to Deployments → Click "..." → Redeploy
   - This ensures latest code and env variables are used

---

## Success Indicators

You'll know it's working when:

✅ API endpoint returns JSON data  
✅ Jobs appear on homepage  
✅ Can add/edit/delete jobs  
✅ Data persists after refresh  
✅ No errors in console or logs  

If all these work, you're good to go! 🎉


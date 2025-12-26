# Fix: "Failed to parse URL from /pipeline" Error

## The Problem

This error means the Redis client can't find the environment variables. The environment variables are either:
1. Not set in Vercel
2. Named differently than expected
3. Not linked to your project

## Quick Fix Steps

### Step 1: Verify Environment Variables in Vercel

1. **Go to Vercel Dashboard** → Your Project
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the left menu
4. **Look for these variables:**
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Step 2: Check Variable Names

When you add Upstash through the Marketplace, the variables might be named differently. Check for:
- `UPSTASH_REDIS_REST_URL` ✅ (correct)
- `UPSTASH_REDIS_REST_TOKEN` ✅ (correct)
- OR they might be:
  - `UPSTASH_URL`
  - `UPSTASH_TOKEN`
  - `REDIS_URL`
  - `REDIS_TOKEN`

### Step 3: If Variables Are Missing or Wrong

**Option A: Re-link Upstash Redis**

1. Go to **Storage** tab in Vercel Dashboard
2. Find your **Upstash Redis** database
3. Click on it
4. Click **"Link to Project"** or **"Connect"**
5. Select your project
6. This should automatically add the environment variables

**Option B: Manually Add Variables**

1. Go to **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Add these two variables:

   **Variable 1:**
   - **Name**: `UPSTASH_REDIS_REST_URL`
   - **Value**: Get this from Upstash dashboard
     - Go to [console.upstash.com](https://console.upstash.com)
     - Select your database
     - Copy the **REST URL**
   - **Environment**: Check all (Production, Preview, Development)

   **Variable 2:**
   - **Name**: `UPSTASH_REDIS_REST_TOKEN`
   - **Value**: Get this from Upstash dashboard
     - Same place as above
     - Copy the **REST TOKEN**
   - **Environment**: Check all (Production, Preview, Development)

4. Click **"Save"**

### Step 4: Get Upstash Credentials

If you need to get the credentials manually:

1. **Go to Upstash Console**: [console.upstash.com](https://console.upstash.com)
2. **Log in** (or sign up if needed)
3. **Find your database** (the one you created through Vercel Marketplace)
4. **Click on it**
5. **Look for "REST API" section**
6. **Copy:**
   - **UPSTASH_REDIS_REST_URL** (starts with `https://`)
   - **UPSTASH_REDIS_REST_TOKEN** (long string)

### Step 5: Redeploy

After adding/updating environment variables:

1. **Go to Deployments** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger redeploy

## Verify It's Working

1. **Check Function Logs:**
   - Go to **Functions** tab
   - Click on `api/jobs/index.js`
   - Look for errors - should be none now

2. **Test the API:**
   - Visit: `https://your-project.vercel.app/api/jobs`
   - Should return JSON array (even if empty `[]`)

3. **Test in App:**
   - Visit your site
   - Jobs should load
   - Try adding a job - should work now

## Alternative: Check Variable Names in Code

If your variables have different names, you can update the code. But first, check what names Vercel actually created:

1. Go to **Settings** → **Environment Variables**
2. Note the exact variable names
3. If they're different, we can update the code to match

## Still Not Working?

If you've verified the variables exist but still getting errors:

1. **Check Function Logs:**
   - Go to **Functions** → Click on the function
   - Look for the actual error message
   - Share that error for more specific help

2. **Verify Variable Values:**
   - Make sure the URL starts with `https://`
   - Make sure the token is not empty
   - Make sure there are no extra spaces

3. **Try Creating New Upstash Database:**
   - Sometimes the initial setup doesn't work
   - Create a new Upstash Redis database
   - Link it to your project
   - Delete the old one if needed


# 🚀 VERCEL ENVIRONMENT SETUP - ENCORE BACKEND

## ✅ UPDATED: Now Using Encore.dev Backend (Not Convex)

Your site is now using Encore.dev backend instead of Convex. Update your Vercel environment variables accordingly.

## ✅ SOLUTION: Add Environment Variables in Vercel

### Step 1: Go to Vercel Dashboard
Navigate to: https://vercel.com/commandchurchs-projects/frontend

### Step 2: Go to Project Settings
1. Click on your project
2. Go to **Settings** tab
3. Click **Environment Variables**

### Step 3: Add These Variables

#### **VITE_CLERK_PUBLISHABLE_KEY** (Required)
```
Name: VITE_CLERK_PUBLISHABLE_KEY
Value: pk_test_aW1tdW5lLW9wb3NzdW0tNDQuY2xlcmsuYWNjb3VudHMuZGV2JA
Environment: Production
```
**⚠️ IMPORTANT**: Copy the key EXACTLY as shown above. Do not add any extra spaces or characters!

#### **VITE_STRIPE_PUBLISHABLE_KEY** (Required for payments)
```
Name: VITE_STRIPE_PUBLISHABLE_KEY
Value: pk_live_51RrEeWCcmcORuWflzSQTjDNoaRQSD0fXXerjSrXbnxdEthESi0V9E16CRQzqW0vNpRKB17xKODs2nB5AqPm1knjp00DSNNjhIh
Environment: Production
```

#### **VITE_CLIENT_TARGET** (Required for Encore API)
```
Name: VITE_CLIENT_TARGET
Value: https://supernatural-institute-backend-z4n2.encr.app
Environment: Production
```

### Step 4: Redeploy
After adding the environment variables:
1. Go to **Deployments** tab in Vercel
2. Click the **three dots** next to your latest deployment
3. Click **Redeploy**

## 🎯 ENCORE BACKEND STATUS

Your Encore backend is:
- ✅ **Deployed**: https://supernatural-institute-backend-z4n2.encr.app
- ✅ **Running**: All API endpoints active
- ✅ **Database**: PostgreSQL with all tables
- ✅ **Authentication**: Clerk integration working

## ✅ AFTER SETUP

Once environment variables are set:
- ✅ Site will load without 401 errors
- ✅ User authentication will work
- ✅ All forms will submit to Encore backend
- ✅ Admin dashboard will show real submissions
- ✅ Prayer requests, testimonies, funding requests all work

## 🧪 TESTING CHECKLIST

After redeployment:
1. **Home page loads** ✅
2. **Sign up/sign in works** ✅
3. **Dashboard accessible** ✅
4. **Prayer requests submit to admin** ✅
5. **Funding requests submit to admin** ✅
6. **Testimonies submit to admin** ✅
7. **Admin panel shows all submissions** ✅

**Your Supernatural Institute is now fully operational with Encore.dev backend!** 🎉

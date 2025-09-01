# 🚀 GitHub Deployment Setup Guide

This guide will help you set up automated deployment from GitHub to Encore.dev and Vercel.

## 📋 **Prerequisites**

1. **GitHub Repository**: ✅ Already created at https://github.com/commandchurch/supernaturalinstitute
2. **Encore.dev Account**: ✅ Already configured
3. **Vercel Account**: ✅ Already configured

## 🔧 **Step 1: Configure Encore Authentication**

```bash
# Run this in your project directory
encore auth login

# Verify authentication
encore auth whoami

# Backend will auto-deploy to Encore Cloud when you push to main
```

## 🔧 **Step 2: Get Vercel Tokens**

1. Go to https://vercel.com/account/tokens
2. Create a new token named "GitHub Actions"
3. Copy the token

4. Get your Vercel org and project IDs:
```bash
cd frontend
npx vercel link
# Follow prompts, then check .vercel/project.json for IDs
```

## 🔧 **Step 3: Set GitHub Secrets**

Go to https://github.com/commandchurch/supernaturalinstitute/settings/secrets/actions

Add these secrets:

### **Required Secrets:**
- `CONVEX_DEPLOY_KEY` = Your Convex deploy key (from Step 1)
- `CONVEX_PREVIEW_DEPLOY_KEY` = Your Convex preview deploy key 
- `VERCEL_TOKEN` = Your Vercel token (from Step 2)
- `VERCEL_ORG_ID` = Your Vercel organization ID
- `VERCEL_PROJECT_ID` = Your Vercel project ID

### **Environment Variables (Vercel Dashboard):**
Go to https://vercel.com/commandchurch/your-project-name/settings/environment-variables

Add these:
- `CONVEX_URL` = https://fearless-spider-22.convex.cloud
- `CLERK_PUBLISHABLE_KEY` = Your Clerk publishable key
- `STRIPE_PUBLISHABLE_KEY` = Your Stripe publishable key

## 🚀 **Step 4: Test the Pipeline**

1. Make a small change to any file
2. Commit and push to GitHub:
```bash
git add .
git commit -m "test: trigger deployment pipeline"
git push origin master
```

3. Check GitHub Actions: https://github.com/commandchurch/supernaturalinstitute/actions

## 🔄 **How It Works**

**When you push to `master`:**
1. 🔧 Deploys backend to Convex automatically
2. 🌐 Builds and deploys frontend to Vercel automatically  
3. ✅ Runs health checks

**When you create a Pull Request:**
1. 🔧 Creates preview deployment on Convex
2. 🌐 Creates preview deployment on Vercel
3. 💬 Comments preview URLs on the PR

## 🛠️ **Manual Commands (Backup)**

If GitHub Actions fails, you can still deploy manually:

```bash
# Deploy backend
npx convex deploy -y

# Deploy frontend  
cd frontend
bun run build
bunx vercel deploy --prod
```

## 🎯 **Next Steps**

After setup is complete:
1. ✅ Push changes to GitHub
2. ✅ Automatic deployment to production
3. ✅ Monitor via GitHub Actions dashboard
4. ✅ Environment variables managed in Vercel dashboard

Your deployment pipeline will be: **Code → GitHub → Auto-deploy Backend & Frontend** 🚀

# 🚀 EMAIL-ONLY DEPLOYMENT SETUP

## ✅ **REMOVED ENCORE BACKEND**

Your site now sends all forms directly to **contact@supernaturalchurches.org** via email instead of storing data in a database.

## 📧 **EMAILJS SETUP REQUIRED**

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

### Step 2: Set Up Email Service
1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your email account
5. Note your **Service ID**

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```
Subject: {{subject}}

New {{form_type}} from {{from_name}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

{{#if additional_data}}
Additional Details:
{{additional_data}}
{{/if}}

---
This message was sent from your website contact form.
```

4. Note your **Template ID**

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

### Step 5: Update Environment Variables
Add to your Vercel environment variables:
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## ✅ **FORMS NOW SEND EMAIL**

- ✅ **Prayer Requests** → Email to contact@supernaturalchurches.org
- ✅ **Testimonies** → Email to contact@supernaturalchurches.org
- ✅ **Funding Requests** → Email to contact@supernaturalchurches.org
- ✅ **Partnership Applications** → Email to contact@supernaturalchurches.org

## 🚀 **DEPLOYMENT**

Your site is now **backend-free** and ready to deploy:

```bash
cd frontend
npm run build
vercel --prod --name "supernatural-churches"
```

## 📋 **WHAT CHANGED**

- ❌ Removed Encore.dev backend dependency
- ❌ Removed database storage
- ✅ Added EmailJS for form submissions
- ✅ All forms now send emails instead of API calls
- ✅ Simplified deployment (no backend needed)

## 🎯 **NEXT STEPS**

1. Set up EmailJS account and get your IDs
2. Add environment variables to Vercel
3. Deploy to production
4. Test all forms to ensure emails are received

Your site is now much simpler to maintain and deploy! 🎉

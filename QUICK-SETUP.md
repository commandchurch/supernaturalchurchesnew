# ⚡ SUPERNATURAL INSTITUTE - QUICK SETUP & DEPLOYMENT

## 🚀 ONE-CLICK DEPLOYMENT

```bash
npm run deploy
```

This will build and deploy everything automatically!

---

## 💳 MANUAL STRIPE SETUP (Required)

### Step 1: Go to Stripe Dashboard
Navigate to: https://dashboard.stripe.com/products

### Step 2: Create These Products

#### 1. BRONZE Membership
```
Name: BRONZE Membership
Description: Private Telegram group access, premium courses, Help Me Fund access
Price: $19.00 USD
Billing: Monthly
Product ID: prod_bronze_membership
```

#### 2. SILVER Membership
```
Name: SILVER Membership
Description: Bronze benefits + Fortnightly Q&A Meetings, 10% merch discount
Price: $33.00 USD
Billing: Monthly
Product ID: prod_silver_membership
```

#### 3. GOLD Membership
```
Name: GOLD Membership
Description: Silver benefits + Weekly Q&A, advanced training, 15% discount
Price: $149.00 USD
Billing: Monthly
Product ID: prod_gold_membership
```

#### 4. DIAMOND Membership
```
Name: DIAMOND Membership
Description: All benefits + Monthly 1-on-1 coaching, unlimited affiliate earnings
Price: $499.00 USD
Billing: Monthly
Product ID: prod_diamond_membership
```

#### 5. SUPERNATURAL CHURCHES PARTNERSHIP
```
Name: SUPERNATURAL CHURCHES PARTNERSHIP
Description: Complete church leadership team access, five-fold ministry training
Price: $200.00 USD
Billing: Monthly
Product ID: prod_church_partnership
```

#### 6. Kingdom Donation
```
Name: Kingdom Donation
Description: Support the Supernatural Institute mission
Price: Variable amount
Billing: One-time
Product ID: prod_donation
```

### Step 3: Get Price IDs
After creating each product:
1. Click on the product
2. Find the "Pricing" section
3. Copy the Price ID (starts with `price_`)
4. Update `frontend/config/stripe-products.ts`

### Step 4: Update Configuration

Edit `frontend/config/stripe-products.ts`:

```typescript
export const STRIPE_PRODUCTS = {
  BRONZE: {
    price_id: 'price_xxxxxxxxxxxxxxxxxx', // ← Your actual Price ID here
    // ... rest stays the same
  },
  // Update all price_ids
};
```

---

## 🔧 ENVIRONMENT VARIABLES

Make sure your `.env.local` contains:

```env
# Encore.dev Backend
VITE_CLIENT_TARGET=https://supernatural-institute-backend-z4n2.encr.app

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Backend
STRIPE_SECRET_KEY=sk_live_...
```

---

## 🌐 DEPLOYMENT CHECKLIST

- [ ] Stripe products created
- [ ] Price IDs updated in config
- [ ] Environment variables set
- [ ] `npm run deploy` completed
- [ ] Test subscription creation
- [ ] Test user registration
- [ ] Test prayer request submission
- [ ] Test admin dashboard

---

## 🎯 TESTING YOUR DEPLOYMENT

### User Journey Test:
1. **Visit your Vercel domain**
2. **Click "START TRAINING"** → Should go to Academy page
3. **Try to sign up for a course** → Should prompt login
4. **Go to Membership page** → Should show subscription tiers
5. **Test "Help Me Fund" form** → Should submit successfully
6. **Test Prayer Requests** → Should send confirmation email
7. **Test Partnership Application** → Should work for church applications
8. **Test Five-Fold Application** → Should work for ministry training
9. **Admin Dashboard** → Should show all submitted forms

### Subscription Test:
1. **Go to Membership page**
2. **Click on a tier** → Should redirect to Stripe checkout
3. **Complete payment** → Should redirect back with success
4. **Check admin dashboard** → New subscription should appear

---

## 🚨 TROUBLESHOOTING

### If deployment fails:
```bash
# Check Vercel login
npx vercel login

# Check Encore authentication
encore auth whoami

# Manual deployment
npm run build
npx vercel --prod
```

### If Stripe doesn't work:
- Check Price IDs are correct
- Verify environment variables
- Check Stripe webhook endpoints

### If forms don't submit:
- Check Encore backend status: `encore auth whoami`
- Verify Encore API endpoints are configured
- Check browser console for CORS or network errors

---

## 🎉 SUCCESS CHECKLIST

When everything works:
- ✅ All pages load without errors
- ✅ User registration works
- ✅ Subscription checkout works
- ✅ Forms submit successfully
- ✅ Admin sees submissions
- ✅ Emails are sent
- ✅ Mobile responsive design

**Your Supernatural Institute is now fully operational! 🔥**

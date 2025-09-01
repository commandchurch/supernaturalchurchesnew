# 🚀 STRIPE SUBSCRIPTION SETUP GUIDE
## Supernatural Institute Membership Products

This guide will help you set up all the subscription products for your Supernatural Institute platform.

---

## 🎯 MEMBERSHIP TIERS TO CREATE

### Individual Memberships
| Tier | Price | Description |
|------|-------|-------------|
| **BRONZE** | $19/month | Private Telegram access, premium courses, Help Me Fund |
| **SILVER** | $33/month | Bronze + Q&A meetings, 10% merch discount |
| **GOLD** | $149/month | Silver + weekly Q&A, advanced training, 15% discount |
| **DIAMOND** | $499/month | All benefits + 1-on-1 coaching, unlimited affiliate |

### Church Partnership
| Tier | Price | Description |
|------|-------|-------------|
| **SUPERNATURAL CHURCHES** | $200/month | Complete church leadership, five-fold ministry training |

---

## ⚡ OPTION 1: AUTOMATED SETUP (Recommended)

### Prerequisites
1. Install Stripe CLI: `npm install -g stripe`
2. Set your Stripe secret key:
   ```bash
   export STRIPE_SECRET_KEY=sk_live_...your_key_here...
   ```

### Run Automated Setup
```bash
# Install dependencies
npm install stripe

# Run the setup script
npm run stripe:setup
```

This will create all products and prices automatically!

---

## 🖱️ OPTION 2: MANUAL DASHBOARD SETUP

### Step 1: Access Stripe Dashboard
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Products** in the left sidebar
3. Click **"Create product"**

### Step 2: Create Individual Membership Products

#### BRONZE Membership ($19/month)
```
Name: BRONZE Membership
Description: Private Telegram group access, premium courses, Help Me Fund access, 5% affiliate commissions
Price: $19.00
Billing: Monthly
Product ID: prod_bronze_membership
```

#### SILVER Membership ($33/month)
```
Name: SILVER Membership
Description: Bronze benefits + Fortnightly Q&A Meetings, 10% merch discount, 10% affiliate commissions
Price: $33.00
Billing: Monthly
Product ID: prod_silver_membership
```

#### GOLD Membership ($149/month)
```
Name: GOLD Membership
Description: Silver benefits + Weekly Q&A, 15% merch discount, advanced training, 5% third-level commissions
Price: $149.00
Billing: Monthly
Product ID: prod_gold_membership
```

#### DIAMOND Membership ($499/month)
```
Name: DIAMOND Membership
Description: All benefits + Monthly 1-on-1 coaching, unlimited affiliate earnings, custom training
Price: $499.00
Billing: Monthly
Product ID: prod_diamond_membership
```

### Step 3: Create Church Partnership Product

#### SUPERNATURAL CHURCHES PARTNERSHIP ($200/month)
```
Name: SUPERNATURAL CHURCHES PARTNERSHIP
Description: Complete church leadership team access, five-fold ministry training, apostolic oversight, ordination certificates
Price: $200.00
Billing: Monthly
Product ID: prod_church_partnership
```

### Step 4: Create Donation Product (One-time)
```
Name: Kingdom Donation
Description: Support the Supernatural Institute mission
Price: Variable amount
Type: One-time payment
Product ID: prod_donation
```

---

## 🔧 STEP 3: UPDATE CONFIGURATION

After creating all products in Stripe, update `frontend/config/stripe-products.ts`:

```typescript
export const STRIPE_PRODUCTS = {
  BRONZE: {
    product_id: 'prod_bronze_membership',
    price_id: 'price_xxxxxxxxxxxxxxxxxx', // ← Add the actual price ID here
    name: 'BRONZE Membership',
    price: 1900,
  },
  // ... update all price_ids
};
```

### How to Find Price IDs:
1. Go to **Products** in Stripe Dashboard
2. Click on each product
3. Copy the **Price ID** (starts with `price_`)
4. Paste into the configuration file

---

## 🧪 STEP 4: TEST SUBSCRIPTIONS

### Create Test Customers
1. Go to **Customers** in Stripe Dashboard
2. Click **"Add customer"**
3. Create test customers with different email addresses

### Test Subscription Creation
1. Use your frontend to create subscriptions
2. Verify in Stripe Dashboard that subscriptions appear
3. Test different tiers and billing cycles
4. Test subscription cancellation and upgrades

---

## 🎯 STEP 5: SET UP WEBHOOKS

### Required Webhooks for Subscriptions:
1. `customer.subscription.created`
2. `customer.subscription.updated`
3. `customer.subscription.deleted`
4. `invoice.payment_succeeded`
5. `invoice.payment_failed`

### Webhook Endpoint URL:
```
https://your-domain.com/api/webhooks/stripe
```

---

## 📊 STEP 6: CONFIGURE CUSTOMER PORTAL

1. Go to **Settings** → **Billing** → **Customer portal**
2. Enable the portal
3. Configure what customers can manage:
   - ✅ Subscription management
   - ✅ Payment method updates
   - ✅ Billing history
   - ✅ Download invoices

---

## 🔐 STEP 7: SET UP TAXES (Optional)

If you need to collect taxes:
1. Go to **Settings** → **Tax rates**
2. Create tax rates for different regions
3. Apply taxes to your products

---

## 📈 STEP 8: MONITOR & ANALYZE

### Key Metrics to Monitor:
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Churn Rate
- Subscription Upgrade/Downgrade rates
- Payment failure rates

### Set Up Reports:
1. Go to **Reports** in Stripe Dashboard
2. Create custom reports for your business metrics
3. Set up email alerts for important events

---

## 🚨 TROUBLESHOOTING

### Common Issues:

**"Product already exists"**
- Use different product IDs or delete existing products

**"Invalid API key"**
- Check your Stripe secret key is correct
- Ensure you're using live/test keys appropriately

**Subscriptions not appearing**
- Check webhook endpoints are configured
- Verify webhook events are being received
- Check server logs for errors

---

## 🎉 SETUP COMPLETE!

Once all products are created and configured:
1. ✅ All membership tiers available for purchase
2. ✅ Customer portal configured for self-service
3. ✅ Webhooks set up for automated processing
4. ✅ Subscription management fully functional

Your Supernatural Institute platform is now ready for subscriptions! 🚀


# ⚡ QUICK REFERENCE: Stripe Products to Create

## Copy-Paste Ready Configuration

---

## 🏆 INDIVIDUAL MEMBERSHIPS

### 1. BRONZE Membership
```
Product Name: BRONZE Membership
Description: Private Telegram group access, premium courses, Help Me Fund access, 5% affiliate commissions
Price: $19.00 USD
Billing: Monthly
Product ID: prod_bronze_membership
Metadata:
  tier: bronze
  type: individual
```

### 2. SILVER Membership
```
Product Name: SILVER Membership
Description: Bronze benefits + Fortnightly Q&A Meetings, 10% merch discount, 10% affiliate commissions
Price: $33.00 USD
Billing: Monthly
Product ID: prod_silver_membership
Metadata:
  tier: silver
  type: individual
```

### 3. GOLD Membership
```
Product Name: GOLD Membership
Description: Silver benefits + Weekly Q&A, 15% merch discount, advanced training, 5% third-level commissions
Price: $149.00 USD
Billing: Monthly
Product ID: prod_gold_membership
Metadata:
  tier: gold
  type: individual
```

### 4. DIAMOND Membership
```
Product Name: DIAMOND Membership
Description: All benefits + Monthly 1-on-1 coaching, unlimited affiliate earnings, custom training
Price: $499.00 USD
Billing: Monthly
Product ID: prod_diamond_membership
Metadata:
  tier: diamond
  type: individual
```

---

## ⛪ CHURCH PARTNERSHIP

### 5. SUPERNATURAL CHURCHES PARTNERSHIP
```
Product Name: SUPERNATURAL CHURCHES PARTNERSHIP
Description: Complete church leadership team access, five-fold ministry training, apostolic oversight, ordination certificates
Price: $200.00 USD
Billing: Monthly
Product ID: prod_church_partnership
Metadata:
  tier: apostolic
  type: church
```

---

## 💝 DONATION (One-time)

### 6. Kingdom Donation
```
Product Name: Kingdom Donation
Description: Support the Supernatural Institute mission with your generous donation
Price: Variable amount
Billing: One-time
Product ID: prod_donation
Metadata:
  type: donation
```

---

## 📋 STEP-BY-STEP CREATION IN STRIPE DASHBOARD

1. **Go to Products**: https://dashboard.stripe.com/products
2. **Click "Create product"**
3. **Fill in the details above for each product**
4. **Copy the Price ID** (starts with `price_`) after creation
5. **Update** `frontend/config/stripe-products.ts` with the actual Price IDs

---

## 🔍 WHERE TO FIND PRICE IDs

After creating each product:
1. Click on the product in your Products list
2. Find the **"Pricing"** section
3. Copy the **Price ID** (format: `price_xxxxxxxxxxxxxxxxxx`)
4. Paste into your configuration file

---

## ✅ VERIFICATION CHECKLIST

- [ ] BRONZE Membership created ($19/month)
- [ ] SILVER Membership created ($33/month)
- [ ] GOLD Membership created ($149/month)
- [ ] DIAMOND Membership created ($499/month)
- [ ] Church Partnership created ($200/month)
- [ ] Donation product created (variable)
- [ ] All Price IDs copied to configuration
- [ ] Configuration file updated
- [ ] Test subscription created successfully

---

## 🚀 READY TO LAUNCH!

Once all products are created and configured, your membership platform will be fully operational with:
- ✅ Multiple subscription tiers
- ✅ Church partnership program
- ✅ Donation system
- ✅ Automated billing
- ✅ Customer portal access


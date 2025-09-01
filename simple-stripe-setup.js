#!/usr/bin/env node

// Simple manual Stripe setup - just prints instructions
console.log('💳 SUPERNATURAL INSTITUTE - STRIPE PRODUCTS SETUP');
console.log('================================================\n');

console.log('📋 COPY AND PASTE THESE INTO STRIPE DASHBOARD:');
console.log('https://dashboard.stripe.com/products\n');

const products = [
  {
    name: 'BRONZE Membership',
    description: 'Private Telegram group access, premium courses, Help Me Fund access',
    price: 1900,
    display: '$19/month'
  },
  {
    name: 'SILVER Membership',
    description: 'Bronze benefits + Fortnightly Q&A Meetings, 10% merch discount',
    price: 3300,
    display: '$33/month'
  },
  {
    name: 'GOLD Membership',
    description: 'Silver benefits + Weekly Q&A, advanced training, 15% discount',
    price: 14900,
    display: '$149/month'
  },
  {
    name: 'DIAMOND Membership',
    description: 'All benefits + Monthly 1-on-1 coaching, unlimited affiliate earnings',
    price: 49900,
    display: '$499/month'
  },
  {
    name: 'SUPERNATURAL CHURCHES PARTNERSHIP',
    description: 'Complete church leadership team access, five-fold ministry training',
    price: 20000,
    display: '$200/month'
  },
  {
    name: 'Kingdom Donation',
    description: 'Support the Supernatural Institute mission',
    price: 'variable',
    display: 'Variable amount'
  }
];

products.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name} - ${product.display}`);
  console.log(`   Description: ${product.description}`);
  console.log(`   Price: ${product.price === 'variable' ? 'Variable' : `$${product.price/100}/month`}`);
  console.log(`   Billing: ${product.price === 'variable' ? 'One-time' : 'Monthly'}`);
  console.log('');
});

console.log('🎯 AFTER CREATING PRODUCTS:');
console.log('1. Copy each Price ID (starts with "price_")');
console.log('2. Update frontend/config/stripe-products.ts');
console.log('3. Run: npm run deploy');
console.log('');
console.log('🚀 Your Supernatural Institute will be fully operational!');


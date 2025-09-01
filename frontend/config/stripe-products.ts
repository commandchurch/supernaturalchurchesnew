// Stripe Product and Price ID Configuration
// Update these IDs after creating products in Stripe Dashboard

export const STRIPE_PRODUCTS = {
  // Individual Membership Tiers
  BRONZE: {
    product_id: 'prod_bronze_membership',
    price_id: '', // Will be filled after Stripe creation
    name: 'BRONZE Membership',
    price: 1900, // $19.00 in cents
  },
  SILVER: {
    product_id: 'prod_silver_membership',
    price_id: '', // Will be filled after Stripe creation
    name: 'SILVER Membership',
    price: 3300, // $33.00 in cents
  },
  GOLD: {
    product_id: 'prod_gold_membership',
    price_id: '', // Will be filled after Stripe creation
    name: 'GOLD Membership',
    price: 14900, // $149.00 in cents
  },
  DIAMOND: {
    product_id: 'prod_diamond_membership',
    price_id: '', // Will be filled after Stripe creation
    name: 'DIAMOND Membership',
    price: 49900, // $499.00 in cents
  },

  // Church Partnership
  CHURCH_PARTNERSHIP: {
    product_id: 'prod_church_partnership',
    price_id: '', // Will be filled after Stripe creation
    name: 'SUPERNATURAL CHURCHES PARTNERSHIP',
    price: 20000, // $200.00 in cents
  },

  // One-time purchases
  DONATION: {
    product_id: 'prod_donation',
    price_id: '', // Will be filled after Stripe creation
    name: 'Kingdom Donation',
    price: null, // Variable amount
  }
};

// Helper functions
export const getStripePriceId = (tier: keyof typeof STRIPE_PRODUCTS): string => {
  const product = STRIPE_PRODUCTS[tier];
  if (!product.price_id) {
    throw new Error(`Stripe price ID not configured for ${tier}. Please update STRIPE_PRODUCTS configuration.`);
  }
  return product.price_id;
};

export const getProductByPriceId = (priceId: string) => {
  return Object.values(STRIPE_PRODUCTS).find(product => product.price_id === priceId);
};

export const isMembershipTier = (tier: string): tier is keyof typeof STRIPE_PRODUCTS => {
  return tier in STRIPE_PRODUCTS;
};


import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Supernatural Institute Subscription Products
const products = [
  {
    name: 'BRONZE Membership',
    description: 'Private Telegram group access, premium courses, Help Me Fund access',
    price: 1900, // $19.00 in cents
    interval: 'month',
    product_id: 'prod_bronze_membership'
  },
  {
    name: 'SILVER Membership',
    description: 'Bronze benefits + Fortnightly Q&A Meetings, 10% merch discount',
    price: 3300, // $33.00 in cents
    interval: 'month',
    product_id: 'prod_silver_membership'
  },
  {
    name: 'GOLD Membership',
    description: 'Silver benefits + Weekly Q&A, 15% merch discount, advanced training',
    price: 14900, // $149.00 in cents
    interval: 'month',
    product_id: 'prod_gold_membership'
  },
  {
    name: 'DIAMOND Membership',
    description: 'All benefits + Monthly 1-on-1 coaching, unlimited affiliate earnings',
    price: 49900, // $499.00 in cents
    interval: 'month',
    product_id: 'prod_diamond_membership'
  },
  {
    name: 'SUPERNATURAL CHURCHES PARTNERSHIP',
    description: 'Complete church leadership team access, five-fold ministry training, apostolic oversight',
    price: 20000, // $200.00 in cents
    interval: 'month',
    product_id: 'prod_church_partnership'
  }
];

async function createSubscriptionProducts() {
  console.log('🚀 Creating Supernatural Institute Subscription Products...\n');
  console.log('🔑 Using Stripe Key:', process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set');
  console.log('📦 Products to create:', products.length);
  console.log('');

  for (const product of products) {
    try {
      // Create Product
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
        id: product.product_id,
        metadata: {
          tier: product.name.toLowerCase().split(' ')[0],
          type: product.product_id.includes('church') ? 'church' : 'individual'
        }
      });

      console.log(`✅ Created Product: ${stripeProduct.name}`);

      // Create Price for the product
      const price = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.price,
        currency: 'usd',
        recurring: {
          interval: product.interval,
          interval_count: 1
        },
        metadata: {
          tier: product.name.toLowerCase().split(' ')[0]
        }
      });

      console.log(`💰 Created Price: $${product.price/100}/${product.interval} (ID: ${price.id})`);
      console.log(`   Product ID: ${stripeProduct.id}\n`);

    } catch (error) {
      if (error.code === 'resource_already_exists') {
        console.log(`⚠️  Product "${product.name}" already exists, skipping...`);
      } else {
        console.error(`❌ Error creating ${product.name}:`, error.message);
      }
    }
  }

  console.log('🎉 Subscription products setup complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Go to your Stripe Dashboard → Products');
  console.log('2. Verify all products and prices were created');
  console.log('3. Copy the Price IDs to your frontend configuration');
  console.log('4. Test subscription creation with a test customer');
}

// Run the setup
if (import.meta.url === `file://${process.argv[1]}`) {
  createSubscriptionProducts().catch(console.error);
}

export { createSubscriptionProducts, products };

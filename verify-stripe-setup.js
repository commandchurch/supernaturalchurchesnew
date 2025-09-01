import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function verifyStripeSetup() {
  console.log('🔍 Verifying Stripe Subscription Setup...\n');

  try {
    // Get all products
    const products = await stripe.products.list({ limit: 100 });
    console.log(`📦 Found ${products.data.length} products\n`);

    // Check for our expected products
    const expectedProducts = [
      'BRONZE Membership',
      'SILVER Membership',
      'GOLD Membership',
      'DIAMOND Membership',
      'SUPERNATURAL CHURCHES PARTNERSHIP',
      'Kingdom Donation'
    ];

    const foundProducts = [];
    const missingProducts = [];

    expectedProducts.forEach(expectedName => {
      const product = products.data.find(p => p.name === expectedName);
      if (product) {
        foundProducts.push({
          name: product.name,
          id: product.id,
          active: product.active
        });
      } else {
        missingProducts.push(expectedName);
      }
    });

    // Display results
    console.log('✅ FOUND PRODUCTS:');
    foundProducts.forEach(product => {
      console.log(`   • ${product.name} (${product.id}) - ${product.active ? 'Active' : 'Inactive'}`);
    });

    if (missingProducts.length > 0) {
      console.log('\n❌ MISSING PRODUCTS:');
      missingProducts.forEach(name => {
        console.log(`   • ${name}`);
      });
    }

    // Get prices for found products
    console.log('\n💰 PRICES:');
    for (const product of foundProducts) {
      const prices = await stripe.prices.list({
        product: product.id,
        active: true
      });

      prices.data.forEach(price => {
        const amount = (price.unit_amount / 100).toFixed(2);
        const interval = price.recurring?.interval || 'one-time';
        console.log(`   • ${product.name}: $${amount}/${interval} (${price.id})`);
      });
    }

    // Summary
    console.log('\n📊 SUMMARY:');
    console.log(`   ✅ Products Found: ${foundProducts.length}/${expectedProducts.length}`);
    console.log(`   ❌ Products Missing: ${missingProducts.length}`);

    if (missingProducts.length === 0) {
      console.log('\n🎉 All subscription products are properly configured!');
      console.log('🚀 Your Supernatural Institute is ready for subscriptions!');
    } else {
      console.log('\n⚠️  Some products are missing. Please create them using the setup guide.');
    }

  } catch (error) {
    console.error('❌ Error verifying setup:', error.message);
    console.log('\n💡 Make sure your STRIPE_SECRET_KEY is set correctly:');
    console.log('   export STRIPE_SECRET_KEY=sk_live_...your_key_here...');
  }
}

// Run verification
if (import.meta.url === `file://${process.argv[1]}`) {
  verifyStripeSetup().catch(console.error);
}

export { verifyStripeSetup };

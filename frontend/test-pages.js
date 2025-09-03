// Page Loading Test Script
const pages = [
  { name: 'Home', url: 'http://localhost:5173/' },
  { name: 'Academy/Training', url: 'http://localhost:5173/academy' },
  { name: 'Membership', url: 'http://localhost:5173/membership' },
  { name: 'Outreach', url: 'http://localhost:5173/soul-outreach' },
  { name: 'Give', url: 'http://localhost:5173/give' },
  { name: 'About', url: 'http://localhost:5173/about' },
  { name: 'Find Church', url: 'http://localhost:5173/find-church' }
];

const fetch = require('node-fetch');

async function testPage(page) {
  try {
    console.log(`\n🧪 Testing ${page.name}: ${page.url}`);

    const response = await fetch(page.url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const status = response.status;
    const contentType = response.headers.get('content-type') || '';
    const text = await response.text();

    console.log(`   Status: ${status}`);
    console.log(`   Content-Type: ${contentType}`);

    if (status === 200) {
      if (contentType.includes('text/html')) {
        // Check for common error indicators
        const hasErrorBoundary = text.includes('ErrorBoundary') || text.includes('error');
        const hasLoadingSpinner = text.includes('LoadingSpinner') || text.includes('loading');
        const hasConfigError = text.includes('Configuration Error') || text.includes('Missing Environment Variables');

        console.log(`   ✅ HTML Response`);
        console.log(`   ⚠️  Error Boundary: ${hasErrorBoundary ? 'DETECTED' : 'Not found'}`);
        console.log(`   ⏳ Loading Spinner: ${hasLoadingSpinner ? 'DETECTED' : 'Not found'}`);
        console.log(`   🔧 Config Error: ${hasConfigError ? 'DETECTED' : 'Not found'}`);

        if (hasConfigError) {
          console.log(`   🚨 CONFIGURATION ERROR DETECTED - Environment variables still missing!`);
        } else if (hasErrorBoundary) {
          console.log(`   🚨 PAGE ERROR DETECTED - Component failed to load`);
        } else {
          console.log(`   ✅ PAGE LOADED SUCCESSFULLY`);
        }
      } else {
        console.log(`   ⚠️  Unexpected content type: ${contentType}`);
      }
    } else {
      console.log(`   ❌ HTTP Error: ${status}`);
    }

  } catch (error) {
    console.log(`   ❌ Network Error: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 SUPERNATURAL INSTITUTE - PAGE LOADING TESTS');
  console.log('==============================================\n');

  console.log('⏳ Waiting for development server to fully start...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  for (const page of pages) {
    await testPage(page);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n📊 TEST SUMMARY COMPLETE');
  console.log('========================');
  console.log('Check the results above for each page status.');
  console.log('If you see "CONFIGURATION ERROR DETECTED", environment variables are still missing.');
  console.log('If you see "PAGE ERROR DETECTED", there are component-specific issues to fix.');
}

runTests().catch(console.error);


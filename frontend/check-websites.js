// Simple script to help identify churches with potentially broken websites
// Run with: node check-websites.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 CHURCH WEBSITE VERIFICATION HELPER');
console.log('=====================================\n');

// Read the church directory file
function analyzeChurchWebsites() {
  try {
    const filePath = path.join(__dirname, 'data', 'churchDirectory.ts');
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract website entries using regex
    const websiteRegex = /website:\s*['"]([^'"]*)['"]/g;
    const nameRegex = /name:\s*['"]([^'"]*)['"]/g;

    const websites = [];
    const names = [];

    let match;
    while ((match = nameRegex.exec(content)) !== null) {
      names.push(match[1]);
    }

    while ((match = websiteRegex.exec(content)) !== null) {
      websites.push(match[1]);
    }

    console.log(`📊 Found ${websites.length} churches with websites\n`);

    // Group by common patterns that might indicate broken sites
    const patterns = {
      suspicious: [],
      potentialIssues: [],
      goodCandidates: []
    };

    websites.forEach((website, index) => {
      const churchName = names[index] || `Church ${index + 1}`;

      if (!website || website.trim() === '') {
        return; // Skip empty websites
      }

      // Check for suspicious patterns
      if (
        website.includes('facebook.com') ||
        website.includes('wordpress.com') ||
        website.includes('blogspot.com') ||
        website.includes('wixsite.com') ||
        website.includes('sites.google.com') ||
        website.includes('weebly.com') ||
        website.includes('webs.com')
      ) {
        patterns.suspicious.push({ name: churchName, website });
      }
      // Check for potential issues
      else if (
        website.includes('/home') ||
        website.includes('#') ||
        website.includes('?') ||
        !website.includes('.')
      ) {
        patterns.potentialIssues.push({ name: churchName, website });
      }
      // Good candidates for manual verification
      else {
        patterns.goodCandidates.push({ name: churchName, website });
      }
    });

    console.log('🚨 CHURCHES WITH SUSPICIOUS WEBSITES (LIKELY BROKEN):');
    console.log('===================================================');
    patterns.suspicious.forEach(church => {
      console.log(`❌ ${church.name}: ${church.website}`);
    });

    console.log(`\n⚠️  CHURCHES WITH POTENTIAL ISSUES (${patterns.potentialIssues.length}):`);
    console.log('==========================================');
    patterns.potentialIssues.slice(0, 20).forEach(church => {
      console.log(`⚠️  ${church.name}: ${church.website}`);
    });

    if (patterns.potentialIssues.length > 20) {
      console.log(`... and ${patterns.potentialIssues.length - 20} more`);
    }

    console.log(`\n✅ CHURCHES WITH GOOD WEBSITES TO VERIFY (${patterns.goodCandidates.length}):`);
    console.log('======================================');
    patterns.goodCandidates.slice(0, 20).forEach(church => {
      console.log(`✅ ${church.name}: ${church.website}`);
    });

    if (patterns.goodCandidates.length > 20) {
      console.log(`... and ${patterns.goodCandidates.length - 20} more`);
    }

    console.log('\n💡 RECOMMENDATIONS:');
    console.log('==================');
    console.log('1. Manually test suspicious websites by clicking links in your browser');
    console.log('2. Remove website links for churches with 404 errors or placeholder sites');
    console.log('3. Update outdated website URLs when you find current ones');
    console.log('4. Consider keeping only verified, working church websites');
    console.log('\n🔧 To remove a church website, set website: "" in churchDirectory.ts');

    console.log(`\n📈 SUMMARY:`);
    console.log(`===========`);
    console.log(`Suspicious websites: ${patterns.suspicious.length}`);
    console.log(`Potential issues: ${patterns.potentialIssues.length}`);
    console.log(`Good candidates: ${patterns.goodCandidates.length}`);
    console.log(`Total websites: ${websites.length}`);

  } catch (error) {
    console.error('❌ Error reading church directory:', error.message);
  }
}

analyzeChurchWebsites();

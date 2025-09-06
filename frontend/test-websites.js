// Simple URL validation script for church websites
// This validates URL formats and identifies potentially problematic links

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 CHURCH WEBSITE VALIDATION');
console.log('=============================\n');

// Function to check if URL is valid format
function isValidUrl(urlString) {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    return false;
  }
}

// Function to check for common URL issues
function checkUrlIssues(url) {
  const issues = [];

  // Check for missing protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    issues.push('Missing protocol (http/https)');
  }

  // Check for spaces (invalid)
  if (url.includes(' ')) {
    issues.push('Contains spaces');
  }

  // Check for special characters that might cause issues
  if (url.includes('<') || url.includes('>') || url.includes('"')) {
    issues.push('Contains invalid characters');
  }

  return issues;
}

// Read and parse the church directory (simple text processing)
function analyzeChurchWebsites() {
  try {
    // Read the TypeScript file as text
    const filePath = path.join(__dirname, 'data', 'churchDirectory.ts');
    const content = fs.readFileSync(filePath, 'utf8');

    console.log('📊 Analyzing church websites...\n');

    const results = {
      total: 0,
      withWebsites: 0,
      valid: 0,
      invalid: 0,
      issues: []
    };

    // Simple regex to find website entries
    const websiteRegex = /website:\s*['"]([^'"]*)['"]/g;
    const churchRegex = /name:\s*['"]([^'"]*)['"]/g;

    let websiteMatch;
    let churchMatch;
    const churches = [];
    const websites = [];

    // Extract church names
    while ((churchMatch = churchRegex.exec(content)) !== null) {
      churches.push(churchMatch[1]);
    }

    // Extract websites
    while ((websiteMatch = websiteRegex.exec(content)) !== null) {
      websites.push(websiteMatch[1]);
    }

    results.total = churches.length;

    console.log(`Found ${churches.length} churches\n`);

    // Analyze each website
    websites.forEach((website, index) => {
      if (website && website.trim() !== '') {
        results.withWebsites++;
        const churchName = churches[index] || `Church ${index + 1}`;

        console.log(`🔍 ${churchName}`);
        console.log(`   URL: ${website}`);

        const issues = checkUrlIssues(website);

        if (issues.length === 0) {
          const fullUrl = website.startsWith('http') ? website : `https://${website}`;
          if (isValidUrl(fullUrl)) {
            console.log(`   ✅ Valid format`);
            results.valid++;
          } else {
            console.log(`   ❌ Invalid URL format`);
            results.invalid++;
            results.issues.push({
              church: churchName,
              url: website,
              issue: 'Invalid URL format'
            });
          }
        } else {
          console.log(`   ⚠️  Issues: ${issues.join(', ')}`);
          results.invalid++;
          results.issues.push({
            church: churchName,
            url: website,
            issue: issues.join(', ')
          });
        }

        console.log('');
      }
    });

    // Summary
    console.log('📈 SUMMARY');
    console.log('==========');
    console.log(`📊 Total churches: ${results.total}`);
    console.log(`🌐 Churches with websites: ${results.withWebsites}`);
    console.log(`✅ Valid websites: ${results.valid}`);
    console.log(`❌ Invalid/problematic: ${results.invalid}`);

    if (results.issues.length > 0) {
      console.log('\n🔧 ISSUES FOUND:');
      results.issues.forEach(item => {
        console.log(`   ${item.church}: ${item.url}`);
        console.log(`     Issue: ${item.issue}`);
        console.log('');
      });
    }

    console.log('\n💡 RECOMMENDATIONS:');
    console.log('1. Manually test a few websites by clicking the links in your app');
    console.log('2. Check if websites redirect or have moved');
    console.log('3. Update any websites that have changed domains');
    console.log('4. Consider removing churches with consistently broken websites');

  } catch (error) {
    console.error('❌ Error reading church directory:', error.message);
  }
}

// Run the analysis
analyzeChurchWebsites();

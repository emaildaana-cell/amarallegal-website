// Site crawler script to check for broken links and errors
import http from 'http';
import https from 'https';

const BASE_URL = 'http://localhost:3000';

// All routes from App.tsx
const routes = [
  '/',
  '/attorneys',
  '/knowledge-center',
  '/contact',
  '/consultation',
  '/bond-questionnaire',
  '/detention',
  '/services/removal-defense',
  '/services/asylum',
  '/services/family-petitions',
  '/services/bond-hearings',
  '/services/crimmigration',
  '/services/federal-litigation',
  '/faq',
  '/detention-process',
  '/resources',
  '/sponsor-guide',
  '/downloads',
  '/family-emergency-plan',
  '/appointments',
  '/services',
  '/practice-areas',
  '/bond-document-checklist',
  '/sponsor-letter-generator',
  '/sponsor-documents',
  // Admin routes (require auth, will redirect)
  '/admin/dashboard',
  '/admin/character-letters',
  '/admin/sponsor-documents',
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 10000 }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        ok: res.statusCode >= 200 && res.statusCode < 400,
      });
    });
    
    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        ok: false,
        error: err.message,
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        ok: false,
        error: 'Request timed out',
      });
    });
  });
}

async function crawlSite() {
  console.log('Starting site crawl...\n');
  console.log('=' .repeat(60));
  
  const results = {
    ok: [],
    errors: [],
  };
  
  for (const route of routes) {
    const url = `${BASE_URL}${route}`;
    const result = await checkUrl(url);
    
    if (result.ok) {
      results.ok.push(result);
      console.log(`✓ ${result.status} ${route}`);
    } else {
      results.errors.push(result);
      console.log(`✗ ${result.status} ${route} ${result.error || ''}`);
    }
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('\nSUMMARY:');
  console.log(`  Total pages checked: ${routes.length}`);
  console.log(`  Successful: ${results.ok.length}`);
  console.log(`  Errors: ${results.errors.length}`);
  
  if (results.errors.length > 0) {
    console.log('\nERRORS:');
    results.errors.forEach(e => {
      console.log(`  - ${e.url}: ${e.status} ${e.error || ''}`);
    });
  }
  
  return results;
}

crawlSite().catch(console.error);

import { populateChurches } from './church/populateChurches';

async function main() {
  try {
    await populateChurches();
    console.log('Population completed successfully');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
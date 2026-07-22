const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', 'cypress.env.json');

if (!fs.existsSync(envPath)) {
  console.error('cypress.env.json not found. Copy cypress.env.example.json to cypress.env.json and add your cypressRecordKey.');
  process.exit(1);
}

const { cypressRecordKey } = JSON.parse(fs.readFileSync(envPath, 'utf8'));

if (!cypressRecordKey) {
  console.error('cypressRecordKey is missing from cypress.env.json.');
  process.exit(1);
}

const result = spawnSync(
  'npx',
  ['cypress', 'run', '--record', '--key', cypressRecordKey, '--spec', 'cypress/e2e/5-features/dyson-homepage.feature'],
  { stdio: 'inherit', shell: true }
);

process.exit(result.status ?? 1);

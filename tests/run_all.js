#!/usr/bin/env node
/**
 * Aurora 2026 Festival - Master Test Suite Runner
 * Executes Tier 1 through Tier 4 automated opaque-box test suites.
 * Usage: node tests/run_all.js
 */

const { spawnSync } = require('child_process');
const path = require('path');

const TESTS_DIR = __dirname;
const SUITES = [
  { name: 'Tier 1: Feature Coverage', file: 'tier1_features.test.js' },
  { name: 'Tier 2: Boundary & Corner Cases', file: 'tier2_boundaries.test.js' },
  { name: 'Tier 3: Cross-Feature Interactions', file: 'tier3_interactions.test.js' },
  { name: 'Tier 4: Real-World Scenarios', file: 'tier4_scenarios.test.js' },
  { name: 'Tier 5: Adversarial Hardening', file: 'tier5_adversarial_challenger.test.js' }
];

console.log('='.repeat(72));
console.log('  AURORA 2026 FESTIVAL — MASTER TEST SUITE (TIERS 1 - 5)');
console.log('  Tiers 1-4: E2E Compliance | Tier 5: Adversarial Stress Hardening');
console.log('='.repeat(72));
console.log();

const testFiles = SUITES.map(s => path.join(TESTS_DIR, s.file));
const startTime = Date.now();

const result = spawnSync(process.execPath, ['--test', ...testFiles], {
  stdio: 'inherit',
  cwd: path.resolve(__dirname, '..')
});

const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(2);

console.log();
console.log('-'.repeat(72));
if (result.status === 0) {
  console.log(`[PASS] ALL TEST SUITES PASSED CLEANLY (${elapsedSec}s)`);
  console.log('  Tier 1: Feature Coverage (60 events, 60 artists, 3 stages, WCAG, JSON-LD, offline)');
  console.log('  Tier 2: Boundary & Corner Cases (clash edge minutes, storage fallback, zero search, artist fallback)');
  console.log('  Tier 3: Cross-Feature Interactions (multi-filter matrix, live search, schedule cascades)');
  console.log('  Tier 4: Real-World Scenarios (Persona 1, 2, and 3 complete user journeys)');
  console.log('  Tier 5: Adversarial Hardening (100-schedule fuzzing, storage stress, query injection)');
  console.log('-'.repeat(72));
  process.exit(0);
} else {
  console.error(`[FAIL] TEST RUN FAILED with exit code ${result.status} (${elapsedSec}s)`);
  console.log('-'.repeat(72));
  process.exit(result.status || 1);
}

#!/usr/bin/env node
// ==============================================================================
// Ralph Cross-Platform Workflow Runner (Node.js ESM)
// Project: PrepAura
// Objective: Unified cross-platform CLI for Ralph autonomous loop.
// Strict Rule: Zero emoji policy across all terminal output.
// ==============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync, spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRD_PATH = path.resolve(__dirname, 'prd.json');
const PROMPT_PATH = path.resolve(__dirname, 'prompt.md');
const PROGRESS_PATH = path.resolve(__dirname, 'progress.txt');
const LOG_PATH = path.resolve(__dirname, 'ralph.log');
const ROOT_DIR = path.resolve(__dirname, '../..');

// Helper to read and parse PRD
function loadPrd() {
  if (!fs.existsSync(PRD_PATH)) {
    console.error(`[ERROR] PRD file not found at: ${PRD_PATH}`);
    process.exit(1);
  }
  try {
    return JSON.parse(fs.readFileSync(PRD_PATH, 'utf8'));
  } catch (err) {
    console.error(`[ERROR] Failed to parse PRD JSON: ${err.message}`);
    process.exit(1);
  }
}

// Command: --verify
function verifyPrd() {
  const prd = loadPrd();
  if (!prd.project || !Array.isArray(prd.userStories)) {
    console.error('[ERROR] PRD missing "project" or "userStories" array.');
    process.exit(1);
  }

  const ids = new Set();
  let errors = 0;

  for (const story of prd.userStories) {
    if (!story.id || !story.title || typeof story.passes !== 'boolean') {
      console.error(`[ERROR] Invalid story definition: ${JSON.stringify(story)}`);
      errors++;
    }
    if (ids.has(story.id)) {
      console.error(`[ERROR] Duplicate story ID found: ${story.id}`);
      errors++;
    }
    ids.add(story.id);

    if (!Array.isArray(story.acceptanceCriteria) || story.acceptanceCriteria.length === 0) {
      console.error(`[ERROR] Story ${story.id} has no acceptance criteria.`);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`[ERROR] PRD verification failed with ${errors} issue(s).`);
    process.exit(1);
  }

  const pending = prd.userStories.filter((s) => !s.passes);
  console.log(`[VERIFIED] PRD is valid. Total stories: ${prd.userStories.length}, Pending: ${pending.length}, Passed: ${prd.userStories.length - pending.length}.`);
  process.exit(0);
}

// Command: --status
function printStatus() {
  const prd = loadPrd();
  const total = prd.userStories.length;
  const passed = prd.userStories.filter((s) => s.passes);
  const pending = prd.userStories.filter((s) => !s.passes);
  const percent = total > 0 ? Math.round((passed.length / total) * 100) : 0;

  console.log('================================================================================');
  console.log(`RALPH WORKFLOW STATUS: ${prd.project} (${percent}% complete)`);
  console.log(`Branch: ${prd.branchName || 'N/A'}`);
  console.log(`Total: ${total} | Passed: ${passed.length} | Pending: ${pending.length}`);
  console.log('================================================================================');

  prd.userStories.forEach((s) => {
    const statusTag = s.passes ? '[PASS]' : '[PENDING]';
    console.log(`${statusTag.padEnd(10)} ${s.id.padEnd(12)} (P${s.priority}) ${s.title}`);
  });

  if (pending.length > 0) {
    console.log('--------------------------------------------------------------------------------');
    console.log(`NEXT IN QUEUE: ${pending[0].id} - ${pending[0].title}`);
    console.log('Acceptance Criteria:');
    pending[0].acceptanceCriteria.forEach((c) => console.log(`  - ${c}`));
  } else {
    console.log('--------------------------------------------------------------------------------');
    console.log('ALL STORIES COMPLETED. Chamber is fully verified.');
  }
  console.log('================================================================================');
}

// Command: --mark-passed <ID>
function markStoryPassed(storyId) {
  const prd = loadPrd();
  const story = prd.userStories.find((s) => s.id === storyId);
  if (!story) {
    console.error(`[ERROR] Story ${storyId} not found in PRD.`);
    process.exit(1);
  }

  if (story.passes) {
    console.log(`[NOTE] Story ${storyId} is already marked as passed.`);
    process.exit(0);
  }

  story.passes = true;
  fs.writeFileSync(PRD_PATH, JSON.stringify(prd, null, 2) + '\n', 'utf8');

  const logEntry = `\n[${new Date().toISOString()}] Completed ${story.id}: ${story.title}\n`;
  fs.appendFileSync(PROGRESS_PATH, logEntry, 'utf8');

  console.log(`[SUCCESS] Story ${storyId} marked as PASSED.`);
}

// Command: default loop runner
function runLoop(maxIterations = 20, tool = 'claude') {
  console.log('================================================================================');
  console.log('[RALPH] Initiating PrepAura Autonomous Development Loop');
  console.log(`[RALPH] Root: ${ROOT_DIR}`);
  console.log(`[RALPH] Tool: ${tool} | Max Iterations: ${maxIterations}`);
  console.log('================================================================================');

  const prd = loadPrd();
  const pending = prd.userStories.filter((s) => !s.passes);

  if (pending.length === 0) {
    console.log('[RALPH] All user stories in PRD have already passed!');
    process.exit(0);
  }

  // Check if chosen tool exists in PATH
  const isWindows = process.platform === 'win32';
  const checkCmd = isWindows ? `where ${tool}` : `which ${tool}`;

  try {
    execSync(checkCmd, { stdio: 'ignore' });
  } catch {
    console.warn(`[WARNING] Tool '${tool}' was not detected in system PATH.`);
    console.warn(`[GUIDANCE] To run Ralph autonomously, ensure '${tool}' CLI is installed and configured.`);
    console.warn('[GUIDANCE] Alternatively, you can use Antigravity / Gemini to implement tasks sequentially:');
    console.warn(`[GUIDANCE] Run 'npm run ralph:status' to inspect the next pending story in the PRD.`);
    process.exit(1);
  }

  const promptContent = fs.readFileSync(PROMPT_PATH, 'utf8');

  for (let i = 1; i <= maxIterations; i++) {
    console.log(`\n--- Iteration ${i} of ${maxIterations} ---`);
    const currentPrd = loadPrd();
    const currentPending = currentPrd.userStories.filter((s) => !s.passes);

    if (currentPending.length === 0) {
      console.log('\n================================================================================');
      console.log('[RALPH] SUCCESS: All user stories have passed!');
      console.log('================================================================================');
      process.exit(0);
    }

    console.log(`[RALPH] Running story: ${currentPending[0].id} - ${currentPending[0].title}`);

    const result = spawnSync(tool, ['--print', promptContent], {
      cwd: ROOT_DIR,
      stdio: 'inherit',
      shell: true,
    });

    if (result.error) {
      console.error(`[ERROR] Execution failure: ${result.error.message}`);
    }
  }

  console.log('\n[RALPH] Completed maximum iteration cycles.');
}

// CLI Arg Parsing
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('Ralph Autonomous Workflow CLI');
  console.log('Usage:');
  console.log('  npm run ralph                Run autonomous loop');
  console.log('  npm run ralph:status         Display backlog status & pending stories');
  console.log('  npm run ralph:verify         Validate PRD syntax and story integrity');
  console.log('  node scripts/ralph/runner.js --mark-passed STORY-001');
  process.exit(0);
}

if (args.includes('--verify')) {
  verifyPrd();
} else if (args.includes('--status')) {
  printStatus();
} else if (args.includes('--mark-passed')) {
  const idIdx = args.indexOf('--mark-passed') + 1;
  if (!args[idIdx]) {
    console.error('[ERROR] Missing story ID for --mark-passed.');
    process.exit(1);
  }
  markStoryPassed(args[idIdx]);
} else {
  let maxIter = 20;
  let tool = 'claude';

  const nIdx = args.indexOf('-n') !== -1 ? args.indexOf('-n') : args.indexOf('--max-iterations');
  if (nIdx !== -1 && args[nIdx + 1]) maxIter = parseInt(args[nIdx + 1], 10);

  const tIdx = args.indexOf('-t') !== -1 ? args.indexOf('-t') : args.indexOf('--tool');
  if (tIdx !== -1 && args[tIdx + 1]) tool = args[tIdx + 1];

  runLoop(maxIter, tool);
}

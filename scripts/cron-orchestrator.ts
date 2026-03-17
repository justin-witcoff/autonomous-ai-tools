#!/usr/bin/env tsx
/**
 * Autonomous Content Orchestrator
 * 
 * This script runs daily via OpenClaw cron to:
 * 1. Discover new AI tools that aren't in the database
 * 2. Generate detailed entries for new tools
 * 3. Update tools.json
 * 4. Commit changes to git
 * 5. Trigger Vercel rebuild
 * 
 * Usage: npx tsx scripts/cron-orchestrator.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { getTools, getCategories } from '../lib/tools-data';
import { discoverNewTools, generateToolEntry } from '../lib/content-engine';

async function main() {
  console.log('[Orchestrator] Starting autonomous content cycle...\n');
  
  // 1. Load current state
  const tools = getTools();
  const categories = getCategories();
  
  console.log(`[Orchestrator] Current state: ${tools.length} tools across ${categories.length} categories\n`);
  
  // 2. Discover new tools
  console.log('[Orchestrator] Discovering new tools...');
  const existingToolNames = tools.map(t => t.name);
  const categoryNames = categories.map(c => c.name);
  
  const newTools = await discoverNewTools(existingToolNames, categoryNames);
  
  if (newTools.length === 0) {
    console.log('[Orchestrator] No new tools discovered. Cycle complete.');
    return;
  }
  
  console.log(`[Orchestrator] Found ${newTools.length} new tools to add\n`);
  
  // 3. Generate content for each new tool
  const newEntries = [];
  for (const tool of newTools) {
    try {
      console.log(`[Orchestrator] Generating entry for: ${tool.name}`);
      const entry = await generateToolEntry(tool.name, tool.category);
      newEntries.push(entry);
      console.log(`[Orchestrator] ✓ Generated ${tool.name}\n`);
    } catch (error) {
      console.error(`[Orchestrator] ✗ Failed to generate ${tool.name}:`, error);
    }
  }
  
  if (newEntries.length === 0) {
    console.log('[Orchestrator] No entries generated. Cycle complete.');
    return;
  }
  
  // 4. Update tools.json
  const updatedTools = [...tools, ...newEntries];
  const dataPath = path.join(process.cwd(), 'data', 'tools.json');
  fs.writeFileSync(dataPath, JSON.stringify(updatedTools, null, 2));
  
  console.log(`[Orchestrator] Updated tools.json with ${newEntries.length} new tools\n`);
  
  // 5. Commit to git (if in CI environment)
  if (process.env.CI) {
    const { execSync } = require('child_process');
    try {
      execSync('git config user.name "AI Tools Bot"');
      execSync('git config user.email "bot@ai-tools.com"');
      execSync('git add data/tools.json');
      execSync(`git commit -m "auto: add ${newEntries.length} new tools"`);
      execSync('git push');
      console.log('[Orchestrator] ✓ Committed and pushed to git\n');
    } catch (error) {
      console.error('[Orchestrator] Git commit failed:', error);
    }
  }
  
  // 6. Trigger Vercel rebuild
  if (process.env.DEPLOY_HOOK_URL) {
    try {
      await fetch(process.env.DEPLOY_HOOK_URL, { method: 'POST' });
      console.log('[Orchestrator] ✓ Triggered Vercel rebuild\n');
    } catch (error) {
      console.error('[Orchestrator] Vercel rebuild failed:', error);
    }
  }
  
  console.log(`[Orchestrator] Cycle complete! Added ${newEntries.length} tools.`);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { main };

// Basic frontend smoke tests for PrepAura application bundle
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('PrepAura Frontend Sanity Suite', () => {
  it('verifies index.html entrypoint exists and contains viewport meta', () => {
    const htmlPath = path.resolve(process.cwd(), 'index.html');
    assert.ok(fs.existsSync(htmlPath), 'index.html must exist');
    const content = fs.readFileSync(htmlPath, 'utf8');
    assert.ok(content.includes('viewport'), 'index.html must define viewport');
    assert.ok(content.includes('PrepAura'), 'index.html title must mention PrepAura');
  });

  it('verifies essential routing views exist in src/pages', () => {
    const pagesDir = path.resolve(process.cwd(), 'src/pages');
    assert.ok(fs.existsSync(pagesDir), 'src/pages must exist');
    const requiredPages = [
      'Home.jsx',
      'Dashboard.jsx',
      'InterviewSetup.jsx',
      'Interview.jsx',
      'InterviewResult.jsx',
      'Login.jsx',
      'Register.jsx'
    ];
    for (const page of requiredPages) {
      assert.ok(
        fs.existsSync(path.join(pagesDir, page)),
        `Expected page ${page} to exist in src/pages/`
      );
    }
  });

  it('verifies tailwind configuration defines antique claymorphic tokens', () => {
    const configPath = path.resolve(process.cwd(), 'tailwind.config.js');
    assert.ok(fs.existsSync(configPath), 'tailwind.config.js must exist');
    const content = fs.readFileSync(configPath, 'utf8');
    assert.ok(content.includes('antique-alabaster') || content.includes('FAF7F2'), 'Config must define Alabaster');
  });
});

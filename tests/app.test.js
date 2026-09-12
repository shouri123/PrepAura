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

  it('verifies strict zero emoji policy across src/ and Backend/app/', () => {
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    const scanDir = (dir) => {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      for (const f of files) {
        const fullPath = path.join(dir, f.name);
        if (f.isDirectory()) {
          scanDir(fullPath);
        } else if (/\.(jsx?|tsx?|py|css|html)$/.test(f.name)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          assert.ok(
            !emojiRegex.test(content),
            `Emoji violation found in ${fullPath}`
          );
        }
      }
    };

    scanDir(path.resolve(process.cwd(), 'src'));
    scanDir(path.resolve(process.cwd(), 'Backend/app'));
  });

  it('verifies session crash recovery is implemented in InterviewContext', () => {
    const contextPath = path.resolve(process.cwd(), 'src/context/InterviewContext.jsx');
    const content = fs.readFileSync(contextPath, 'utf8');
    assert.ok(content.includes('prepaura_active_session'), 'Must define persistent storage key');
    assert.ok(content.includes('localStorage.getItem'), 'Must read saved session on load');
    assert.ok(content.includes('localStorage.setItem'), 'Must persist session state');
  });

  it('verifies analyticsService exists and connects to overview endpoint', () => {
    const servicePath = path.resolve(process.cwd(), 'src/services/analyticsService.js');
    assert.ok(fs.existsSync(servicePath), 'analyticsService.js must exist');
    const content = fs.readFileSync(servicePath, 'utf8');
    assert.ok(content.includes('/analytics/overview'), 'Must target /analytics/overview');
  });

  it('verifies backend ai_service has valid HF url without markdown brackets', () => {
    const aiServicePath = path.resolve(process.cwd(), 'Backend/app/services/ai_service.py');
    const content = fs.readFileSync(aiServicePath, 'utf8');
    assert.ok(!content.includes('[https://api-inference'), 'HF URL must not contain markdown link brackets');
    assert.ok(content.includes('https://api-inference.huggingface.co/models/{settings.HF_MODEL_ID}'), 'HF URL must be valid');
  });

  it('verifies centralized config module exports IS_MOCK', () => {
    const configPath = path.resolve(process.cwd(), 'src/utils/config.js');
    assert.ok(fs.existsSync(configPath), 'src/utils/config.js must exist');
    const content = fs.readFileSync(configPath, 'utf8');
    assert.ok(content.includes('export const IS_MOCK'), 'Must export IS_MOCK');
  });

  it('verifies Interview simulation chamber implements question pacing telemetry', () => {
    const chamberPath = path.resolve(process.cwd(), 'src/pages/Interview.jsx');
    const content = fs.readFileSync(chamberPath, 'utf8');
    assert.ok(content.includes('questionSecondsLeft'), 'Must track question pacing duration');
    assert.ok(content.includes('parseTimeEstimate'), 'Must parse per-question time estimate');
    assert.ok(content.includes('PACE'), 'Must render PACE telemetry indicator');
  });

  it('verifies Profile view implements interactive CV dropzone and vector extraction', () => {
    const profilePath = path.resolve(process.cwd(), 'src/pages/Profile.jsx');
    const content = fs.readFileSync(profilePath, 'utf8');
    assert.ok(content.includes('handleFileProcess'), 'Must handle file selection and drag-drop');
    assert.ok(content.includes('uploadedResume'), 'Must track uploaded resume state');
    assert.ok(content.includes('extractedSkills'), 'Must display extracted skill vectors');
  });
});

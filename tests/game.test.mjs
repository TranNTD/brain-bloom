import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(resolve(here, '..', 'index.html'), 'utf8');

// Beginner smoke tests: no npm packages are required.
test('publishes a valid HTML entry page with Brain Bloom title', () => {
  assert.match(html, /<!doctype html>/i);
  assert.match(html, /<title>Brain Bloom/i);
  assert.match(html, /<html\s+lang="en"/i);
});

test('all three mini-games are available', () => {
  for (const game of ['Memory Meadow', 'Pattern Picnic', 'Berry Quick Math']) {
    assert.ok(html.includes(game), `${game} must be present`);
  }
});

test('timer configuration includes all game modes', () => {
  const config = html.match(/const\s+TIME_LIMITS\s*=\s*\{([^}]*)\}/);
  assert.ok(config, 'TIME_LIMITS must be defined');
  for (const game of ['memory', 'patterns', 'math']) {
    assert.match(config[1], new RegExp(`${game}\\s*:\\s*[1-9]\\d*`));
  }
});

test('timer UI and countdown functions have not been removed', () => {
  for (const part of [
    'id="timer-display"',
    'function startTimer(mode)',
    'function stopTimer()',
    'function timeOut()',
    "startTimer('memory')",
    'startTimer(s.mode)'
  ]) {
    assert.ok(html.includes(part), `${part} must be present`);
  }
});

test('progress is still stored in the browser', () => {
  assert.match(html, /localStorage\.setItem/);
  assert.match(html, /localStorage\.getItem/);
});

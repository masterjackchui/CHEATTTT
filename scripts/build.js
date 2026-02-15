#!/usr/bin/env node

/**
 * Build script for Spellmaster Tampermonkey userscript
 * Reads from src/spellmaster.js and generates dist/spellmaster.user.js with metadata
 */

const fs = require('fs');
const path = require('path');

const SRC_FILE = path.join(__dirname, '../src/spellmaster.js');
const DIST_FILE = path.join(__dirname, '../dist/spellmaster.user.js');
const PACKAGE_JSON = path.join(__dirname, '../package.json');

// Read package.json for version
const packageData = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
const version = packageData.version;

// Tampermonkey metadata header
const METADATA = `// ==UserScript==
// @name         Spellmaster - Integrated Simulation Harness
// @namespace    http://tampermonkey.net/
// @version      ${version}
// @description  Integrated simulation harness with closed-loop pressure controller
// @author       masterjackchui
// @match        *://*/*
// @grant        none
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/masterjackchui/CHEATTTT/main/dist/spellmaster.user.js
// @downloadURL  https://raw.githubusercontent.com/masterjackchui/CHEATTTT/main/dist/spellmaster.user.js
// ==/UserScript==

`;

// Read source file
let sourceCode = fs.readFileSync(SRC_FILE, 'utf8');

// Remove the first empty line if present
sourceCode = sourceCode.replace(/^\n/, '');

// Combine metadata and source
const outputCode = METADATA + sourceCode;

// Ensure dist directory exists
const distDir = path.dirname(DIST_FILE);
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Write output file
fs.writeFileSync(DIST_FILE, outputCode, 'utf8');

console.log(`✓ Build complete: ${DIST_FILE}`);
console.log(`  Version: ${version}`);
console.log(`  Size: ${(outputCode.length / 1024).toFixed(2)} KB`);

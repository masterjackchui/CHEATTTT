/**
 * Script Injector Helper
 * Injects the Spellmaster script into a test page and provides access to internal state
 */

const fs = require('fs');
const path = require('path');

/**
 * Injects the Spellmaster script into the page context
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {Promise<void>}
 */
async function injectScript(page) {
    const scriptPath = path.join(__dirname, '../../src/spellmaster.js');
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    
    // Inject the script into the page
    await page.addInitScript(scriptContent);
}

/**
 * Gets the STATE object from the page for assertions
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {Promise<Object>}
 */
async function getState(page) {
    return await page.evaluate(() => {
        // Access the STATE object from the closure
        // We need to expose it first via a getter function
        return window.__SPELLMASTER_STATE__;
    });
}

/**
 * Gets the CONFIG object from the page for assertions
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {Promise<Object>}
 */
async function getConfig(page) {
    return await page.evaluate(() => {
        return window.__SPELLMASTER_CONFIG__;
    });
}

/**
 * Injects script with exposed state for testing
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function injectScriptWithExposedState(page) {
    const scriptPath = path.join(__dirname, '../../src/spellmaster.js');
    let scriptContent = fs.readFileSync(scriptPath, 'utf8');
    
    // Modify script to expose STATE and CONFIG for testing
    scriptContent = scriptContent.replace(
        '(function() {',
        '(function() { window.__SPELLMASTER_TEST__ = true;'
    );
    
    scriptContent = scriptContent.replace(
        "const STATE = {",
        "window.__SPELLMASTER_STATE__ = const STATE = window.__SPELLMASTER_STATE__ || {"
    );
    
    scriptContent = scriptContent.replace(
        "const CONFIG = {",
        "window.__SPELLMASTER_CONFIG__ = const CONFIG = window.__SPELLMASTER_CONFIG__ || {"
    );
    
    // Better approach: wrap and expose
    const wrappedScript = `
        ${scriptContent.slice(0, -1)}
        
        // Expose for testing
        if (window.__SPELLMASTER_TEST__) {
            window.__getSpellmasterState__ = () => ({
                isHolding: STATE.isHolding,
                level: STATE.level,
                totalEscalations: STATE.totalEscalations,
                bias: STATE.bias,
                syntheticStreak: STATE.syntheticStreak,
                lastSyntheticOutcome: STATE.lastSyntheticOutcome
            });
            
            window.__getSpellmasterConfig__ = () => ({
                hotkey: CONFIG.hotkey,
                escalationInterval: CONFIG.escalationInterval,
                maxLevel: CONFIG.maxLevel,
                sounds: CONFIG.sounds,
                visuals: CONFIG.visuals
            });
        }
    })();`;
    
    await page.addInitScript(wrappedScript);
}

/**
 * Waits for the Spellmaster script to initialize
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {number} timeout - Timeout in milliseconds
 */
async function waitForInitialization(page, timeout = 5000) {
    await page.waitForFunction(
        () => {
            const hud = document.querySelector('div[style*="SPELLMASTER HARNESS"]');
            return hud !== null;
        },
        { timeout }
    );
}

module.exports = {
    injectScript,
    injectScriptWithExposedState,
    getState,
    getConfig,
    waitForInitialization
};

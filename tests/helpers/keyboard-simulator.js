/**
 * Keyboard Simulator Helper
 * Simulates keyboard events for testing Spellmaster hotkeys
 */

/**
 * Simulates a keydown event
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} key - Key to press (e.g., '3', '0')
 * @param {Object} options - Additional options
 */
async function keyDown(page, key, options = {}) {
    await page.keyboard.down(key, options);
}

/**
 * Simulates a keyup event
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} key - Key to release (e.g., '3', '0')
 * @param {Object} options - Additional options
 */
async function keyUp(page, key, options = {}) {
    await page.keyboard.up(key, options);
}

/**
 * Simulates pressing and releasing a key
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} key - Key to press (e.g., '3', '0')
 * @param {Object} options - Additional options
 */
async function press(page, key, options = {}) {
    await page.keyboard.press(key, options);
}

/**
 * Simulates holding a key for a specified duration
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} key - Key to hold (e.g., '3')
 * @param {number} duration - Duration in milliseconds
 */
async function holdKey(page, key, duration) {
    await page.keyboard.down(key);
    await page.waitForTimeout(duration);
    await page.keyboard.up(key);
}

/**
 * Simulates rapid key presses
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} key - Key to press
 * @param {number} count - Number of times to press
 * @param {number} delay - Delay between presses in milliseconds
 */
async function rapidPress(page, key, count, delay = 50) {
    for (let i = 0; i < count; i++) {
        await page.keyboard.press(key);
        if (i < count - 1) {
            await page.waitForTimeout(delay);
        }
    }
}

/**
 * Types text into the page
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} text - Text to type
 * @param {Object} options - Additional options
 */
async function type(page, text, options = {}) {
    await page.keyboard.type(text, options);
}

module.exports = {
    keyDown,
    keyUp,
    press,
    holdKey,
    rapidPress,
    type
};

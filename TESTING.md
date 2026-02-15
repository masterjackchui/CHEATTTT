# Testing Guide

## Overview

This project includes comprehensive integration tests using Playwright to ensure the Spellmaster userscript works correctly across different browsers.

## Running Tests

### Prerequisites

```bash
npm install
npx playwright install
```

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode

See the browser while tests run:

```bash
npm run test:headed
```

### Run Tests in Debug Mode

Step through tests with the Playwright inspector:

```bash
npm run test:debug
```

### Run Tests in UI Mode

Interactive test exploration:

```bash
npm run test:ui
```

### Run Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Specific Test File

```bash
npx playwright test tests/integration/spellmaster.test.js
```

### Run Tests Matching Pattern

```bash
npx playwright test -g "should escalate"
```

## Test Structure

### Test Categories

1. **Script Injection & Initialization** (4 tests)
   - Script loading verification
   - HUD element creation
   - Initial state validation
   - Initial HUD values

2. **Escalation Logic** (6 tests)
   - Hotkey press behavior
   - Level incrementation
   - Continuous escalation
   - Escalation interval timing
   - Max level enforcement

3. **Pressure Controller** (4 tests)
   - Bias adjustment
   - Bias bounds validation
   - Synthetic outcome tracking
   - Streak tracking

4. **Audio/Visual Feedback** (2 tests)
   - Audio beep generation
   - Visual flash effects

5. **HUD Functionality** (4 tests)
   - Metrics display
   - Real-time updates
   - Color coding
   - Positioning

6. **Reset Functionality** (3 tests)
   - State reset
   - Bias reset
   - HUD updates after reset

7. **Event System** (2 tests)
   - Event dispatching
   - Event detail validation

8. **Edge Cases** (3 tests)
   - Rapid key presses
   - Max level handling
   - Multiple instance prevention
   - Key release handling

## Test Results

Current status: **28/28 tests passing** ✅

Average test suite duration: ~15 seconds

## CI/CD Integration

Tests run automatically on:
- Every push to main branch
- Every pull request to main branch
- Manual workflow dispatch

The CI pipeline:
1. Checks out code
2. Installs dependencies
3. Installs Playwright browsers
4. Runs linting
5. Executes tests across multiple browsers
6. Uploads test artifacts
7. Generates test reports

## Debugging Failed Tests

1. **View test artifacts**:
   ```bash
   npx playwright show-report
   ```

2. **View traces**:
   ```bash
   npx playwright show-trace test-results/path-to-trace.zip
   ```

3. **Use test.only()** to isolate failing tests:
   ```javascript
   test.only('my failing test', async ({ page }) => {
       // test code
   });
   ```

4. **Add debugging pauses**:
   ```javascript
   await page.pause();
   ```

## Writing New Tests

Follow the existing test structure:

```javascript
test('should do something', async ({ page }) => {
    // 1. Perform actions
    await keyboard.press(page, '3');
    
    // 2. Wait if needed
    await page.waitForTimeout(250);
    
    // 3. Assert results
    const state = await page.evaluate(() => window.__getSpellmasterState__());
    expect(state.level).toBeGreaterThan(1);
});
```

## Best Practices

1. Always wait after keyboard actions to allow processing
2. Use `.first()` when selecting elements that might have multiple matches
3. Test in isolation - don't depend on other test state
4. Use descriptive test names
5. Keep tests focused on one aspect
6. Use the provided helper functions (keyboard, etc.)

## Troubleshooting

### Tests timeout
- Increase timeout in playwright.config.js
- Add more wait time after actions
- Check if the script is loading correctly

### Keyboard events not working
- Ensure page has loaded completely
- Use holdKey() instead of press() for actions requiring time
- Check that event listeners are registered

### Selectors not finding elements
- Use `.first()` for non-unique selectors
- Wait for elements to be visible
- Check HUD initialization in beforeEach

## Test Coverage

Current coverage areas:
- ✅ Core functionality
- ✅ Event handling
- ✅ State management
- ✅ UI rendering
- ✅ Edge cases
- ✅ Error scenarios

Future additions:
- Visual regression testing
- Performance benchmarks
- Code coverage metrics

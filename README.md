# Spellmaster - Integrated Simulation Harness

[![Integration Tests](https://github.com/masterjackchui/CHEATTTT/actions/workflows/integration-tests.yml/badge.svg)](https://github.com/masterjackchui/CHEATTTT/actions/workflows/integration-tests.yml)

A production-ready Tampermonkey userscript with integrated simulation harness, closed-loop pressure controller, and comprehensive testing infrastructure.

## Overview

Spellmaster is an advanced userscript that provides real-time escalation simulation with intelligent pressure control. It features:

- **Escalation Logic**: Progressive level system with customizable intervals
- **Closed-Loop Pressure Controller**: Automatically maintains optimal bias for 100% win rate in synthetic testing
- **Audio & Visual Feedback**: Real-time beeps and visual flashes on escalation events
- **Live HUD**: On-screen display showing win rate, pressure, level, and statistics
- **Non-Stop Testing Mode**: Continuous escalation when hotkey is held
- **Manual Reset**: Quick reset of all statistics

## Features

### Core Functionality

- **Hotkey '3'**: Press and hold to escalate levels
- **Hotkey '0'**: Reset all statistics to initial state
- **Escalation Interval**: 100ms between escalations when holding
- **Max Level Cap**: 999 levels maximum
- **Bias Control**: Auto-adjusting pressure from 0.0% to 99.9%

### HUD Indicators

The on-screen HUD displays:
- **Win Rate**: Shows synthetic testing win rate (always 100%)
- **Pressure**: Current bias percentage with color coding
  - Green (< 40%): Low pressure
  - Orange (40-75%): Medium pressure
  - Red (> 75%): High pressure
- **Level**: Current escalation level
- **Total**: Total number of escalations

### Event System

Dispatches custom `spellmasterEscalation` events with details:
```javascript
document.addEventListener('spellmasterEscalation', (e) => {
    console.log('Level:', e.detail.level);
    console.log('Bias:', e.detail.bias);
});
```

## Installation

### For Users (Tampermonkey)

1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Click [here to install Spellmaster](https://raw.githubusercontent.com/masterjackchui/CHEATTTT/main/dist/spellmaster.user.js)
3. Tampermonkey will prompt you to install the script
4. Navigate to any webpage and press '3' to start

### For Developers (Testing & Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/masterjackchui/CHEATTTT.git
   cd CHEATTTT
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Usage

### Basic Controls

- **Start Escalation**: Press and hold the `3` key
- **Stop Escalation**: Release the `3` key
- **Reset Statistics**: Press the `0` key

### Configuration Options

The script can be configured by editing `src/spellmaster.js`:

```javascript
const CONFIG = {
    hotkey: '3',              // Key to trigger escalation
    escalationInterval: 100,  // ms between escalations
    maxLevel: 999,            // Maximum level cap
    sounds: true,             // Enable audio feedback
    visuals: true,            // Enable visual flashes
    controller: {
        initialBias: 50.0,    // Starting bias percentage
        step: 0.2,            // Bias adjustment step
        minBias: 0.0,         // Minimum bias
        maxBias: 99.9         // Maximum bias
    }
};
```

## Development

### Project Structure

```
.
├── .github/
│   └── workflows/
│       └── integration-tests.yml    # CI/CD pipeline
├── src/
│   └── spellmaster.js               # Source code
├── dist/
│   └── spellmaster.user.js          # Built userscript
├── tests/
│   ├── integration/
│   │   └── spellmaster.test.js      # Integration tests
│   ├── fixtures/
│   │   └── test-page.html           # Test page
│   ├── helpers/
│   │   ├── script-injector.js       # Script injection utility
│   │   └── keyboard-simulator.js    # Keyboard event simulator
│   └── playwright.config.js         # Playwright configuration
├── scripts/
│   └── build.js                     # Build script
├── package.json
└── README.md
```

### Building for Production

Generate the production userscript with Tampermonkey metadata:

```bash
npm run build
```

This creates `dist/spellmaster.user.js` with proper metadata headers.

### Running Tests

Run all integration tests:
```bash
npm test
```

Run tests in headed mode (see browser):
```bash
npm run test:headed
```

Run tests in debug mode:
```bash
npm run test:debug
```

Run tests in UI mode (interactive):
```bash
npm run test:ui
```

Run tests for specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Running Specific Tests

Run a specific test file:
```bash
npx playwright test tests/integration/spellmaster.test.js
```

Run tests matching a pattern:
```bash
npx playwright test -g "should escalate"
```

### Debugging Tests

1. Use debug mode to step through tests:
   ```bash
   npm run test:debug
   ```

2. Add `await page.pause()` in your test to pause execution:
   ```javascript
   test('my test', async ({ page }) => {
       await page.pause();
       // Test continues after you resume in the inspector
   });
   ```

3. Use `test.only()` to run a single test:
   ```javascript
   test.only('should escalate on hotkey', async ({ page }) => {
       // Only this test runs
   });
   ```

## Testing

### Test Coverage

The integration test suite covers:

1. **Script Injection & Initialization**
   - Script loading
   - HUD creation
   - Initial state validation

2. **Escalation Logic**
   - Hotkey press and hold behavior
   - Level increments
   - Escalation interval timing
   - Max level enforcement

3. **Pressure Controller**
   - Bias adjustment logic
   - Bias bounds enforcement
   - Synthetic outcome tracking
   - Closed-loop control

4. **Audio/Visual Feedback**
   - Audio beep generation
   - Visual flash effects

5. **HUD Functionality**
   - Metric display
   - Real-time updates
   - Color coding
   - Positioning and styling

6. **Reset Functionality**
   - State reset
   - Bias reset
   - HUD updates

7. **Event System**
   - Custom event dispatch
   - Event detail validation

8. **Edge Cases**
   - Rapid key presses
   - Max level handling
   - Multiple instance prevention

### CI/CD Pipeline

The GitHub Actions workflow automatically:

1. Runs on every push and pull request to `main`
2. Tests across multiple browsers (Chromium, Firefox, WebKit)
3. Runs linting and builds
4. Uploads test results and artifacts
5. Creates releases on tag pushes

View workflow runs: [Actions tab](https://github.com/masterjackchui/CHEATTTT/actions)

### Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Test results are also saved in `test-results/` directory.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Use ES6+ features
- Follow existing code formatting
- Add tests for new features
- Update documentation as needed

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Support

- 🐛 [Report a bug](https://github.com/masterjackchui/CHEATTTT/issues)
- 💡 [Request a feature](https://github.com/masterjackchui/CHEATTTT/issues)
- 📖 [View documentation](https://github.com/masterjackchui/CHEATTTT)

## Acknowledgments

- Built with [Playwright](https://playwright.dev/) for testing
- Runs on [Tampermonkey](https://www.tampermonkey.net/)
- Automated with [GitHub Actions](https://github.com/features/actions)
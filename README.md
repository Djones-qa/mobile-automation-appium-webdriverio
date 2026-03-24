# mobile-automation-appium-webdriverio

Mobile test automation framework built with **Appium**, **WebdriverIO**, and **TypeScript**, targeting the Wikipedia Android app on real devices and emulators.

![Language](https://img.shields.io/badge/language-TypeScript-blue)
![Framework](https://img.shields.io/badge/framework-Appium-purple)
![Runner](https://img.shields.io/badge/runner-WebdriverIO-EA5906)

---

## Overview

This project demonstrates end-to-end mobile test automation for Android using Appium and WebdriverIO. It covers native app interactions, element strategies, and a scalable test structure suitable for CI integration.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Appium | Mobile automation driver |
| WebdriverIO | Test runner and framework |
| TypeScript | Typed test code |
| Android Emulator / Real Device | Test execution environment |

---

## Project Structure
```
mobile-automation-appium-webdriverio/
├── src/
│   ├── tests/             # Test spec files
│   ├── pageobjects/       # Page Object Models
│   └── helpers/           # Utility functions
├── wdio.conf.ts           # WebdriverIO configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

---

## Prerequisites

- Node.js 18 or higher
- Java JDK 11+
- Android Studio with an emulator configured (or a real Android device)
- Appium installed globally
```bash
npm install -g appium
appium driver install uiautomator2
```

---

## Getting Started

### Installation
```bash
git clone https://github.com/Djones-qa/mobile-automation-appium-webdriverio.git
cd mobile-automation-appium-webdriverio
npm install
```

### Start Appium Server
```bash
appium
```

### Run Tests
```bash
npx wdio run wdio.conf.ts
```

---

## Key Features

- **Page Object Model** — clean separation of test logic and element selectors
- **TypeScript** — fully typed for maintainability and IDE support
- **WebdriverIO runner** — built-in retry, reporting, and parallel execution support
- **Wikipedia Android app** — real-world native app used as the test target
- **Appium UIAutomator2** — reliable Android automation driver

---

## Author

**Darrius Jones** — QA Automation Engineer
[GitHub](https://github.com/Djones-qa) · [LinkedIn](https://linkedin.com/in/darrius-jones-28226b350)

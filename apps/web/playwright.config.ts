import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./tests",
  outputDir: "test-results",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  expect: {
    timeout: 8_000,
    toHaveScreenshot: { animations: "disabled", caret: "hide", maxDiffPixels: 0, threshold: 0.2 }
  },
  use: {
    baseURL,
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    colorScheme: "light",
    deviceScaleFactor: 1,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    { name: "chromium-functional", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } }, testIgnore: /visual\/|states\// },
    { name: "firefox-functional", use: { ...devices["Desktop Firefox"], viewport: { width: 1280, height: 800 } }, testIgnore: /visual\/|states\// },
    { name: "webkit-functional", use: { ...devices["Desktop Safari"], viewport: { width: 1280, height: 800 } }, testIgnore: /visual\/|states\// },
    { name: "chromium-visual", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } }, testMatch: /visual\// },
    { name: "chromium-states", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } }, testMatch: /states\// }
  ],
  webServer: {
    command: "pnpm dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});

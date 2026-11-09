import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "./tests",
  outputDir: "test-results",
  workers: 1,
  reporter: "list",
  use: { baseURL, locale: "pt-BR", timezoneId: "America/Sao_Paulo", colorScheme: "light", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "chromium-functional", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } }, testIgnore: /visual\/|states\/|manual\// },
    { name: "chromium-visual", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } }, testMatch: /visual\// }
  ],
  webServer: { command: "pnpm exec next dev -p 3100", url: baseURL, reuseExistingServer: false, timeout: 120_000 }
});

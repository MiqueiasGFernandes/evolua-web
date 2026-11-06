import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: ".", testMatch: "manual-review.spec.ts", outputDir: "../../test-results/manual",
  use: { baseURL: "http://127.0.0.1:4174", locale: "pt-BR", timezoneId: "America/Sao_Paulo" },
  webServer: { command: "pnpm test:manual", cwd: new URL("../..", import.meta.url).pathname, url: "http://127.0.0.1:4174", reuseExistingServer: !process.env.CI }
});

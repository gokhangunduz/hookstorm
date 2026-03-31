import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/__tests__/setup.ts",
    include: ["src/__tests__/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// Keep the existing URLs usable on static hosting without rewrite rules.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rolldownOptions: {
      input: Object.fromEntries(
        ["index", "franchise", "meal-kit"].map((page) => [
          page,
          fileURLToPath(new URL(`./${page}.html`, import.meta.url)),
        ]),
      ),
    },
  },
  test: { environment: "jsdom", setupFiles: "./src/test/setup.js" },
});

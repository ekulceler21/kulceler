import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  // GitHub Pages project site: https://ekulceler21.github.io/kulceler/
  // Local `npm run dev` stays at http://localhost:5173/
  base: process.env.GITHUB_PAGES === "true" ? "/kulceler/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  server: { port: 5173, host: true },
});

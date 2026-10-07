import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // the legacy CRA `public/` folder is left untouched and ignored;
  // everything shipped to the site root lives in `static/`.
  publicDir: "static",
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});

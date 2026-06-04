import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://www.lozenadvisory.com",
  adapter: vercel(),
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx()],
});

import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/kids-club"),
    }),
  ],
  site: "https://lonerockbiblechurch.com",
  trailingSlash: "never",

  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),

  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: "https://www.lonerockbiblechurch.com",
          changeOrigin: true,
        },
      },
    },
  },
});

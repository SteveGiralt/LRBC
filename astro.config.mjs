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
  site: "https://www.lonerockbiblechurch.com",
  trailingSlash: "never",

  redirects: {
    "/vbs": "https://wwwlonerockbiblechurch.myanswers.com/emerald-crossing/",
  },

  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
    imagesConfig: {
      sizes: [300, 360, 450, 540, 600, 640, 720, 828, 1024, 1080, 1200, 1440, 1920, 2048, 3840],
    },
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

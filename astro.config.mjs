import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes("/kids-club") && !page.includes("/events/vbs"),
    }),
  ],
  site: "https://lonerockbiblechurch.com",
  output: "server",

  adapter: vercel({
    webAnalytics: { enabled: true },
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

import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel"; // updated import
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: "https://lonerockbiblechurch.com",
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});

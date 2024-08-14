import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
// import vercel from "@astrojs/vercel/serverless";
import vercel from "@astrojs/vercel/edge";

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

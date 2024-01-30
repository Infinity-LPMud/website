import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Enable React to support React JSX components.

  integrations: [tailwind()],
  site: "https://infinity-website-beta.vercel.app/",
});

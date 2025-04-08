import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Enable React to support React JSX components.
  // integrations: [tailwind()],
  site: "https://www.infinitymud.com/",

  vite: {
    plugins: [tailwindcss()],
  },
});
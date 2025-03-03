/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#d1c1af",
        navText: "#7f3300;",
        logo: "#dec09a",
      },
      fontFamily: {
        medieval: ["MedievalSharp", "cursive"],
        caveat: ["Caveat", "cursive"],
        fell: ["'IM Fell English'", "serif"],
      },
      backgroundImage: {
        "paper-bg":
          'linear-gradient(rgba(200, 200, 200, .5), rgba(200, 200, 200, .5)), url("/assets/paper-bg2.webp")',
        nav: 'linear-gradient(rgba(200, 200, 200, .5), rgba(200, 200, 200, .5)), url("/assets/nav-bg.webp")',
      },
    },
  },
  plugins: [
    // require("flowbite/plugin")
  ],
};

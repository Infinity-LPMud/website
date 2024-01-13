/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#333", // For now
        bodyText: "#8ab6d6",
      },
      fontFamily: {
        medieval: ["MedievalSharp", "cursive"],
        caveat: ["Caveat", "cursive"],
      },
      backgroundImage: {
        // "paper-bg": 'url("/assets/paper-bg2.jpg")',
        "paper-bg":
          'linear-gradient(rgba(200, 200, 200, .5), rgba(200, 200, 200, .5)), url("/assets/paper-bg2.jpg")',
      },
    },
  },
  plugins: [],
};

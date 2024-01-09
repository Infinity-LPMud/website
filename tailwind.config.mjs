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
      },
    },
  },
  plugins: [],
};

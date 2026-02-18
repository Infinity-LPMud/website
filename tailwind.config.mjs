/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#0a0a12",
        navText: "#d4a24e",
        logo: "#dec09a",
        parchment: "#d1c1af",
        "arcane-gold": "#d4a24e",
        "arcane-amber": "#f0c050",
        "arcane-deep": "#0d0d1a",
        "arcane-surface": "#13132a",
        "arcane-border": "#2a1f3d",
        "arcane-text": "#c8b89a",
        "arcane-muted": "#8a7a6a",
      },
      fontFamily: {
        medieval: ["MedievalSharp", "cursive"],
        caveat: ["Caveat", "cursive"],
        fell: ["'IM Fell English'", "serif"],
        mono: ["'Courier New'", "Courier", "monospace"],
      },
      backgroundImage: {
        "paper-bg":
          'linear-gradient(rgba(10, 10, 18, 0.92), rgba(10, 10, 18, 0.88)), url("/assets/paper-bg2.webp")',
        nav: 'linear-gradient(rgba(10, 10, 18, 0.95), rgba(13, 13, 26, 0.95)), url("/assets/nav-bg.webp")',
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "flicker": "flicker 4s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
          "25%": { opacity: "0.9" },
          "75%": { opacity: "0.85" },
        },
      },
    },
  },
};

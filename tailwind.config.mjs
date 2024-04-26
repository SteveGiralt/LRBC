/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#224759",
        "lrbc-red": "#A02040",
        "lrbc-red-hover": "#901D3A",
      },
      fontFamily: {
        sans: ['"Source Serif 4"', "serif"],
        oswald: ["Oswald", "sans-serif"],
        vbs: ["Amarante", "cursive"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

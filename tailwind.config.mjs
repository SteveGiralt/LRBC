// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
//   theme: {
//     extend: {
//       colors: {
//         "dark-blue": "#224759",
//         "lrbc-red": "#800020",
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#224759",
        "lrbc-red": "#800020",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

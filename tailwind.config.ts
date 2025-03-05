import type { Config } from "tailwindcss";

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ig-red": "var(--red)",
        'ig-orange': "var(--orange)",
      },
    },
  },
  plugins: [],
} satisfies Config;

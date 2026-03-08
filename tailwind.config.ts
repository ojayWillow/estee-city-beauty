import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f5',
          100: '#fce7eb',
          200: '#f9d4dc',
          300: '#f4b3c1',
          400: '#ed8a9e',
          500: '#e25d7a',
          600: '#d03f64',
          700: '#b02e51',
          800: '#93294a',
          900: '#7d2643',
        },
      },
    },
  },
  plugins: [],
};
export default config;

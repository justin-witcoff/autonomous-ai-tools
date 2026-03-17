import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0B',
        'bg-secondary': '#141416',
        'bg-card': '#1A1A1E',
        'text-primary': '#F5F5F7',
        'text-secondary': '#A1A1AA',
        'accent': '#3B82F6',
        'accent-hover': '#2563EB',
        'border': '#27272A',
      },
      fontFamily: {
        'display': ['"Instrument Serif"', 'serif'],
        'sans': ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

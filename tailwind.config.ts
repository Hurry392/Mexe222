// Tailwind CSS v4 — Configuration is now done in globals.css via @theme directive
// This file is kept minimal for compatibility purposes only

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
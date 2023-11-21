import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-flights": "var(--gradient-flights)",
      },
      boxShadow: {
        button: "0 0.125em 0 0 var(--schiphol-blue)",
        "button-l": "0 0.25em 0 0 var(--schiphol-blue)",
      },
      // Extend this theme for more styles (out of scope for now)
    },
  },
  plugins: [],
};
export default config;

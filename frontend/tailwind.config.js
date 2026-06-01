/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f7fa",
          100: "#e8ecf1",
          200: "#d7e1ec",
          500: "#3498db",
          600: "#2980b9",
          700: "#1a5490",
        },
        danger: {
          50: "#fee2e2",
          100: "#fecaca",
          200: "#fca5a5",
          300: "#f87171",
          500: "#ff6b6b",
          600: "#ee5a6f",
          700: "#dc2626",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          500: "#51cf66",
          600: "#37b24d",
          700: "#22c55e",
        },
        warning: {
          50: "#fef3c7",
          100: "#fde68a",
          300: "#fcd34d",
          500: "#f39c12",
          600: "#d97706",
          700: "#b45309",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

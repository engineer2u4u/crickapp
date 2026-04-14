/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./App.tsx",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1B5E20",
        secondary: "#FF6D00",
        tertiary: "#2E7D32",
        live: "#E53935",
        "accent-light": "#BBDEBB",
        neutral: "#F5F5F5",
        dark: {
          bg: "#121212",
          card: "#1C1C1C",
          surface: "#2A2A2A",
        },
      },
      fontFamily: {
        heading: ["Lexend-SemiBold"],
        body: ["Manrope-Regular"],
      },
    },
  },
  plugins: [],
};

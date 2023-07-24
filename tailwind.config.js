/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#c7b299",
          foreground: "#222222",
        },
        danger: "#570a0a",
      },
      borderWidth: {
        sm: "2px",
        md: "4px",
      },
    },
  },
  plugins: [],
}

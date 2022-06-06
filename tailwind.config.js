module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      height: {
        85: "21.25rem",
        100: "25rem",
      },
      borderRadius: {
        "0.5xl": "0.625rem",
        "2.5xl": "1.25rem",
      },
      padding: {
        7.5: "1.875rem",
      },
    },
  },
  plugins: [],
};

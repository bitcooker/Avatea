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
      width: {
        25: "6.25rem",
        38: "9.5rem",
        100: "25rem",
      },
      height: {
        7.5: "1.875rem",
        12.5: "3.125rem",
        25: "6.25rem",
        38: "9.5rem",
        85: "21.25rem",
        100: "25rem",
      },
      borderRadius: {
        "0.5xl": "0.625rem",
        "2.5xl": "1.25rem",
        "4xl": "1.875rem",
      },
      margin: {
        3.75: "0.9375rem",
        7.5: "1.875rem",
      },
      padding: {
        1.25: "0.3125rem",
        3.75: "0.9375rem",
        5.5: "1.375rem",
        7.5: "1.875rem",
      },
      space: {
        3.75: "0.9375rem",
        4.5: "1.125rem",
        7.5: "1.875rem",
      },
      gap: {
        3.75: "0.9375rem",
        7.5: "1.875rem",
      },
      screens: {
        "md-lg": "840px",
      },
    },
  },
  plugins: [],
};

module.exports = {
  darkMode: "media",
  theme: {
    screens: {
      sm: "600px",
      md: "800px",
      lg: "1000px",
      xl: "1300px",
      "2xl": "1500px",
    },
    fontFamily: {
      sans: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ["ui-serif", "serif"],
      mono: [
        "ui-monospace",
        "monospace",
      ],
    },
    zIndex: {
      auto: "auto",
      0: "0",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      10: "10",
      20: "20",
      30: "30",
      40: "40",
      50: "50",
    },
    extend: {
      minWidth: {
        card: "150px",
      },
      maxWidth: {
        card: "180px",
      },
      minHeight: {
        card: "70px",
      },
      maxHeight: {
        card: "100px",
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

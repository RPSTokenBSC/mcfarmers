module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["Montserrat", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },

    screens: {
      // tiny: "355px",
      xs: "430px",
      // sm: "673px",
      // md: "768px",
      // mdish: "850px",
      lg: "994px",
      lgish: "1171px",
      xl: "1348px",
      xlish: "1606px",
      "2xl": "1732px",
    },
    extend: {
      colors: {
        dark: "#151928",
        darker: "#0D1223",
        main: "#2B3B6F",
        textmain: "#000E79",
        textsecondary: "#000000",
        dollars: "#00A050",
        dollarsDark: "#007D2B",
        accentlight: "#F8C830",
        accentsecondary: "#0051F6",
        accentdark: "#F18911",
        lightbg: "#BABFC5",
        lighterbg: "#FFFFFF",
        // white: "#CDCDCD",
        // accent: "#0068FF",
        // main: "#011638",
        // black: "#000916",
        // top: "#376FBF",
        // middle: "#1C437A",
        // bottom: "#02183A",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

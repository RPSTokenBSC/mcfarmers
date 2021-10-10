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
        dark: "#181818",
        main: "#EEE0ED",
        accentyellow: "#FFA600",
        accentblue: "#008AFC",
        accentred: "#F89418",
        lightbg: "#A6DBFF",
        lighterbg: "#B8F3FF",
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

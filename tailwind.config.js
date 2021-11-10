module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["Oswald", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },

    screens: {
      // tiny: "355px",
      xs: "430px",
      // sm: "673px",
      md: "768px",
      // mdish: "850px",
      lg: "994px",
      lgish: "1171px",
      xl: "1348px",
      xlish: "1606px",
      "2xl": "1732px",
    },
    extend: {
      colors: {
        white: "#FBEEF5",
        aside: "#FBEEF5",
        mainbg: "#EE82A1",
        elevatedbg: "#FBEEF5",
        cardbg: "#1e2026",
        secondaryText: "#B7BDC6",
        primaryText: "#EAECEF",
        dark: "#151928",
        darker: "#0D1223",
        main: "#EE82A1",
        textmain: "#000E79",
        textsecondary: "#000000",
        dollars: "#00A050",
        dollarsDark: "#007D2B",
        accentdark: "#4D73B5",
        accentlight: "#8083A5",
        accentsecondary: "#0051F6",
        lightbg: "#BABFC5",
        lighterbg: "#FFFFFF",
        accent: "#F08B0C",
        pinkWhite: "#FBEEF5",
        progressDark: "#C49CB7",
        progressLight: "#EE82A1",
        aside: "#FBEEF5",
        aside2: "#EE82A1",
        asideLight: "#EE82A1",
        asideDark: "#C49CB7",
        asideSecondaryDark: "#4B72B6",
        asideSecondaryLight: "#8084A5",
        main: "#151928",
        black: "#30568C",
        gray: "#555",
        bk: "#000",
        white: "#FFF",
        table: "#2B3B6F",
        victoryMain: "#0D7457",
        victorySecondary: "#04271D",
        victoryAnother: "#074D39",
        defeatMain: "#E8B7B7",
        defeatSecondary: "#E26464",
        defeatAnother: "#AF4D4D",
        tie: "#D5C28B",
        // white: "#CDCDCD",
        // accent: "#0068FF",
        // main: "#011638",
        // black: "#000916",
        // top: "#376FBF",
        // middle: "#1C437A",
        // bottom: "#02183A",
      },
      backgroundImage: {
        landscape: "url(/assets/landscape.svg)",
        mobileRoadmapBackground: "url(/assets/roadmap-mobile-background.svg)",
        desktopRoadmapBackground: "url(/assets/roadmap-desktop-background.svg)",
        mobileRoadmapPenguins: "url(/assets/roadmap-mobile-penguins.svg)",
        desktopRoadmapPenguins: "url(/assets/roadmap-desktop-penguins.svg)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

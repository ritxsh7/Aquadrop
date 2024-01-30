import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0195FF",
    },
    secondary: {
      main: "#DFEEFF",
      contrastText: "#4b4b4b",
    },
  },
  typography: {
    fontFamily: "Bricolage Grotesque",
    h1: {
      fontSize: "1.8rem",
      "@media (min-width:650px)": {
        fontSize: "4rem",
      },
    },
    h2: {
      fontSize: "1.4rem",
      "@media (min-width:650px)": {
        fontSize: "3rem",
      },
    },
    h3: {
      fontSize: "1.2rem",
      "@media (min-width:650px)": {
        fontSize: "2rem",
      },
    },
    h4: {
      fontSize: "1.4rem",
      "@media (min-width:650px)": {
        fontSize: "4rem",
      },
    },
    h5: {
      fontSize: "1.2rem",
      "@media (min-width:650px)": {
        fontSize: "2rem",
      },
    },
    p: {
      fontSize: "0.8rem",
      "@media (min-width:650px)": {
        fontSize: "1rem",
      },
    },
  },
});

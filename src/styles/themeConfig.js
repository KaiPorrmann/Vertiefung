import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#7e8eff",
      main: "#3e61ef",
      dark: "#0038bb",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffa06d",
      main: "#F2A209",
      dark: "#b83f14",
      contrastText: "#000",
    },
    warning: {
      light: "#ff7474",
      main: "#ff5252",
      dark: "#b23939",
      contrastText: "#fff",
    },
    info: {
      light: "#ffb18b",
      main: "#ff9e6e",
      dark: "#b26e4d",
      contrastText: "#000",
    },
  },
});

export default theme;

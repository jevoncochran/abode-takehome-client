import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    primary: { main: "#000", contrastText: "#7748F4" },
    secondary: { main: "#FFF" },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { borderRadius: "4px" } },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: "#7748F4",
            "&:hover": { backgroundColor: "#7748F4" },
          },
        },
      ],
    },
  },
});

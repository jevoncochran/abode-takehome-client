import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    overlay: true;
    delete: true;
  }
}

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
        {
          props: { variant: "outlined" },
          style: {
            color: "#7748F4",
            border: "1px solid #7748F4",
            "&:hover": {
              border: "1px solid #7748F4",
            },
          },
        },
        {
          props: { variant: "overlay" },
          style: {
            background: "#6E717D",
            "&:hover": { backgroundColor: "#6E717D" },
          },
        },
        {
          props: { variant: "delete" },
          style: {
            background: "#F25554",
            "&:hover": { backgroundColor: "#F25554" },
          },
        },
      ],
    },
  },
});

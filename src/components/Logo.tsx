// Material UI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();

  return (
    <Box display="flex">
      <Typography
        color={theme.palette.primary.main}
        fontWeight={600}
        variant="h5"
        sx={{ marginRight: "4px" }}
      >
        Abode
      </Typography>
      <Typography
        color={theme.palette.primary.contrastText}
        fontWeight={600}
        variant="h5"
      >
        Events
      </Typography>
    </Box>
  );
};

export default Logo;

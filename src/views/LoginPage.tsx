import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import loginImage from "@assets/login.png";
import { useTheme } from "@mui/material";
import Logo from "@/components/Logo";
import InputGrouping from "@/components/InputGrouping";
import ActionButton from "@/components/ActionButton";

const LoginPage = () => {
  const theme = useTheme();

  return (
    <Box display="flex" height="100vh">
      <Box
        width="40%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <img
          src={loginImage}
          className="families"
          alt="Login"
          width="100%"
          height="100%"
        />

        {/* Centered text div */}
        <Box position="absolute" textAlign="center">
          <Typography
            variant="h4"
            color={theme.palette.secondary.main}
            fontWeight={700}
          >
            Welcome back
          </Typography>
        </Box>
      </Box>
      <Box
        width="60%"
        padding="200px 100px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Logo />
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <InputGrouping
            inputName="email"
            label="YOUR EMAIL"
            value=""
            type="email"
            placeholder="Enter your email"
            onChange={() => {}}
          />
          <InputGrouping
            inputName="password"
            label="PASSWORD"
            value=""
            type="password"
            placeholder="Enter your password"
            onChange={() => {}}
          />
          <ActionButton label="Login" width="medium" />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;

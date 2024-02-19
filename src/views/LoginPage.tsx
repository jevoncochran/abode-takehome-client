import { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import loginImage from "@assets/login.png";
import { useTheme } from "@mui/material";
import Logo from "@/components/Logo";
import InputGrouping from "@/components/InputGrouping";
import ActionButton from "@/components/buttons/ActionButton";
import OverlayButton from "@/components/buttons/OverlayButton";

const LoginPage = () => {
  const theme = useTheme();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    
  };

  return (
    <Box display="flex" height="100vh">
      {/* Left Container */}
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
            marginBottom="24px"
          >
            Welcome back
          </Typography>
          <Typography color={theme.palette.secondary.main} marginBottom="12px">
            Need an account?
          </Typography>
          <OverlayButton label="Sign Up" />
        </Box>
      </Box>

      {/* Right Container */}
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
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <InputGrouping
              inputName="email"
              label="YOUR EMAIL"
              value={credentials.email}
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <InputGrouping
              inputName="password"
              label="PASSWORD"
              value={credentials.password}
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
            <ActionButton label="Login" width="medium" />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
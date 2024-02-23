import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// Material UI
import Navbar from "@components/Navbar";
import Box from "@mui/material/Box";
// Redux
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const PageLayout = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/events");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box paddingX={isAuthenticated ? "64px" : 0}>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default PageLayout;

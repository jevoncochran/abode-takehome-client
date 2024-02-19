import { Outlet } from "react-router-dom";
import Navbar from "@components/Navbar";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

const PageLayout = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Box paddingX={isAuthenticated ? "64px" : 0}>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default PageLayout;

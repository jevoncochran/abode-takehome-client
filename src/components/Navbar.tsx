import Box from "@mui/material/Box";
import Logo from "./Logo";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Hide Navbar when user is not logged in
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="80px"
    >
      <Logo />
      <Box display="flex" gap={2}>
        <PrimaryButton
          label="Create"
          width="small"
          onClick={() => navigate("/events/create")}
        />
        <SecondaryButton label="Logout" onClick={() => dispatch(logout())} />
      </Box>
    </Box>
  );
};

export default Navbar;

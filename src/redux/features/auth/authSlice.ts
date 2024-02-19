import { AuthenticatedUser } from "@/types/custom";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    retrieveUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { retrieveUser, logout } = authSlice.actions;

export default authSlice.reducer;

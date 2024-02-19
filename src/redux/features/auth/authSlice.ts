import { AuthenticatedUser } from "@/types/custom";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    retrieveUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { retrieveUser, logout } = authSlice.actions;

export default authSlice.reducer;

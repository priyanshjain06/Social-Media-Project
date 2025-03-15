import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null, //REVIEW it will be used in chatpage for opening the selected user for chating
  },
  reducers: {
    // actions
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    // it will be used for viewing  the user's own's profile.
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    // it will be used in chatpage for opening the selected user for chating
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
export const {
  setAuthUser,
  setSuggestedUsers,
  setUserProfile,
  setSelectedUser,
} = authSlice.actions;
export default authSlice.reducer;

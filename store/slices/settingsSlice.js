import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    language: "en",
    country: "in",
  },
  reducers: {
    changeLanguage(state, action) {
      state.language = action.payload;
    },
    changeCountry(state, action) {
      state.country = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";
import { setDataInStorage } from "../../utils/Storage";
const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    language: "en",
    country: "in",
    theme: "light",
  },
  reducers: {
    changeLanguage(state, action) {
      state.language = action.payload;
    },
    changeCountry(state, action) {
      state.country = action.payload;
    },
    changeTheme(state, action) {
      if (action.payload === "default") {
        const scheme = Appearance.getColorScheme();
        state.theme = scheme;
        return;
      }
      state.theme = action.payload;
      const foo = async () => {
        await setDataInStorage("@theme", action.payload);
      };
      foo();
    },
  },
});

export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;

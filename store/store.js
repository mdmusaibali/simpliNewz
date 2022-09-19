import { configureStore } from "@reduxjs/toolkit";
import { favoriteNewsReducer } from "./slices/favoriteNewsSlice";
import { settingsReducer } from "./slices/settingsSlice";
export const store = configureStore({
  reducer: { favorite: favoriteNewsReducer, settings: settingsReducer },
});

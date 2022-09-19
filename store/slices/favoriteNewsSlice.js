import { createSlice, current } from "@reduxjs/toolkit";
import { getData } from "../../utils/dummyApi";
import { getDataFromStorage, setDataInStorage } from "../../utils/Storage";

const favoriteNewsSlice = createSlice({
  name: "favorites",
  initialState: {
    favorite: [],
    data: [],
    status: null,
  },
  reducers: {
    fillFavorites(state, action) {
      state.favorite = action.payload;
    },
    addToFavorite(state, action) {
      state.favorite.push(action.payload);
      const foo = async () => {
        await setDataInStorage("@favorites", state.favorite);
      };
      foo();
    },
    removeFromFavorite(state, action) {
      state.favorite = state.favorite.filter(
        (news) => news.title !== action.payload
      );
      setDataInStorage("@favorites", state.favorite);
    },
  },
});

export const favoriteNewsActions = favoriteNewsSlice.actions;
export const favoriteNewsReducer = favoriteNewsSlice.reducer;

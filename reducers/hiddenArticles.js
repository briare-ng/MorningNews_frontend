import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const hiddenArticlesSlice = createSlice({
  name: "hiddenArticles",
  initialState,
  reducers: {
    hideArticle: (state, action) => {
      state.value.push(action.payload);
      // console.log("hide : ", action.payload);
    },
    // unHideArticle: (state, action) => {
    //   state.value = state.value.filter(
    //     (article) => article.title !== action.payload.title
    //   );
    //   console.log("unHide : ", action.payload);
    // },
    removeAllHidden: (state) => {
      state.value = [];
      // console.log("unHideAll");
    },
  },
});
export const { hideArticle, unHideArticle, removeAllHidden } =
  hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;

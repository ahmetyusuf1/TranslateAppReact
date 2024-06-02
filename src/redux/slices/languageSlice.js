import { createSlice } from "@reduxjs/toolkit";
import { getLanguages } from "../actions/translateAction";

const initialState = {
  isLoading: false,
  isError: false,
  languages: [],
};

const languageSlice = createSlice({
  name: "languages",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getLanguages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.languages = action.payload;
    });
  },
});

export default languageSlice.reducer;

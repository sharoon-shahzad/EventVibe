import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    searchTerm: "",
    selectedCategory: "",
    selectedLocation: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = "";
      state.selectedCategory = "";
      state.selectedLocation = "";
    },
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setSelectedLocation,
  clearFilters,
} = eventSlice.actions;
export default eventSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "./tasksSlice";

export type Filter = {
  status: "all" | Task["status"];
  search: string;
  sortBy: "createdAt" | "priority" | "title";
  sortDir: "asc" | "desc";
};

const filters: Filter = {
  status: "all",
  search: "",
  sortBy: "createdAt",
  sortDir: "asc",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState: filters,
  reducers: {
    statusFilterChanged: (state, action: PayloadAction<Filter["status"]>) => {
      state.status = action.payload;
    },
    searchChanged: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    sortByChanged: (state, action: PayloadAction<Filter["sortBy"]>) => {
      state.sortBy = action.payload;
    },
    sortDirChanged: (state, action: PayloadAction<Filter["sortDir"]>) => {
      state.sortDir = action.payload;
    },
    filtersReset: () => {
      return filters;
    },
  },
});

export const {
  statusFilterChanged,
  searchChanged,
  sortByChanged,
  sortDirChanged,
  filtersReset,
} = filtersSlice.actions;

export default filtersSlice.reducer;

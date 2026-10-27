import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import tasksReducer from "./boards/tasksSlice";
import filtersReducer from "./boards/filtersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: tasksReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

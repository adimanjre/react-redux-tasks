import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Task = {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: number;
};
type InitialState = {
  items: Task[];
};
const initialState: InitialState = {
  items: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskAdded: {
      reducer: (state, action: PayloadAction<Task>) => {
        if (action.payload.title.trim()) {
          state.items.push(action.payload);
        }
        // state.items = [...state.items, action.payload];
      },
      prepare: (
        title: string,
        priority: Task["priority"],
      ): { payload: Task } => {
        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            status: "todo",
            priority,
            createdAt: Date.now(),
          },
        };
      },
    },
    taskTitleEdited: (
      state,
      action: PayloadAction<{ id: string; title: string }>,
    ) => {
      const task = state.items.find((task) => task.id === action.payload.id);
      if (task && task.title !== action.payload.title)
        task.title = action.payload.title;
    },
    taskStatusChanged: (
      state,
      action: PayloadAction<{ id: string; status: Task["status"] }>,
    ) => {
      const task = state.items.find((task) => task.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    taskPriorityChanged: (
      state,
      action: PayloadAction<{ id: string; priority: Task["priority"] }>,
    ) => {
      const task = state.items.find((task) => task.id === action.payload.id);
      if (task) task.priority = action.payload.priority;
    },
    taskDeleted: (state, action: PayloadAction<string>) => {
      const tasks = state.items.filter((task) => {
        return task.id !== action.payload;
      });
      if (tasks.length !== state.items.length) state.items = tasks;
    },
    completedCleared: (state) => {
      const tasks = state.items.filter((task) => task.status !== "done");
      if (tasks.length !== state.items.length) {
        state.items = tasks;
      }
    },
  },
});

export const {
  taskAdded,
  taskTitleEdited,
  taskStatusChanged,
  taskPriorityChanged,
  taskDeleted,
  completedCleared,
} = tasksSlice.actions;
export default tasksSlice.reducer;

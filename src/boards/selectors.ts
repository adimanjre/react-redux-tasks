import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const rank = {
  low: 0,
  medium: 1,
  high: 2,
};

const tasks = (state: RootState) => state.tasks.items;
const currentStatus = (state: RootState) => state.filters.status;
const searchQuery = (state: RootState) => state.filters.search;
const sortBy = (state: RootState) => state.filters.sortBy;
const orderBy = (state: RootState) => state.filters.sortDir;

export const selectStatusFilteredTasks = createSelector(
  tasks,
  currentStatus,
  (currTasks, status) => {
    return status === "all"
      ? currTasks
      : currTasks.filter((task) => task.status === status);
  },
);

export const selectSearchedTasks = createSelector(
  selectStatusFilteredTasks,
  searchQuery,
  (filterTask, search) => {
    return search
      ? filterTask.filter((task) =>
          task.title.toLowerCase().includes(search.toLowerCase()),
        )
      : filterTask;
  },
);

export const selectVisibleTasks = createSelector(
  [selectSearchedTasks, sortBy, orderBy],
  (searchTasks, sort, order) => {
    const sortedByTasks = [...searchTasks];
    switch (sort) {
      case "priority":
        sortedByTasks.sort((a, b) => {
          return order === "asc"
            ? rank[a.priority] - rank[b.priority]
            : rank[b.priority] - rank[a.priority];
        });
        break;
      case "title":
        sortedByTasks.sort((a, b) => {
          if (a.title < b.title) {
            return order === "asc" ? -1 : 1;
          }
          if (a.title > b.title) {
            return order === "asc" ? 1 : -1;
          }
          return 0;
        });
        break;
      case "createdAt":
        sortedByTasks.sort((a, b) => {
          return order === "asc"
            ? a.createdAt - b.createdAt
            : b.createdAt - a.createdAt;
        });
        break;
      default:
        break;
    }
    return sortedByTasks;
  },
);

export const selectTaskCount = createSelector(
  tasks,
  currentStatus,
  (currTasks) => {
    const doneTasks = currTasks.filter((task) => task.status === "done");
    const todoTasks = currTasks.filter((task) => task.status === "todo");
    const inProgressTasks = currTasks.filter(
      (task) => task.status === "in-progress",
    );
    return {
      total: currTasks.length,
      done: doneTasks.length,
      todo: todoTasks.length,
      inProgress: inProgressTasks.length,
    };
  },
);

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  taskDeleted,
  taskPriorityChanged,
  taskStatusChanged,
  taskTitleEdited,
  type Task,
} from "./tasksSlice";

export const TaskCard: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const counter = useRef(0);
  useEffect(() => {
    counter.current = counter.current + 1;
  });
  const task = useAppSelector((state) =>
    state.tasks.items.find((task) => task.id === id),
  );

  if (!task) return;

  const { title, createdAt, status, priority } = task;
  const date = new Date(createdAt);
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value)
      dispatch(taskTitleEdited({ id, title: e.target.value }));
  };
  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as Task["status"];
    dispatch(taskStatusChanged({ id, status }));
  };
  const handleChangePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value as Task["priority"];
    dispatch(taskPriorityChanged({ id, priority }));
  };
  const handleDelete = (id: string) => {
    dispatch(taskDeleted(id));
  };
  return (
    <li className="group p-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-xl transition-all flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Left Side: Title & Date */}
      <div className="flex-1 space-y-1">
        <input
          type="text"
          value={title}
          onChange={handleChangeTitle}
          className="w-full bg-transparent font-medium text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 px-1 py-0.5 rounded border-transparent"
        />
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 px-1">
          <span>Created:</span>
          <span className="font-medium">{date.toLocaleDateString()}</span>
        </div>
        <div>{counter.current}</div>
      </div>

      {/* Right Side: Filters & Delete Button */}
      <div className="flex items-center gap-2 justify-between sm:justify-end">
        {/* Status Dropdown */}
        <select
          value={status}
          onChange={handleChangeStatus}
          className="px-2.5 py-1.5 bg-white border border-slate-200 text-xs font-medium text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Priority Dropdown */}
        <select
          value={priority}
          onChange={handleChangePriority}
          className="px-2.5 py-1.5 bg-white border border-slate-200 text-xs font-medium text-amber-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Delete Button */}
        <button
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Delete task"
          onClick={() => handleDelete(id)}
        >
          <svg
            xmlns="http://w3.org"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

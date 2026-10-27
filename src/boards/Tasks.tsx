import { useAppDispatch, useAppSelector } from "../app/hooks";
import { completedCleared, taskAdded, type Task } from "./tasksSlice";
import { useEffect, useRef, useState } from "react";
import { TaskCard } from "./TaskCard";
import FilterBar from "./FilterBar";
import { increment } from "../counterSlice";
import { selectTaskCount, selectVisibleTasks } from "./selectors";

const Tasks = () => {
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<Task["priority"]>("low");
  const tasks = useAppSelector((state) => state.tasks.items);
  const dispatch = useAppDispatch();
  const counter = useRef(0);
  useEffect(() => {
    counter.current = counter.current + 1;
  });
  const handleTaskAdd = () => {
    if (title) {
      dispatch(taskAdded(title, priority));
      setTitle("");
      setPriority("low");
    }
  };

  const sortedByTasks = useAppSelector(selectVisibleTasks);

  const { total, done } = useAppSelector(selectTaskCount);
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
          <h1 className="text-xl font-bold tracking-tight">Task Workspace</h1>
          <p className="text-indigo-100 text-xs mt-1">
            Manage your daily priorities effortlessly
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Add Task Form */}
          <form className="flex items-end gap-3" action={handleTaskAdd}>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                Task Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
              />
            </div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Task["priority"])}
              className="px-2.5 py-1.5 bg-white border border-slate-200 text-xs font-medium text-amber-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-lg shadow-sm shadow-indigo-600/10 transition-colors h-[38px]"
            >
              Add Task
            </button>
          </form>
          <button
            onClick={() => dispatch(increment())}
            className="p-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Unreleted action {counter?.current}
          </button>
          {/* Action Row */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-xs font-medium text-slate-500">
              Your Tasks
            </span>
            <span className="text-xs font-medium text-slate-500">
              {done}/{total}
            </span>
            <button
              onClick={() => dispatch(completedCleared())}
              className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-md transition-colors"
            >
              Clear Completed
            </button>
          </div>
          <FilterBar />
          {/* Task List */}
          {sortedByTasks.length > 0 && (
            <ul className="space-y-3">
              {/* Task Item */}
              {sortedByTasks.map((task) => (
                <TaskCard key={task.id} id={task.id} />
              ))}
            </ul>
          )}
          {tasks.length > 0 && sortedByTasks.length === 0 && (
            <p>No Tasks match your filters!</p>
          )}
          {tasks.length === 0 && <p>No tasks yet - add one!</p>}
        </div>
      </div>
    </div>
  );
};

export default Tasks;

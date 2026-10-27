import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  filtersReset,
  searchChanged,
  sortByChanged,
  sortDirChanged,
  statusFilterChanged,
  type Filter,
} from "./filtersSlice";

const SORT_OPTIONS = [
  { value: "createdAt", label: "Sort by: Date Created" },
  { value: "priority", label: "Sort by: Priority" },
  { value: "title", label: "Sort by: Title" },
] satisfies { value: Filter["sortBy"]; label: string }[];

export default function FilterBar() {
  // 1. State management for all interactive elements
  const currentStatus = useAppSelector((state) => state.filters.status);
  const searchQuery = useAppSelector((state) => state.filters.search);
  const sortBy = useAppSelector((state) => state.filters.sortBy);
  const isAscending = useAppSelector((state) => state.filters.sortDir);

  const statuses: Filter["status"][] = ["all", "todo", "in-progress", "done"];

  const dispatch = useAppDispatch();

  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-3 text-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {/* Left Section: Branding & Status Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
          {/* Status Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 overflow-x-auto">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => dispatch(statusFilterChanged(status))}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition shadow-sm ${
                  currentStatus === status
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                {status.toLocaleUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Search, Sort & Direction Toggle */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px] sm:flex-initial">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(searchChanged(e.target.value))}
              placeholder="Search items..."
              className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                dispatch(sortByChanged(e.target.value as Filter["sortBy"]))
              }
              className="appearance-none bg-white border border-slate-300 text-slate-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer transition"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>

          {/* Direction Toggle Button */}
          <button
            onClick={() =>
              dispatch(sortDirChanged(isAscending === "asc" ? "desc" : "asc"))
            }
            title={`Sort ${isAscending ? "Descending" : "Ascending"}`}
            className="p-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isAscending !== "asc" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V4m0 0L3 8m4-4l4 4"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            {isAscending}
          </button>
        </div>
        <div>
          <button
            onClick={() => dispatch(filtersReset())}
            className="p-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Clear Filter
          </button>
        </div>
      </div>
    </nav>
  );
}

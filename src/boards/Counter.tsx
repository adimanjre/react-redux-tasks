import {
  decrement,
  increment,
  incrementAsync,
  incrementIfOdd,
  reset,
  type StatusType,
} from "../counterSlice";

import { useAppDispatch, useAppSelector } from "../app/hooks.ts";

interface StatusBadgeProps {
  status: StatusType;
  label: StatusType;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  // Map statuses to specific Tailwind style combinations
  const styles: Record<StatusType, string> = {
    idle: "bg-blue-50 text-blue-700 border-blue-200/60 ring-blue-600/10",
    fulfilled:
      "bg-emerald-50 text-emerald-700 border-emerald-200/60 ring-emerald-600/10",
    pending: "bg-amber-50 text-amber-800 border-amber-200/60 ring-amber-600/10",
    rejected: "bg-rose-50 text-rose-700 border-rose-200/60 ring-rose-600/10",
  };

  const dotStyles: Record<StatusType, string> = {
    idle: "bg-blue-500",
    fulfilled: "bg-emerald-500",
    pending: "bg-amber-500",
    rejected: "bg-rose-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {/* Visual Indicator Dot */}
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {label}
    </span>
  );
}

const Toastr = ({ error }: { error: string }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-md items-center gap-3 rounded-lg border border-red-100 bg-white p-4 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Left Accent Bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg bg-red-500" />

      {/* Error Icon (SVG) */}
      <svg
        className="h-5 w-5 shrink-0 text-red-500 ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>

      {/* Message Context */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">
          Error Occurred
        </span>
        <p className="text-sm text-gray-600">{error}</p>
      </div>
    </div>
  );
};

export default function Counter() {
  const counter = useAppSelector((state) => state.counter.value);
  const status = useAppSelector((state) => state.counter.status);
  const error = useAppSelector((state) => state.counter.errMessage);
  const dispatch = useAppDispatch();

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center bg-slate-50 p-6">
      {error && status === "rejected" && <Toastr error={error} />}
      <StatusBadge status={status} label={status} />
      {/* Counter Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-slate-100 border border-slate-100">
        {/* Header / Value Display */}
        <div className="text-center mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Current Count
          </h2>
          <div className="mt-2 text-6xl font-black tracking-tight text-slate-800 tabular-nums">
            {counter}
          </div>
        </div>

        {/* Primary Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            className="flex items-center justify-center gap-1 rounded-xl bg-amber-500 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-amber-500/20 transition-all hover:bg-amber-600 hover:shadow-lg active:scale-95"
            onClick={() => dispatch(increment())}
          >
            <span className="text-base">+</span> Increment
          </button>

          <button
            className="flex items-center justify-center gap-1 rounded-xl bg-slate-800 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-slate-800/10 transition-all hover:bg-slate-900 hover:shadow-lg active:scale-95"
            onClick={() => dispatch(decrement())}
          >
            <span className="text-base">-</span> Decrement
          </button>
        </div>

        {/* Secondary Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            className="w-full rounded-xl border-2 border-amber-500 bg-transparent px-4 py-3 text-sm font-medium text-amber-600 transition-all hover:bg-amber-50 active:scale-95"
            onClick={() => dispatch(increment(5))}
          >
            Increment By (+5)
          </button>

          <button
            className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600 transition-all hover:bg-slate-200 active:scale-95"
            onClick={() => dispatch(reset())}
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="w-full rounded-xl border-2 border-amber-500 bg-transparent px-4 py-3 text-sm font-medium text-amber-600 transition-all hover:bg-amber-50 active:scale-95"
            onClick={() => dispatch(incrementIfOdd(6))}
          >
            Increment if Odd
          </button>
          <button
            className="w-full disabled:opacity-25 rounded-xl border-2 border-amber-500 bg-transparent px-4 py-3 text-sm font-medium text-amber-600 transition-all hover:bg-amber-50 active:scale-95"
            onClick={() => dispatch(incrementAsync(10))}
            disabled={status === "pending"}
          >
            Async Increment (+10)
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="w-full disabled:opacity-25 rounded-xl border-2 border-amber-500 bg-transparent px-4 py-3 text-sm font-medium text-amber-600 transition-all hover:bg-amber-50 active:scale-95"
            onClick={() => dispatch(incrementAsync(150))}
            disabled={status === "pending"}
          >
            Async Increment (+150)
          </button>
        </div>
      </div>
    </div>
  );
}

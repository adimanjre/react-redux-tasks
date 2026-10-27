import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
//  function shallowEqual(objA: any, objB: any): boolean

// export function useAppSelector<T>(
//   fn: (state: RootState) => T,
//   fn2?: EqualityFn<T>,
// ): T {
//   return useSelector(fn, fn2);
// }

export const useAppSelector = useSelector.withTypes<RootState>();

// export function useAppDispatch() {
//   return useDispatch<AppDispatch>();
// }

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

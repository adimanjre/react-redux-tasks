// import { useEffect, useState } from "react";

// export const useDebounce = (query, timer = 300) => {
//   const [debounce, setDebounce] = useState(query);
//   useEffect(() => {
//     const id = setTimeout(() => {
//       setDebounce(query);
//     }, timer);
//     return () => clearTimeout(id);
//   }, [query, timer]);

//   return debounce;
// };

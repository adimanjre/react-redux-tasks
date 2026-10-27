// import React, { use, useEffect, useState } from "react";
// import { useDebounce } from "../useDebounce";
// import { Context } from "../context";

// const Input = () => {
//   const [query, setQuery] = useState("");
//   const { theme } = use(Context);
//   const debounceQuery = useDebounce(query);
//   useEffect(() => {
//     console.log("running time");
//   }, [debounceQuery]);
//   return (
//     <div>
//       <div>this is theme: {theme}</div>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//     </div>
//   );
// };

// export default Input;

// import { useState } from "react";
// const elementHeight = 50;
// export function Virtualization({ items = [] }) {
//   const [scrollTop, setScrollTop] = useState(0);
//   const startIndex = scrollTop / elementHeight;
//   const endIndex = (scrollTop + 500) / elementHeight;
//   console.log(items);
//   return (
//     <div
//       onScroll={(e) => setScrollTop(e.target.scrollTop)}
//       className="h-[500px] overflow-x-auto"
//     >
//       <div
//         className="relative"
//         style={{ height: `${elementHeight * items.length}px` }}
//       >
//         <ul>
//           {items.slice(startIndex, endIndex).map((data) => (
//             <ListItem
//               key={data.order_id}
//               item={data}
//               position={items.indexOf(data)}
//             />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// const ListItem = ({ item, position }) => {
//   return (
//     <li
//       className="absolute"
//       style={{
//         height: `${elementHeight}px`,
//         top: `${elementHeight * position}px`,
//       }}
//     >
//       {item.order_id}
//     </li>
//   );
// };

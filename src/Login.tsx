// import { useNavigate } from "react-router";
// import instance from "./http";

// export default function LoginPage() {
//   const router = useNavigate();
//   const handleSubmit = async (data) => {
//     console.log(data.get("email"));
//     if ("test" === "test") {
//       try {
//         await instance.post("/api/v1/auth/login", {
//           email: "adimanjre@gmail.com",
//           password: "Pass@123",
//         });
//         router("/dashboard");
//       } catch (error) {}
//     }
//   };
//   return (
//     <form action={handleSubmit} className="flex">
//       <div>
//         <input name="email" type="text" />
//       </div>
//       <input name="password" type="text" />
//       <div>
//         <button type="submit">submit</button>
//       </div>
//     </form>
//   );
// }

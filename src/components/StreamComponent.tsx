import { useState, useTransition } from "react";
// import Virtualization from "../Virtualization";
// import { Context } from "../context";
// const worker = new Worker(new URL("../lib/worker.js", import.meta.url), {
//   type: "module",
// });
export default function StreamComponent() {
  const [response] = useState([]);
  const [isPending] = useTransition();
  // const flushSchedule = useRef(false);
  // const batchref = useRef([]);
  // const { setTheme } = use(Context);
  // async function getStreamData() {
  //   try {
  //     worker.addEventListener("message", (event) => {
  //       batchref.current.push(event.data);

  //       if (!flushSchedule.current) {
  //         flushSchedule.current = true;

  //         requestAnimationFrame(() => {
  //           const batch = batchref.current;
  //           batchref.current = [];
  //           flushSchedule.current = false;
  //           startTransition(() => {
  //             setResponse((prev) => [...prev, ...batch]);
  //           });
  //         });
  //       }
  //     });
  //     worker.postMessage({ action: "GET_STREAM" });

  //     //   const reader = response.body?.getReader();
  //     //   const decoder = new TextDecoder();
  //     //   let buffer = "";
  //     //   let event = null;
  //     //   while (true) {
  //     //     const { done, value } = await reader.read();
  //     //     if (done) break;
  //     //     // console.log(decoder.decode(value, { stream: true }));
  //     //     buffer += decoder.decode(value, { stream: true });
  //     //     const lines = buffer.split("\n");
  //     //     buffer = lines.pop() || "";
  //     //     for (const line of lines) {
  //     //       if (!line.trim()) continue;
  //     //       if (line.startsWith("event:")) {
  //     //         event = line.replace("event:", "").trim();
  //     //       }
  //     //       if (line.startsWith("data:") && event === "batch") {
  //     //         const dataSet = line.replace("data:", "").trim();
  //     //         console.log(dataSet);
  //     //       }
  //     //       if (event === "done") {
  //     //         break;
  //     //       }
  //     //     }
  //     //   }
  //     //   const result = await response.json();
  //     //   setResponse(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  console.log(response);
  return (
    <div>
      <button>toggle theme</button>
      <button className="bg-blue-600 text-white p-2">Get Data</button>
      {isPending && <h1>Loading....</h1>}
      {/* <p>{JSON.stringify(response)}</p> */}
      <p>Received {response.length} chunks</p>
      {/* <Virtualization items={response} /> */}
    </div>
  );
}

import { queryOptions } from "@tanstack/react-query";

export default function createQueryOptions(on: boolean, id: number) {
  return queryOptions({
    queryKey: ["todos", id],
    queryFn: () => fetchTodos(id),
    enabled: on,
  });
}

const fetchTodos = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?postId=${id}`,
  );
  return await response.json();
};

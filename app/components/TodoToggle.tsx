"use client";

import { RouterOutput, trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";

type TodoOutput = RouterOutput["todo"]["getTodos"][number];

export default function TodoToggle(props: { todo: TodoOutput }) {
  const { todo } = props;
  const utils = trpc.useUtils();
  const router = useRouter();

  const toggleTodo = trpc.todo.toggleTodo.useMutation({
    onSuccess: () => {
      utils.todo.getTodos.invalidate();
      router.refresh();
    },
  });

  return (
    <input
      type="checkbox"
      checked={todo.completed}
      className="w-5 h-5 mr-3"
      onChange={() => toggleTodo.mutate({ id: todo.id })}
    />
  );
}

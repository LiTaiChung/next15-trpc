import { createCaller } from "@/server/routers/_app";
import AddTodoForm from "./components/AddTodoForm";
import TodoToggle from "./components/TodoToggle";

export default async function Home() {
  const caller = createCaller({});
  const todos = (await caller.todo.getTodos()) ?? [];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Todo List</h1>
      <AddTodoForm />
      <ul className="space-y-2">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <TodoToggle todo={todo} />

            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

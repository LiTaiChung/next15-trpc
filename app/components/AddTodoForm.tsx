'use client';

import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/navigation';

export default function AddTodoForm() {
  const [newTodo, setNewTodo] = useState('');
  const utils = trpc.useUtils();
  const router = useRouter();
  
  const addTodo = trpc.todo.addTodo.useMutation({
    onSuccess: () => {
      utils.todo.getTodos.invalidate();
      setNewTodo('');
      router.refresh();
    },
  });

  return (
    <div className="flex mb-4">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Add a new todo..."
      />
      <button
        onClick={() => addTodo.mutate({ text: newTodo })}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
      >
        Add
      </button>
    </div>
  );
} 
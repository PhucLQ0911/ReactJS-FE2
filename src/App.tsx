/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";
import { ITodo } from "./interfaces/ITodo";

const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:3000/todos`);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Thêm công việc</h2>
      <TodoAdd setTodos={setTodos} todos={todos} />

      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-4">Danh sách công việc</h2>

      <TodoList
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
};

export default App;
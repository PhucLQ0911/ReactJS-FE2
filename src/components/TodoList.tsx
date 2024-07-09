/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ITodo } from "../interfaces/ITodo";
import { TodoContext } from "../App";

interface TodoAddProps {
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoList: React.FC<TodoAddProps> = ({ setTodos }) => {
    const { register, handleSubmit, reset } = useForm();
    const [editTodoId, setEditTodoId] = useState<number | null>(null);
    const todos = useContext(TodoContext)

    const onHandleRemove = async (id: number) => {
        try {
            const confirm = window.confirm(`Bạn có chắc chắn muốn xóa công việc này không?`);
            if (confirm) {
                await fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" });
                alert("Xóa công việc thành công");

                // rerender
                setTodos(todos.filter((todo: ITodo) => todo.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };


    const onSave = async (data: any) => {
        const result = todos.find((todo: ITodo) => todo.id === editTodoId);
        const newTodo = { ...result, title: data.title2 };
        try {
            const response = await fetch(`http://localhost:3000/todos/${editTodoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            });
            const data = await response.json();

            // thông báo thành công
            alert("Cập nhật công việc thành công");
            // đóng input => setEditTodoId(null)
            setEditTodoId(null);
            // reRender
            setTodos(todos.map((todo: ITodo) => (todo.id === data.id ? data : todo)));
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <ul>
            {todos.map((todo, index) => (
                <li key={index} className="flex items-center justify-between mb-4">
                    {editTodoId === todo.id ? (
                        <form onSubmit={handleSubmit(onSave)} className="flex items-center w-full">
                            <input
                                type="text"
                                {...register("title2")}
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                placeholder="Edit task title"
                            />
                            <div className="flex space-x-2">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditTodoId(null)}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <span
                                onClick={() => {
                                    reset({ title2: todo.title });
                                    setEditTodoId(todo.id!);
                                }}
                                className="flex-1 cursor-pointer"
                            >
                                {todo.title}
                            </span>
                            <button
                                onClick={() => onHandleRemove(todo.id!)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200 ml-2"
                            >
                                Delete
                            </button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default TodoList
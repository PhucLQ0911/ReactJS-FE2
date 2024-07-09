/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { ITodo } from "../interfaces/ITodo";

interface TodoAddProps {
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}


const TodoAdd: React.FC<TodoAddProps> = ({ todos, setTodos }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data: any) => {
        const newTodo = { ...data, completed: false };
        //reset form
        try {
            const response = await fetch(`http://localhost:3000/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
            });

            const data = await response.json();
            alert("Thêm công việc thành công");
            reset();
            // rerender
            setTodos([...todos, data]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
            <input
                type="text"
                {...register("title")}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter task title"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
                Thêm
            </button>
        </form>
    )
}

export default TodoAdd;
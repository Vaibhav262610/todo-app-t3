"use client";
import { FC, useState } from "react";
import { todoType } from "@/types/todoTypes";
import Todo from "./todo";
import AddTodo from "./addTodo";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "@/actions/todoActions";
import { useRouter } from "next/navigation";

interface Props {
  todos: todoType[];
}

const Todos: FC<Props> = ({ todos }) => {
  // State to manage the list of todo items
  const [todoItems, setTodoItems] = useState<todoType[]>(todos);
  const router = useRouter();

  // Function to create a new todo item
  const createTodo = async (text: string) => {
    await addTodo(text);
    // Refresh the page to get updated data from server
    router.refresh();
  };

  // Function to change the text of a todo item
  const changeTodoText = async (id: number, text: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    await editTodo(id, text);
    router.refresh();
  };

  // Function to toggle the "done" status of a todo item
  const toggleIsTodoDone = async (id: number) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
    await toggleTodo(id);
    router.refresh();
  };

  // Function to delete a todo item
  const deleteTodoItem = async (id: number) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    await deleteTodo(id);
    router.refresh();
  };

  // Update local state when props change (when page refreshes)
  if (JSON.stringify(todos) !== JSON.stringify(todoItems)) {
    setTodoItems(todos);
  }

  // Rendering the Todo List component
  return (
    <main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16">
      <div className="pb-8 underline text-5xl font-bold">Your Daily Tasks</div>
        <AddTodo createTodo={createTodo} />
      <div className="w-full flex flex-col mt-8 gap-2">
        {/* Mapping through todoItems and rendering Todo component for each */}
        {todoItems.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            changeTodoText={changeTodoText}
            toggleIsTodoDone={toggleIsTodoDone}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </div>
      {/* Adding Todo component for creating new todos */}
    </main>
  );
};

export default Todos;

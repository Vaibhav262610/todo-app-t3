"use client";
import { ChangeEvent, FC, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

interface Props {
  createTodo: (value: string) => Promise<void>;
}

const AddTodo: FC<Props> = ({ createTodo }) => {
  // State for handling input value
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Event handler for input change
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Event handler for adding a new todo
  const handleAdd = async () => {
    if (!input.trim()) {
      toast.error("Please enter something");
      return;
    }
    
    setIsLoading(true);
    try {
      await createTodo(input);
      toast.success("Todo Added");
      setInput("");
    } catch {
      toast.error("Failed to add todo");
    } finally {
      setIsLoading(false);
    }
  };

  // Rendering the AddTodo component
  return (
    <div className="w-full flex gap-1 mt-2">
      {/* Input field for entering new todo text */}
      <Input
        type="text"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={handleInput}
        value={input}
        disabled={isLoading}
        placeholder={isLoading ? "Adding todo..." : "Enter a new todo"}
      />
      {/* Button for adding a new todo */}
      <Button
        className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-14 py-1"
        onClick={handleAdd}
        disabled={isLoading}
      >
        {isLoading ? "..." : "Add"}
      </Button>
    </div>
  );
};

export default AddTodo;

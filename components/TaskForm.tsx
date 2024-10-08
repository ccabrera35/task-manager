"use client";

import { createTask } from "@/lib/actions/actions";
import { useState } from "react";

export const TaskForm = () => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask(newTask);
    setNewTask("");
  };

  return (
    <form onSubmit={handleAddTask} className="flex flex-col gap-x-2">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task"
        className="pl-2 h-[45px] w-full border border-[rgba(0,0,0,0.12)] rounded-md my-3 mb-2 px-4 text-base"
      />
      <button
        type="submit"
        disabled={!newTask}
        className="h-11 w-full border-none rounded-md bg-[#4e6e38] text-white text-base flex justify-center items-center transition-all duration-200 disabled:bg-[#bfd39b] disabled:cursor-not-allowed"
      >
        Add Task
      </button>
    </form>
  );
};

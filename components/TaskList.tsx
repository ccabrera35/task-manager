"use client";

import { TaskItem } from "@/lib/types";
import { useState } from "react";
import { TaskListItem } from "./TaskListItem";
import { Modal } from "./Modal";
import { TaskForm } from "./TaskForm";
import { cn } from "@/lib/utils";

type TaskListProps = {
  className?: string;
  tasks: TaskItem[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className={cn(
        "md:max-h-[540px] max-h-[390px] w-full overflow-scroll md:col-span-2",
        {
          "h-full": tasks.length > 0,
          "md:hidden": tasks.length === 0
        }
      )}
    >
      <div className="flex items-center justify-between mb-5 md:mb-0 md:hidden">
        <h1>Task Manager</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex ml-auto rounded-md h-4 w-20 py-4 bg-[#bfd39b] items-center justify-center"
        >
          Add Task
        </button>
      </div>
      <ul>
        {tasks?.map((task) => (
          <TaskListItem key={`${task.id}-${task.completed}`} task={task} />
        ))}
      </ul>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TaskForm />
        </Modal>
      )}
    </div>
  );
};

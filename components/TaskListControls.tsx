"use client";

import {
  completeAllTasks,
  markAllIncomplete,
  removeAllTasks
} from "@/lib/actions/actions";
import { TaskItem } from "@/lib/types";

type TaskListControlsProps = {
  className?: string;
  tasks: TaskItem[];
};

export const TaskListControls = ({
  tasks,
  className
}: TaskListControlsProps) => {
  if (tasks.length == 0) return null;

  return (
    <div
      className={`flex flex-col gap-y-4 py-4 mx-auto md:mx-0 md:pt-0 md:gap-y-2 ${className}`}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          completeAllTasks(tasks.map((task) => task.id));
        }}
        disabled={tasks.length === 0}
        className="h-11 w-full p-2 text-sm border-none rounded-md bg-[#4e6e38] disabled:bg-[#bfd39b] text-white lg:text-base flex justify-center items-center transition-all duration-200 disabled:cursor-not-allowed hover:bg-[#355123]"
      >
        Mark all as complete
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          markAllIncomplete(tasks.map((task) => task.id));
        }}
        disabled={tasks.length === 0}
        className="h-11 w-full p-2 text-sm border-none rounded-md bg-[#4e6e38] disabled:bg-[#bfd39b] text-white lg:text-base flex justify-center items-center transition-all duration-200 disabled:cursor-not-allowed hover:bg-[#355123]"
      >
        Mark all as incomplete
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          removeAllTasks(tasks.map((task) => task.id));
        }}
        disabled={tasks.length === 0}
        className="h-11 w-full p-2 text-sm border-none rounded-md bg-[#4e6e38] disabled:bg-[#bfd39b] text-white lg:text-base flex justify-center items-center transition-all duration-200 disabled:cursor-not-allowed hover:bg-[#355123]"
      >
        Remove all items
      </button>
    </div>
  );
};

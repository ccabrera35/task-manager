"use client";

import { TaskItem } from "@/lib/types";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Modal } from "./Modal";
import { deleteTask, updateTask } from "@/lib/actions/actions";
import { useWindowSize } from "@/lib/hooks/useWindowSize";

type TaskListItemProps = {
  task: TaskItem;
};

export const TaskListItem = ({ task }: TaskListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [showModal, setShowModal] = useState(false);
  const { isMobile } = useWindowSize();

  const [isPending, startTransition] = useTransition();

  const handleEditClick = () => {
    if (isMobile) {
      setShowModal(true);
    } else {
      setIsEditing(true);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setNewTitle(newText);
  };

  const handleConfirmEdit = () => {
    startTransition(() => {
      updateTask({ id: task.id, title: newTitle });
    });
    setIsEditing(false);
  };

  return (
    <li className="flex items-center py-2 border-b">
      <label>
        <input
          onChange={() => {
            updateTask({
              id: task.id,
              completed: !task.completed
            });
          }}
          type="checkbox"
          checked={task.completed}
          className="rounded-md h-4 w-4 py-3 flex items-center justify-center accent-[#6e6251]"
        />
      </label>
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleConfirmEdit();
            }
          }}
          autoFocus
          className="ml-3 mr-auto w-[85%] outline-none border-b border-black focus:ring-0 bg-transparent placeholder-gray-500"
        />
      ) : (
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none"
          }}
          className="px-3 mr-auto"
        >
          {isPending ? "..." : task.title}
        </span>
      )}
      {isEditing ? (
        <button
          onClick={handleConfirmEdit}
          className="flex items-center justify-center pr-4"
        >
          <Save size={16} />
        </button>
      ) : (
        <button
          onClick={handleEditClick}
          className="flex items-center justify-center pr-4"
        >
          <Pencil size={16} />
        </button>
      )}

      <button
        onClick={() => deleteTask(task.id)}
        className="flex items-center justify-center mr-4"
      >
        <Trash2 size={16} className="text-red-500" />
      </button>

      {showModal && isMobile && (
        <Modal onClose={() => setShowModal(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              startTransition(() => {
                updateTask({ id: task.id, title: newTitle });
              });
              setShowModal(false);
            }}
            className="flex flex-col gap-x-2"
          >
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              placeholder="Edit task"
              className="pl-2 h-[45px] w-full border border-[rgba(0,0,0,0.12)] rounded-md my-3 mb-2 px-4 text-base"
            />
            <button className="flex items-center justify-center gap-x-2 h-11 bg-[#6e6251] text-lg rounded-md text-white">
              Save Task
              <Save size={18} />
            </button>
          </form>
        </Modal>
      )}
    </li>
  );
};

"use server";

import { revalidatePath } from "next/cache";
import { TaskItem } from "../types";
import { supabase } from "../utils";

export const createTask = async (title: string) => {
  try {
    if (!title) {
      throw Error("title is required");
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert({ title, completed: false })
      .returns<TaskItem>();

    if (error) {
      throw Error;
    }

    revalidatePath("/", "layout");

    return data;
  } catch (error) {
    console.error(`Could not create task:`, error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(`Could not delete task with id "${id}":`, error);
    throw error;
  }

  revalidatePath("/", "layout");
};

export const updateTask = async (task: Partial<TaskItem>) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .update(task)
      .eq("id", task.id)
      .returns<TaskItem>();

    if (error) {
      throw error;
    }

    revalidatePath("/", "layout");

    return data;
  } catch (error) {
    console.error(`Could not update task with id "${task.id}":`, error);
    throw error;
  }
};

export const completeAllTasks = async (ids: string[]) => {
  try {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: true })
      .in("id", ids);

    if (error) {
      throw error;
    }

    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error completing all tasks:", error);
    throw error;
  }
};

export const markAllIncomplete = async (ids: string[]) => {
  try {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: false })
      .in("id", ids);

    if (error) {
      throw error;
    }

    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error marking all tasks incomplete:", error);
    throw error;
  }
};

export const removeAllTasks = async (ids: string[]) => {
  try {
    const { error } = await supabase.from("tasks").delete().in("id", ids);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Could not remove all tasks", error);
    throw error;
  }

  revalidatePath("/", "layout");
};

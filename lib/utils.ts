import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const handleError = (error: unknown) => {
  let message;
  if (error instanceof Error) {
     message = error.message
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "An error occurred."
  }

  toast.error(message);
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
}
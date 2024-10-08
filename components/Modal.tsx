"use client";

import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { X } from "lucide-react";
import { useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ onClose, children }: ModalProps) => {
  const ref = useRef(null);

  useClickOutside(ref, () => onClose());

  return createPortal(
    <div className="flex items-center justify-center bg-black/60 min-h-screen w-full z-10 fixed top-0">
      <div
        ref={ref}
        className="relative flex flex-col items-center justify-center w-11/12 h-72 bg-[#fbf5ed] rounded-md"
      >
        <button
          onClick={() => onClose()}
          className="absolute top-2 right-2 transition-all duration-200 hover:scale-110 text-[#6e6251] hover:text-[#564c3f]"
        >
          <X />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

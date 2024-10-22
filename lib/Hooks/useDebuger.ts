import { create } from "zustand";

interface DebugerProps {
  title?: string;
  message: string;
  setMessage: (title: string, message: string) => void;
}

export const useDebuger = create<DebugerProps>()((set) => ({
  message: "",
  title: "",
  setMessage: (title: string, message: string) => set({ title, message }),
}));

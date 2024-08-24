import { create } from "zustand";

interface DebugerProps {
  title?: string;
  message: string;
  setTitle: (title: string) => void;
  setMessage: (message: string) => void;
}

const useDebuger = create<DebugerProps>()((set) => ({
  message: "",
  title: "",
  setTitle: (title: string) => set({ title }),
  setMessage: (message: string) => set({ message }),
}));

export default useDebuger;

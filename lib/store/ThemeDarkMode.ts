import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DarkModeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeState>()(
  devtools((set) => ({
    darkMode: false,
    toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  })),
);

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DarkModeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useDarkModeStore = create<DarkModeState>()(
  devtools((set) => ({
    darkMode: false,
    toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  })),
);

export default useDarkModeStore;

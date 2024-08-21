import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BearState {
  home: number | null;
  setings: number | null;
  reports: number | null;
  shopping: number | null;
  increase: (by: "home" | "setings" | "reports" | "shopping") => void;
  reset: (by: "home" | "setings" | "reports" | "shopping") => void;
}

const useBearStore = create<BearState>()(
  devtools(
    (set) => ({
      home: 0,
      setings: 0,
      reports: 0,
      shopping: 0,
      increase: (by) => {
        switch (by) {
          case "home":
            set((state) => ({
              home: state.home !== null ? state.home + 1 : 1,
            }));
            break;
          case "setings":
            set((state) => ({
              setings: state.setings !== null ? state.setings + 1 : 1,
            }));
            break;
          case "reports":
            set((state) => ({
              reports: state.reports !== null ? state.reports + 1 : 1,
            }));
            break;
          case "shopping":
            set((state) => ({
              shopping: state.shopping !== null ? state.shopping + 1 : 1,
            }));
            break;
          default:
            break;
        }
      },
      reset: (by) => {
        switch (by) {
          case "home":
            set((state) => ({ home: 0 }));
            break;
          case "setings":
            set((state) => ({ setings: 0 }));
            break;
          case "reports":
            set((state) => ({ reports: 0 }));
            break;
          case "shopping":
            set((state) => ({ shopping: 0 }));
            break;
          default:
            break;
        }
      },
    }),
    {
      name: "bear-storage",
    },
  ),
);

export default useBearStore;

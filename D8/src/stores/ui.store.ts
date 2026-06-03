import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
interface UIState {
  isDarkMode: boolean;
  isSideBarOpen: boolean;
  toggleDarkMode: () => void;
  toggleSideBar: () => void;
  closeSideBar: () => void;
}
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        isDarkMode: false,
        isSideBarOpen: false,
        toggleDarkMode: () =>
          set(
            (state) => ({ isDarkMode: !state.isDarkMode }),
            false,
            "ui/toggleDarkMode",
          ),
        toggleSideBar: () =>
          set(
            (state) => ({ isSideBarOpen: !state.isSideBarOpen }),
            false,
            "ui/toggleSideBar",
          ),
        closeSideBar: () =>
          set((state) => ({ isSideBarOpen: false }), false, "ui/closeSideBar"),
      }),
      {
        name: "ui-storage",
        partialize: (state) => ({ isDarkMode: state.isDarkMode }),
      },
    ),
  ),
);

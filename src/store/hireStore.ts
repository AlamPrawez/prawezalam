import { create } from "zustand";

type HireState = {
  serviceTitle: string | null;
  setService: (title: string) => void;
};

export const useHireStore = create<HireState>((set) => ({
  serviceTitle: null,

  setService: (title: string) =>
    set({
      serviceTitle: title,
    }),
}));
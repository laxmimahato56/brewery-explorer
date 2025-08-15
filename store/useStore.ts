import { Brewery } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FavStore = {
  favItems: Brewery[];
  addFavItem: (item: Brewery) => void;
  removeFavItem: (item: Brewery) => void;
};

export const useFavStore = create<FavStore>()(
  persist(
    (set, get) => ({
      favItems: [],
      addFavItem: (item: Brewery) =>
        set((state) => ({ favItems: [...state.favItems, item] })),
      removeFavItem: (item: Brewery) =>
        set((state) => ({
          favItems: state.favItems.filter((i) => i.id !== item.id),
        })),
    }),
    {
      name: "favourites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

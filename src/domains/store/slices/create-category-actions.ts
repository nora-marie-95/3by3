import type { StateCreator } from "zustand";

import type { AppState } from "@/domains/store/types";
import { createId } from "@/shared/util";

type CategorySlice = Pick<AppState, "categoryItems" | "category">;

export const createCategoryActions: StateCreator<
  AppState,
  [["zustand/immer", never]],
  [],
  CategorySlice
> = (set) => {
  return {
    categoryItems: [],
    category: {
      create: (draft) => {
        set((state) => {
          state.categoryItems.push({
            id: createId(),
            type: draft.type,
            title: draft.title,
            createdAt: Date.now(),
          });
        });
      },
      rename: (id, title) => {
        set((state) => {
          const categoryItem = state.categoryItems.find((item) => {
            return item.id === id;
          });
          if (categoryItem) {
            categoryItem.title = title;
          }
        });
      },
      remove: (id) => {
        set((state) => {
          state.categoryItems = state.categoryItems.filter((item) => {
            return item.id !== id;
          });
          state.todoItems.forEach((todoItem) => {
            if (todoItem.categoryItemId === id) {
              todoItem.categoryItemId = undefined;
            }
          });
        });
      },
    },
  };
};

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { PERSIST_OPTIONS } from "@/domains/store/persist-options";
import { createCategoryActions } from "@/domains/store/slices/create-category-actions";
import { createTodoActions } from "@/domains/store/slices/create-todo-actions";
import type { AppState } from "@/domains/store/types";

export const useAppStore = create<AppState>()(
  persist(
    immer((...store) => {
      return {
        ...createCategoryActions(...store),
        ...createTodoActions(...store),
      };
    }),
    PERSIST_OPTIONS,
  ),
);

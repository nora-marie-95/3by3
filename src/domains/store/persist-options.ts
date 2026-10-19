import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod/v4";
import { type PersistOptions, createJSONStorage } from "zustand/middleware";

import { CategoryItemSchema } from "@/domains/category-item";
import type { AppState } from "@/domains/store/types";
import { TodoItemSchema } from "@/domains/todo-item";

/** Only data is saved; the action groups (`category`, `todo`) are code, not state. */
const PersistedStateSchema = z.object({
  categoryItems: z.array(CategoryItemSchema),
  todoItems: z.array(TodoItemSchema),
});
type PersistedState = z.infer<typeof PersistedStateSchema>;

/**
 * AsyncStorage backs onto localStorage on web and native storage on iOS/Android, so this
 * persistence config is the only place that would ever need to change between platforms.
 */
export const PERSIST_OPTIONS: PersistOptions<AppState, PersistedState> = {
  name: "three-by-three/app-store",
  storage: createJSONStorage(() => {
    return AsyncStorage;
  }),
  partialize: (state) => {
    return { categoryItems: state.categoryItems, todoItems: state.todoItems };
  },
  /**
   * Earlier builds also saved the action groups (as `{}`), and zustand's default shallow merge
   * let those overwrite the real actions — every action then threw. Taking only validated data
   * from storage heals browsers that already hold such a save.
   */
  merge: (persistedState, currentState) => {
    const parsed = PersistedStateSchema.safeParse(persistedState);
    return parsed.success ? { ...currentState, ...parsed.data } : currentState;
  },
};

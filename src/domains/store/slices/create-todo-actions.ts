import type { StateCreator } from "zustand";

import type { AppState } from "@/domains/store/types";
import { createId } from "@/shared/util";

type TodoSlice = Pick<AppState, "todoItems" | "todo">;

export const createTodoActions: StateCreator<
  AppState,
  [["zustand/immer", never]],
  [],
  TodoSlice
> = (set) => {
  return {
    todoItems: [],
    todo: {
      create: (draft) => {
        set((state) => {
          state.todoItems.push({
            id: createId(),
            title: draft.title,
            done: false,
            categoryItemId: draft.categoryItemId,
            dueDate: draft.dueDate,
            createdAt: Date.now(),
          });
        });
      },
      toggle: (id) => {
        set((state) => {
          const todoItem = state.todoItems.find((item) => {
            return item.id === id;
          });
          if (todoItem) {
            todoItem.done = !todoItem.done;
          }
        });
      },
      rename: (id, title) => {
        set((state) => {
          const todoItem = state.todoItems.find((item) => {
            return item.id === id;
          });
          if (todoItem) {
            todoItem.title = title;
          }
        });
      },
      remove: (id) => {
        set((state) => {
          state.todoItems = state.todoItems.filter((item) => {
            return item.id !== id;
          });
        });
      },
      link: (id, categoryItemId) => {
        set((state) => {
          const todoItem = state.todoItems.find((item) => {
            return item.id === id;
          });
          if (todoItem) {
            todoItem.categoryItemId = categoryItemId;
          }
        });
      },
      schedule: (id, dueDate) => {
        set((state) => {
          const todoItem = state.todoItems.find((item) => {
            return item.id === id;
          });
          if (todoItem) {
            todoItem.dueDate = dueDate;
          }
        });
      },
    },
  };
};

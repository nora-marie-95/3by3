import { useShallow } from "zustand/react/shallow";

import type { CategoryType } from "@/domains/category-item";
import { useAppStore } from "@/domains/store/use-app-store";

export const useCategoryItems = (type: CategoryType) => {
  return useAppStore(
    useShallow((state) => {
      return state.categoryItems.filter((item) => {
        return item.type === type;
      });
    }),
  );
};

export const useCategoryItem = (id: string | undefined) => {
  return useAppStore((state) => {
    return state.categoryItems.find((item) => {
      return item.id === id;
    });
  });
};

export const useTodoItems = () => {
  return useAppStore(
    useShallow((state) => {
      return state.todoItems;
    }),
  );
};

export const useTodoItemsForCategory = (categoryItemId: string) => {
  return useAppStore(
    useShallow((state) => {
      return state.todoItems.filter((item) => {
        return item.categoryItemId === categoryItemId;
      });
    }),
  );
};

/** Due today, plus anything earlier that's still open — so a missed day doesn't silently vanish. */
export const useTodayTodoItems = (today: string) => {
  return useAppStore(
    useShallow((state) => {
      return state.todoItems.filter((item) => {
        if (item.dueDate === undefined) {
          return false;
        }
        return item.dueDate === today || (item.dueDate < today && !item.done);
      });
    }),
  );
};

/** Completion times of the item's checked-off todos — the raw input for rhythm progress. */
export const useCategoryCompletions = (categoryItemId: string) => {
  return useAppStore(
    useShallow((state) => {
      return state.todoItems.flatMap((item) => {
        const isCompletion = item.categoryItemId === categoryItemId && item.done;
        return isCompletion && item.doneAt !== undefined ? [item.doneAt] : [];
      });
    }),
  );
};

/** True while the item has a todo for today that is still open (stops duplicate quick-adds). */
export const useHasOpenTodoToday = (categoryItemId: string, today: string) => {
  return useAppStore((state) => {
    return state.todoItems.some((item) => {
      return item.categoryItemId === categoryItemId && item.dueDate === today && !item.done;
    });
  });
};

import type { CategoryDraft, CategoryItem, Rhythm } from "@/domains/category-item";
import type { TodoDraft, TodoItem } from "@/domains/todo-item";

export type AppState = {
  categoryItems: CategoryItem[];
  todoItems: TodoItem[];
  category: {
    create: (draft: CategoryDraft) => void;
    rename: (id: string, title: string) => void;
    setRhythm: (id: string, rhythm: Rhythm) => void;
    remove: (id: string) => void;
  };
  todo: {
    create: (draft: TodoDraft) => void;
    toggle: (id: string) => void;
    rename: (id: string, title: string) => void;
    remove: (id: string) => void;
    link: (id: string, categoryItemId: string | undefined) => void;
    schedule: (id: string, dueDate: string | undefined) => void;
  };
};

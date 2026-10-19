import { FlatList } from "react-native";

import { useTodoItems, useTodoItemsForCategory } from "@/domains/store";
import type { TodoItem } from "@/domains/todo-item";
import { TodoRow } from "@/features/todos/client/components/todo-row";
import { EmptyState } from "@/shared/ui-kit";

type TodoListProps = {
  /** Omit to show every todo (the global Todos tab); pass to scope to one category item. */
  categoryItemId?: string;
};

export const TodoList = (props: TodoListProps) => {
  const { categoryItemId } = props;
  // Both hooks are called unconditionally (rules-of-hooks) and the right result is picked below.
  const allTodoItems = useTodoItems();
  const scopedTodoItems = useTodoItemsForCategory(categoryItemId ?? "");
  const todoItems = categoryItemId ? scopedTodoItems : allTodoItems;
  /** Newest first, so a just-captured todo shows up at the top without hunting for it. */
  const sortedTodoItems = [...todoItems].sort((a, b) => {
    return b.createdAt - a.createdAt;
  });
  const renderItem = (info: { item: TodoItem }) => {
    return <TodoRow todoItem={info.item} />;
  };
  if (sortedTodoItems.length === 0) {
    return <EmptyState message="No todos yet — tap + to add one." />;
  }
  return (
    <FlatList
      className="flex-1"
      contentContainerClassName="px-4"
      data={sortedTodoItems}
      keyExtractor={(item) => {
        return item.id;
      }}
      renderItem={renderItem}
    />
  );
};

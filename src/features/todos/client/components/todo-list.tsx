import { FlatList } from "react-native";

import { useTodayTodoItems, useTodoItemsForCategory } from "@/domains/store";
import type { TodoItem } from "@/domains/todo-item";
import { TodoRow } from "@/features/todos/client/components/todo-row";
import { EmptyState } from "@/shared/ui-kit";
import { todayKey } from "@/shared/util";

type TodoListProps = {
  /** Pass to show one category item's todos; omit for today's list (the Today tab). */
  categoryItemId?: string;
};

export const TodoList = (props: TodoListProps) => {
  const { categoryItemId } = props;
  // Both hooks are called unconditionally (rules-of-hooks) and the right result is picked below.
  const todayTodoItems = useTodayTodoItems(todayKey());
  const scopedTodoItems = useTodoItemsForCategory(categoryItemId ?? "");
  const todoItems = categoryItemId ? scopedTodoItems : todayTodoItems;
  /** Newest first, so a just-captured todo shows up at the top without hunting for it. */
  const sortedTodoItems = [...todoItems].sort((a, b) => {
    return b.createdAt - a.createdAt;
  });
  const renderItem = (info: { item: TodoItem }) => {
    return <TodoRow todoItem={info.item} />;
  };
  const emptyMessage = categoryItemId
    ? "No todos yet — tap + to add one."
    : "Nothing planned for today — tap + to add a todo.";
  if (sortedTodoItems.length === 0) {
    return <EmptyState message={emptyMessage} />;
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

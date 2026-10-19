import { Text, View } from "react-native";

import { useAppStore, useCategoryItem } from "@/domains/store";
import type { TodoItem } from "@/domains/todo-item";
import { Checkbox } from "@/shared/ui-kit";

type TodoRowProps = {
  todoItem: TodoItem;
};

/** Things' pattern: the linked goal/routine/joy item is a plain gray subtitle, not a badge. */
export const TodoRow = (props: TodoRowProps) => {
  const { todoItem } = props;
  const toggleTodo = useAppStore((state) => {
    return state.todo.toggle;
  });
  const categoryItem = useCategoryItem(todoItem.categoryItemId);
  const onToggle = () => {
    toggleTodo(todoItem.id);
  };
  const titleClassName = todoItem.done
    ? "text-base text-subtle line-through"
    : "text-base text-ink";
  return (
    <View
      testID={`todo-row-${todoItem.id}`}
      className="flex-row items-center gap-3 border-b-hair border-hairline py-3"
    >
      <Checkbox
        checked={todoItem.done}
        onToggle={onToggle}
        testID={`todo-checkbox-${todoItem.id}`}
      />
      <View className="flex-1">
        <Text className={titleClassName}>{todoItem.title}</Text>
        {categoryItem ? <Text className="text-sm text-subtle">{categoryItem.title}</Text> : null}
      </View>
    </View>
  );
};

import { Pressable, Text } from "react-native";

import { PlusIcon } from "lucide-react-native";

import type { CategoryItem } from "@/domains/category-item";
import { useAppStore, useHasOpenTodoToday } from "@/domains/store";
import { todayKey } from "@/shared/util";

type AddToTodayButtonProps = {
  categoryItem: CategoryItem;
};

/** One tap puts the item on today's list as a todo linked back to it. */
export const AddToTodayButton = (props: AddToTodayButtonProps) => {
  const { categoryItem } = props;
  const today = todayKey();
  const createTodo = useAppStore((state) => {
    return state.todo.create;
  });
  const isOnToday = useHasOpenTodoToday(categoryItem.id, today);
  const onPress = () => {
    createTodo({ title: categoryItem.title, categoryItemId: categoryItem.id, dueDate: today });
  };
  if (isOnToday) {
    return <Text className="text-sm text-subtle">On today&apos;s list</Text>;
  }
  return (
    <Pressable
      hitSlop={8}
      onPress={onPress}
      testID={`add-to-today-${categoryItem.id}`}
      className="flex-row items-center gap-1 rounded-full border-hair border-hairline px-3 py-1.5"
    >
      <PlusIcon size={14} color="#1C1C1E" />
      <Text className="text-sm text-ink">Today</Text>
    </Pressable>
  );
};

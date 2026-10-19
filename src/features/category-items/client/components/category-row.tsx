import { Pressable, Text, View } from "react-native";

import { router } from "expo-router";

import { type CategoryItem, formatRhythm } from "@/domains/category-item";
import { useTodoItemsForCategory } from "@/domains/store";
import { AddToTodayButton } from "@/features/category-items/client/components/add-to-today-button";
import { RoutineProgressLabel } from "@/features/category-items/client/components/routine-progress";
import { CategoryDot } from "@/shared/ui-kit";

type CategoryRowProps = {
  categoryItem: CategoryItem;
  accentColor: string;
};

export const CategoryRow = (props: CategoryRowProps) => {
  const { categoryItem, accentColor } = props;
  const todoItems = useTodoItemsForCategory(categoryItem.id);
  const onPress = () => {
    router.push({ pathname: "/category/[id]", params: { id: categoryItem.id } });
  };
  const doneCount = todoItems.filter((todoItem) => {
    return todoItem.done;
  }).length;
  const hasTodos = todoItems.length > 0;
  const todoSummary = hasTodos ? `${doneCount}/${todoItems.length} todos` : "No todos yet";
  const subtitle = categoryItem.rhythm
    ? `${formatRhythm(categoryItem.rhythm)} · ${todoSummary}`
    : todoSummary;
  return (
    <Pressable
      testID={`category-row-${categoryItem.id}`}
      onPress={onPress}
      className="flex-row items-center gap-3 border-b-hair border-hairline py-3"
    >
      <CategoryDot color={accentColor} />
      <View className="flex-1">
        <Text className="text-base text-ink">{categoryItem.title}</Text>
        <Text className="text-sm text-subtle">{subtitle}</Text>
        {categoryItem.type === "routine" ? (
          <RoutineProgressLabel categoryItem={categoryItem} />
        ) : null}
      </View>
      {categoryItem.type === "routine" ? <AddToTodayButton categoryItem={categoryItem} /> : null}
    </Pressable>
  );
};

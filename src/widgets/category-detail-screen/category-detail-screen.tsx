import { Text, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";

import { CATEGORY_META } from "@/domains/category-item";
import { useCategoryItem } from "@/domains/store";
import { TodoList, useTodoComposer } from "@/features/todos";
import { ComposerModal, EmptyState, Fab, Screen, SectionHeader } from "@/shared/ui-kit";

export const CategoryDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryItem = useCategoryItem(id);
  const composer = useTodoComposer({ presetCategoryItemId: id });

  if (!categoryItem) {
    return (
      <Screen>
        <EmptyState message="This item was deleted." />
      </Screen>
    );
  }

  const meta = CATEGORY_META[categoryItem.type];

  return (
    <Screen>
      <Stack.Screen options={{ title: categoryItem.title }} />
      <View className="gap-4 px-4 pb-2 pt-4">
        <Text className="text-2xl font-semibold text-ink">{categoryItem.title}</Text>
        <SectionHeader title="Todos" accentColor={meta.accentColor} />
      </View>
      <TodoList categoryItemId={categoryItem.id} />
      <Fab accentColor={meta.accentColor} onPress={composer.open} testID="add-linked-todo-fab" />
      <ComposerModal
        visible={composer.visible}
        label="New Todo"
        value={composer.title}
        onChangeValue={composer.onChangeTitle}
        onSubmit={composer.submit}
        onClose={composer.close}
        testID="add-linked-todo-input"
      />
    </Screen>
  );
};

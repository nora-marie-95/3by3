import { Pressable, Text, View } from "react-native";

import { router } from "expo-router";

import { PencilIcon, Trash2Icon } from "lucide-react-native";

import { CATEGORY_META, type CategoryItem, formatRhythm } from "@/domains/category-item";
import { useAppStore, useTodoItemsForCategory } from "@/domains/store";
import { AddToTodayButton } from "@/features/category-items/client/components/add-to-today-button";
import { RoutineProgressLabel } from "@/features/category-items/client/components/routine-progress";
import { useCategoryEditor } from "@/features/category-items/client/hooks/use-category-editor";
import { CategoryDot, ComposerModal } from "@/shared/ui-kit";

type CategoryRowProps = {
  categoryItem: CategoryItem;
  accentColor: string;
};

const ACTION_ICON_SIZE = 18;
const ACTION_ICON_COLOR = "#8E8E93";

export const CategoryRow = (props: CategoryRowProps) => {
  const { categoryItem, accentColor } = props;
  const todoItems = useTodoItemsForCategory(categoryItem.id);
  const removeCategoryItem = useAppStore((state) => {
    return state.category.remove;
  });
  const editor = useCategoryEditor(categoryItem);
  const onRemovePress = () => {
    editor.close();
    removeCategoryItem(categoryItem.id);
  };
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
    <>
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
        {categoryItem.type === "goal" ? null : <AddToTodayButton categoryItem={categoryItem} />}
        <Pressable
          hitSlop={8}
          onPress={editor.open}
          testID={`category-edit-${categoryItem.id}`}
          accessibilityLabel="Edit"
        >
          <PencilIcon size={ACTION_ICON_SIZE} color={ACTION_ICON_COLOR} />
        </Pressable>
        <Pressable
          hitSlop={8}
          onPress={onRemovePress}
          testID={`category-delete-${categoryItem.id}`}
          accessibilityLabel="Delete"
        >
          <Trash2Icon size={ACTION_ICON_SIZE} color={ACTION_ICON_COLOR} />
        </Pressable>
      </Pressable>
      {/* Sibling, not child: clicks inside a web Modal bubble through the React tree to the row. */}
      <ComposerModal
        visible={editor.visible}
        label={`Edit ${CATEGORY_META[categoryItem.type].label}`}
        submitLabel="Save"
        value={editor.title}
        onChangeValue={editor.onChangeTitle}
        onSubmit={editor.submit}
        onClose={editor.close}
        onDelete={onRemovePress}
        testID={`category-edit-input-${categoryItem.id}`}
      />
    </>
  );
};

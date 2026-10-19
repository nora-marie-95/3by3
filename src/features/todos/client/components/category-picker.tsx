import { Pressable, ScrollView, Text } from "react-native";

import { CATEGORY_META, type CategoryItem } from "@/domains/category-item";
import { useAppStore } from "@/domains/store";
import { CategoryDot } from "@/shared/ui-kit";

type CategoryChipProps = {
  categoryItem: CategoryItem;
  selected: boolean;
  onSelect: (categoryItemId: string) => void;
};

const CategoryChip = (props: CategoryChipProps) => {
  const { categoryItem, selected, onSelect } = props;
  const accentColor = CATEGORY_META[categoryItem.type].accentColor;
  const onPress = () => {
    onSelect(categoryItem.id);
  };
  const chipClassName = selected
    ? "flex-row items-center gap-1.5 rounded-full border-hair border-hairline bg-ink px-3 py-1.5"
    : "flex-row items-center gap-1.5 rounded-full border-hair border-hairline bg-transparent px-3 py-1.5";
  return (
    <Pressable
      onPress={onPress}
      testID={`category-chip-${categoryItem.id}`}
      className={chipClassName}
    >
      <CategoryDot color={accentColor} />
      <Text className={selected ? "text-sm text-white" : "text-sm text-ink"}>
        {categoryItem.title}
      </Text>
    </Pressable>
  );
};

type CategoryPickerProps = {
  value: string | undefined;
  onChange: (categoryItemId: string | undefined) => void;
};

/** Lets a todo (re)link to a goal/routine/joy item — "None" is a first-class choice. */
export const CategoryPicker = (props: CategoryPickerProps) => {
  const { value, onChange } = props;
  const categoryItems = useAppStore((state) => {
    return state.categoryItems;
  });
  const onNonePress = () => {
    onChange(undefined);
  };
  const noneClassName =
    value === undefined
      ? "rounded-full border-hair border-hairline bg-ink px-3 py-1.5"
      : "rounded-full border-hair border-hairline bg-transparent px-3 py-1.5";
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="flex-row gap-2"
    >
      <Pressable onPress={onNonePress} testID="category-chip-none" className={noneClassName}>
        <Text className={value === undefined ? "text-sm text-white" : "text-sm text-subtle"}>
          None
        </Text>
      </Pressable>
      {categoryItems.map((categoryItem) => {
        return (
          <CategoryChip
            key={categoryItem.id}
            categoryItem={categoryItem}
            selected={value === categoryItem.id}
            onSelect={onChange}
          />
        );
      })}
    </ScrollView>
  );
};

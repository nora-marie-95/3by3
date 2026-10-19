import { FlatList } from "react-native";

import { CATEGORY_META, type CategoryItem, type CategoryType } from "@/domains/category-item";
import { useCategoryItems } from "@/domains/store";
import { CategoryRow } from "@/features/category-items/client/components/category-row";
import { EmptyState } from "@/shared/ui-kit";

type CategoryListProps = {
  type: CategoryType;
};

export const CategoryList = (props: CategoryListProps) => {
  const { type } = props;
  const categoryItems = useCategoryItems(type);
  const meta = CATEGORY_META[type];
  const renderItem = (info: { item: CategoryItem }) => {
    return <CategoryRow categoryItem={info.item} accentColor={meta.accentColor} />;
  };
  if (categoryItems.length === 0) {
    return <EmptyState message={`No ${meta.plural.toLowerCase()} yet — tap + to add one.`} />;
  }
  return (
    <FlatList
      className="flex-1"
      contentContainerClassName="px-4"
      data={categoryItems}
      keyExtractor={(item) => {
        return item.id;
      }}
      renderItem={renderItem}
    />
  );
};

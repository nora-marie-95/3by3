import { View } from "react-native";

import { CategoryPicker } from "@/features/todos/client/components/category-picker";
import { DayToggle } from "@/features/todos/client/components/day-toggle";

type TodoFieldsProps = {
  categoryItemId: string | undefined;
  dueDate: string | undefined;
  onCategoryItemIdChange: (categoryItemId: string | undefined) => void;
  onDueDateChange: (dueDate: string | undefined) => void;
};

/** The pickers shared by the "new todo" and "edit todo" sheets. */
export const TodoFields = (props: TodoFieldsProps) => {
  const { categoryItemId, dueDate, onCategoryItemIdChange, onDueDateChange } = props;
  return (
    <View className="gap-3">
      <View className="flex-row">
        <DayToggle value={dueDate} onChange={onDueDateChange} />
      </View>
      <CategoryPicker value={categoryItemId} onChange={onCategoryItemIdChange} />
    </View>
  );
};

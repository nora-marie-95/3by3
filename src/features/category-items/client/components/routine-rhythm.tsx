import { Text, View } from "react-native";

import type { Rhythm } from "@/domains/category-item";
import { useAppStore, useCategoryItem } from "@/domains/store";
import { RhythmPicker } from "@/features/category-items/client/components/rhythm-picker";

type RoutineRhythmProps = {
  categoryItemId: string;
};

/** Edits a saved routine's rhythm in place — every change is stored immediately. */
export const RoutineRhythm = (props: RoutineRhythmProps) => {
  const { categoryItemId } = props;
  const categoryItem = useCategoryItem(categoryItemId);
  const setRhythm = useAppStore((state) => {
    return state.category.setRhythm;
  });
  const onChange = (rhythm: Rhythm) => {
    setRhythm(categoryItemId, rhythm);
  };
  return (
    <View className="gap-2">
      <Text className="text-sm font-semibold uppercase tracking-wide text-subtle">Rhythm</Text>
      <RhythmPicker value={categoryItem?.rhythm} onChange={onChange} />
    </View>
  );
};

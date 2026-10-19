import { CATEGORY_META, type CategoryType } from "@/domains/category-item";
import { CategoryList, RhythmPicker, useCategoryComposer } from "@/features/category-items";
import { ComposerModal, Fab, Screen } from "@/shared/ui-kit";

type CategoryScreenProps = {
  type: CategoryType;
};

export const CategoryScreen = (props: CategoryScreenProps) => {
  const { type } = props;
  const meta = CATEGORY_META[type];
  const composer = useCategoryComposer(type);
  return (
    <Screen>
      <CategoryList type={type} />
      <Fab accentColor={meta.accentColor} onPress={composer.open} testID={`add-${type}-fab`} />
      <ComposerModal
        visible={composer.visible}
        label={`New ${meta.label}`}
        value={composer.title}
        onChangeValue={composer.onChangeTitle}
        onSubmit={composer.submit}
        onClose={composer.close}
        testID={`add-${type}-input`}
      >
        {type === "routine" ? (
          <RhythmPicker value={composer.rhythm} onChange={composer.onChangeRhythm} />
        ) : null}
      </ComposerModal>
    </Screen>
  );
};

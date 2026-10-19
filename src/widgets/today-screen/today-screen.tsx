import { TodoFields, TodoList, useTodoComposer } from "@/features/todos";
import { ComposerModal, Fab, Screen } from "@/shared/ui-kit";
import { todayKey } from "@/shared/util";

/** ink, matching tailwind.config.js colors.ink — this screen isn't scoped to one category. */
const TODAY_FAB_COLOR = "#1C1C1E";

export const TodayScreen = () => {
  const composer = useTodoComposer({ presetDueDate: todayKey() });
  return (
    <Screen>
      <TodoList />
      <Fab accentColor={TODAY_FAB_COLOR} onPress={composer.open} testID="add-todo-fab" />
      <ComposerModal
        visible={composer.visible}
        label="New Todo"
        value={composer.title}
        onChangeValue={composer.onChangeTitle}
        onSubmit={composer.submit}
        onClose={composer.close}
        testID="add-todo-input"
      >
        <TodoFields
          categoryItemId={composer.categoryItemId}
          dueDate={composer.dueDate}
          onCategoryItemIdChange={composer.onChangeCategoryItemId}
          onDueDateChange={composer.onChangeDueDate}
        />
      </ComposerModal>
    </Screen>
  );
};

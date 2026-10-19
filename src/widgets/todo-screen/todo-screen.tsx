import { CategoryPicker, TodoList, useTodoComposer } from "@/features/todos";
import { ComposerModal, Fab, Screen } from "@/shared/ui-kit";

/** ink, matching tailwind.config.js colors.ink — this screen isn't scoped to one category. */
const TODO_FAB_COLOR = "#1C1C1E";

export const TodoScreen = () => {
  const composer = useTodoComposer();
  return (
    <Screen>
      <TodoList />
      <Fab accentColor={TODO_FAB_COLOR} onPress={composer.open} testID="add-todo-fab" />
      <ComposerModal
        visible={composer.visible}
        label="New Todo"
        value={composer.title}
        onChangeValue={composer.onChangeTitle}
        onSubmit={composer.submit}
        onClose={composer.close}
        testID="add-todo-input"
      >
        <CategoryPicker
          value={composer.categoryItemId}
          onChange={composer.onChangeCategoryItemId}
        />
      </ComposerModal>
    </Screen>
  );
};

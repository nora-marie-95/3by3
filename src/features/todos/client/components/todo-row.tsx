import { Pressable, Text, View } from "react-native";

import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react-native";

import { useAppStore, useCategoryItem } from "@/domains/store";
import type { TodoItem } from "@/domains/todo-item";
import { TodoFields } from "@/features/todos/client/components/todo-fields";
import { useTodoEditor } from "@/features/todos/client/hooks/use-todo-editor";
import { Checkbox, ComposerModal } from "@/shared/ui-kit";
import { todayKey } from "@/shared/util";

type TodoRowProps = {
  todoItem: TodoItem;
};

const ACTION_ICON_SIZE = 18;
const ACTION_ICON_COLOR = "#8E8E93";

/** Things' pattern: the linked goal/routine/joy item is a plain gray subtitle, not a badge. */
export const TodoRow = (props: TodoRowProps) => {
  const { todoItem } = props;
  const toggleTodo = useAppStore((state) => {
    return state.todo.toggle;
  });
  const removeTodo = useAppStore((state) => {
    return state.todo.remove;
  });
  const categoryItem = useCategoryItem(todoItem.categoryItemId);
  const editor = useTodoEditor(todoItem);
  const onToggle = () => {
    toggleTodo(todoItem.id);
  };
  const scheduleTodo = useAppStore((state) => {
    return state.todo.schedule;
  });
  const onTodayPress = () => {
    scheduleTodo(todoItem.id, todayKey());
  };
  const onRemovePress = () => {
    removeTodo(todoItem.id);
  };
  const isOverdue =
    !todoItem.done && todoItem.dueDate !== undefined && todoItem.dueDate < todayKey();
  /** Backlog and overdue todos can jump onto today's list; done or already-today ones can't. */
  const canMoveToToday = !todoItem.done && todoItem.dueDate !== todayKey();
  const titleClassName = todoItem.done
    ? "text-base text-subtle line-through"
    : "text-base text-ink";
  return (
    <View
      testID={`todo-row-${todoItem.id}`}
      className="flex-row items-center gap-3 border-b-hair border-hairline py-3"
    >
      <Checkbox
        checked={todoItem.done}
        onToggle={onToggle}
        testID={`todo-checkbox-${todoItem.id}`}
      />
      <View className="flex-1">
        <Text className={titleClassName}>{todoItem.title}</Text>
        {isOverdue ? <Text className="text-sm text-red-600">Overdue</Text> : null}
        {categoryItem ? <Text className="text-sm text-subtle">{categoryItem.title}</Text> : null}
      </View>
      {canMoveToToday ? (
        <Pressable
          hitSlop={8}
          onPress={onTodayPress}
          testID={`todo-today-${todoItem.id}`}
          className="flex-row items-center gap-1 rounded-full border-hair border-hairline px-3 py-1.5"
        >
          <PlusIcon size={14} color="#1C1C1E" />
          <Text className="text-sm text-ink">Today</Text>
        </Pressable>
      ) : null}
      <Pressable
        hitSlop={8}
        onPress={editor.open}
        testID={`todo-edit-${todoItem.id}`}
        accessibilityLabel="Edit todo"
      >
        <PencilIcon size={ACTION_ICON_SIZE} color={ACTION_ICON_COLOR} />
      </Pressable>
      <Pressable
        hitSlop={8}
        onPress={onRemovePress}
        testID={`todo-delete-${todoItem.id}`}
        accessibilityLabel="Delete todo"
      >
        <Trash2Icon size={ACTION_ICON_SIZE} color={ACTION_ICON_COLOR} />
      </Pressable>
      <ComposerModal
        visible={editor.visible}
        label="Edit Todo"
        submitLabel="Save"
        value={editor.title}
        onChangeValue={editor.onChangeTitle}
        onSubmit={editor.submit}
        onClose={editor.close}
        onDelete={onRemovePress}
        testID={`todo-edit-input-${todoItem.id}`}
      >
        <TodoFields
          categoryItemId={editor.categoryItemId}
          dueDate={editor.dueDate}
          onCategoryItemIdChange={editor.onChangeCategoryItemId}
          onDueDateChange={editor.onChangeDueDate}
        />
      </ComposerModal>
    </View>
  );
};

import { useState } from "react";

import { useAppStore } from "@/domains/store";

export const useTodoComposer = (presetCategoryItemId?: string) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryItemId, setCategoryItemId] = useState<string | undefined>(presetCategoryItemId);
  const createTodoItem = useAppStore((state) => {
    return state.todo.create;
  });

  const open = () => {
    setCategoryItemId(presetCategoryItemId);
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
    setTitle("");
  };
  const submit = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length > 0) {
      createTodoItem({ title: trimmedTitle, categoryItemId });
    }
    close();
  };

  return {
    visible,
    title,
    onChangeTitle: setTitle,
    categoryItemId,
    onChangeCategoryItemId: setCategoryItemId,
    open,
    close,
    submit,
  };
};

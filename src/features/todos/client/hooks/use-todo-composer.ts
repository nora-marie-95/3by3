import { useState } from "react";

import { useAppStore } from "@/domains/store";

type Params = {
  presetCategoryItemId?: string;
  /** The Today tab creates todos for today; everywhere else they start in the backlog. */
  presetDueDate?: string;
};

export const useTodoComposer = (params: Params = {}) => {
  const { presetCategoryItemId, presetDueDate } = params;
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryItemId, setCategoryItemId] = useState<string | undefined>(presetCategoryItemId);
  const [dueDate, setDueDate] = useState<string | undefined>(presetDueDate);
  const createTodoItem = useAppStore((state) => {
    return state.todo.create;
  });

  const open = () => {
    setCategoryItemId(presetCategoryItemId);
    setDueDate(presetDueDate);
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
    setTitle("");
  };
  const submit = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length > 0) {
      createTodoItem({ title: trimmedTitle, categoryItemId, dueDate });
    }
    close();
  };

  return {
    visible,
    title,
    onChangeTitle: setTitle,
    categoryItemId,
    onChangeCategoryItemId: setCategoryItemId,
    dueDate,
    onChangeDueDate: setDueDate,
    open,
    close,
    submit,
  };
};

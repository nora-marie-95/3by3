import { useState } from "react";

import type { CategoryType } from "@/domains/category-item";
import { useAppStore } from "@/domains/store";

export const useCategoryComposer = (type: CategoryType) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const createCategoryItem = useAppStore((state) => {
    return state.category.create;
  });

  const open = () => {
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
    setTitle("");
  };
  const submit = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length > 0) {
      createCategoryItem({ type, title: trimmedTitle });
    }
    close();
  };

  return { visible, title, onChangeTitle: setTitle, open, close, submit };
};

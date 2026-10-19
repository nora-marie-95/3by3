import { useState } from "react";

import type { CategoryItem } from "@/domains/category-item";
import { useAppStore } from "@/domains/store";

export const useCategoryEditor = (categoryItem: CategoryItem) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(categoryItem.title);
  const renameCategoryItem = useAppStore((state) => {
    return state.category.rename;
  });

  /** Re-seeds the field from the stored item, so a cancelled edit never lingers. */
  const open = () => {
    setTitle(categoryItem.title);
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };
  const submit = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length > 0) {
      renameCategoryItem(categoryItem.id, trimmedTitle);
    }
    close();
  };

  return { visible, title, onChangeTitle: setTitle, open, close, submit };
};

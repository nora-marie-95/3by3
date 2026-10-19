import { useState } from "react";

import type { CategoryType, Rhythm } from "@/domains/category-item";
import { useAppStore } from "@/domains/store";

/** New routines start daily, so a rhythm is always set; goals and joy items have none. */
const DEFAULT_ROUTINE_RHYTHM: Rhythm = { kind: "daily" };

export const useCategoryComposer = (type: CategoryType) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [rhythm, setRhythm] = useState<Rhythm>(DEFAULT_ROUTINE_RHYTHM);
  const createCategoryItem = useAppStore((state) => {
    return state.category.create;
  });

  const open = () => {
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
    setTitle("");
    setRhythm(DEFAULT_ROUTINE_RHYTHM);
  };
  const submit = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length > 0) {
      createCategoryItem({
        type,
        title: trimmedTitle,
        rhythm: type === "routine" ? rhythm : undefined,
      });
    }
    close();
  };

  return {
    visible,
    title,
    onChangeTitle: setTitle,
    rhythm,
    onChangeRhythm: setRhythm,
    open,
    close,
    submit,
  };
};

import type { CategoryType } from "@/domains/category-item/types";

type CategoryMeta = {
  label: string;
  plural: string;
  accentColor: string;
};

/** accentColor values are duplicated in tailwind.config.js (colors.goal/routine/joy) — keep in sync. */
export const CATEGORY_META: Record<CategoryType, CategoryMeta> = {
  goal: { label: "Goal", plural: "Goals", accentColor: "#2F6FED" },
  routine: { label: "Routine", plural: "Routines", accentColor: "#2BB673" },
  joy: { label: "Joy List", plural: "Joy List", accentColor: "#E0A530" },
};

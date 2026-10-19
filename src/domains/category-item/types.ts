import { z } from "zod/v4";

export const CATEGORY_TYPES = ["goal", "routine", "joy"] as const;

export const CategoryTypeSchema = z.enum(CATEGORY_TYPES);
export type CategoryType = z.infer<typeof CategoryTypeSchema>;

export const CategoryItemSchema = z.object({
  id: z.string(),
  type: CategoryTypeSchema,
  title: z.string().min(1),
  note: z.string().optional(),
  createdAt: z.number(),
});
export type CategoryItem = z.infer<typeof CategoryItemSchema>;

export const CategoryDraftSchema = CategoryItemSchema.pick({ type: true, title: true });
export type CategoryDraft = z.infer<typeof CategoryDraftSchema>;

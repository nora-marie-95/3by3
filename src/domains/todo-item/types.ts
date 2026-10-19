import { z } from "zod/v4";

export const TodoItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  done: z.boolean(),
  categoryItemId: z.string().optional(),
  createdAt: z.number(),
});
export type TodoItem = z.infer<typeof TodoItemSchema>;

export const TodoDraftSchema = TodoItemSchema.pick({ title: true, categoryItemId: true });
export type TodoDraft = z.infer<typeof TodoDraftSchema>;

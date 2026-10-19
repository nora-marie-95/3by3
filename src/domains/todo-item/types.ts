import { z } from "zod/v4";

export const TodoItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  done: z.boolean(),
  /** When the todo was last checked off (epoch ms); routines count these toward their rhythm. */
  doneAt: z.number().optional(),
  categoryItemId: z.string().optional(),
  /** Local day the todo is meant for, "YYYY-MM-DD"; unset means it's in the backlog. */
  dueDate: z.string().optional(),
  createdAt: z.number(),
});
export type TodoItem = z.infer<typeof TodoItemSchema>;

export const TodoDraftSchema = TodoItemSchema.pick({
  title: true,
  categoryItemId: true,
  dueDate: true,
});
export type TodoDraft = z.infer<typeof TodoDraftSchema>;

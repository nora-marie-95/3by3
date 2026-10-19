import { z } from "zod/v4";

export const CATEGORY_TYPES = ["goal", "routine", "joy"] as const;

export const CategoryTypeSchema = z.enum(CATEGORY_TYPES);
export type CategoryType = z.infer<typeof CategoryTypeSchema>;

export const MIN_TIMES_PER_WEEK = 2;
export const MAX_TIMES_PER_WEEK = 6;

/** How often a routine repeats. "x times a week" starts at 2 — once a week is just "weekly". */
export const RhythmSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("daily") }),
  z.object({ kind: z.literal("weekly") }),
  z.object({ kind: z.literal("biweekly") }),
  z.object({ kind: z.literal("monthly") }),
  z.object({
    kind: z.literal("timesPerWeek"),
    times: z.number().int().min(MIN_TIMES_PER_WEEK).max(MAX_TIMES_PER_WEEK),
  }),
]);
export type Rhythm = z.infer<typeof RhythmSchema>;

export const CategoryItemSchema = z.object({
  id: z.string(),
  type: CategoryTypeSchema,
  title: z.string().min(1),
  note: z.string().optional(),
  /** Routines only. */
  rhythm: RhythmSchema.optional(),
  createdAt: z.number(),
});
export type CategoryItem = z.infer<typeof CategoryItemSchema>;

export const CategoryDraftSchema = CategoryItemSchema.pick({
  type: true,
  title: true,
  rhythm: true,
});
export type CategoryDraft = z.infer<typeof CategoryDraftSchema>;

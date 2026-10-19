import { describe, expect, it } from "@jest/globals";

import { CategoryItemSchema } from "@/domains/category-item/types";

describe("CategoryItemSchema", () => {
  it("accepts a valid goal item", () => {
    const result = CategoryItemSchema.safeParse({
      id: "a1",
      type: "goal",
      title: "B2 French",
      createdAt: Date.now(),
    });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown category type", () => {
    const result = CategoryItemSchema.safeParse({
      id: "a1",
      type: "habit",
      title: "B2 French",
      createdAt: Date.now(),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty title", () => {
    const result = CategoryItemSchema.safeParse({
      id: "a1",
      type: "goal",
      title: "",
      createdAt: Date.now(),
    });
    expect(result.success).toBe(false);
  });
});

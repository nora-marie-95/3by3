import { beforeEach, describe, expect, it } from "@jest/globals";

import { useAppStore } from "@/domains/store/use-app-store";

beforeEach(() => {
  useAppStore.setState({ categoryItems: [], todoItems: [] });
});

describe("category actions", () => {
  it("creates a category item of the given type", () => {
    useAppStore.getState().category.create({ type: "goal", title: "B2 French" });

    const categoryItems = useAppStore.getState().categoryItems;
    expect(categoryItems).toHaveLength(1);
    expect(categoryItems[0]).toMatchObject({ type: "goal", title: "B2 French" });
  });

  it("unlinks todos when their category item is removed", () => {
    useAppStore.getState().category.create({ type: "goal", title: "B2 French" });
    const categoryItemId = useAppStore.getState().categoryItems[0].id;
    useAppStore.getState().todo.create({ title: "Learn 10 new words", categoryItemId });

    useAppStore.getState().category.remove(categoryItemId);

    const todoItems = useAppStore.getState().todoItems;
    expect(todoItems).toHaveLength(1);
    expect(todoItems[0].categoryItemId).toBeUndefined();
  });
});

describe("todo actions", () => {
  it("creates a todo, optionally linked to a category item", () => {
    useAppStore.getState().todo.create({ title: "Buy groceries" });

    const todoItems = useAppStore.getState().todoItems;
    expect(todoItems).toHaveLength(1);
    expect(todoItems[0]).toMatchObject({
      title: "Buy groceries",
      done: false,
      categoryItemId: undefined,
    });
  });

  it("toggles a todo's done state", () => {
    useAppStore.getState().todo.create({ title: "Buy groceries" });
    const todoId = useAppStore.getState().todoItems[0].id;

    useAppStore.getState().todo.toggle(todoId);
    expect(useAppStore.getState().todoItems[0].done).toBe(true);

    useAppStore.getState().todo.toggle(todoId);
    expect(useAppStore.getState().todoItems[0].done).toBe(false);
  });

  it("removes a todo", () => {
    useAppStore.getState().todo.create({ title: "Buy groceries" });
    const todoId = useAppStore.getState().todoItems[0].id;

    useAppStore.getState().todo.remove(todoId);

    expect(useAppStore.getState().todoItems).toHaveLength(0);
  });
});

describe("scheduling and rhythms", () => {
  it("schedules and unschedules a todo", () => {
    useAppStore.getState().todo.create({ title: "Call dentist", dueDate: "2026-10-19" });
    const todoId = useAppStore.getState().todoItems[0].id;
    expect(useAppStore.getState().todoItems[0].dueDate).toBe("2026-10-19");

    useAppStore.getState().todo.schedule(todoId, undefined);

    expect(useAppStore.getState().todoItems[0].dueDate).toBeUndefined();
  });

  it("sets a routine's rhythm", () => {
    useAppStore.getState().category.create({
      type: "routine",
      title: "Run",
      rhythm: { kind: "daily" },
    });
    const routineId = useAppStore.getState().categoryItems[0].id;

    useAppStore.getState().category.setRhythm(routineId, { kind: "timesPerWeek", times: 3 });

    expect(useAppStore.getState().categoryItems[0].rhythm).toEqual({
      kind: "timesPerWeek",
      times: 3,
    });
  });
});

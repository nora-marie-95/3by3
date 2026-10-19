import { describe, expect, it } from "@jest/globals";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppStore } from "@/domains/store/use-app-store";

/** What earlier builds wrote: the action groups were serialized too, as empty objects. */
const LEGACY_PERSISTED_STATE = {
  state: {
    categoryItems: [{ id: "c1", type: "goal", title: "B2 French", createdAt: 1 }],
    todoItems: [],
    category: {},
    todo: {},
  },
  version: 0,
};

describe("persistence", () => {
  it("keeps the actions working after rehydrating saved data", async () => {
    await AsyncStorage.setItem("three-by-three/app-store", JSON.stringify(LEGACY_PERSISTED_STATE));

    await useAppStore.persist.rehydrate();

    expect(useAppStore.getState().categoryItems).toHaveLength(1);
    expect(typeof useAppStore.getState().todo.create).toBe("function");
    expect(typeof useAppStore.getState().category.create).toBe("function");
  });

  it("persists only data, never the action groups", async () => {
    useAppStore.setState({ categoryItems: [], todoItems: [] });
    useAppStore.getState().todo.create({ title: "Buy groceries" });

    const saved = await AsyncStorage.getItem("three-by-three/app-store");

    expect(JSON.parse(saved ?? "{}").state).not.toHaveProperty("todo");
  });
});

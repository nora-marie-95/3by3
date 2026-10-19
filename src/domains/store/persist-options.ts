import AsyncStorage from "@react-native-async-storage/async-storage";
import { type PersistOptions, createJSONStorage } from "zustand/middleware";

import type { AppState } from "@/domains/store/types";

/**
 * AsyncStorage backs onto localStorage on web and native storage on iOS/Android, so this
 * persistence config is the only place that would ever need to change between platforms.
 */
export const PERSIST_OPTIONS: PersistOptions<AppState> = {
  name: "three-by-three/app-store",
  storage: createJSONStorage(() => {
    return AsyncStorage;
  }),
};

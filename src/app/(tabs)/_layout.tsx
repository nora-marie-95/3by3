import { Tabs } from "expo-router";

import { CalendarCheckIcon, HeartIcon, RepeatIcon, TargetIcon } from "lucide-react-native";

import { CATEGORY_META } from "@/domains/category-item";

const TAB_ICON_SIZE = 24;
const ACTIVE_TAB_COLOR = "#1C1C1E";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: ACTIVE_TAB_COLOR }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ color }) => {
            return <CalendarCheckIcon size={TAB_ICON_SIZE} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: CATEGORY_META.goal.plural,
          tabBarIcon: ({ color }) => {
            return <TargetIcon size={TAB_ICON_SIZE} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          title: CATEGORY_META.routine.plural,
          tabBarIcon: ({ color }) => {
            return <RepeatIcon size={TAB_ICON_SIZE} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="joy"
        options={{
          title: CATEGORY_META.joy.plural,
          tabBarIcon: ({ color }) => {
            return <HeartIcon size={TAB_ICON_SIZE} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

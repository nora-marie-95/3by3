import { Text, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  accentColor: string;
};

export const SectionHeader = (props: SectionHeaderProps) => {
  const { title, accentColor } = props;
  return (
    <View className="border-b-hair border-hairline pb-2">
      <Text
        style={{ color: accentColor }}
        className="text-sm font-semibold uppercase tracking-wide"
      >
        {title}
      </Text>
    </View>
  );
};

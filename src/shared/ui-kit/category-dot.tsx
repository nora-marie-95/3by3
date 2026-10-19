import { View } from "react-native";

type CategoryDotProps = {
  color: string;
};

/** The one spot of color on an otherwise grayscale row — Things' per-project dot. */
export const CategoryDot = (props: CategoryDotProps) => {
  const { color } = props;
  return <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />;
};

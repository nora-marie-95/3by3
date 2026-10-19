import { Pressable } from "react-native";

import { CheckIcon } from "lucide-react-native";

type CheckboxProps = {
  checked: boolean;
  onToggle: () => void;
  testID?: string;
};

const CHECKED_COLOR = "white";
/** Faint enough to read as "not done yet" while still showing a checkmark. */
const UNCHECKED_COLOR = "#D1D1D6";

export const Checkbox = (props: CheckboxProps) => {
  const { checked, onToggle, testID } = props;
  const stateClassName = checked ? "border-ink bg-ink" : "border-subtle bg-transparent";
  const checkColor = checked ? CHECKED_COLOR : UNCHECKED_COLOR;
  return (
    <Pressable
      testID={testID}
      onPress={onToggle}
      className={`h-6 w-6 items-center justify-center rounded-full border-hair ${stateClassName}`}
    >
      <CheckIcon size={14} color={checkColor} strokeWidth={3} />
    </Pressable>
  );
};

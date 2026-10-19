import { Pressable } from "react-native";

import { CheckIcon } from "lucide-react-native";

type CheckboxProps = {
  checked: boolean;
  onToggle: () => void;
  testID?: string;
};

export const Checkbox = (props: CheckboxProps) => {
  const { checked, onToggle, testID } = props;
  const stateClassName = checked ? "border-ink bg-ink" : "border-subtle bg-transparent";
  return (
    <Pressable
      hitSlop={8}
      testID={testID}
      onPress={onToggle}
      className={`h-6 w-6 items-center justify-center rounded-full border-hair ${stateClassName}`}
    >
      {checked ? <CheckIcon size={14} color="white" strokeWidth={3} /> : null}
    </Pressable>
  );
};

import { Chip } from "@/shared/ui-kit";
import { todayKey } from "@/shared/util";

type DayToggleProps = {
  value: string | undefined;
  onChange: (dueDate: string | undefined) => void;
};

/** Puts a todo on today's list, or takes it off again. */
export const DayToggle = (props: DayToggleProps) => {
  const { value, onChange } = props;
  const today = todayKey();
  const onPress = () => {
    onChange(value === today ? undefined : today);
  };
  return <Chip label="Today" selected={value === today} onPress={onPress} testID="day-toggle" />;
};

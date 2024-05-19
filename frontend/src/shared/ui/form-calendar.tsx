import { useController, Control, FieldValues, Path } from "react-hook-form";
import { FormLabelWrapper } from "./form-label-wrapper";
import { FormFieldError } from "./form-field-error";
import { Calendar } from "primereact/calendar";

interface FormCalendarProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const FormCalendar = <T extends FieldValues>({ name, control, label }: FormCalendarProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormLabelWrapper label={label}>
      <Calendar inputId="start" id="calendar-24h" value={field.value} onChange={(e) => field.onChange(e.value)} showTime hourFormat="24" stepMinute={15} />
      <FormFieldError name={name} error={error} />
    </FormLabelWrapper>
  );
};

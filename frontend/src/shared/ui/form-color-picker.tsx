import { useController, Control, FieldValues, Path } from "react-hook-form";
import { FormLabelWrapper } from "./form-label-wrapper";
import { FormFieldError } from "./form-field-error";
import { ColorPicker } from "primereact/colorpicker";

interface FormColorPickerProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const FormColorPicker = <T extends FieldValues>({ name, control, label }: FormColorPickerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormLabelWrapper label={label}>
      <ColorPicker value={field.value} onChange={(e) => field.onChange(e.value)} />
      <FormFieldError name={name} error={error} />
    </FormLabelWrapper>
  );
};

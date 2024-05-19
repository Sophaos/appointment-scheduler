import { useController, Control, FieldValues, Path } from "react-hook-form";
import { FormLabelWrapper } from "./form-label-wrapper";
import { FormFieldError } from "./form-field-error";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface FormDropdownProps<T extends FieldValues, U> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: U[];
  optionLabel: string;
  additionnalChange?: (e: DropdownChangeEvent) => void;
}

export const FormDropdown = <T extends FieldValues, U>({ name, control, label, options, optionLabel, additionnalChange }: FormDropdownProps<T, U>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = (e: DropdownChangeEvent) => {
    field.onChange(e.value);
    if (additionnalChange) {
      additionnalChange(e);
    }
  };

  return (
    <FormLabelWrapper label={label}>
      <Dropdown {...field} value={field.value} onChange={handleChange} options={options} optionLabel={optionLabel} filter />
      <FormFieldError name={name} error={error} />
    </FormLabelWrapper>
  );
};

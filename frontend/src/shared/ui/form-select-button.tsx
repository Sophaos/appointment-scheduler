import { useController, Control, FieldValues, Path } from "react-hook-form";
import { FormLabelWrapper } from "./form-label-wrapper";
import { FormFieldError } from "./form-field-error";
import { SelectButton } from "primereact/selectbutton";
import { EntityOption } from "shared/types/entity-option";

interface FormSelectButtonProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: EntityOption[];
}

export const FormSelectButton = <T extends FieldValues>({ name, control, label, options }: FormSelectButtonProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormLabelWrapper label={label}>
      <SelectButton {...field} value={field.value} onChange={(e) => field.onChange(e)} options={options} optionValue="id" optionLabel="label" />
      <FormFieldError name={name} error={error} />
    </FormLabelWrapper>
  );
};

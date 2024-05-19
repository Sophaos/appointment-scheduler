import { useController, Control, FieldValues, Path } from "react-hook-form";
import { FormLabelWrapper } from "./form-label-wrapper";
import { FormFieldError } from "./form-field-error";
import { InputNumber } from "primereact/inputnumber";

interface FormInputNumberProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
}

export const FormInputNumber = <T extends FieldValues>({ name, control, label }: FormInputNumberProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormLabelWrapper label={label}>
      <InputNumber value={field.value} onValueChange={(e) => field.onChange(e.value)} showButtons buttonLayout="horizontal" step={15} min={30} suffix=" minutes" />
      <FormFieldError name={name} error={error} />
    </FormLabelWrapper>
  );
};

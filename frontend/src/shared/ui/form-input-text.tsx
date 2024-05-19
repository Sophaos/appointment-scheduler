import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { FormLabelWrapper } from "./form-label-wrapper";
import { FormFieldError } from "./form-field-error";

interface FormInputTextProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  mask?: string;
  type?: "text" | "area" | "mask";
}

export const FormInputText = <T extends FieldValues>({ name, control, mask, type = "text", label }: FormInputTextProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormLabelWrapper label={label}>
      {type === "mask" && mask && <InputMask {...field} type="text" invalid={!!error} aria-describedby={`${name}-error`} mask={mask} />}
      {type === "text" && <InputText {...field} type="text" invalid={!!error} aria-describedby={`${name}-error`} />}
      {type === "area" && <InputTextarea {...field} invalid={!!error} aria-describedby={`${name}-error`} />}
      <FormFieldError name={name} error={error} />
    </FormLabelWrapper>
  );
};

import { FieldError } from "react-hook-form";

interface FormFieldErrorProps {
  name: string;
  error: FieldError | undefined;
}
export const FormFieldError = ({ name, error }: FormFieldErrorProps) => {
  return (
    <small id={`${name}-error`} className="text-red-600">
      {error?.message}
    </small>
  );
};

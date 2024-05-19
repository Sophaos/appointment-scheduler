import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseFormProps } from "shared/types/base-form-props";
import { DEFAULT_EXPERT, Expert } from "./expert";
import { FormActions } from "shared/ui/form-actions";
import { FormInputText } from "shared/ui/form-input-text";
import { FormColorPicker } from "shared/ui/form-color-picker";
import { ExpertSchema } from "./expert-schema";

export const ExpertForm = ({ onCancel, onConfirm, data, isProcessing, onDelete }: BaseFormProps<Expert>) => {
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({
    resolver: zodResolver(ExpertSchema),
    defaultValues: data ?? DEFAULT_EXPERT,
  });

  const onSubmit = (formData: Expert) => {
    onConfirm(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-3">
          <FormInputText label="Nickname" name="nickname" control={control} />
          <FormColorPicker label="Color" name="color" control={control} />
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} handleDelete={onDelete} />
      </div>
    </form>
  );
};

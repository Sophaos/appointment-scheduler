import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BaseFormProps } from "shared/types/base-form-props";
import { DEFAULT_EXPERT, Expert } from "./expert";
import { InputText } from "primereact/inputtext";
import { FormActions } from "shared/ui/form-actions";

const expertFormSchema = z.object({
  nickname: z.string().min(2, "The nickname must be at least 2 characters.")
});


export const ExpertForm = ({ onCancel, onConfirm, data, isProcessing }: BaseFormProps<Expert>) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(expertFormSchema),
    defaultValues: data ?? DEFAULT_EXPERT,
  });

  const onSubmit = (formData: Expert) => {
    onConfirm(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-3">
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
                <InputText {...field} placeholder="John" invalid={!!errors.nickname} aria-describedby="nickname-error"/>

            )}
          />
          <small id="nickname-error" className="text-red-600">
            {errors.nickname?.message} 
          </small>
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} />
      </div>
    </form>
  );
};

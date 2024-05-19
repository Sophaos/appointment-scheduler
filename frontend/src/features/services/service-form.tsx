import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DEFAULT_SERVICE, Service } from "./service";
import { BaseFormProps } from "shared/types/base-form-props";
import { FormActions } from "shared/ui/form-actions";
import { FormInputText } from "shared/ui/form-input-text";
import { FormColorPicker } from "shared/ui/form-color-picker";
import { FormInputNumber } from "shared/ui/form-input-number";

const serviceFormSchema = z.object({
  name: z.string().min(1, "The name must be at least 1 character."),
  color: z.string().min(1, "A color must be selected."),
  duration: z.number().min(1, "The default duration is required."),
});

export const ServiceForm = ({ onCancel, onConfirm, data, isProcessing, onDelete }: BaseFormProps<Service>) => {
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({
    defaultValues: data ?? DEFAULT_SERVICE,
    resolver: zodResolver(serviceFormSchema),
  });

  const onSubmit = (formData: Service) => {
    onConfirm(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-3">
          <FormInputText label="Name" name="name" control={control} />
          <FormInputNumber label="Duration" name="duration" control={control} />
          <FormColorPicker label="Color" name="color" control={control} />
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} handleDelete={onDelete} />
      </div>
    </form>
  );
};

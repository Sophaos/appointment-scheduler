import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DEFAULT_SERVICE, Service } from "./service";
import { BaseFormProps } from "shared/types/base-form-props";
import { FormActions } from "shared/ui/form-actions";
import { InputText } from "primereact/inputtext";
import { ColorPicker } from "primereact/colorpicker";
import { InputNumber } from "primereact/inputnumber";

const serviceFormSchema = z.object({
  name: z.string().min(1, "The name must be at least 1 character."),
  color: z.string().min(1, "A color must be selected."),
  duration: z.number().min(1, "The default duration is required."),
});

export const ServiceForm = ({ onCancel, onConfirm, data, isProcessing }: BaseFormProps<Service>) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
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
          <Controller name="name" control={control} render={({ field }) => <InputText {...field} placeholder="John" invalid={!!errors.name} aria-describedby="name-error" />} />
          <small id="name-error" className="text-red-600">
            {errors.name?.message}
          </small>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <InputNumber inputId="duration" value={field.value} onValueChange={(e) => field.onChange(e.value)} showButtons buttonLayout="horizontal" step={15} min={30} suffix=" minutes" />
            )}
          />
          <small id="duration-error" className="text-red-600">
            {errors.duration?.message}
          </small>
          <Controller name="color" control={control} render={({ field }) => <ColorPicker value={field.value} onChange={(e) => field.onChange(e.value)} />} />
          <small id="color-error" className="text-red-600">
            {errors.color?.message}
          </small>
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} />
      </div>
    </form>
  );
};

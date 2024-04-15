import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BaseFormProps } from "shared/types/base-form-props";
import { DEFAULT_APPOINTMENT, Appointment } from "./appointment";
import { FormActions } from "shared/ui/form-actions";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { DURATION_OPTIONS } from "shared/utils/time-utils";

const appointmentFormSchema = z.object({
  nickname: z.string().min(2, "The nickname must be at least 2 characters."),
});

export const AppointmentForm = ({ onCancel, onConfirm, data, isProcessing }: BaseFormProps<Appointment>) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: data ?? DEFAULT_APPOINTMENT,
  });

  const onSubmit = (formData: Appointment) => {
    onConfirm(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-3">
          <Controller
            name="timeBegin"
            control={control}
            render={({ field }) => <Calendar id="calendar-24h" value={field.value} onChange={(e) => field.onChange(e.value)} showTime hourFormat="24" stepMinute={15} />}
          />
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Dropdown value={field.value} onChange={(e) => field.onChange(e.value)} optionValue="id" options={DURATION_OPTIONS} optionLabel="label" placeholder="Select a View" />
            )}
          />
          <Controller
            name="clientId"
            control={control}
            render={({ field }) => <Dropdown onChange={(e) => field.onChange(e.value)} optionValue="id" options={[]} optionLabel="label" placeholder="Select a Client" />}
          />
          <Controller
            name="serviceId"
            control={control}
            render={({ field }) => <Dropdown onChange={(e) => field.onChange(e.value)} optionValue="id" options={[]} optionLabel="label" placeholder="Select a Service" />}
          />
          <Controller
            name="expertId"
            control={control}
            render={({ field }) => <Dropdown onChange={(e) => field.onChange(e.value)} optionValue="id" options={[]} optionLabel="label" placeholder="Select an Expert" />}
          />
          <Controller name="notes" control={control} render={({ field }) => <InputTextarea {...field} onChange={(e) => field.onChange(e)} placeholder="Notes: Allergy, Specifications, etc." />} />
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} />
      </div>
    </form>
  );
};

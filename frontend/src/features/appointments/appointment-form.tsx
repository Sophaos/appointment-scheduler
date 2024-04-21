import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BaseFormProps } from "shared/types/base-form-props";
import { DEFAULT_APPOINTMENT, Appointment } from "./appointment";
import { FormActions } from "shared/ui/form-actions";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { useSelector } from "react-redux";
import { selectClientOptions } from "features/clients/client-slice";
import { selectServiceOptions } from "features/services/service-slice";
import { selectExpertOptions } from "features/experts/expert-slice";

const appointmentFormSchema = z.object({
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  expertId: z.number(),
  clientId: z.number(),
  serviceId: z.number(),
  notes: z.string(),
});

export const AppointmentForm = ({ onCancel, onConfirm, data, isProcessing }: BaseFormProps<Appointment>) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    // resolver: zodResolver(appointmentFormSchema),
    defaultValues: data ?? DEFAULT_APPOINTMENT,
  });

  const clientOptions = useSelector(selectClientOptions);
  const serviceOptions = useSelector(selectServiceOptions);
  const expertOptions = useSelector(selectExpertOptions);

  const onSubmit = (formData: Appointment) => {
    onConfirm(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-3">
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => <Calendar id="calendar-24h" value={field.value} onChange={(e) => field.onChange(e.value)} showTime hourFormat="24" stepMinute={15} />}
          />
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => <Calendar id="calendar-24h" value={field.value} onChange={(e) => field.onChange(e.value)} showTime hourFormat="24" stepMinute={15} />}
          />
          <Controller
            name="clientId"
            control={control}
            render={({ field }) => (
              <Dropdown {...field} value={field.value} onChange={(e) => field.onChange(e.value)} options={clientOptions} optionLabel="label" optionValue="id" placeholder="Select a Client" filter />
            )}
          />
          <Controller
            name="serviceId"
            control={control}
            render={({ field }) => (
              <Dropdown {...field} value={field.value} onChange={(e) => field.onChange(e.value)} options={serviceOptions} optionLabel="label" optionValue="id" placeholder="Select a Service" filter />
            )}
          />
          <Controller
            name="expertId"
            control={control}
            render={({ field }) => (
              <Dropdown {...field} value={field.value} onChange={(e) => field.onChange(e.value)} options={expertOptions} optionLabel="label" optionValue="id" placeholder="Select an Expert" filter />
            )}
          />
          <Controller name="notes" control={control} render={({ field }) => <InputTextarea {...field} onChange={(e) => field.onChange(e)} placeholder="Notes: Allergy, Specifications, etc." />} />
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} />
      </div>
    </form>
  );
};

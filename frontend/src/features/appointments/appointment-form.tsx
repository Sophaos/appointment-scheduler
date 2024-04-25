import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BaseFormProps } from "shared/types/base-form-props";
import { FormattedAppointment } from "./appointment";
import { FormActions } from "shared/ui/form-actions";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { useSelector } from "react-redux";
import { selectClients } from "features/clients/client-slice";
import { selectServices } from "features/services/service-slice";
import { selectExperts } from "features/experts/expert-slice";

const appointmentFormSchema = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
  expert: z.number(),
  client: z.number(),
  service: z.number(),
  notes: z.string(),
});

export const AppointmentForm = ({ onCancel, onConfirm, data, isProcessing, isEnabled, onDelete }: BaseFormProps<FormattedAppointment>) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    // resolver: zodResolver(appointmentFormSchema),
    defaultValues: data,
  });

  const clientOptions = useSelector(selectClients);
  const serviceOptions = useSelector(selectServices);
  const expertOptions = useSelector(selectExperts);

  const onSubmit = (formData: FormattedAppointment) => {
    onConfirm(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-3">
          <Controller
            name="start"
            control={control}
            render={({ field }) => <Calendar id="calendar-24h" value={field.value} onChange={(e) => field.onChange(e.value)} showTime hourFormat="24" stepMinute={15} />}
          />
          <Controller
            name="end"
            control={control}
            render={({ field }) => <Calendar id="calendar-24h" value={field.value} onChange={(e) => field.onChange(e.value)} showTime hourFormat="24" stepMinute={15} />}
          />
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <Dropdown {...field} value={field.value} onChange={(e) => field.onChange(e.value)} options={clientOptions} optionLabel="nickname" placeholder="Select a Client" filter />
            )}
          />
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <Dropdown {...field} value={field.value} onChange={(e) => field.onChange(e.value)} options={serviceOptions} optionLabel="name" placeholder="Select a Service" filter />
            )}
          />
          <Controller
            name="expert"
            control={control}
            render={({ field }) => (
              <Dropdown {...field} value={field.value} onChange={(e) => field.onChange(e.value)} options={expertOptions} optionLabel="nickname" placeholder="Select an Expert" filter />
            )}
          />
          <Controller name="notes" control={control} render={({ field }) => <InputTextarea {...field} onChange={(e) => field.onChange(e)} placeholder="Notes: Allergy, Specifications, etc." />} />
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} isEnabled={isEnabled} handleDelete={onDelete} />
      </div>
    </form>
  );
};

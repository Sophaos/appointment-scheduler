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
import { SelectButton } from "primereact/selectbutton";
import { EntityOption } from "shared/types/entity-option";
import { InputNumber } from "primereact/inputnumber";

const appointmentFormSchema = z.object({
  start: z.string().datetime(),
  expert: z.number(),
  client: z.number(),
  service: z.number(),
  notes: z.string(),
});

const STATUS_OPTIONS: EntityOption[] = [
  { id: "IDLE", label: "Idle" },
  { id: "ARRIVED", label: "Arrived" },
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "DONE", label: "Done" },
  { id: "NO_SHOW", label: "No-show" },
];

export const AppointmentForm = ({ onCancel, onConfirm, data, isProcessing, isEnabled, onDelete }: BaseFormProps<FormattedAppointment>) => {
  const {
    handleSubmit,
    control,
    setValue,
    trigger,
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
            render={({ field }) => (
              <div className="flex flex-col">
                <label htmlFor="start" className="text-sm font-medium">
                  Start time
                </label>
                <Calendar inputId="start" id="calendar-24h" value={field.value} onChange={(e) => field.onChange(e.value)} showTime hourFormat="24" stepMinute={15} />
              </div>
            )}
          />
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label htmlFor="duration" className="text-sm font-medium">
                  Duration
                </label>
                <InputNumber inputId="duration" value={field.value} onValueChange={(e) => field.onChange(e.value)} showButtons buttonLayout="horizontal" step={15} min={30} suffix=" minutes" />
              </div>
            )}
          />
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label htmlFor="client" className="text-sm font-medium">
                  Client
                </label>
                <Dropdown {...field} value={field.value} onChange={(e) => field.onChange(e.value)} options={clientOptions} optionLabel="nickname" filter />
              </div>
            )}
          />
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label htmlFor="service" className="text-sm font-medium">
                  Service
                </label>
                <Dropdown
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.value);
                    setValue("duration", e.value.duration);
                    trigger("duration");
                  }}
                  options={serviceOptions}
                  optionLabel="name"
                  filter
                />
              </div>
            )}
          />
          <Controller
            name="expert"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label htmlFor="expert" className="text-sm font-medium">
                  Expert
                </label>
                <Dropdown {...field} value={field.value} onChange={(e) => field.onChange(e.value)} options={expertOptions} optionLabel="nickname" filter />
              </div>
            )}
          />
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label htmlFor="notes" className="text-sm font-medium">
                  Notes
                </label>
                <InputTextarea {...field} value={field.value} onChange={(e) => field.onChange(e)} />
              </div>
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <SelectButton {...field} value={field.value} onChange={(e) => field.onChange(e)} options={STATUS_OPTIONS} optionValue="id" optionLabel="label" />
              </div>
            )}
          />
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} isEnabled={isEnabled} handleDelete={onDelete} />
      </div>
    </form>
  );
};

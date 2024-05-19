import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseFormProps } from "shared/types/base-form-props";
import { FormattedAppointment } from "./appointment";
import { FormActions } from "shared/ui/form-actions";
import { DropdownChangeEvent } from "primereact/dropdown";
import { useSelector } from "react-redux";
import { selectClients } from "features/clients/client-slice";
import { selectServices } from "features/services/service-slice";
import { selectExperts } from "features/experts/expert-slice";
import { EntityOption } from "shared/types/entity-option";
import { FormInputText } from "shared/ui/form-input-text";
import { FormSelectButton } from "shared/ui/form-select-button";
import { FormCalendar } from "shared/ui/form-calendar";
import { FormInputNumber } from "shared/ui/form-input-number";
import { FormDropdown } from "shared/ui/form-dropdown";
import { AppointmentSchema } from "./appointment-schema";

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
    formState: { isDirty },
  } = useForm({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: data,
  });

  const clientOptions = useSelector(selectClients);
  const serviceOptions = useSelector(selectServices);
  const expertOptions = useSelector(selectExperts);

  const onSubmit = (formData: FormattedAppointment) => {
    onConfirm(formData);
  };

  const handleServiceChange = (e: DropdownChangeEvent) => {
    setValue("duration", e.value.duration);
    trigger("duration");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-3">
          <FormCalendar label="Start Time" name="start" control={control} />
          <FormInputNumber label="Duration" name="duration" control={control} />
          <FormDropdown label="Client" name="client" control={control} options={clientOptions} optionLabel="nickname" />
          <FormDropdown label="Service" name="service" control={control} options={serviceOptions} optionLabel="name" additionnalChange={handleServiceChange} />
          <FormDropdown label="Expert" name="expert" control={control} options={expertOptions} optionLabel="nickname" />
          <FormInputText label="Notes" name="notes" control={control} type="area" />
          <FormSelectButton label="Status" name="status" control={control} options={STATUS_OPTIONS} />
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} isEnabled={isEnabled} handleDelete={onDelete} />
      </div>
    </form>
  );
};

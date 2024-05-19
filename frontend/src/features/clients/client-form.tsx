import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormActions } from "shared/ui/form-actions";
import { BaseFormProps } from "shared/types/base-form-props";
import { Client, DEFAULT_CLIENT } from "./client";
import { FormInputText } from "shared/ui/form-input-text";
import { ClientSchema } from "./client-schema";

export const ClientForm = ({ onCancel, onConfirm, data, isProcessing, onDelete }: BaseFormProps<Client>) => {
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({
    defaultValues: data ?? DEFAULT_CLIENT,
    resolver: zodResolver(ClientSchema),
  });

  const onSubmit = (form: Client) => {
    onConfirm(form);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-3">
          <FormInputText label="Nickname" name="nickname" control={control} />
          <FormInputText label="First Name" name="firstName" control={control} />
          <FormInputText label="Last Name" name="lastName" control={control} />
          <FormInputText label="Phone Number" name="phoneNumber" control={control} mask="(999) 999-9999" type="mask" />
          <FormInputText label="Email" name="email" control={control} />
          <FormInputText label="Note" name="note" control={control} type="area" />
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} handleDelete={onDelete} />
      </div>
    </form>
  );
};

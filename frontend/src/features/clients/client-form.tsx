import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { FormActions } from "shared/ui/form-actions";
import { BaseFormProps } from "shared/types/base-form-props";
import { Client, DEFAULT_CLIENT } from "./client";
import { FormInputText } from "shared/ui/form-input-text";

const clientFormSchema = z
  .object({
    nickname: z.string().min(2, "The nickname must be at least 2 characters.").optional().or(z.literal("")),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().min(1, "The phone number is required.").optional().or(z.literal("")),
    note: z.string().optional(),
    email: z.string().optional(),
  })
  .partial()
  .refine((data) => {
    if (data.nickname === "" && data.phoneNumber === "") {
      toast.warn("The nickname or phone number is required.");
      return false;
    }
    return true;
  });

export const ClientForm = ({ onCancel, onConfirm, data, isProcessing, onDelete }: BaseFormProps<Client>) => {
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({
    defaultValues: data ?? DEFAULT_CLIENT,
    resolver: zodResolver(clientFormSchema),
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

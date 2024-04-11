import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FormActions } from "shared/ui/form-actions";
import { BaseFormProps } from "shared/types/base-form-props";
import { Client, DEFAULT_CLIENT } from "./client";
        

const clientFormSchema = z
  .object({
    nickname: z.string().min(2, "The nickname must be at least 2 characters.").optional().or(z.literal("")),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().min(1, "The phone number is required.").optional().or(z.literal("")),
    notes: z.string().optional(),
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

export const ClientForm = ({ onCancel, onConfirm, data, isProcessing }: BaseFormProps<Client>) => {
  const {
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: data ?? DEFAULT_CLIENT,
    resolver: zodResolver(clientFormSchema),
  });

  const onSubmit = (form: Client) => {
      onConfirm(form);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full overflow-y-hidden">
      <div className="flex flex-col justify-between h-full overflow-y-hidden">
        <div className="flex flex-col space-y-3">
          <Controller
            name="nickname"
            control={control}
            render={({ field }) =>
              <>
                <InputText {...field} placeholder="John" invalid={!!errors.nickname} aria-describedby="nickname-error" />
                <small id="nickname-error">
                    {errors.nickname?.message}
                </small>
              </>
            }
          />
          <Controller
            name="firstName"
            control={control}
            render={({ field }) =>
              <>
                <InputText {...field} placeholder="John" invalid={!!errors.firstName} aria-describedby="firstName-error"/>
                <small id="firstName-error">
                    {errors.firstName?.message} 
                </small>
              </>
            }
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) =>
              <>
                <InputText {...field} placeholder="Smith" invalid={!!errors.lastName} aria-describedby="lastName-error"/>
                <small id="lastName-error">
                    {errors.lastName?.message}
                </small>
              </>
            }
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <>
                <InputMask {...field} id="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" aria-describedby="phoneNumber-error"/>
                <small id="phoneNumber-error">
                  {errors.phoneNumber?.message}
                </small>
              </>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) =>
              <>
                <InputText {...field} placeholder="example@example.com" invalid={!!errors.email} />
                <small id="username-error">
                    {errors.email?.message}
                </small>
              </>
            }
          />
          <Controller name="notes" control={control} render={({ field }) =>
              <InputTextarea {...field} placeholder="Allergy, Specifications, etc." />
          } />
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} />
      </div>
    </form>
  );
};

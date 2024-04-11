import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useState } from "react";
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { FormActions } from "shared/ui/form-actions";
import { BaseFormProps } from "shared/types/base-form-props";
import { Client } from "./client";
        

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
    defaultValues: data,
    resolver: zodResolver(clientFormSchema),
  });

  const onSubmit = (form: Client) => {
      onConfirm(form);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-100">
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="d-flex flex-column">
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => <InputText {...field} placeholder="John" error={!!errors.nickname} helperText={errors.nickname?.message}></InputText>}
          />
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => <InputText {...field} placeholder="John" error={!!errors.firstName} helperText={errors.firstName?.message} />}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <InputText {...field} placeholder="Smith" error={!!errors.lastName} helperText={errors.lastName?.message} />}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <InputMask {...field} id="phone" mask="(999) 999-9999" placeholder="(999) 999-9999"></InputMask>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => <InputText {...field} placeholder="example@example.com" error={!!errors.email} helperText={errors.email?.message} />}
          />
          <Controller name="notes" control={control} render={({ field }) => <InputTextarea {...field} label="Notes" fullWidth margin="normal" multiline placeholder="Allergy, Specifications, etc." />} />
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!form?.id} isProcessing={isProcessing} />
      </div>
    </form>
  );
};

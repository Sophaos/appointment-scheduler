import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DEFAULT_SERVICE, Service } from "./service";
import { BaseFormProps } from "shared/types/base-form-props";
import { FormActions } from "shared/ui/form-actions";

const serviceFormSchema = z.object({
  name: z.string().min(1, "The name must be at least 1 character."),
  color: z.string().min(1, "A color must be selected."),
  duration: z.number().min(1, "The default duration is required."),
});

const durationOptions = [
  { id: 15, label: "15 minutes" },
  { id: 30, label: "30 minutes" },
  { id: 45, label: "45 minutes" },
  { id: 60, label: "60 minutes" },
  { id: 75, label: "75 minutes" },
  { id: 90, label: "90 minutes" },
];

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
    <form onSubmit={handleSubmit(onSubmit)} className="h-100">
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="d-flex flex-column">
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} label="Name" fullWidth margin="normal" placeholder="Enter a service" error={!!errors.name} helperText={errors?.name?.message} />}
          />
          <FormControl fullWidth margin="normal" error={!!errors.duration}>
            <InputLabel id="defaultDuration">Default Duration</InputLabel>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Select {...field} value={field.value} label="Default Duration" labelId="defaultDuration" id="defaultDuration" fullWidth>
                  {durationOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      <Typography>{option.label}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.color && `${errors?.color?.message}`}</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!errors.color}>
            <InputLabel id="color">Identifying Color</InputLabel>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Identifying Color" labelId="color" id="color" fullWidth>
                  {blackContrastColors.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      <Box sx={{ backgroundColor: option.id, padding: "2px" }}>
                        <Typography sx={{ color: "black" }}>{option.label}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.color && `${errors?.color?.message}`}</FormHelperText>
          </FormControl>
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!data?.id} isProcessing={isProcessing} />
      </div>
    </form>
  );
};

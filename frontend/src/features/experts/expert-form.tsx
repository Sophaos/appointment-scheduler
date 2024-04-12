import { Box, Chip, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { whiteContrastColors } from "../service/services-colors";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BaseFormProps } from "shared/types/base-form-props";
import { Expert } from "./expert";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const technicianFormSchema = z.object({
  nickname: z.string().min(2, "The nickname must be at least 2 characters."),
  serviceIdList: z.number().array().nonempty("There must be at least 1 service."),
  nailsType: z.string().min(1, "A nail type must be selected."),
  color: z.string().min(1, "A color must be selected."),
});

const nailsOptions = [
  { id: "FAKE_NAILS", label: "Fake Nails" },
  { id: "REAL_NAILS", label: "Real Nails" },
];

export const TechnicianForm = ({ onCancel, onConfirm, data, isProcessing }: BaseFormProps<Expert>) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(technicianFormSchema),
    defaultValues: data,
  });

  const onSubmit = (dataForm: Expert) => {
    onConfirm(dataForm);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-100">
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="d-flex flex-column">
          <Controller
            name="nickname"
            control={control}
            render={({ field }) => (
              <TextField {...field} required label="Nickname" fullWidth margin="normal" placeholder="John Smith" error={!!errors.nickname} helperText={errors.nickname && errors.nickname.message} />
            )}
          />
          <FormControl fullWidth margin="normal" required error={!!errors.serviceIdList}>
            <InputLabel id="serviceIdList">Service(s)</InputLabel>
            <Controller
              name="serviceIdList"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="serviceIdList"
                  id="serviceIdList"
                  name="serviceIdList"
                  label="Service(s)"
                  multiple
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  fullWidth
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => {
                        const selectedOption = optionsServices.find((option) => option.id === value);
                        return selectedOption ? (
                          <Chip
                            key={value}
                            label={selectedOption.label}
                            sx={
                              selectedOption.color
                                ? {
                                    backgroundColor: selectedOption.color,
                                    color: "black",
                                    "& .MuiChip-deleteIcon": {
                                      color: "black",
                                    },
                                  }
                                : {}
                            }
                            onMouseDown={(event) => {
                              event.stopPropagation();
                            }}
                          />
                        ) : null;
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {optionsServices.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      <Box sx={{ backgroundColor: option.color, padding: "2px" }}>
                        <Typography sx={{ color: "black" }}>{option.label}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <FormHelperText>{errors.serviceIdList && errors.serviceIdList.message}</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!errors.nailsType}>
            <Controller
              name="nailsType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  aria-label="Nails option"
                  id="nailsType"
                  row // If you want the radio buttons to be displayed horizontally
                >
                  {nailsOptions.map((option) => (
                    <FormControlLabel
                      key={option.id}
                      value={option.id} // Converting to string since radio buttons handle strings as values
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            <FormHelperText>{errors.nailsType && `${errors?.nailsType?.message}`}</FormHelperText>
          </FormControl>
          <FormControl fullWidth required margin="normal" error={!!errors.color}>
            <InputLabel id="color">Identifying Color</InputLabel>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Identifying Color" labelId="color" id="color" name="color" fullWidth>
                  {whiteContrastColors.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      <Box sx={{ backgroundColor: option.id, padding: "2px" }}>
                        <Typography sx={{ color: "white" }}>{option.label}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.color && errors.color.message}</FormHelperText>
          </FormControl>
        </div>
        <FormActions onCancel={onCancel} isDirty={isDirty} hasId={!!form?.id} isProcessing={isProcessing} />
      </div>
    </form>
  );
};

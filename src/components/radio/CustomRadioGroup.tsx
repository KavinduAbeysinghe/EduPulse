import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

interface CustomRadioGroupProps {
  options: Array<any>;
  control: any;
  error: boolean;
  helperText: any;
  id: string;
  label: string;
}

export const CustomRadioGroup = ({
  options,
  control,
  error,
  helperText,
  id,
  label,
}: CustomRadioGroupProps) => {
  const [value, setValue] = useState<any>("");
  return (
    <FormControl
      error={error}
      //   sx={{ px: 3, pb: 3, pt: 1 }}
      variant="standard"
      fullWidth
    >
      <FormLabel id={`radio-label-for-${id}`}>{label}</FormLabel>
      <Controller
        render={({ field: { onChange } }) => (
          <RadioGroup
            // row
            aria-labelledby={`radio-label-for-${id}`}
            value={value}
            onChange={(e) => {
              onChange(e?.target?.value);
              setValue(e?.target?.value);
            }}
            defaultValue={""}
          >
            {options?.map((opt: any) => (
              <FormControlLabel
                key={opt?.value}
                value={opt?.value}
                control={<Radio />}
                label={opt?.label}
              />
            ))}
          </RadioGroup>
        )}
        name={id}
        control={control}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

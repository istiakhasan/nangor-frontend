"use client";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  Box,
  Chip,
} from "@mui/material";
import { getErrorMessageByPropertyName } from "../../utils/schema-validator";

const NgSelect = ({
  name,
  options = [],
  placeholder = "Select",
  label,
  value,
  defaultValue,
  handleChange,
  multiple = false,
  disabled = false,
  cl,
  ...rest
}) => {
  const { control, formState: { errors } } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <FormControl fullWidth variant="outlined" error={!!errorMessage} size="small">
      {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue || (multiple ? [] : "")}
        render={({ field: { onChange, value: fieldValue } }) => (
          <Select
            labelId={`${name}-label`}
            multiple={multiple}
            value={fieldValue}
            onChange={(event) => {
              const selected = event.target.value;
              onChange(selected);
              if (handleChange) handleChange(selected);
            }}
            disabled={disabled}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) =>
              multiple ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((val) => {
                    const opt = options.find((o) => o.value === val);
                    return <Chip key={val} label={opt?.label || val} />;
                  })}
                </Box>
              ) : options.find((o) => o.value === selected)?.label || selected
            }
            {...rest}
            style={{
              background: cl ? "#F7F9FB" : "white",
              height: "40px",
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default NgSelect;

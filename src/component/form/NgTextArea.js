"use client";
import { getErrorMessageByPropertyName } from "../../utils/schema-validator";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const NgTextArea = ({
  name,
  label,
  rows = 4,
  value,
  placeholder,
  required,
  disabled = false,
  cl,
  ...rest
}) => {
  const { control, formState: { errors } } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="flex flex-col w-full">
      <Controller
        name={name}
        control={control}
        defaultValue={value || ""}
        render={({ field }) => (
          <TextField
            {...field}
            label={label ? `${label}${required ? " *" : ""}` : undefined}
            placeholder={placeholder}
            disabled={disabled}
            multiline
            rows={rows}
            fullWidth
            error={!!errorMessage}
            helperText={errorMessage}
            variant="outlined"
            size="small"
            InputProps={{
              style: {
                background: errorMessage
                  ? "#FADADA"
                  : cl
                  ? "#F7F9FB"
                  : "white",
                fontSize: "14px",
                fontWeight: 400,
                padding: "10px 12px",
                borderRadius: "4px",
              },
            }}
            {...rest}
          />
        )}
      />
    </div>
  );
};

export default NgTextArea;

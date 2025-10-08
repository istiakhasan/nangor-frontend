"use client";
import { getErrorMessageByPropertyName } from "../../utils/schema-validator";
import { TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const NGInput = ({
  name,
  type = "text",
  value,
  id,
  placeholder,
  label,
  required,
  disabled = false,
  cl,
  trigger,
  ...rest
}) => {
  const { control, formState: { errors } } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value || ""}
      render={({ field }) => (
        <TextField
          {...field}
          id={id || name}
          type={type}
          label={label ? `${label}${required ? " *" : ""}` : undefined}
          placeholder={placeholder}
          size="small"
          disabled={disabled}
          error={!!errorMessage}
          helperText={errorMessage}
          variant="outlined"
          fullWidth
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
              height: "40px",
            },
          }}
          onChange={(e) => {
            field.onChange(e);
            if (trigger) trigger(name);
          }}
          {...rest}
        />
      )}
    />
  );
};

export default NGInput;

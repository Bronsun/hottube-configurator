import React, { ChangeEvent, useState, useCallback } from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

export interface CheckboxItem {
  label: string;
  value: string;
  required?: boolean;
}

export interface CheckboxListProps {
  title?: string;
  items: CheckboxItem[];
  onChange?: (selectedValues: string[]) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  title,
  items,
  onChange,
  onValidationChange,
}) => {
  const initialState = items.reduce<Record<string, boolean>>((acc, item) => {
    acc[item.value] = false;
    return acc;
  }, {});

  const [state, setState] = useState<Record<string, boolean>>(initialState);
  const [error, setError] = useState<string>("");

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      const newState = { ...state, [name]: checked };
      setState(newState);

      const allRequiredChecked = items
        .filter((item) => item.required)
        .every((item) => newState[item.value]);

      setError(allRequiredChecked ? "" : "Please select all required options.");

      if (onValidationChange) {
        onValidationChange(allRequiredChecked);
      }

      if (onChange) {
        const selectedValues = Object.entries(newState)
          .filter(([, value]) => value)
          .map(([key]) => key);
        onChange(selectedValues);
      }
    },
    [state, items, onChange, onValidationChange]
  );

  return (
    <FormControl component="fieldset" error={Boolean(error)}>
      {title && <FormLabel component="legend">{title}</FormLabel>}
      <FormGroup>
        {items.map((item) => (
          <FormControlLabel
            key={item.value}
            control={
              <Checkbox
                name={item.value}
                checked={state[item.value] || false}
                onChange={handleChange}
                color="primary"
              />
            }
            label={
              <>
                {item.label}
                {item.required && " *"}
              </>
            }
          />
        ))}
      </FormGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default CheckboxList;

import { OutlinedInput, FormControl, InputLabel, styled } from "@mui/material";
import { colors } from "../utils/ColorThemes";
import {Dispatch, FC, SetStateAction} from "react";

const PlaceholderLabel = styled(InputLabel)`
  color: white;
  &.Mui-focused {
    color: ${colors.youtubeRed};
  }
`;

const InputField = styled(OutlinedInput)`
  color: white;
  & .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
  :hover {
    & .MuiOutlinedInput-notchedOutline {
      border-color: white;
    }
  }

  &.Mui-focused {
    & .MuiOutlinedInput-notchedOutline {
      border-color: ${colors.youtubeRed};
    }
  }
`;

interface FormFieldProps {
    label?: string,
    isPassword?: boolean,
    handleValue: Dispatch<SetStateAction<string>>,
    value?: string,
    placeholder?: string,
    startAdornment?: any
}

export const FormField: FC<FormFieldProps> = (props) => {
  const { label, isPassword, handleValue, value, placeholder, startAdornment } = props;

  return (
    <FormControl>
      {label && <PlaceholderLabel>{label}</PlaceholderLabel>}
      <InputField
        label={label}
        value={value}
        type={isPassword ? "password" : "text"}
        onChange={(e) => handleValue(e.target.value)}
        placeholder={placeholder ? placeholder : ""}
        startAdornment={startAdornment}
      />
    </FormControl>
  );
};

import { OutlinedInput, FormControl, InputLabel, styled } from "@mui/material";
import { colors } from "../../utils/ColorThemes";

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

export const FormField = (props) => {
  const { label, isPassword, handleValue, value } = props;

  return (
    <FormControl>
      <PlaceholderLabel>{label}</PlaceholderLabel>
      <InputField
        label={label}
        value={value}
        type={isPassword ? "password" : "text"}
        onChange={(e) => handleValue(e.target.value)}
      />
    </FormControl>
  );
};

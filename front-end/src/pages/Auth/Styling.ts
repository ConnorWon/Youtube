import { Button, Stack, Typography, styled } from "@mui/material";
import { colors } from "../../utils/ColorThemes";

export const AuthContainer = styled(Stack)`
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
`;

export const AuthButton = styled(Button)`
  background-color: ${colors.youtubeRed};
  :hover {
    background-color: ${colors.youtubeRed};
  }
  &:disabled {
    opacity: 0.5;
    color: white;
    background-color: ${colors.youtubeRed};
  }
`;

export const AuthTitle = styled(Typography)`
  color: white;
`;

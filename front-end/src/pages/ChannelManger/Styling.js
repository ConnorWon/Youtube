import { colors } from "../../utils/ColorThemes";
import { Link } from "react-router-dom";
import { Stack, styled, Typography, Button } from "@mui/material";

export const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #42a5f5;
  width: max-content;
  gap: 8px;
`;

export const NavContainer = styled(Stack)`
  height: 100vh;
  padding: 32px;
  box-sizing: border-box;
  border-right: solid 1px ${colors.borderColor};
`;

export const MainContainer = styled(Stack)`
  width: 100%;
  align-items: start;
  gap: 16px;
`;

export const HeaderText = styled(Typography)`
  font-size: 48px;
  color: white;
`;

export const FieldLabel = styled(Typography)`
  font-size: 20px;
  color: white;
`;

export const FieldsContainer = styled(Stack)`
  padding: 16px;
  gap: 16px;
  box-sizing: border-box;
  width: 100%;
  max-width: 876px;
`;

export const ButtonsContainer = styled(Stack)`
  padding: 0 16px 0 16px;
  gap: 24px;
  box-sizing: border-box;
  flex-direction: row;
`;

export const HeaderContainer = styled(Stack)`
  border-bottom: solid 1px ${colors.borderColor};
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`;

export const AuthButton = styled(Button)`
  color: white;
  background-color: ${colors.youtubeRed};
  padding: 6px 20px;
  :hover {
    background-color: ${colors.youtubeRed};
  }
  &:disabled {
    opacity: 0.5;
    color: white;
    background-color: ${colors.youtubeRed};
  }
`;

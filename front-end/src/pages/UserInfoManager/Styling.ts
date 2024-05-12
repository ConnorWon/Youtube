import { colors } from "../../utils/ColorThemes";
import Grid from "@mui/material/Unstable_Grid2";
import { Stack, Typography, Button, styled } from "@mui/material";
import {ComponentWithProps} from "../../types/types";

export const MainContainer = styled(Stack)`
  align-items: center;
`;

export const HeaderContainer = styled(Stack)`
  flex-direction: start;
`;

export const HeaderText = styled(Typography)`
  font-size: 30px;
  color: white;
  font-weight: 500;
`;

export const GridItem = styled(Grid)<ComponentWithProps>`
  border-right: ${({ hasBorder }) =>
    hasBorder ? "0px" : "1px solid rgba(255, 255, 255, 0.2)"};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: ${({ isCreateBtn }) =>
      isCreateBtn ? "" : "rgba(255, 255, 255, 0.2)"};
  }
`;

export const CreateButton = styled(Button)`
  border-radius: 18px;
  background-color: ${colors.btnColorGrey};
  min-width: max-content;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ChannelNameText = styled(Typography)`
  color: white;
  font-size: 14px;
`;

export const ChannelSubText = styled(Typography)`
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
`;

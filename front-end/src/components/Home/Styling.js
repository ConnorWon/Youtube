import { TabPanel } from "@mui/lab";
import { Box, Tab, styled } from "@mui/material";
import { colors } from "../ColorThemes";

export const TabContainer = styled(Box)`
  background-color: ${colors.bgColorDark};
  z-index: 1;
  border-bottom: 1px solid #393939;
  padding-right: 12px;
  position: fixed;
  width: -webkit-fill-available;
  display: flex;
`;

export const HomeTab = styled(Tab)`
  color: ${colors.textGrey};
  margin: 0 10px 0 10px;
  padding: 12px 25px;
  font-family: Roboto;
  font-weight: 500;
`;

export const HomeTabPanelContainer = styled(Box)`
  padding-top: 24px;
  background-color: ${colors.bgColorDark};
  position: relative;
  top: 49px;
`;

export const HomeTabPanel = styled(TabPanel)`
  background-color: ${colors.bgColorDark};
  color: white;
  padding: 0px;
`;

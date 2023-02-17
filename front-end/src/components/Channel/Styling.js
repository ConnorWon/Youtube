import {
  Box,
  styled,
  Stack,
  Avatar,
  Typography,
  Button,
  Tab,
} from "@mui/material";
import { TabPanel } from "@mui/lab";
import { colors } from "../ColorThemes";

export const ChannelHeaderExternal = styled("div")`
  display: flex;
  position: relative;
`;

export const ChannelHeaderMiddle = styled(Box)`
  background-color: ${colors.bgColorDark};
  padding: 16px 107px 4px;
  width: 100%;
  height: 80px;

  @media only screen and (max-width: 686px) {
    padding-right: calc((100% - 428px) / 2);
    padding-left: calc((100% - 428px) / 2);
  }

  @media only screen and (max-width: 972px) {
    padding-right: calc((100% - 642px) / 2);
    padding-left: calc((100% - 642px) / 2);
  }

  @media only screen and (max-width: 1186px) {
    padding-right: calc((100% - 856px) / 2);
    padding-left: calc((100% - 856px) / 2);
  }

  @media only screen and (max-width: 1400px) {
    padding-right: calc((100% - 1070px) / 2);
    padding-left: calc((100% - 1070px) / 2);
  }

  @media only screen and (max-width: 1568px) {
    padding-right: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 1070px) / 2)" : "calc((100% - 1284px) / 2)"};
    padding-left: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 1070px) / 2)" : "calc((100% - 1284px) / 2)"};
  }

  @media only screen and (min-width: 1569px) {
    padding-right: calc((100% - 1284px) / 2);
    padding-left: calc((100% - 1284px) / 2);
  }
`;

export const ChannelHeaderInner = styled(Stack)`
  display: flex;
  position: relative;
  height: 100%;
  max-width: 1284px;
  align-items: center;
`;

export const ChannelIcon = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin: 0 24px 0 0;
  flex: none;
`;

export const InnerContainer = styled(Stack)`
  flex-wrap: wrap;
  flex: 1;
  flex-basis: 1e-9px;
  align-items: center;
`;

export const InfoContainer = styled(Stack)`
  min-width: 150px;
  flex: 1;
  flex-basis: 1e-9px;
  max-height: 9rem;
  overflow: hidden;
`;

export const NameContainer = styled(Stack)`
  align-items: center;
`;

export const Name = styled(Typography)`
  color: white;
  font-family: Roboto;
  font-weight: 400;
  line-height: 1;

  @media only screen and (min-width: 686px) {
    font-size: 23px;
  }
`;

export const Verified = styled(Box)`
  width: 20px;
  align-items: center;
  display: flex;
  margin: 0 0 0 8px;
`;

export const Tag = styled(Typography)`
  color: ${colors.textGrey};
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
`;

export const BtnContainer = styled(Stack)`
  display: flex;
  flex-direction: row;
`;

export const JoinSubBtn = styled(Button)`
  border-radius: 20px;
  background-color: white;
  color: black;
  text-transform: none;
  font-weight: 500;
  margin-left: 8px;
  :hover {
    background-color: #dad9d9;
  }
`;

export const TabContainer = styled(Box)`
  background-color: ${colors.bgColorDark};
  position: sticky;
  top: 56px;
  z-index: 1;
`;

export const ChannelTab = styled(Tab)`
  color: ${colors.textGrey};
  margin: 0 10px 0 10px;
  padding: 12px 25px;
  font-family: Roboto;
  font-weight: 500;
`;

export const ChannelTabPanel = styled(Box)`
  background-color: ${colors.bgColorDark};
  color: white;
  padding-top: 16px;
  padding-bottom: 16px;
  min-height: calc(100vh - 56px - 48px - 16px);

  @media only screen and (min-width: 0px) {
    padding-right: calc((100% - 428px) / 2);
    padding-left: calc((100% - 428px) / 2);
  }

  @media only screen and (min-width: 686px) {
    padding-right: calc((100% - 642px) / 2);
    padding-left: calc((100% - 642px) / 2);
  }

  @media only screen and (min-width: 972px) {
    padding-right: calc((100% - 856px) / 2);
    padding-left: calc((100% - 856px) / 2);
  }

  @media only screen and (min-width: 1354px) {
    padding-right: calc((100% - 1070px) / 2);
    padding-left: calc((100% - 1070px) / 2);
  }

  @media only screen and (min-width: 1568px) {
    padding-right: calc((100% - 1284px) / 2);
    padding-left: calc((100% - 1284px) / 2);
  }
`;

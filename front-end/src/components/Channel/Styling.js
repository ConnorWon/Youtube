import {
  Box,
  styled,
  Stack,
  Avatar,
  Typography,
  Button,
  Tab,
} from "@mui/material";
import { colors } from "../ColorThemes";

// ChannelHeader Styling

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

  @media only screen and (max-width: 972px) and (min-width: 687px) {
    padding-right: calc((100% - 642px) / 2);
    padding-left: calc((100% - 642px) / 2);
  }

  @media only screen and (max-width: 1186px) and (min-width: 973px) {
    padding-right: calc((100% - 856px) / 2);
    padding-left: calc((100% - 856px) / 2);
  }

  @media only screen and (max-width: 1400px) and (min-width: 1187px) {
    padding-right: calc((100% - 1070px) / 2);
    padding-left: calc((100% - 1070px) / 2);
  }

  @media only screen and (max-width: 1568px) and (min-width: 1401px) {
    padding-right: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 1070px) / 2)" : "calc((100% - 1284px) / 2)"};
    padding-left: ${({ sideExpand }) =>
      sideExpand ? "calc((100% - 1070px) / 2)" : "calc((100% - 1284px) / 2)"};
  }

  @media only screen and (min-width: 1569px) {
    padding-right: calc((100% - 1284px) / 2);
    padding-left: calc((100% - 1284px) / 2);
  }

  @media (max-width: 701px) {
    height: auto;
    padding: 0;
  }
`;

export const ChannelHeaderInner = styled(Stack)`
  display: flex;
  position: relative;
  height: 100%;
  max-width: 1284px;
  align-items: center;

  @media (max-width: 701px) {
    width: 428px;
    margin: auto;
    padding: 24px 0 0;
    box-sizing: border-box;
  }
`;

export const ChannelIcon = styled(Avatar)`
  width: 80px;
  height: 80px;
  margin: 0 24px 0 0;
  flex: none;

  @media (max-width: 701px) {
    display: none;
  }
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
  line-height: 30px;
  font-size: 24px;

  @media only screen and (max-width: 701px) {
    font-size: 18px;
    line-height: 26px;
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

// ChannelNavBar Styling

export const TabContainer = styled(Box)`
  background-color: ${colors.bgColorDark};
  position: sticky;
  top: 56px;
  z-index: 1;

  @media only screen and (max-width: 686px) {
    padding-right: calc((100% - 428px) / 2);
    padding-left: calc((100% - 428px) / 2);
  }

  @media only screen and (max-width: 972px) and (min-width: 687px) {
    padding-right: calc((100% - 642px) / 2);
    padding-left: calc((100% - 642px) / 2);
  }

  @media only screen and (max-width: 1186px) and (min-width: 973px) {
    padding-right: calc((100% - 856px) / 2);
    padding-left: calc((100% - 856px) / 2);
  }

  @media only screen and (max-width: 1400px) and (min-width: 1187px) {
    padding-right: calc((100% - 1070px) / 2);
    padding-left: calc((100% - 1070px) / 2);
  }

  @media only screen and (max-width: 1568px) and (min-width: 1401px) {
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
  padding-bottom: 16px;
  min-height: calc(100vh - 56px - 48px - 16px);
`;

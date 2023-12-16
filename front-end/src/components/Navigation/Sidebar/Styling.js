import {
  Drawer,
  Button,
  Stack,
  styled,
  Box,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import { colors } from "../../../utils/ColorThemes";

// SidebarExpand Styling

export const SidebarDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: transparent;
    border-right: transparent;
  }
  visibility: ${({ sideExpand, modalSideExpand }) =>
    sideExpand || modalSideExpand ? "visible" : "hidden"};
`;

export const HeaderSpacer = styled(Box)`
  margin-top: 56px;
`;

export const SidebarContainer = styled(Stack)`
  flex: 1;
  flex-basis: 1e-9px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.bgColorDark};
  ::-webkit-scrollbar {
    width: 0.6vw;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #717171;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 1vw;
  }

  ::-webkit-scrollbar-track {
    background-color: #201f1f;
  }
`;

export const InnerSidebarContainer = styled(Stack)`
  overflow: hidden;
  flex: 1;
  flex-basis: 1e-9px;
  overflow-y: auto;
  width: 240px;
  :hover {
    ::-webkit-scrollbar-thumb {
      background-color: rgba(113, 113, 113);
      border-radius: 1vw;
    }
  }

  ::-webkit-scrollbar {
    width: 0.6vw;
  }

  ::-webkit-scrollbar-track {
    background-color: #201f1f;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

export const OuterButtonContainer = styled(Stack)`
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

export const SecondaryButtonsContainer = styled(Stack)`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 12px;
  padding-top: 12px;
`;

export const NotLoggedSubContainer = styled(Stack)`
  display: inline-block;
  padding: 16px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

export const NotLoggedMsg = styled(Typography)`
  font-weight: 400;
  font-family: Roboto;
  font-size: 14px;
  color: ${colors.textWhite};
`;

export const SignInContainer = styled("div")`
  margin-top: 12px;
`;

export const SignInButton = styled(Button)`
  border: 1px solid #717171;
  color: #3ea6ff;
  border-radius: 18px;
  text-transform: inherit;
  font-weight: 500;
`;

export const SectionLabel = styled(Typography)`
  padding: 6px 12px 4px 14px;
  font-size: 1rem;
  line-height: 1.625rem;
  font-weight: 400;
  color: ${colors.textWhite};
  text-transform: none;
`;

// SidebarButton Styling

export const OuterButtonShell = styled(Stack)`
  border-raidus: 10px;
  width: calc(100%-12px);
  display: block;
  postion: relative;
`;

export const ButtonAnchor = styled(Link)`
  min-height: 40px;
  cursor: pointer;
  outline: 0;
  box-sizing: border-box;
  color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
`;

export const ButtonHighlight = styled(Paper)`
  padding: 0px 12px;
  white-space: nowrap;
  height: 40px;
  width: 180px;
  display: flex;
  flex-direciton: row;
  align-items: center;
  min-height: 40px;
  background-color: ${colors.bgColorDark};
  border-radius: 10px;

  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const IconHolder = styled(Box)`
  width: 24px;
  height: 24px;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  margin-right: 24px;
  color: white;
`;

export const SideBarLabel = styled(Typography)`
  font-weight: 400;
  font-family: Roboto;
  font-size: 14px;
  line-height: 24px;
  color: ${colors.textWhite};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// SidebarMini Styling

export const SideMenu = styled(Stack)`
  height: 100%;
  width: 72px;
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 0;
  background-color: ${colors.bgColorDark};
  overflow-x: hidden;
  margin-top: 56px;
  visibility: ${({ sideExpand, inVideoPage }) =>
    sideExpand || inVideoPage ? "hidden" : "visible"};

  @media only screen and (max-width: 791px) {
    visibility: hidden;
  }

  @media (max-width: 1313px) {
    visibility: visible;
  }
`;

export const SideMiniButton = styled(Button)`
  color: white;
  text-transform: none;
  height: 74px;
  border-radius: 0px;
  :hover {
    box-shadow: inset 0 0 0 10em rgba(255, 255, 255, 0.1);
  },
`;

export const MiniIconLabel = styled(Typography)`
  font-size: 10px;
  margin-top: 5px;
`;

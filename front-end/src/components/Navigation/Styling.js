import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Avatar,
  createTheme,
  ThemeProvider,
  Tooltip,
  styled,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { colors } from "../ColorThemes";

export const NaviBar = styled(AppBar)`
  position: static;
  background-color: ${colors.bgColorDark};
  height: 56px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const YTButton = styled(Button)`
  color: inherit;
  size: large;
  min-width: 115.52px;
  :hover {
    background-color: transparent;
  }
`;

// export const DividerLeft = styled(Stack)`
//   width: ${({ width, searchstate }) =>
//     searchstate === "true" ? width : `xs: 95px`};
//   min-width: 95px;
//   max-width: {
//     xs: 999px;
//     sm: 95px;
//     lg: 999px;
//   }
//   flexgrow: ${({ searchstate }) => (searchstate === "true" ? 0 : 1)};
// `;

// SideBar Expand CSS

export const HeaderSpacer = styled(Box)`
  margin-top: 56px;
`;

export const SidebarContainer = styled(Stack)`
  flex: 1;
  flex-basis: 1e-9px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.bgColorDark};
`;

export const InnerSidebarContainer = styled(Stack)`
  overflow: hidden;
  flex: 1;
  flex-basis: 1e-9px;
  overflow-y: auto;
  width: 240px;
`;

export const OuterButtonShell = styled(Stack)`
  border-raidus: 10px;
  width: calc(100%-12px);
  display: block;
  postion: relative;
`;

export const ButtonAnchor = styled("a")`
  min-height: 40px;
  cursor: pointer;
  outline: 0;
  box-sizing: border-box;
  color: #f1f1f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 12px;
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
  font-weight: 500;
  font-family: Roboto;
  font-size: 14px;
  line-height: 24px;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  font-weight: 500;
  font-family: Roboto;
  font-size: 14px;
  color: #f1f1f1;
`;

export const SignInContainer = styled("div")`
  margin-top: 12px;
`;

export const SignInButton = styled(Button)`
  border: 1px solid #717171;
  color: #3ea6ff;
  border-radius: 18px;
  text-transform: inherit;
  font-weight: 600;
`;

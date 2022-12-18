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

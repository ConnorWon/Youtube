// noinspection CssUnknownUnit

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  InputAdornment,
  Stack,
  Avatar,
  styled,
  FormControl,
  Input,
  Menu,
  MenuItem,
  Typography,
  Link, Dialog, DialogContent,
} from "@mui/material";
import { colors } from "../../../utils/ColorThemes";
import {ComponentWithProps} from "../../../types/types";

export const NaviBar = styled(AppBar)`
  position: fixed;
  background-color: ${colors.bgColorDark};
  height: 56px;
  display: flex;
  justify-content: center;
  width: 100%;
  box-shadow: none;
  z-index: 1201;
`;

export const NavToolBar = styled(Toolbar)`
  padding: 0 16px;
  @media (min-width: 0) {
    max-height: 56px;
    min-height: 56px;
  }

  @media (max-width: 656px) {
    padding: 0 8px;
  }
  justify-content: space-between;
`;

export const LeftSideContainer = styled(Stack)`
  align-items: center;
`;

export const CloseMiniSearchBtn = styled(IconButton)<ComponentWithProps>`
  color: inherit;
  margin-right: 8px;
  width: 40px;
  height: 40px;
  padding: 8px;
  display: none;

  @media (max-width: 656px) {
    display: ${({ miniSearchState }) =>
      miniSearchState ? "inline-flex" : "none"};
  }
`;

export const LeftMenuButton = styled(IconButton)<ComponentWithProps>`
  color: inherit;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 656px) {
    display: ${({ miniSearchState }) =>
      miniSearchState ? "none" : "inline-flex"};
  }
`;

export const YTButton = styled(Button)<ComponentWithProps>`
  color: inherit;
  padding: 18px 14px 18px 16px;
  min-height: 20px;
  line-height: unset;

  :hover {
    background-color: transparent;
  }

  @media (max-width: 656px) {
    display: ${({ miniSearchState }) =>
      miniSearchState ? "none" : "inline-flex"};
  }
`;

export const RightSideContainer = styled(Stack)<ComponentWithProps>`
  align-items: center;
  justify-content: flex-end;
  min-width: 225px;
  flex: none;

  @media (max-width: 656px) {
    min-width: 0;
    display: ${({ miniSearchState }) => (miniSearchState ? "none" : "flex")};
  }
`;

export const RightMenuButton = styled(IconButton)`
  margin-right: 8px;
  color: inherit;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 656px) {
    margin-right: 0;
  }
`;

export const AvatarButton = styled(Button)`
  padding: 1px 6px;
  :hover {
    background-color: transparent;
  }
`;

export const UserAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
  margin: 0 8px;
`;

export const CenterContainer = styled(Stack)`
  min-width: 0;
  align-items: center;
  flex: 0 1 728px;
  justify-content: flex-end;

  @media (max-width: 656px) {
    justify-content: flex-end;
    flex: 1;
    flex-basis: 1e-9px;
  }
`;

export const SearchContainer = styled(Stack)<ComponentWithProps>`
  margin-left: 40px;
  padding: 0 4px;
  flex: 1;
  flex-basis: 1e-9px;
  @media (max-width: 656px) {
    display: ${({ miniSearchState }) => (miniSearchState ? "flex" : "none")};
    margin-left: 0;
  }
`;

export const SearchBarFormControl = styled(FormControl)<ComponentWithProps>`
  position: relative;
  flex: 1;
  flex-basis: 1e-9px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: hsl(0, 0%, 7%);
  border: ${({ focus }) =>
    focus ? "1px solid #1c62b9" : "1px solid hsl(0, 0%, 18.82%)"};
  border-radius: 40px 0 0 40px;
  padding: ${({ focus }) => (focus ? "2px 4px 2px 48px" : "0px 4px 0px 16px")};
  margin-left: ${({ focus }) => (focus ? "0" : "32px")};
  box-shadow: ${({ focus }) =>
    focus
      ? "inset 0 1px 2px rgba(0, 0, 0, 0.3)"
      : "inset 0 1px 2px hsla(0, 0%, 0%, 0)"};
`;

export const SearchInputAdornment = styled(InputAdornment)`
  position: absolute;
  left: 0;
  color: #fff;
  padding: 0 12px 0 16px;
  width: 20px;
  height: 20px;
  display: inline-flex;
`;

export const SearchBarInput = styled(Input)`
  width: 100%;
  max-width: 100%;
  line-height: 24px;
  font-weight: 400;
  font-size: 16px;
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: hsla(0, 100%, 100%, 0.88);
  outline: none;
  -webkit-font-smoothing: antialiased;

  .MuiInput-input {
    padding: 1px 0;
    height: unset;
    box-sizing: border-box;
  }
`;

export const SearchEndAdornment = styled(InputAdornment)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ClearButton = styled(IconButton)`
  width: 40px;
  height: 40px;
  padding: 0;
  color: #fff;
`;

export const SearchButton = styled(Button)`
  color: inherit;
  border: 1px solid hsl(0, 0%, 18.82%);
  background-color: hsla(0, 0%, 100%, 0.08);
  height: 40px;
  width: 64px;
  margin: 0;
  border-radius: 0 40px 40px 0;
  padding: 1px 6px;

  :hover {
    background-color: hsla(0, 0%, 100%, 0.08);
  }
`;

export const MiniScreenSearchButton = styled(IconButton)<ComponentWithProps>`
  display: none;
  color: inherit;
  height: 40px;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 656px) {
    display: ${({ miniSearchState }) => (miniSearchState ? "none" : "block")};
  }
`;

export const VoiceButton = styled(IconButton)`
  margin-left: 4px;
  color: inherit;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const SignInButton = styled(Button)`
  border: 1px solid #717171;
  color: #3ea6ff;
  border-radius: 18px;
  text-transform: inherit;
  font-weight: 500;
`;

export const ProfileDropDownMenu = styled(Menu)`
  margin-top: 10px;
  .MuiMenu-list {
    background-color: ${colors.dropDownMenu};
  }
  .MuiMenu-paper {
    border-radius: 12px;
    width: 200px;
    background-color: ${colors.dropDownMenu};
  }
`;

export const ProfileMenuItem = styled(MenuItem)`
  color: ${colors.textWhite};
  justify-content: space-between;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  font-weight: 700;
  padding: 12px 16px;
  font-size: 14px;
`;

export const ProfileMenuHeader = styled(Stack)`
  color: ${colors.textWhite};
  padding: 8px 12px 8px 2px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  gap: 8px;
  flex-direction: row;
  align-items: center;
`;

export const ProfileIconButton = styled(IconButton)`
  color: inherit;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const ProfileHeaderText = styled(Typography)`
  color: inherit;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export const ProfileHeaderSubtext = styled(Typography)`
  color: inherit;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  font-weight: 500;
`;

export const ProfileHeaderLink = styled(Link)`
  font-size: 12px;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
`;

export const ActivationDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 12px;
    width: 738px;
    background-color: ${colors.dropDownMenu};
  }
`;

export const ContentContainer = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: unset;
  margin-top: 20px;
`;

export const DialogButton = styled(Button)`
  color: white;
  border-radius: 16px;
  padding-right: 16px;
  padding-left: 16px;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

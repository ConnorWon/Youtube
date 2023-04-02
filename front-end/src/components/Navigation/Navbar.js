import React, { useEffect, useRef, useLayoutEffect } from "react";
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
  FormControl,
  Input,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { colors } from "../ColorThemes";

const NaviBar = styled(AppBar)`
  position: fixed;
  background-color: ${colors.bgColorDark};
  height: 56px;
  display: flex;
  justify-content: center;
  width: 100%;
  box-shadow: none;
  z-index: 1201;
`;

const NavToolBar = styled(Toolbar)`
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

const LeftSideContainer = styled(Stack)`
  align-items: center;
`;

const CloseMiniSearchBtn = styled(IconButton)`
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

const LeftMenuButton = styled(IconButton)`
  color: inherit;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 656px) {
    display: ${({ miniSearchState }) =>
      miniSearchState ? "none" : "inline-flex"};
  }
`;

const YTButton = styled(Button)`
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

const RightSideContainer = styled(Stack)`
  align-items: center;
  justify-content: flex-end;
  min-width: 225px;
  flex: none;

  @media (max-width: 656px) {
    min-width: 0;
    display: ${({ miniSearchState }) => (miniSearchState ? "none" : "flex")};
  }
`;

const RightMenuButton = styled(IconButton)`
  margin-right: 8px;
  color: inherit;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 656px) {
    margin-right: 0;
  }
`;

const AvatarButton = styled(Button)`
  padding: 1px 6px;
  :hover {
    background-color: transparent;
  }
`;

const UserAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
  margin: 0 8px;
`;

const CenterContainer = styled(Stack)`
  min-width: 0px;
  align-items: center;
  flex: 0 1 728px;
  justify-content: flex-end;

  @media (max-width: 656px) {
    flex-basis: 1e-9px;
    justify-content: flex-end;
    flex: 1;
  }
`;

const SearchContainer = styled(Stack)`
  margin-left: 40px;
  padding: 0 4px;
  flex: 1;
  flex-basis: 1e-9px;
  @media (max-width: 656px) {
    display: ${({ miniSearchState }) => (miniSearchState ? "flex" : "none")};
    margin-left: 0;
  }
`;

const SearchBarFormControl = styled(FormControl)`
  position: relative;
  flex: 1;
  flex-basis: 1e-9px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: hsl(0, 0%, 7%);
  border: ${({ focus }) =>
    focus ? "1px solid #1c62b9" : "1px solid hsl(0, 0%, 18.82%)"};
  border-right: none;
  border-radius: 40px 0 0 40px;
  padding: ${({ focus }) => (focus ? "2px 4px 2px 48px" : "0px 4px 0px 16px")};
  margin-left: ${({ focus }) => (focus ? "0" : "32px")};
  box-shadow: ${({ focus }) =>
    focus
      ? "inset 0 1px 2px rgba(0, 0, 0, 0.3)"
      : "inset 0 1px 2px hsla(0, 0%, 0%, 0)"};
`;

const SearchInputAdornment = styled(InputAdornment)`
  position: absolute;
  left: 0;
  color: #fff;
  padding: 0 12px 0 16px;
  width: 20px;
  height: 20px;
  display: inline-flex;
`;

const SearchBarInput = styled(Input)`
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

const SearchEndAdornment = styled(InputAdornment)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClearButton = styled(IconButton)`
  width: 40px;
  height: 40px;
  padding: 0;
  color: #fff;
`;

const SearchButton = styled(Button)`
  color: inherit;
  border: 1px solid hsl(0, 0%, 18.82%);
  background-color: #424242;
  height: 40px;
  width: 64px;
  margin: 0;
  border-radius: 0 40px 40px 0;
  padding: 1px 6px;

  :hover {
    background-color: #424242;
  }
`;

const MiniScreenSearchButton = styled(IconButton)`
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

const VoiceButton = styled(IconButton)`
  margin-left: 4px;
  color: inherit;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 650,
      md: 900,
      lg: 1180,
      xl: 1536,
    },
  },
});

export const Navbar = (props) => {
  // Connected to the x button for search bar
  const [value, setValue] = useState("");

  // Connected to the focus of the search bar
  const [focus, setFocus] = useState(false);

  // for xs-sm screen size, opening the search bar
  const [miniSearchState, setMiniSearchState] = useState(false);

  // for resizing the searchbar when clicking on it
  const [searchExpandedWidth, setSearchExpandedWidth] = useState(0);

  const searchRef = useRef();

  const getSearchBarSize = () => {
    const newWidth = searchRef.current.clientWidth;
    setSearchExpandedWidth(newWidth + 24.5);
  };

  // useEffect(() => {
  //   getSearchBarSize();
  // }, []);

  // useEffect(() => {
  //   // if (windowWidth.width >= 650)
  //   window.addEventListener("resize", getSearchBarSize);
  // }, []);

  // maybe add windowWidth into the useEffect above, also maybe change the useLayoutEffect to useEffect and make it do something on mount

  // for closing search bar when transitioning from xs to sm size screen
  // const getWindowWidth = () => {
  //   const { innerWidth: width } = window;
  //   return {
  //     width,
  //   };
  // };
  // const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  // useLayoutEffect(() => {
  //   function handleResize() {
  //     setWindowWidth(getWindowWidth());
  //   }

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const handleFocus = (val) => {
    setFocus(val);
    if (window.innerWidth > 656) {
      setMiniSearchState(val);
    }
  };

  // Expand sidebar function
  const { handleSideExpand } = props;

  // nav to different routes
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <NaviBar>
        <NavToolBar disableGutters>
          <LeftSideContainer direction="row">
            <CloseMiniSearchBtn
              miniSearchState={miniSearchState}
              onClick={() => setMiniSearchState(false)}
            >
              <ArrowBackIcon />
            </CloseMiniSearchBtn>
            <LeftMenuButton
              miniSearchState={miniSearchState}
              onClick={() => handleSideExpand()}
            >
              <MenuIcon />
            </LeftMenuButton>
            <YTButton
              miniSearchState={miniSearchState}
              startIcon={<YouTubeIcon sx={{ color: "red", mr: -0.5 }} />}
              disableRipple
              onClick={() => navigate("/")}
            >
              Youtube
            </YTButton>
          </LeftSideContainer>
          <CenterContainer direction="row">
            <SearchContainer direction="row" miniSearchState={miniSearchState}>
              <SearchBarFormControl focus={focus}>
                {focus && (
                  <SearchInputAdornment position="start">
                    <SearchIcon />
                  </SearchInputAdornment>
                )}
                <SearchBarInput
                  disableUnderline
                  placeholder="Search"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onFocus={() => handleFocus(true)}
                  onBlur={() => {
                    handleFocus(false);
                  }}
                  inputRef={(input) => focus && input?.focus()}
                />
                {value && (
                  <SearchEndAdornment position="end">
                    <ClearButton
                      onClick={() => {
                        setValue("");
                        handleFocus(true);
                      }}
                    >
                      <CloseIcon />
                    </ClearButton>
                  </SearchEndAdornment>
                )}
              </SearchBarFormControl>
              <Tooltip title="Search">
                <SearchButton
                  variant="contained"
                  disableRipple
                  disableElevation
                >
                  <SearchIcon />
                </SearchButton>
              </Tooltip>
            </SearchContainer>
            <Tooltip title="Search">
              <MiniScreenSearchButton
                disableRipple
                miniSearchState={miniSearchState}
                onClick={() => {
                  setMiniSearchState(true);
                  setFocus(true);
                }}
              >
                <SearchIcon />
              </MiniScreenSearchButton>
            </Tooltip>
            <Tooltip title="Search with your voice">
              <VoiceButton>
                <MicIcon />
              </VoiceButton>
            </Tooltip>
          </CenterContainer>
          <RightSideContainer miniSearchState={miniSearchState} direction="row">
            <Tooltip title="Create">
              <RightMenuButton>
                <VideoCallOutlinedIcon />
              </RightMenuButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <RightMenuButton>
                <NotificationsNoneIcon />
              </RightMenuButton>
            </Tooltip>
            <AvatarButton>
              <UserAvatar />
            </AvatarButton>
          </RightSideContainer>
        </NavToolBar>
      </NaviBar>
    </ThemeProvider>
  );
};

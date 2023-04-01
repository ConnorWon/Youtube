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
import { YTButton } from "./Styling";
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

const LeftMenuButton = styled(IconButton)`
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const RightSideContainer = styled(Stack)`
  align-items: center;
  justify-content: flex-end;
  min-width: 225px;
  flex: none;

  @media (max-width: 656px) {
    min-width: 0;
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
`;

const SearchBar = styled(TextField)``;

const SearchButton = styled(IconButton)`
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

  // for displaying the search icon
  const [searchState, setSearchState] = useState(false);

  // for xs-sm screen size, opening the search bar
  const [openSearch, setOpenSearch] = useState(false);

  // for resizing the searchbar when clicking on it
  const [searchExpandedWidth, setSearchExpandedWidth] = useState(0);
  const [d1NewWidth, setD1NewWidth] = useState();

  const searchRef = useRef();
  const div1Ref = useRef();

  const getSearchBarSize = () => {
    const newWidth = searchRef.current.clientWidth;
    setSearchExpandedWidth(newWidth + 24.5);

    const newDivWidth = div1Ref.current.clientWidth;
    setD1NewWidth(newDivWidth - 24);
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

  // for determining whether to keep the openSearch true after screen goes from xs to sm
  const handleOpenSearch = () => {
    setOpenSearch(searchState);
  };

  // Expand sidebar function
  const { handleSideExpand } = props;

  // nav to different routes
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <NaviBar>
        {/* {openSearch && windowWidth.width < 650 ? (
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setOpenSearch(false)}
              sx={{ ml: -1, mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Stack
              sx={[!searchState && { minWidth: "24px", maxWidth: "24px" }]}
            />
            <TextField
              placeholder="Search"
              variant="outlined"
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setSearchState(true)}
              onBlur={() => {
                setSearchState(false);
                setFocus(false);
              }}
              onClick={() => setFocus(true)}
              inputRef={(input) => focus && input?.focus()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!value ? (
                      ""
                    ) : (
                      <IconButton
                        size="small"
                        sx={{ color: "white", mx: -1 }}
                        onClick={() => {
                          setValue("");
                          setSearchState(true);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    {!searchState ? null : (
                      <SearchIcon sx={{ color: "white", ml: -0.5, mr: 0.5 }} />
                    )}
                  </InputAdornment>
                ),
              }}
              sx={[
                {
                  bgcolor: "#0a0a0a",
                  label: { color: "#424242" },
                  input: {
                    color: "white",
                    ml: -0.75,
                    height: "8px",
                  },
                },
              ]}
            />
            <Tooltip title="Search">
              <Button
                variant="contained"
                sx={{
                  height: 39.5,
                  bgcolor: "#424242",
                  borderRadius: 0,
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "#424242",
                  },
                }}
                disableRipple
                disableElevation
              >
                <SearchIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Search with your voice">
              <IconButton color="inherit" sx={{ ml: "8px" }}>
                <MicIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        ) : ( */}
        <NavToolBar disableGutters>
          <LeftSideContainer direction="row">
            <LeftMenuButton color="inherit" onClick={(e) => handleSideExpand()}>
              <MenuIcon />
            </LeftMenuButton>
            <YTButton
              startIcon={<YouTubeIcon sx={{ color: "red", mr: -0.5 }} />}
              disableRipple
              onClick={() => navigate("/")}
            >
              Youtube
            </YTButton>
          </LeftSideContainer>
          <CenterContainer direction="row">
            <SearchContainer direction="row">
              <TextField
                ref={searchRef}
                placeholder="Search"
                variant="outlined"
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setSearchState(true)}
                onBlur={() => {
                  setSearchState(false);
                  setFocus(false);
                }}
                onClick={() => setFocus(true)}
                inputRef={(input) => focus && input?.focus()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {!value ? (
                        ""
                      ) : (
                        <IconButton
                          size="small"
                          sx={{ color: "white", mx: -2 }}
                          onClick={() => {
                            setValue("");
                            setSearchState(true);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      {!searchState ? null : (
                        <SearchIcon
                          sx={{ color: "white", ml: -0.5, mr: 0.5 }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                sx={[
                  {
                    bgcolor: "#0a0a0a",
                    height: "40px",
                    width: {
                      lg: "540px",
                    },
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                    label: { color: "#424242" },
                    input: {
                      color: "white",
                      ml: -0.75,
                      height: "8px",
                      width: {
                        lg: "503px",
                      },
                    },
                  },
                  searchState && {
                    width: searchExpandedWidth,
                    minWidth: searchExpandedWidth,
                  },
                ]}
              />
              <Tooltip title="Search">
                <Button
                  variant="contained"
                  sx={{
                    height: 39.5,
                    bgcolor: "#424242",
                    borderRadius: 0,
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "#424242",
                    },
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                  disableRipple
                  disableElevation
                >
                  <SearchIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Search">
                <IconButton
                  color="inherit"
                  sx={{
                    display: {
                      sm: "none",
                    },
                  }}
                  onClick={() => {
                    setOpenSearch(true);
                    setFocus(true);
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Search with your voice">
                <SearchButton>
                  <MicIcon />
                </SearchButton>
              </Tooltip>
            </SearchContainer>
          </CenterContainer>
          <RightSideContainer direction="row">
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

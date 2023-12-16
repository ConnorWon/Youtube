import React, { useContext, useEffect } from "react";
import { Tooltip } from "@mui/material";
import {
  NaviBar,
  NavToolBar,
  LeftSideContainer,
  CloseMiniSearchBtn,
  LeftMenuButton,
  YTButton,
  RightSideContainer,
  RightMenuButton,
  CenterContainer,
  SearchContainer,
  SearchBarFormControl,
  SearchInputAdornment,
  SearchBarInput,
  SearchEndAdornment,
  ClearButton,
  SearchButton,
  MiniScreenSearchButton,
  VoiceButton,
} from "./Styling";
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
import { GetWindowDimension } from "../../../utils/WindowSizeStore";
import { SidebarContext } from "../../../contexts/SidebarContext";
import { ProfileMenu } from "./ProfileMenu";

export const Navbar = () => {
  // Connected to the clear button for search bar
  const [value, setValue] = useState("");

  // Connected to the focus of the search bar
  const [focus, setFocus] = useState(false);

  // for <= 656px screen size, opening the search bar
  const [miniSearchState, setMiniSearchState] = useState(false);

  // for handling searchBar when below 656px window size
  const windowSize = GetWindowDimension();

  // miniSearchState lock
  const [miniSearchStateReset, setMiniSearchStateReset] = useState();

  // handles setting the lock state for miniSearchState upon component mount
  useEffect(() => {
    if (windowSize > 656) {
      setMiniSearchStateReset(false);
    } else {
      setMiniSearchStateReset(true);
    }
  }, []);

  // deals with the reseting the miniSearchState upon passing max window size of miniSearch component
  useEffect(() => {
    if (miniSearchStateReset) {
      if (windowSize > 656) {
        setMiniSearchState(focus);
        setMiniSearchStateReset(false);
      }
    } else if (!miniSearchStateReset) {
      if (windowSize <= 656) {
        setMiniSearchStateReset(true);
      }
    }
  }, [windowSize]);

  // deals with focus and unfocusing the search bar
  const handleFocus = (val) => {
    setFocus(val);
    if (window.innerWidth > 656) {
      setMiniSearchState(val);
    }
  };

  // Sidebar related states
  const {
    sideExpand,
    setSideExpand,
    modalSideExpand,
    setModalSideExpand,
    inVideoPage,
  } = useContext(SidebarContext);

  // Expand sidebar function
  const handleSideExpand = (e) => {
    if (windowSize <= 1312 || inVideoPage) {
      setModalSideExpand(!modalSideExpand);
    } else {
      setSideExpand(!sideExpand);
    }
  };

  // nav to different routes
  const navigate = useNavigate();

  return (
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
              <SearchButton variant="contained" disableRipple disableElevation>
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
          <ProfileMenu />
        </RightSideContainer>
      </NavToolBar>
    </NaviBar>
  );
};

import React, { useState, useEffect, useContext } from "react";
import {
  SidebarDrawer,
  HeaderSpacer,
  InnerSidebarContainer,
  OuterButtonContainer,
  NotLoggedMsg,
  NotLoggedSubContainer,
  SecondaryButtonsContainer,
  SectionLabel,
  SidebarContainer,
  SignInButton,
  SignInContainer,
} from "./Styling";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import StreamOutlinedIcon from "@mui/icons-material/StreamOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import { SidebarButton } from "./SidebarButton";
import { GetWindowDimension } from "../../../utils/WindowSizeStore";
import { SidebarContext } from "../../../contexts/SidebarContext";

export const SidebarExpand = () => {
  // Sidebar related states
  const { sideExpand, inVideoPage, modalSideExpand } =
    useContext(SidebarContext);

  // state for hiding and showing elements that are dependent on log in status
  const [loggedStatus, setLoggedStatus] = useState(false);
  // state for turning on or off modal feature
  const [modalSide, setModalSide] = useState(false);

  const windowSize = GetWindowDimension();

  // deals with turning on or off the modal sidebar feature
  useEffect(() => {
    if (windowSize <= 1312 || inVideoPage) {
      setModalSide(true);
    } else {
      setModalSide(false);
    }
  }, [windowSize, inVideoPage]);

  const mainButtons = [
    ["/", "Home", <HomeOutlinedIcon />],
    ["/watch", "Shorts", <SlideshowIcon />],
    ["/results", "Subscriptions", <SubscriptionsOutlinedIcon />],
  ];

  const secondaryButtons = [
    ["/channel", "Library", <VideoLibraryOutlinedIcon />],
    ["/", "History", <HistoryOutlinedIcon />],
  ];

  const exploreButtons = [
    ["/", "Trending", <WhatshotOutlinedIcon />],
    ["/", "Music", <MusicNoteOutlinedIcon />],
    ["/", "Movies & Shows", <MovieCreationOutlinedIcon />],
    ["/", "Live", <StreamOutlinedIcon />],
    ["/", "Gaming", <SportsEsportsOutlinedIcon />],
    ["/", "News", <FeedOutlinedIcon />],
    ["/", "Sports", <EmojiEventsOutlinedIcon />],
    ["/", "Learning", <LightbulbOutlinedIcon />],
    ["/", "Fashion & Beauty", <DiamondOutlinedIcon />],
  ];

  return (
    <SidebarDrawer
      variant={inVideoPage || modalSide ? "temporary" : "permanent"}
      anchor="left"
      open={modalSideExpand}
      sideExpand={sideExpand}
      modalSideExpand={modalSideExpand}
    >
      <HeaderSpacer />
      <SidebarContainer>
        <InnerSidebarContainer>
          <OuterButtonContainer>
            {mainButtons.map((icon) => {
              return <SidebarButton icon={icon} />;
            })}
            <SecondaryButtonsContainer>
              {/* TODO login will add buttons associated with account, most likely include a local storage or cookie that determines if user is logged in */}
              {secondaryButtons.map((icon) => {
                return <SidebarButton icon={icon} />;
              })}
            </SecondaryButtonsContainer>
          </OuterButtonContainer>
          {loggedStatus ? (
            <OuterButtonContainer>
              {/* sub tabs goes here */}
            </OuterButtonContainer>
          ) : (
            <NotLoggedSubContainer>
              <NotLoggedMsg>
                Sign in to like videos, comment, and subscribe.
              </NotLoggedMsg>
              <SignInContainer>
                <SignInButton
                  variant="outlined"
                  startIcon={<AccountCircleOutlinedIcon />}
                  disableRipple
                  href="/login"
                >
                  Sign In
                </SignInButton>
              </SignInContainer>
            </NotLoggedSubContainer>
          )}
          <OuterButtonContainer>
            <SectionLabel>Explore</SectionLabel>
            {exploreButtons.map((icon) => {
              return <SidebarButton icon={icon} />;
            })}
          </OuterButtonContainer>
        </InnerSidebarContainer>
      </SidebarContainer>
    </SidebarDrawer>
  );
};

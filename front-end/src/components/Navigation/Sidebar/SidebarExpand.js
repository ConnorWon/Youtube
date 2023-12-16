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
import { UserContext } from "../../../contexts/UserContext";
import { Avatar } from "@mui/material";

export const SidebarExpand = () => {
  // Sidebar related states
  const { sideExpand, inVideoPage, modalSideExpand } =
    useContext(SidebarContext);

  const { isLoggedIn, loggedChannel } = useContext(UserContext);

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
    ["/channel/@car", "Library", <VideoLibraryOutlinedIcon />],
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
              return (
                <SidebarButton link={icon[0]} label={icon[1]} icon={icon[2]} />
              );
            })}
            <SecondaryButtonsContainer>
              {/* TODO login will add buttons associated with account, most likely include a local storage or cookie that determines if user is logged in */}
              {secondaryButtons.map((icon) => {
                return (
                  <SidebarButton
                    link={icon[0]}
                    label={icon[1]}
                    icon={icon[2]}
                  />
                );
              })}
            </SecondaryButtonsContainer>
          </OuterButtonContainer>
          {isLoggedIn ? (
            loggedChannel.sub_data.length !== 0 && (
              <OuterButtonContainer>
                <SectionLabel>Subscriptions</SectionLabel>
                {loggedChannel.sub_data.map((ch) => {
                  return (
                    <SidebarButton
                      link={"/channel/" + ch.tag}
                      label={ch.name}
                      icon={<Avatar sx={{ width: "24px", height: "24px" }} />}
                    />
                  );
                })}
              </OuterButtonContainer>
            )
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
              return (
                <SidebarButton link={icon[0]} label={icon[1]} icon={icon[2]} />
              );
            })}
          </OuterButtonContainer>
        </InnerSidebarContainer>
      </SidebarContainer>
    </SidebarDrawer>
  );
};

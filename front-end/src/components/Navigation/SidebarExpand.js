import { Drawer, Stack, styled } from "@mui/material";
import React, { useState } from "react";
import {
  HeaderSpacer,
  InnerSidebarContainer,
  NotLoggedMsg,
  NotLoggedSubContainer,
  SecondaryButtonsContainer,
  SectionLabel,
  SidebarContainer,
  SideBarLabel,
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
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import { colors } from "../ColorThemes";
import { SidebarButton } from "./SidebarButton";

// pass a prop to this function and make that prop open and close this drawer (use true false to turn on off display css or change z-index css)
export const SidebarExpand = () => {
  const [loggedStatus, setLoggedStatus] = useState(false);

  const OuterButtonContainer = styled(Stack)`
    padding: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  `;

  const SidebarDrawer = styled(Drawer)`
    .MuiDrawer-paper {
      background-color: transparent;
    }
  `;

  const mainButtons = [
    ["/", "Home", <HomeOutlinedIcon />],
    ["/", "Shorts", <SlideshowIcon />],
    ["/", "Subscriptions", <SubscriptionsOutlinedIcon />],
  ];

  const secondaryButtons = [
    ["/", "Library", <VideoLibraryOutlinedIcon />],
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
    <SidebarDrawer variant="permanent">
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
            <OuterButtonContainer></OuterButtonContainer>
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

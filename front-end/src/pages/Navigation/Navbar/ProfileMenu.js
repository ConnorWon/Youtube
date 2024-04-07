import React, { useContext } from "react";
import {
  AvatarButton,
  UserAvatar,
  SignInButton,
  ProfileDropDownMenu,
  ProfileMenuItem,
  ProfileMenuHeader,
  ProfileIconButton,
  ProfileHeaderText,
  ProfileHeaderSubtext,
  ProfileHeaderLink,
} from "./Styling";
import CheckIcon from "@mui/icons-material/Check";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { changeCurrentChannel, logout } from "../../../utils/apiRequests";
import { Stack } from "@mui/material";
import { UpdateChannelDialog } from "./ChannelActivationDialog";
import {backendBaseURL} from "../../../utils/Constants";

export const ProfileMenu = () => {
  const {
    isLoggedIn,
    channels,
    setLoggedChannel,
    loggedChannel,
    resetContext,
  } = useContext(UserContext);

  // nav to different routes
  const navigate = useNavigate();

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const profileMenuOpen = Boolean(profileAnchorEl);

  const handleOpenProfileMenu = (e) => {
    setChannelListOpen(false);
    setProfileAnchorEl(e.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setProfileAnchorEl(null);
  };

  const [channelListOpen, setChannelListOpen] = useState(false);

  const switchToChannelList = () => {
    setChannelListOpen(!channelListOpen);
  };

  const switchChannels = async (tag) => {
    const response = await changeCurrentChannel(tag);
    if (response.status === 200) {
      setLoggedChannel(response.data);
      window.location.reload();
    } else {
      console.log(response.status);
      console.log("There was an issue with switching channel in use");
    }
  };

  const handleLogout = async () => {
    const logoutSuccessful = await logout();
    console.log(logoutSuccessful);
    if (logoutSuccessful) {
      resetContext();
      window.location.reload();
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleCloseProfileMenu();
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <AvatarButton onClick={handleOpenProfileMenu}>
            <UserAvatar src={backendBaseURL + loggedChannel.data.profile_pic}/>
          </AvatarButton>
          <ProfileDropDownMenu
            anchorEl={profileAnchorEl}
            open={profileMenuOpen}
            onClose={handleCloseProfileMenu}
          >
            {channelListOpen ? (
              <span>
                <ProfileMenuHeader>
                  <ProfileIconButton onClick={switchToChannelList}>
                    <ArrowBackIcon />
                  </ProfileIconButton>
                  <ProfileHeaderText>Accounts</ProfileHeaderText>
                </ProfileMenuHeader>
                {channels.map((channel, index) => {
                  return (
                    <ProfileMenuItem
                      key={index}
                      onClick={() => {
                        switchChannels(channel.tag);
                      }}
                    >
                      {channel.name}
                      {channel.name === loggedChannel.data.name && (
                        <CheckIcon />
                      )}
                    </ProfileMenuItem>
                  );
                })}
                <Stack
                  sx={{
                    height: "8px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
                <ProfileMenuItem
                  onClick={() => {
                    handleCloseProfileMenu();
                    navigate("/account");
                  }}
                >
                  View all channels
                </ProfileMenuItem>
              </span>
            ) : (
              <span>
                <ProfileMenuHeader
                  sx={{ flexDirection: "column", gap: "0", pl: "8px" }}
                >
                  <ProfileHeaderText>
                    {loggedChannel.data.name}
                  </ProfileHeaderText>
                  <ProfileHeaderSubtext>
                    {loggedChannel.data.tag}
                  </ProfileHeaderSubtext>
                  {loggedChannel.data.active_channel ? (
                    <ProfileHeaderLink
                      onClick={() => {
                        handleCloseProfileMenu();
                        navigate("/channel/" + loggedChannel.data.tag);
                      }}
                    >
                      View Channel
                    </ProfileHeaderLink>
                  ) : (
                    // change href used to whatever I decide to use for the channel list dashboard
                    <ProfileHeaderLink
                      onClick={() => {
                        handleCloseProfileMenu();
                        handleOpenDialog();
                      }}
                    >
                      Activate Channel
                    </ProfileHeaderLink>
                  )}
                </ProfileMenuHeader>
                <ProfileMenuItem onClick={() => navigate("/channel_dashboard")}>
                  Manage Channel
                </ProfileMenuItem>
                <ProfileMenuItem onClick={switchToChannelList}>
                  <span>Channels</span>
                  <KeyboardArrowRightIcon />
                </ProfileMenuItem>
                <ProfileMenuItem onClick={handleLogout}>Logout</ProfileMenuItem>
              </span>
            )}
          </ProfileDropDownMenu>
        </>
      ) : (
        <SignInButton
          variant="outlined"
          startIcon={<AccountCircleOutlinedIcon />}
          disableRipple
          href="/login"
        >
          Sign In
        </SignInButton>
      )}
      {openDialog && (
        <UpdateChannelDialog
          open={openDialog}
          handleClose={handleCloseDialog}
        />
      )}
    </>
  );
};

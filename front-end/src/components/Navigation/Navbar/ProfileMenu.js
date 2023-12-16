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
} from "./Styling";
import CheckIcon from "@mui/icons-material/Check";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { changeCurrentChannel, logout } from "../../../utils/apiRequests";

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
      console.log("There was an issue with switching channel is use");
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

  return (
    <>
      {isLoggedIn ? (
        <>
          <AvatarButton onClick={handleOpenProfileMenu}>
            <UserAvatar />
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
                </ProfileMenuHeader>
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
    </>
  );
};

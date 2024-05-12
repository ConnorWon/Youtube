import {MouseEvent, useContext} from "react";
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
import { Stack } from "@mui/material";
import { ChannelActivationDialog } from "./ChannelActivationDialog";
import {BACKEND_BASE_URL} from "../../../utils/Constants";
import {logout} from "../../../services/authService";
import {changeCurrentChannel} from "../../../services/channelService";

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

  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLButtonElement|null>(null);
  const [channelListOpen, setChannelListOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const profileMenuOpen = Boolean(profileAnchorEl);

  const handleOpenProfileMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setChannelListOpen(false);
    setProfileAnchorEl(e.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setProfileAnchorEl(null);
  };

  const switchToChannelList = () => {
    setChannelListOpen(!channelListOpen);
  };

  const switchChannels = async (tag: string) => {
    const response = await changeCurrentChannel(tag);
    if (response.status === 200) {
      setLoggedChannel(response.data);
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    const logoutSuccessful = await logout();
    if (logoutSuccessful) {
      resetContext();
      window.location.reload();
    }
  };

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
            <UserAvatar src={BACKEND_BASE_URL + loggedChannel!.profile_pic}/>
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
                      {channel.name === loggedChannel!.name && (
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
                    {loggedChannel!.name}
                  </ProfileHeaderText>
                  <ProfileHeaderSubtext>
                    {loggedChannel!.tag}
                  </ProfileHeaderSubtext>
                  {loggedChannel!.active_channel ? (
                    <ProfileHeaderLink
                      onClick={() => {
                        handleCloseProfileMenu();
                        navigate("/channel/" + loggedChannel!.tag);
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
        <ChannelActivationDialog
          open={openDialog}
          handleClose={handleCloseDialog}
        />
      )}
    </>
  );
};

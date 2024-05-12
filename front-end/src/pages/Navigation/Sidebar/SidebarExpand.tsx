import { useState, useEffect, useContext } from "react";
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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { SidebarButton } from "./SidebarButton";
import { GetWindowDimension } from "../../../utils/WindowSizeStore";
import { SidebarContext } from "../../../contexts/SidebarContext";
import { UserContext } from "../../../contexts/UserContext";
import { Avatar } from "@mui/material";
import {
  BACKEND_BASE_URL,
  EXPLORE_SIDEBAR_BUTTONS,
  MAIN_SIDEBAR_BUTTONS,
  SECONDARY_SIDEBAR_BUTTONS
} from "../../../utils/Constants";

export const SidebarExpand = () => {
  // Sidebar related states
  const { sideExpand, noMiniSideBar, modalSideExpand } =
    useContext(SidebarContext);

  const { isLoggedIn, loggedChannel } = useContext(UserContext);

  // state for turning on or off modal feature
  const [modalSide, setModalSide] = useState<boolean>(false);

  const windowSize = GetWindowDimension();

  // deals with turning on or off the modal sidebar feature
  useEffect(() => {
    if (windowSize <= 1312 || noMiniSideBar) {
      setModalSide(true);
    } else {
      setModalSide(false);
    }
  }, [windowSize, noMiniSideBar]);

  return (
    <SidebarDrawer
      variant={noMiniSideBar || modalSide ? "temporary" : "permanent"}
      anchor="left"
      open={modalSideExpand}
      sideExpand={sideExpand}
      modalSideExpand={modalSideExpand}
    >
      <HeaderSpacer />
      <SidebarContainer>
        <InnerSidebarContainer>
          <OuterButtonContainer>
            {MAIN_SIDEBAR_BUTTONS.map((button) => {
              return (
                <SidebarButton link={button.link} label={button.label} icon={button.icon} />
              );
            })}
            <SecondaryButtonsContainer>
              {/* TODO login will add buttons associated with account, most likely include a local storage or cookie that determines if user is logged in */}
              {SECONDARY_SIDEBAR_BUTTONS.map((button) => {
                return (
                  <SidebarButton
                    link={button.link}
                    label={button.label}
                    icon={button.icon}
                  />
                );
              })}
            </SecondaryButtonsContainer>
          </OuterButtonContainer>
          {isLoggedIn ? (
            loggedChannel!.subscriptions.length !== 0 && (
              <OuterButtonContainer>
                <SectionLabel>Subscriptions</SectionLabel>
                {loggedChannel!.subscriptions.map((ch) => {
                  return (
                    <SidebarButton
                      link={"/channel/" + ch.tag}
                      label={ch.name}
                      icon={
                        <Avatar
                            src={BACKEND_BASE_URL + ch.profile_pic}
                            sx={{ width: "24px", height: "24px" }}
                        />
                      }
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
            {EXPLORE_SIDEBAR_BUTTONS.map((button) => {
              return (
                <SidebarButton link={button.link} label={button.label} icon={button.icon} />
              );
            })}
          </OuterButtonContainer>
        </InnerSidebarContainer>
      </SidebarContainer>
    </SidebarDrawer>
  );
};

import {
  Avatar,
  Stack,
  Typography,
  Button,
  styled,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { colors } from "../../utils/ColorThemes";
import { SidebarContext } from "../../contexts/SidebarContext";
import { GetWindowDimension } from "../../utils/WindowSizeStore";
import { changeCurrentChannel } from "../../utils/apiRequests";
import { useNavigate } from "react-router-dom";

const MainContainer = styled(Stack)`
  align-items: center;
`;

const HeaderContainer = styled(Stack)`
  flex-direction: start;
`;

const HeaderText = styled(Typography)`
  font-size: 30px;
  color: white;
  font-weight: 500;
`;

const GridItem = styled(Grid)`
  border-right: ${({ hasBorder }) =>
    hasBorder ? "0px" : "1px solid rgba(255, 255, 255, 0.2)"};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: ${({ isCreateBtn, hoverOn }) =>
      isCreateBtn || hoverOn ? "" : "rgba(255, 255, 255, 0.2)"};
  }
`;

const CreateButton = styled(Button)`
  border-radius: 18px;
  background-color: ${colors.btnColorGrey};
  min-width: max-content;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const MoreButton = styled(IconButton)`
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ChannelNameText = styled(Typography)`
  color: white;
  font-size: 14px;
`;

const ChannelSubText = styled(Typography)`
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
`;

const MoreMenu = styled(Menu)`
  .MuiMenu-list {
    background-color: ${colors.dropDownMenu};
  }
  .MuiMenu-paper {
    border-radius: 12px;
    background-color: ${colors.dropDownMenu};
  }
`;

const MoreMenuItem = styled(MenuItem)`
  color: ${colors.textWhite};
  font-size: 14px;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const ChannelDashboard = () => {
  const { loggedChannel, setLoggedChannel, channels } = useContext(UserContext);
  const {
    setNoMiniSideBar,
    setSideExpand,
    setModalSideExpand,
    modalSideExpand,
  } = useContext(SidebarContext);

  const navigate = useNavigate();

  // used for tracking window size
  const windowSize = GetWindowDimension();

  // signals that noMiniSideBar on component mount and on dismount signals not in videoPage
  useEffect(() => {
    setNoMiniSideBar(true);
    return () => {
      setNoMiniSideBar(false);
    };
  }, []);

  // tracks whether component is unmounting
  const componentWillUnMount = useRef(false);
  // changes unmount ref when component is unmounting
  useEffect(() => {
    return () => {
      componentWillUnMount.current = true;
    };
  }, []);

  // opens sideExpand if modalSideExpand is true and windowSize > 1312px
  useEffect(() => {
    return () => {
      if (
        modalSideExpand &&
        componentWillUnMount.current &&
        windowSize > 1312
      ) {
        setSideExpand(modalSideExpand);
      }
    };
  }, [modalSideExpand, windowSize]);

  // used to close modal sidebar after switching to this page from another
  useEffect(() => {
    setModalSideExpand(false);
  }, []);

  const [menuAnchor, setMenuAnchor] = useState(false);
  const menuOpen = Boolean(menuAnchor);

  const closeMenu = (e) => {
    setMenuAnchor(null);
    e.stopPropagation();
  };

  const [hoverGridItemEffect, setHoverGridItemEffect] = useState(false);

  const handleGridItemHover = (bool) => {
    setHoverGridItemEffect(bool);
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

  const goToCreateChannelPage = () => {
    navigate("/create_channel");
  };

  return (
    <MainContainer>
      <Stack spacing={2} sx={{ width: "60%" }}>
        <HeaderContainer>
          <HeaderText>All Channels</HeaderText>
        </HeaderContainer>
        <Grid container spacing={2}>
          <GridItem xs={4} sx={{ justifyContent: "center" }} isCreateBtn={true}>
            <CreateButton
              variant="contained"
              startIcon={<AddIcon />}
              disableElevation
              onClick={goToCreateChannelPage}
            >
              <span>Create Channel</span>
            </CreateButton>
          </GridItem>
          {channels.map((channel, index) => {
            return (
              <GridItem
                xs={4}
                key={index}
                hasBorder={(index + 2) % 3 === 0}
                onClick={() => {
                  switchChannels(channel.tag);
                }}
                hoverOn={hoverGridItemEffect}
              >
                <Stack direction="row" spacing={2}>
                  <Avatar />
                  <Stack>
                    <ChannelNameText>{channel.name}</ChannelNameText>
                    {channel.active_channel ? (
                      <>
                        <ChannelSubText>{channel.tag}</ChannelSubText>
                        <ChannelSubText>
                          {channel.sub_count} subscribers
                        </ChannelSubText>
                      </>
                    ) : (
                      <ChannelSubText>No channel</ChannelSubText>
                    )}
                  </Stack>
                </Stack>
                <Stack direction="row" alignItems="center">
                  {loggedChannel.data.name === channel.name && (
                    <CheckIcon sx={{ color: "white" }} />
                  )}
                  <MoreButton
                    onClick={(e) => {
                      setMenuAnchor(e.currentTarget);
                      e.stopPropagation();
                    }}
                    onMouseOver={() => {
                      handleGridItemHover(true);
                    }}
                    onMouseLeave={() => {
                      handleGridItemHover(false);
                    }}
                  >
                    <MoreVertIcon sx={{ color: "white" }} />
                  </MoreButton>
                  <MoreMenu
                    anchorEl={menuAnchor}
                    open={menuOpen}
                    onClose={closeMenu}
                  >
                    <MoreMenuItem>Update Channel</MoreMenuItem>
                  </MoreMenu>
                </Stack>
              </GridItem>
            );
          })}
        </Grid>
      </Stack>
    </MainContainer>
  );
};

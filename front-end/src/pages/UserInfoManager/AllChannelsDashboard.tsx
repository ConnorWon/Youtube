import { Avatar, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import {
  MainContainer,
  HeaderContainer,
  HeaderText,
  GridItem,
  CreateButton,
  ChannelNameText,
  ChannelSubText,
} from "./Styling";
import {BACKEND_BASE_URL} from "../../utils/Constants";
import {changeCurrentChannel} from "../../services/channelService";

export const AllChannelsDashboard = () => {
  const { loggedChannel, setLoggedChannel, channels } = useContext(UserContext);

  const navigate = useNavigate();

  const switchChannels = async (tag: string) => {
    const response = await changeCurrentChannel(tag);
    if (response.status === 200) {
      setLoggedChannel(response.data);
      window.location.reload();
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
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={BACKEND_BASE_URL + channel.profile_pic}/>
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
                  {loggedChannel?.name === channel.name && (
                    <CheckIcon sx={{ color: "white" }} />
                  )}
                </Stack>
              </GridItem>
            );
          })}
        </Grid>
      </Stack>
    </MainContainer>
  );
};

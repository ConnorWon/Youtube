import { Stack, Avatar } from "@mui/material";
import {
  VideosRender,
  VideoContainer,
  ThumbnailContainer,
  Thumbnail,
  InfoContainer,
  TitleContainer,
  Title,
  ViewsAndDate,
  ChannelNameContainer,
  ChannelIcon,
  ChannelName,
  Description,
  Verified,
} from "./Styling";
import thumbnail from "../../staticfiles/youtube-thumbnail.png";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const HorizontalVideo = () => {
  const navigate = useNavigate();
  const url = window.location.href;

  // handles routing for video component
  const handleRouting = (val: string) => {
    if (window.location.href === url) {
      navigate(val);
    }
  };

  return (
    <VideosRender onClick={() => handleRouting("/watch")}>
      <VideoContainer direction="row">
        <ThumbnailContainer>
          <Thumbnail src={thumbnail} />
        </ThumbnailContainer>
        <InfoContainer>
          <Stack>
            <TitleContainer direction="row">
              <Title>Video Title</Title>
            </TitleContainer>
            <ViewsAndDate>51K views {"\u2022"} 2 weeks ago</ViewsAndDate>
          </Stack>
          <ChannelNameContainer direction="row">
            <ChannelIcon onClick={() => handleRouting("/channel")}>
              <Avatar sx={{ width: "24px", height: "24px" }} />
            </ChannelIcon>
            <ChannelName onClick={() => handleRouting("/channel")}>
              Ghost
            </ChannelName>
            <Verified>
              <CheckCircleIcon
                sx={{
                  color: "white",
                  width: "14px",
                  height: "14px",
                }}
              />
            </Verified>
          </ChannelNameContainer>
          <Description>Hello this is the description!</Description>
        </InfoContainer>
      </VideoContainer>
    </VideosRender>
  );
};

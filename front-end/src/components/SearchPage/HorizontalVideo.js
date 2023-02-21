import { Typography, styled, Stack, Box, Avatar } from "@mui/material";
import React from "react";
import { colors } from "../ColorThemes";
import thumbnail from "../Home/youtube-thumbnail.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const VideosRender = styled(Box)`
  margin-top: 16px;
  display: block;
  position: relative;
`;

const Container = styled(Stack)`
  position: relative;
  display: flex;
`;

const ThumbnailContainer = styled(Box)`
  margin-right: 16px;
  max-width: 360px;
  min-width: 240px;
  flex: 1;
  flex-basis: 1e-9px;
  display: block;
  position: relative;
`;

const Thumbnail = styled(Box)`
  width: -webkit-fill-available;
  height: auto;
  border-radius: 12px;
`;

const InfoContainer = styled(Stack)`
  min-width: 0;
  cursor: pointer;
  color: ${colors.textWhite};
  flex: 1;
  flex-basis: 1e-9px;
  display: flex;
`;

const TitleContainer = styled(Stack)`
  display: flex;
  justify-content: space-between;
`;

const Title = styled(Typography)`
  min-width: 0;
  color: ${colors.textWhite};
  margin-right: 8px;
  overflow: hidden;
  font-family: Roboto;
  font-size: 18px;
  line-height: 26px;
  font-weight: 400;
  max-height: 52px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  white-space: normal;
  pointer: cursor;
`;

const ViewsAndDate = styled(Typography)`
  color: ${colors.textGrey};
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  white-space: normal;
  max-height: 36px;
  -webkit-line-clamp: 2;
`;

const ChannelNameContainer = styled(Stack)`
  padding: 12px 0;
  display: flex;
  align-items: center;
`;

const ChannelIcon = styled("div")`
  padding-right: 8px;
  height: 26.5px;
  border-radius: 50%;
`;

const ChannelName = styled(Typography)`
  color: ${colors.textGrey};
  align-self: center;
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  overflow: hidden;
  max-height: 18px;
  -webkit-line-clamp: 1;
  display: flex;
`;

const Description = styled(Typography)`
  margin-bottom: 8px;
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  line-height: 18px;
  font-weight: 400;
  overflow: hidden;
  max-height: 36px;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  white-space: normal;
`;

export const HorizontalVideo = () => {
  return (
    <VideosRender>
      <Container direction="row">
        <ThumbnailContainer>
          <Thumbnail component="img" src={thumbnail} />
        </ThumbnailContainer>
        <InfoContainer>
          <Stack>
            <TitleContainer direction="row">
              <Title>Video Title</Title>
            </TitleContainer>
            <ViewsAndDate>51K views {"\u2022"} 2 weeks ago</ViewsAndDate>
          </Stack>
          <ChannelNameContainer direction="row">
            <ChannelIcon>
              <Avatar sx={{ width: "24px", height: "24px" }} />
            </ChannelIcon>
            <ChannelName>Ghost</ChannelName>
          </ChannelNameContainer>
          <Description>Hello this is the description!</Description>
        </InfoContainer>
      </Container>
    </VideosRender>
  );
};

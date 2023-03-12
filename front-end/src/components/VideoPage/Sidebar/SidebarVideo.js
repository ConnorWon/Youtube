import React from "react";
import { Stack, styled, Typography } from "@mui/material";
import thumbnail from "./youtube-thumbnail.png";
import { colors } from "../../ColorThemes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const MainContainer = styled(Stack)`
  position: relative;
  margin-top: var(--item-margin);
`;

const VideoContainer = styled(Stack)`
  width: 100%;
`;

const ThumbnailContainer = styled("div")`
  flex: none;
  position: relative;
  margin-right: 8px;
  height: 94px;
  width: 168px;
`;

const Thumbnail = styled("a")`
  text-decoration: none;
  border-radius: 8px;
  overflow: hidden;
  margin-right: auto;
  margin-left: auto;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
`;

const ThumbnailImage = styled("img")`
  min-height: 1px;
  min-width: 1px;
  height: 100%;
  width: 100%;
  background-color: transparent;
  object-fit: cover;
`;

const InfoContainer = styled(Stack)`
  width: 100%;
  min-width: 0;
  padding-right: 24px;
  box-sizing: border-box;
`;

const InfoAnchor = styled("a")`
  cursor: pointer;
  text-decoration: none;
  min-width: 0;
`;

const Title = styled(Typography)`
  color: ${colors.textWhite};
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  overflow: hidden;
  max-height: 40px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
`;

const Metadata = styled(Stack)`
  flex-wrap: wrap;
`;

const ChannelNameContainer = styled(Stack)`
  max-width: 100%;
  align-items: center;
`;

const MetadataText = styled(Typography)`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${colors.textGrey};
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
`;

const VerfiedContainer = styled(Stack)`
  align-items: center;
  margin-right: 8px;
`;

const VerfiedContainerInner = styled("div")`
  border-radius: 2px;
  padding-left: 4px;
  flex: none;
`;

export const SidebarVideo = () => {
  return (
    <MainContainer direction="row">
      <VideoContainer direction="row">
        <ThumbnailContainer>
          <Thumbnail>
            <ThumbnailImage src={thumbnail} />
          </Thumbnail>
        </ThumbnailContainer>
        <InfoContainer>
          <InfoAnchor>
            <Title>
              Reddit found his stolen car in 24 hours. Here's how | The Yard
            </Title>
            <Metadata>
              <ChannelNameContainer direction="row">
                <MetadataText>The Yard</MetadataText>
                <VerfiedContainer direction="row">
                  <VerfiedContainerInner>
                    <CheckCircleIcon
                      sx={{
                        width: "13px",
                        height: "13px",
                        color: colors.textGrey,
                      }}
                    />
                  </VerfiedContainerInner>
                </VerfiedContainer>
              </ChannelNameContainer>
              <MetadataText>236K views {"\u2022"} 2 days ago</MetadataText>
            </Metadata>
          </InfoAnchor>
        </InfoContainer>
      </VideoContainer>
    </MainContainer>
  );
};

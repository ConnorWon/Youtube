import React from "react";
import {
  SVMainContainer,
  VideoContainer,
  ThumbnailContainer,
  Thumbnail,
  ThumbnailImage,
  InfoContainer,
  InfoAnchor,
  Title,
  Metadata,
  MetadataText,
  ChannelNameContainer,
  VerfiedContainer,
  VerfiedContainerInner,
} from "./Styling";
import thumbnail from "../../../staticfiles/youtube-thumbnail.png";
import { colors } from "../../../utils/ColorThemes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const SidebarVideo = () => {
  return (
    <SVMainContainer direction="row">
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
    </SVMainContainer>
  );
};

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
  VerifiedContainer,
  VerifiedContainerInner,
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
                <VerifiedContainer direction="row">
                  <VerifiedContainerInner>
                    <CheckCircleIcon
                      sx={{
                        width: "13px",
                        height: "13px",
                        color: colors.textGrey,
                      }}
                    />
                  </VerifiedContainerInner>
                </VerifiedContainer>
              </ChannelNameContainer>
              <MetadataText>236K views {"\u2022"} 2 days ago</MetadataText>
            </Metadata>
          </InfoAnchor>
        </InfoContainer>
      </VideoContainer>
    </SVMainContainer>
  );
};

import { Box, styled } from "@mui/material";
import React from "react";
import thumbnail from "./youtube-thumbnail.png";

const Container = styled(Box)`
  height: 100%;
`;

const InnerContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ThumbnailContainer = styled(Box)`
  width: 100%;
  position: relative;
  height: 176.61px;
`;

const Thumbnail = styled(Box)`
  height: 100%;
`;

export const VideoContainer = () => {
  return (
    <Container>
      <InnerContainer>
        <ThumbnailContainer>
          <Thumbnail component="img" src={thumbnail} />
        </ThumbnailContainer>
      </InnerContainer>
    </Container>
  );
};

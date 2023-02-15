import React from "react";
import { Box, Stack, styled, Link, Button } from "@mui/material";
import { colors } from "../../../ColorThemes";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { VideoContainer } from "./VideoContainer";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const SubHeaderContainer = styled(Box)`
  margin-top: 24px;
`;

const SubHeaderInner = styled(Stack)`
  color: ${colors.textWhite};
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SubHeaderTitle = styled(Link)`
  text-decoration: none;
  color: ${colors.textWhite};
  display: flex;
  line-height: 22px;
  font-weight: 500;
  overflow: hidden;
  display: block;
  max-height: 22px;
  font-size: 16px;
  -webkit-line-clamp: 1;
`;

const PlayButton = styled(Button)`
  text-transform: none;
  display: inline-block;
  padding: 0 16px 0 12px;
  height: 36px;
  font-size: 14px;
  line-height: 22px;
  border-radius: 18px;
  color: ${colors.textWhite};
  align-items: center;

  & .MuiButton-startIcon {
    margin-left: 0;
    position: relative;
    top: 6px;

    &.css-1d6wzja-MuiButton-startIcon > *:nth-of-type(1) {
      font-size: 25px;
    }
  }

  :hover {
    background-color: rgba(63, 63, 63, 1);
  }
`;

const ContentContainer = styled(Stack)`
  margin-top: 24px;
  display: block;
  position: relative;
`;

const ScrollVideoContainer = styled(Box)`
  display: block;
  position: relative;
  max-width: auto;
  overflow: hidden;
`;

const ScrollVideoInnerContainer = styled(Box)`
  transform: translateX(0px);
  margin-bottom: 24px;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.05, 0, 0, 1);
  display: inline-block;
  white-space: nowrap;
`;

const VideoOuterContainer = styled(Box)`
  padding-right: 4px;
  display: inline-block;
  vertical-align: top;
  white-space: normal;
  width: 210px;
  position: relative;
`;

const ScrollButtonContainer = styled(Box)`
  position: absolute;
  top: 38px;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ScrollButton = styled(Button)`
  width: 40px;
  height: 40px;
  border-radius: 24px;
  background-color: #212121;
  box-shadow: 0 4px 4px rgb(0 0 0 / 30%), 0 0 4px rgb(0 0 0 /20%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colors.textWhite};
  flex: 1;
  flex-basis: 1e-9px;
  min-width: 0;
  padding: 8px 8px;

  :hover {
    background-color: rgba(77, 77, 77, 1);
  }
`;

const IconHolder = styled(Box)`
  width: 24px;
  height: 24px;
`;

const text = [
  "Video 1",
  "Video 2",
  "Video 3",
  "Video 4",
  "Video 5",
  "Video 6",
  "Video 7",
  "Video 8",
  "Video 1",
  "Video 2",
  "Video 3",
  "Video 4",
  "Video 5",
  "Video 6",
  "Video 7",
  "Video 8",
];

export const Home = () => {
  return (
    <div>
      <SubHeaderContainer sx={{ mt: "8px" }}>
        <SubHeaderInner direction="row">
          <Box>
            <SubHeaderTitle href="/channel/videos">Videos</SubHeaderTitle>
          </Box>
          <Box sx={{ ml: "4px" }}>
            <PlayButton startIcon={<PlayArrowIcon />} href="/channel/about">
              <Link
                sx={{
                  textDecoration: "none",
                  color: colors.textWhite,
                  position: "relative",
                  top: "-1.5px",
                }}
              >
                Play all
              </Link>
            </PlayButton>
          </Box>
        </SubHeaderInner>
      </SubHeaderContainer>
      <ContentContainer direction="row">
        <ScrollButtonContainer sx={{ left: "-21px" }}>
          <ScrollButton>
            <IconHolder>
              <KeyboardArrowLeftIcon />
            </IconHolder>
          </ScrollButton>
        </ScrollButtonContainer>
        <ScrollVideoContainer>
          <ScrollVideoInnerContainer>
            {text.map((t) => (
              <VideoOuterContainer>
                <VideoContainer />
              </VideoOuterContainer>
            ))}
          </ScrollVideoInnerContainer>
        </ScrollVideoContainer>
        <ScrollButtonContainer sx={{ right: "-16px" }}>
          <ScrollButton>
            <IconHolder>
              <KeyboardArrowRightIcon />
            </IconHolder>
          </ScrollButton>
        </ScrollButtonContainer>
      </ContentContainer>
    </div>
  );
};

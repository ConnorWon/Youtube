import React, { useState, useEffect } from "react";
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
  visibility: ${({ shift }) => (shift ? "hidden" : "visible")};
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

const HomeContainer = styled("div")`
  @media only screen and (min-width: 0px) {
    padding-right: calc((100% - 428px) / 2);
    padding-left: calc((100% - 428px) / 2);
  }

  @media only screen and (min-width: 686px) {
    padding-right: calc((100% - 642px) / 2);
    padding-left: calc((100% - 642px) / 2);
  }

  @media only screen and (min-width: 972px) {
    padding-right: calc((100% - 856px) / 2);
    padding-left: calc((100% - 856px) / 2);
  }

  @media only screen and (min-width: 1354px) {
    padding-right: calc((100% - 1070px) / 2);
    padding-left: calc((100% - 1070px) / 2);
  }

  @media only screen and (min-width: 1568px) {
    padding-right: calc((100% - 1284px) / 2);
    padding-left: calc((100% - 1284px) / 2);
  }
`;

const ScrollVideoInnerContainer = styled(Box)`
  margin-bottom: 24px;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.05, 0, 0, 1);
  display: inline-block;
  white-space: nowrap;
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
  const vidListSize = (text.length - 5) * 214;

  var shift = 0;

  // useEffect(() => {
  //   // var left = document.getElementById("left");
  // }, [])

  const handleClick = (direction) => {
    console.log("init: " + shift);
    var cont = document.getElementById("scroll");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    if (direction === "right") {
      if (-(shift - 1070) <= vidListSize) {
        shift = shift - 1070;
        right.style.visibility = "visible";
        left.style.visibility = "visible";
      } else {
        shift = -1 * vidListSize;
        right.style.visibility = "hidden";
      }
    } else {
      if (shift + 1070 <= 0) {
        shift = shift + 1070;
        right.style.visibility = "visible";
        left.style.visibility = "visible";
      } else {
        shift = 0;
        left.style.visibility = "hidden";
      }
    }
    cont.style.transform = "translateX(" + shift + "px)";
  };

  const [shiftValue, setShiftValue] = useState(0);

  return (
    <HomeContainer>
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
        <ScrollButtonContainer
          id="left"
          sx={{ left: "-21px" }}
          style={{ visibility: "hidden" }}
        >
          <ScrollButton onClick={() => handleClick("left")}>
            <IconHolder>
              <KeyboardArrowLeftIcon />
            </IconHolder>
          </ScrollButton>
        </ScrollButtonContainer>
        <ScrollVideoContainer>
          <ScrollVideoInnerContainer id="scroll">
            {text.map((t) => (
              <VideoOuterContainer>
                <VideoContainer />
              </VideoOuterContainer>
            ))}
          </ScrollVideoInnerContainer>
        </ScrollVideoContainer>
        <ScrollButtonContainer id="right" sx={{ right: "-16px" }}>
          <ScrollButton onClick={() => handleClick("right")}>
            <IconHolder>
              <KeyboardArrowRightIcon />
            </IconHolder>
          </ScrollButton>
        </ScrollButtonContainer>
      </ContentContainer>
    </HomeContainer>
  );
};

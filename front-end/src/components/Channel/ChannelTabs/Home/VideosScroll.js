import React from "react";
import { Box, Stack, styled, Button } from "@mui/material";
import { colors } from "../../../ColorThemes";
import { VideoContainer } from "../../../VerticalVideoContainer";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { SectionLabel } from "./SectionLabel";
import { ChannelContainer } from "./ChannelContainer";

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

const ScrollVideoInnerContainer = styled(Box)`
  margin-bottom: 24px;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.05, 0, 0, 1);
  display: inline-block;
  white-space: nowrap;
`;

export const VideosScroll = (props) => {
  const { text, divider, section } = props;
  const contLabel = section[0];
  const type = section[1];

  const vidListSize = text.length * 214;

  var shift = 0;

  const handleClick = (direction) => {
    var cont = document.getElementById("scroll" + contLabel);
    var left = document.getElementById("left" + contLabel);
    var right = document.getElementById("right" + contLabel);
    var outer = document.getElementById("outer" + contLabel);
    var adjust = outer.clientWidth;
    var maxSize = vidListSize - adjust;

    if (direction === "right") {
      if (-(shift - adjust) <= maxSize) {
        shift = shift - adjust;
        right.style.visibility = "visible";
        left.style.visibility = "visible";
      } else {
        shift = -1 * maxSize;
        right.style.visibility = "hidden";
      }
    } else {
      if (shift + adjust <= 0) {
        shift = shift + adjust;
        right.style.visibility = "visible";
        left.style.visibility = "visible";
      } else {
        shift = 0;
        left.style.visibility = "hidden";
      }
    }
    cont.style.transform = "translateX(" + shift + "px)";
  };

  const MainContainer = styled("div")`
    border-top: ${({ divider }) =>
      divider ? "1px solid rgba(255, 255, 255, 0.2)" : "unset"};
  `;

  return (
    <MainContainer divider={divider}>
      <SectionLabel type={type} />
      <ContentContainer direction="row">
        <ScrollButtonContainer
          id={"left" + contLabel}
          sx={{ left: "-21px" }}
          style={{ visibility: "hidden" }}
        >
          <ScrollButton onClick={() => handleClick("left")}>
            <IconHolder>
              <KeyboardArrowLeftIcon />
            </IconHolder>
          </ScrollButton>
        </ScrollButtonContainer>
        <ScrollVideoContainer id={"outer" + contLabel}>
          <ScrollVideoInnerContainer id={"scroll" + contLabel}>
            {text.map((t) => (
              <VideoOuterContainer>
                {type ? (
                  <VideoContainer inChannel={"true"} inChannelHome={"true"} />
                ) : (
                  <ChannelContainer />
                )}
              </VideoOuterContainer>
            ))}
          </ScrollVideoInnerContainer>
        </ScrollVideoContainer>
        <ScrollButtonContainer id={"right" + contLabel} sx={{ right: "-16px" }}>
          <ScrollButton onClick={() => handleClick("right")}>
            <IconHolder>
              <KeyboardArrowRightIcon />
            </IconHolder>
          </ScrollButton>
        </ScrollButtonContainer>
      </ContentContainer>
    </MainContainer>
  );
};

import React from "react";
import {
  VSMainContainer,
  VSContentContainer,
  ScrollVideoContainer,
  VideoOuterContainer,
  ScrollButtonContainer,
  ScrollButton,
  IconHolder,
  ScrollVideoInnerContainer,
} from "./Styling";
import { VideoContainer } from "../../../VerticalVideoContainer";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { SectionLabel } from "./SectionLabel";
import { ChannelContainer } from "./ChannelContainer";

export const VideosScroll = (props) => {
  const { text, divider, section } = props;

  // used to differentiate the ids of different scroll components
  const contLabel = section[0];

  // used to determine if video or channel scroll
  const type = section[1];

  // size of inner scroll container (based on number of videos in inner scroll container)
  const vidListSize = text.length * 214;

  // current shift value of scroll inner scroll container
  var shift = 0;

  // handles scrolling the video scroll container when one of the scroll buttons is pressed
  const handleClick = (direction) => {
    var cont = document.getElementById("scroll" + contLabel);
    var left = document.getElementById("left" + contLabel);
    var right = document.getElementById("right" + contLabel);
    var outer = document.getElementById("outer" + contLabel);
    var adjust = outer.clientWidth;
    var maxSize = vidListSize - adjust;

    if (direction === "right") {
      if (-(shift - adjust) < maxSize) {
        shift = shift - adjust;
        right.style.visibility = "visible";
        left.style.visibility = "visible";
      } else {
        shift = -1 * maxSize;
        right.style.visibility = "hidden";
      }
    } else {
      if (shift + adjust < 0) {
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

  return (
    <VSMainContainer divider={divider}>
      <SectionLabel type={type} />
      <VSContentContainer direction="row">
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
      </VSContentContainer>
    </VSMainContainer>
  );
};

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
import { VideoContainer } from "../../../../components/VerticalVideoContainer";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { SectionLabel } from "./SectionLabel";
import { ChannelContainer } from "./ChannelContainer";
import {FC} from "react";

interface VideosScrollProps {
  dummyData: string[],
  hasDivider: boolean,
  containerIndex: string,
  isVideoSection: boolean
}

export const VideosScroll: FC<VideosScrollProps> = (props) => {
  const { dummyData, hasDivider, containerIndex, isVideoSection } = props;

  // size of inner scroll container (based on number of videos in inner scroll container)
  const vidListSize = dummyData.length * 214;

  // current shift value of scroll inner scroll container
  let shift = 0;

  // handles scrolling the video scroll container when one of the scroll buttons is pressed
  const handleClick = (direction: string) => {
    let cont = document.getElementById("scroll" + containerIndex);
    let left = document.getElementById("left" + containerIndex);
    let right = document.getElementById("right" + containerIndex);
    let outer = document.getElementById("outer" + containerIndex);
    let adjust = outer!.clientWidth;
    let maxSize = vidListSize - adjust;

    if (direction === "right") {
      if (-(shift - adjust) < maxSize) {
        shift = shift - adjust;
        right!.style.visibility = "visible";
        left!.style.visibility = "visible";
      } else {
        shift = -1 * maxSize;
        right!.style.visibility = "hidden";
      }
    } else {
      if (shift + adjust < 0) {
        shift = shift + adjust;
        right!.style.visibility = "visible";
        left!.style.visibility = "visible";
      } else {
        shift = 0;
        left!.style.visibility = "hidden";
      }
    }
    cont!.style.transform = "translateX(" + shift + "px)";
  };

  return (
    <VSMainContainer hasDivider={hasDivider}>
      <SectionLabel isVideoSection={isVideoSection} />
      <VSContentContainer direction="row">
        <ScrollButtonContainer
          id={"left" + containerIndex}
          sx={{ left: "-21px" }}
          style={{ visibility: "hidden" }}
        >
          <ScrollButton onClick={() => handleClick("left")}>
            <IconHolder>
              <KeyboardArrowLeftIcon />
            </IconHolder>
          </ScrollButton>
        </ScrollButtonContainer>
        <ScrollVideoContainer id={"outer" + containerIndex}>
          <ScrollVideoInnerContainer id={"scroll" + containerIndex}>
            {dummyData.map(() => (
              <VideoOuterContainer>
                {isVideoSection ? (
                  <VideoContainer inChannel={true} inChannelHome={true} />
                ) : (
                  <ChannelContainer />
                )}
              </VideoOuterContainer>
            ))}
          </ScrollVideoInnerContainer>
        </ScrollVideoContainer>
        <ScrollButtonContainer id={"right" + containerIndex} sx={{ right: "-16px" }}>
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

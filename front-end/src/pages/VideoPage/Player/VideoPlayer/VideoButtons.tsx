import {FC, useState} from "react";
import {
  VideoButtonsContainer,
  LeftButtons,
  SkipButton,
  PlayButton,
  VolumeContainer,
  VolumeButton,
  VolumeSlider,
  VolumeSliderCollapse,
  VolumeSliderContainer,
  TimeContainer,
  Time,
  ChapterButton,
  ChapterContainer,
  ChapterChevron,
  ChapterPrefix,
  ChapterName,
  RightButton,
  RightButtons,
  AutoPlay,
} from "./Styling";
// import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import {VIDEO_CONTROL_RIGHT_SIDE_BUTTONS} from "../../../../utils/Constants";

interface VideoButtonsProps {
  volumeVal: number,
  handleMute: () => void,
  handleVolumeChange: (event: Event, value: number | number[], activeThumb: number) => void,
  visualTime: string,
  handleFullScreen: () => void,
  handlePlay: () => void,
  play: boolean,
  visualDuration: string
}

export const VideoButtons: FC<VideoButtonsProps> = (props) => {
  // state for opening volume slider
  const [open, setOpen] = useState<boolean>(false);

  // state that determines if prev button should show
  // const [prevBtn, setPrevBtn] = useState<boolean>(false);  TODO: possibly add this functionality

  const {
    volumeVal,
    handleMute,
    handleVolumeChange,
    visualTime,
    handleFullScreen,
    handlePlay,
    play,
    visualDuration,
  } = props;

  return (
    <VideoButtonsContainer direction="row">
      <LeftButtons direction="row">
        {/*{prevBtn && (*/}
        {/*  <SkipButton>*/}
        {/*    <SkipPreviousIcon*/}
        {/*      sx={{ height: "inherit", width: "inherit" }}*/}
        {/*      viewBox="-5 -5 36 36"*/}
        {/*    />*/}
        {/*  </SkipButton>*/}
        {/*)}*/}
        {!play ? (
          <PlayButton onClick={() => handlePlay()}>
            <PlayArrowIcon
              sx={{ height: "inherit", width: "inherit" }}
              viewBox="-5 -5 36 36"
            />
          </PlayButton>
        ) : (
          <PlayButton onClick={() => handlePlay()}>
            <PauseIcon
              sx={{ height: "inherit", width: "inherit" }}
              viewBox="-5 -5 36 36"
            />
          </PlayButton>
        )}
        <SkipButton>
          <SkipNextIcon
            sx={{ height: "inherit", width: "inherit" }}
            viewBox="-5 -5 36 36"
          />
        </SkipButton>
        <VolumeContainer
          direction="row"
          onMouseOver={() => {
            setOpen(true);
          }}
          onMouseLeave={() => {
            setOpen(false);
          }}
        >
          {!(volumeVal === 0) ? (
            <VolumeButton onClick={handleMute}>
              <VolumeUpIcon
                sx={{ height: "inherit", width: "inherit" }}
                viewBox="-9 -9 44 44"
              />
            </VolumeButton>
          ) : (
            <VolumeButton onClick={handleMute}>
              <VolumeOffIcon
                sx={{ height: "inherit", width: "inherit" }}
                viewBox="-9 -9 44 44"
              />
            </VolumeButton>
          )}
          <VolumeSliderCollapse
            in={open}
            timeout="auto"
            orientation="horizontal"
          >
            <VolumeSliderContainer>
              <VolumeSlider
                orientation="horizontal"
                size="small"
                value={volumeVal}
                onChange={handleVolumeChange}
              />
            </VolumeSliderContainer>
          </VolumeSliderCollapse>
        </VolumeContainer>
        <TimeContainer>
          <Time>
            {visualTime} / {visualDuration}
          </Time>
        </TimeContainer>
        <ChapterContainer>
          <ChapterButton direction="row">
            <ChapterPrefix>{"\u2022"}</ChapterPrefix>
            <ChapterName>intro</ChapterName>
            <ChapterChevron>
              <ChevronRightIcon />
            </ChapterChevron>
          </ChapterButton>
        </ChapterContainer>
      </LeftButtons>
      <RightButtons direction="row">
        <AutoPlay />
        {VIDEO_CONTROL_RIGHT_SIDE_BUTTONS.map((btn) => <RightButton>{btn}</RightButton>)}
        <RightButton onClick={() => handleFullScreen()}>
          <FullscreenIcon />
        </RightButton>
      </RightButtons>
    </VideoButtonsContainer>
  );
};

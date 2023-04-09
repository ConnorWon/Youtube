import React, { useState } from "react";
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
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import SettingsIcon from "@mui/icons-material/Settings";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CropLandscapeIcon from "@mui/icons-material/CropLandscape";
import CastIcon from "@mui/icons-material/Cast";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

export const VideoButtons = (props) => {
  // state for opening volume slider
  const [open, setOpen] = useState(false);

  // state that determines if prev button should show
  const [prevBtn, setPrevBtn] = useState(false);

  // state that determines if cast button should show
  const [cast, setCast] = useState(false);

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

  // array that holds the different video buttons
  const rightBtns = [
    [true, <ClosedCaptionIcon />],
    [true, <SettingsIcon />],
    [true, <BrandingWatermarkIcon />],
    [cast, <CastIcon />],
    [true, <CropLandscapeIcon />],
  ];

  return (
    <VideoButtonsContainer direction="row">
      <LeftButtons direction="row">
        {prevBtn && (
          <SkipButton>
            <SkipPreviousIcon
              sx={{ height: "inherit", width: "inherit" }}
              viewBox="-5 -5 36 36"
            />
          </SkipButton>
        )}
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
        {rightBtns.map((btn) => btn[0] && <RightButton>{btn[1]}</RightButton>)}
        <RightButton onClick={() => handleFullScreen()}>
          <FullscreenIcon />
        </RightButton>
      </RightButtons>
    </VideoButtonsContainer>
  );
};

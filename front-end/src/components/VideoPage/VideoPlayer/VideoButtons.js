import React, { useState } from "react";
import {
  Link,
  Stack,
  styled,
  Typography,
  Collapse,
  Slider,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { colors } from "../../ColorThemes";

const VideoButtonsContainer = styled(Stack)`
  height: 48px;
  line-height: 48px;
  font-size: 109%;
  text-align: left;
`;

const LeftButtons = styled(Stack)`
  height: 100%;
  float: left;
  display: flex;
  -webkit-box-flex: 1;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SkipButton = styled(Link)`
  height: 100%;
  opacity: 0.9;
  display: inline-block;
  width: 48px;
  padding: 0 2px;
  transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  outline: 0;
  flex: 0 0 auto;
  border: none;
  background-color: transparent;
  text-align: inherit;
  font-size: 2rem;
  font-family: inherit;
  line-height: inherit;
`;

const PlayButton = styled("div")`
  border: none;
  background-color: transparent;
  color: inherit;
  text-align: inherit;
  font-size: 2rem;
  font-family: inherit;
  line-height: inherit;
  outline: 0;
  flex: 0 0 auto;
  padding: 0 2px;
  transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
  overflow: hidden;
  opacity: 0.9;
  display: inline-block;
  height: 100%;
  width: 46px;
`;

const VolumeContainer = styled(Stack)`
  ${
    "" /* color: inherit;
  text-align: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit; */
  }
`;

const VolumeButton = styled("div")`
  border: none;
  background-color: transparent;
  color: inherit;
  text-align: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  outline: 0;
  width: 48px;
  transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
  overflow: hidden;
  opacity: 0.9;
  display: inline-block;
  cursor: pointer;
`;

const VolumeSliderCollapse = styled(Collapse)``;

const VolumeSliderContainer = styled(Stack)`
  height: 100%;
  min-height: 36px;
  position: relative;
  -webkit-user-drag: element;
  user-select: none;
  width: 50px;
  justify-content: center;
  padding-right: 10px;
`;

const VolumeSlider = styled(Slider)`
  color: ${colors.textWhite};
`;

const TimeContainer = styled(Stack)`
  font-size: 109%;
  padding: 0 5px;
  white-space: nowrap;
  line-height: 47px;
  justify-content: center;
`;

const Time = styled(Typography)`
  font-size: inherit;
  font-family: Roboto;
  color: ${colors.textWhite};
`;

const ChapterContainer = styled(Stack)`
  float: left;
  flex: 0 1 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
  font-size: 109%;
  justify-content: center;
  padding: 0 5px 0 0;
  white-space: nowrap;
  line-height: 47px;
`;

const ChapterButton = styled(Stack)`
  cursor: pointer;
  width: 100%;
  align-items: center;
  height: 100%;
  color: inherit;
  text-align: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
`;

const ChapterPrefix = styled(Typography)`
  text-align: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  padding-right: 5px;
`;

const ChapterName = styled(Typography)`
  flex: 0 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
`;

const ChapterChevron = styled(Stack)`
  flex: 0 0 20px;
  width: 20px;
  justify-content: center;
  margin-left: -2px;
`;

export const VideoButtons = () => {
  const [open, setOpen] = useState(false);
  const [volumeVal, setVolumeVal] = useState(30);

  const handleVolumeChange = (event, newValue) => {
    setVolumeVal(newValue);
  };

  return (
    <VideoButtonsContainer direction="row">
      <LeftButtons direction="row">
        <SkipButton>
          <SkipPreviousIcon
            sx={{ height: "inherit", width: "inherit" }}
            viewBox="-5 -5 36 36"
          />
        </SkipButton>
        <PlayButton>
          <PlayArrowIcon
            sx={{ height: "inherit", width: "inherit" }}
            viewBox="-5 -5 36 36"
          />
        </PlayButton>
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
          <VolumeButton>
            <VolumeUpIcon
              sx={{ height: "inherit", width: "inherit" }}
              viewBox="-9 -9 44 44"
            />
          </VolumeButton>
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
          <Time>0:00 / 6:40</Time>
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
    </VideoButtonsContainer>
  );
};

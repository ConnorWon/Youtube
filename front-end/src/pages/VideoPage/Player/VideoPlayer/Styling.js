import {
  Stack,
  Box,
  styled,
  LinearProgress,
  Link,
  Typography,
  Collapse,
  Slider,
  Switch,
} from "@mui/material";
import { colors } from "../../../../utils/ColorThemes";

// VideoPlayer Styling

export const Player = styled(Stack)`
  position: relative;
`;

export const OuterPlayerContainer = styled(Box)`
  max-width: var(--max-player-width);
  min-width: var(--min-player-width);
`;

export const PlayerContainer = styled(Stack)`
  position: relative;
  padding-top: calc(var(--height-ratio) / var(--width-ratio) * 100%);
`;

export const InnerPlayerContainer = styled(Stack)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const VideoPlayerContainer = styled(Stack)`
  display: block;
  width: 100%;
  height: 100%;
`;

export const VideoPlayerComponent = styled(Stack)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  outline: 0;
  font-family: Roboto;
  color: #eee;
  text-align: left;
  font-size: 11px;
  line-height: 1.3;
  -webkit-font-smoothing: antialiased;
`;

export const VideoHolder = styled(Stack)`
  z-index: 10;
  position: relative;
`;

export const VideoMenu = styled(Stack)`
  width: calc(100% - 24px);
  left: 12px;
  transition: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);
  height: 48px;
  z-index: 59;
  padding-top: 3px;
  text-align: left;
  position: absolute;
  text-shadow: 0 0 2px rgb(0 0 0 / 50%);
  bottom: 0;
  display: none;
`;

export const Video = styled("video")`
  object-fit: cover;
  position: absolute;
  display: block;
  width: ${({ fs }) => (fs ? "unset" : "100%")};
  top: 0;
  left: 0;
`;

export const ProgressBarContainer = styled(Stack)`
  cursor: pointer;
  display: block;
  position: absolute;
  width: 100%;
  bottom: 47px;
  height: 5px;
`;

export const ProgressBarComponent = styled(Stack)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 31;
  outline: none;
  -webkit-user-drag: element;
  user-select: none;
`;

export const Bar = styled(LinearProgress)`
  background: ${colors.borderColor};
  .MuiLinearProgress-bar {
    transition: transform 0.1s cubic-bezier(0.4, 0, 1, 1);
  }

  .MuiLinearProgress-bar1Buffer {
    background-color: ${colors.youtubeRed};
  }
  .MuiLinearProgress-bar2Buffer {
    background-color: rgba(255, 255, 255, 0.4);
  }
  .MuiLinearProgress-dashed {
    background-image: none;
  }
`;

export const HoverProgress = styled("span")`
  background: rgba(255, 255, 255, 0.6);
  background-image: none;
  position: absolute;
  transform: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);
  opacity: 0;
  animation: none;
  transform-origin: 0 0;
  width: 100%;
  height: calc(100% - 1px);
  z-index: 0;
`;

// VideoButtons Styling

export const VideoButtonsContainer = styled(Stack)`
  height: 48px;
  line-height: 48px;
  font-size: 109%;
  text-align: left;
`;

export const LeftButtons = styled(Stack)`
  height: 100%;
  float: left;
  display: flex;
  -webkit-box-flex: 1;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SkipButton = styled(Link)`
  cursor: pointer;
  height: 100%;
  opacity: 0.9;
  display: inline-block;
  width: 48px;
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

export const PlayButton = styled("div")`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: inherit;
  text-align: inherit;
  font-size: 2rem;
  font-family: inherit;
  line-height: inherit;
  outline: 0;
  flex: 0 0 auto;
  transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
  overflow: hidden;
  opacity: 0.9;
  display: inline-block;
  height: 100%;
  width: 46px;
`;

export const VolumeContainer = styled(Stack)``;

export const VolumeButton = styled("div")`
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

export const VolumeSliderCollapse = styled(Collapse)``;

export const VolumeSliderContainer = styled(Stack)`
  height: 100%;
  min-height: 36px;
  position: relative;
  -webkit-user-drag: element;
  user-select: none;
  width: 50px;
  justify-content: center;
  padding-right: 10px;
`;

export const VolumeSlider = styled(Slider)`
  color: ${colors.textWhite};
`;

export const TimeContainer = styled(Stack)`
  font-size: 109%;
  padding: 0 5px;
  white-space: nowrap;
  line-height: 47px;
  justify-content: center;
`;

export const Time = styled(Typography)`
  font-size: inherit;
  font-family: Roboto;
  color: ${colors.textWhite};
`;

export const ChapterContainer = styled(Stack)`
  float: left;
  flex: 0 1 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
  font-size: 109%;
  justify-content: center;
  white-space: nowrap;
  line-height: 47px;
`;

export const ChapterButton = styled(Stack)`
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

export const ChapterPrefix = styled(Typography)`
  text-align: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  padding-right: 5px;
`;

export const ChapterName = styled(Typography)`
  flex: 0 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
`;

export const ChapterChevron = styled(Stack)`
  flex: 0 0 20px;
  width: 20px;
  justify-content: center;
  margin-left: -2px;
`;

export const RightButtons = styled(Stack)`
  height: 100%;
  float: right;
  align-items: center;
`;

export const AutoPlay = styled(Switch)(({}) => ({
  "& .MuiSwitch-switchBase + .MuiSwitch-track": {
    backgroundColor: "rgb(256, 256, 256)",
  },
  "& .MuiSwitch-switchBase": {
    color: "rgb(90, 90, 90)",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "rgb(256, 256, 256)",
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "rgb(256, 256, 256)",
  },
}));

export const RightButton = styled(Stack)`
  cursor: pointer;
  position: relative;
  height: 100%;
  opacity: 0.9;
  width: 48px;
  transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
  overflow: hidden;
  border: none;
  background-color: transparent;
  color: white;
  text-align: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  justify-content: center;
  align-items: center;
`;

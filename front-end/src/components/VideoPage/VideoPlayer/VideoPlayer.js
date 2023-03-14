import React, { useEffect, useState } from "react";
import { Stack, Box, styled, LinearProgress } from "@mui/material";
import { VideoButtons } from "./VideoButtons";
import movie from "./test.MOV";
import { colors } from "../../ColorThemes";

const Player = styled(Stack)`
  position: relative;
`;

const OuterPlayerContainer = styled(Box)`
  max-width: var(--max-player-width);
  min-width: var(--min-player-width);
  margin: 0 auto;
`;

const PlayerContainer = styled(Stack)`
  position: relative;
  padding-top: calc(var(--height-ratio) / var(--width-ratio) * 100%);
`;

const InnerPlayerContainer = styled(Stack)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const VideoPlayerContainer = styled(Stack)`
  display: block;
  width: 100%;
  height: 100%;
`;

const VideoPlayerComponent = styled(Stack)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  outline: 0;
  font-family: Roboto;
  color: #eee;
  text-align: left;
  ${"" /* direction: "row" */}
  font-size: 11px;
  line-height: 1.3;
  -webkit-font-smoothing: antialiased;
`;

const VideoHolder = styled(Stack)`
  z-index: 10;
  position: relative;
`;

const VideoMenu = styled(Stack)`
  width: calc(100% - 24px);
  left: 12px;
  transition: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);
  height: 48px;
  z-index: 59;
  padding-top: 3px;
  text-align: left;
  position: absolute;
  text-shadow: 0 0 2px rgb(0 0 0 / 50%);
  ${"" /* direction: "row" */}
  bottom: 0;
  display: none;
`;

const Video = styled("video")`
  object-fit: cover;
  position: absolute;
  display: block;
  width: ${({ fs }) => (fs ? "unset" : "640px")};
  height: ${({ fs }) => (fs ? "unset" : "360px")};
  top: 0;
  left: 0;
`;

const ProgressBarContainer = styled(Stack)`
  cursor: pointer;
  display: block;
  position: absolute;
  width: 100%;
  bottom: 47px;
  height: 5px;
`;

const ProgressBarComponent = styled(Stack)`
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

const Bar = styled(LinearProgress)`
  background: ${colors.borderColor};
  :hover {
    background: rgba(255, 255, 255, 0.6);
  }
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
    display: none;
  }
`;

export const VideoPlayer = () => {
  // play/pause controls
  const [play, setPlay] = useState(false);

  const handlePlay = () => {
    const video = document.getElementById("video");
    if (video.paused || video.ended) {
      video.play();
      setPlay(true);
    } else {
      video.pause();
      setPlay(false);
    }
  };

  // volume controls
  const [volumeVal, setVolumeVal] = useState(100);
  const [lastVol, setLastVol] = useState(100);

  const handleVolumeChange = (event, newValue) => {
    setLastVol(volumeVal);
    setVolumeVal(newValue);
    const video = document.getElementById("video");
    video.volume = volumeVal / 100;
  };

  const handleMute = (event) => {
    const video = document.getElementById("video");
    if (volumeVal === 0) {
      if (lastVol === 1) {
        setVolumeVal(100);
        video.volume = 1;
      } else {
        setVolumeVal(lastVol);
        video.volume = lastVol / 100;
      }
    } else {
      setVolumeVal(0);
      video.volume = 0;
    }
  };

  // progress bar
  const [time, setTime] = useState(0);
  const [visualTime, setVisualTime] = useState("0:00");
  const [visualDuration, setVisualDuration] = useState("0:00");

  const handleTime = (time, duration) => {
    handleVideoTimer(time, setVisualTime);
    setTime((time / duration) * 100);
  };

  const handleVideoTimer = (time, func) => {
    const hour = Math.floor(time / 3600);
    const min = Math.floor(time / 60);
    const sec = Math.floor(time);

    const hourStr = hour ? hour + ":" : "";
    const minStr = hour ? (min < 10 ? "0" + min : min) : min;
    const secStr = sec < 10 ? "0" + sec : sec;
    func(hourStr + minStr + ":" + secStr);
  };

  // fullscreen controls
  const [fs, setFs] = useState(false);

  const handleFullScreen = () => {
    const videoContainer = document.getElementById("videoContainer");
    if (document.fullscreenElement !== null) {
      document.exitFullscreen();
      videoContainer.setAttribute("data-fullscreen", false);
      setFs(false);
    } else {
      videoContainer.requestFullscreen();
      videoContainer.setAttribute("data-fullscreen", true);
      setFs(true);
    }
  };

  useEffect(() => {
    const videoControls = document.getElementById("videoControls");
    const video = document.getElementById("video");
    video.controls = false;
    videoControls.style.display = "flex";
  }, []);

  return (
    <Player>
      <OuterPlayerContainer>
        <PlayerContainer>
          <InnerPlayerContainer>
            <VideoPlayerContainer>
              <VideoPlayerComponent id="videoContainer">
                <VideoHolder>
                  <Video
                    controls
                    preload="metadata"
                    id="video"
                    src={movie}
                    onTimeUpdate={(e) =>
                      handleTime(e.target.currentTime, e.target.duration)
                    }
                    fs={fs}
                    onLoadedMetadata={(e) =>
                      handleVideoTimer(e.target.duration, setVisualDuration)
                    }
                    onEnded={() => setPlay(false)}
                    onClick={() => handlePlay()}
                  />
                </VideoHolder>
                {/* buffer corresponds to video loaded from database */}
                <VideoMenu id="videoControls">
                  <ProgressBarContainer>
                    <ProgressBarComponent>
                      <Bar
                        variant="buffer"
                        value={time}
                        valueBuffer={time + 5}
                        onMou
                      />
                    </ProgressBarComponent>
                  </ProgressBarContainer>
                  <VideoButtons
                    volumeVal={volumeVal}
                    handleMute={handleMute}
                    lastVol={lastVol}
                    handleVolumeChange={handleVolumeChange}
                    visualTime={visualTime}
                    handleFullScreen={handleFullScreen}
                    handlePlay={handlePlay}
                    play={play}
                    visualDuration={visualDuration}
                  />
                </VideoMenu>
              </VideoPlayerComponent>
            </VideoPlayerContainer>
          </InnerPlayerContainer>
        </PlayerContainer>
      </OuterPlayerContainer>
    </Player>
  );
};

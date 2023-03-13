import React, { useEffect, useState } from "react";
import { Stack, Box, styled } from "@mui/material";
import { ProgressBar } from "./ProgressBar";
import { VideoButtons } from "./VideoButtons";
import movie from "./test.MOV";

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
  width: 640px;
  height: 360px;
  top: 0;
  left: 0;
`;

export const VideoPlayer = () => {
  // var video = null;

  // const videoRef = (el) => {
  //   video = el;
  // };

  var play = null;
  var mute = null;
  var vol = null;
  var fullscreen = null;

  const playRef = (el) => {
    play = el;
  };
  const muteRef = (el) => {
    mute = el;
  };
  const volRef = (el) => {
    vol = el;
  };
  const fullscreenRef = (el) => {
    fullscreen = el;
  };

  const refs = [playRef, muteRef, volRef, fullscreenRef];

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

  useEffect(() => {
    const videoControls = document.getElementById("videoControls");
    const video = document.getElementById("video");
    video.controls = false;
    videoControls.style.display = "flex";

    play.addEventListener("click", (e) => {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    });
  }, []);

  return (
    <Player>
      <OuterPlayerContainer>
        <PlayerContainer>
          <InnerPlayerContainer>
            <VideoPlayerContainer>
              <VideoPlayerComponent>
                <VideoHolder>
                  <Video controls preload="metadata" id="video" src={movie} />
                </VideoHolder>
                {/* connect video with personal video controls */}
                <VideoMenu id="videoControls">
                  <ProgressBar />
                  <VideoButtons
                    refs={refs}
                    volumeVal={volumeVal}
                    handleMute={handleMute}
                    lastVol={lastVol}
                    handleVolumeChange={handleVolumeChange}
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

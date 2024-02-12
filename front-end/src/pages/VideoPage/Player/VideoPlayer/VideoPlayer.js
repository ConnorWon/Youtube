import React, { useEffect, useRef, useState } from "react";
import {
  Player,
  OuterPlayerContainer,
  PlayerContainer,
  InnerPlayerContainer,
  VideoPlayerContainer,
  VideoPlayerComponent,
  VideoHolder,
  VideoMenu,
  Video,
  ProgressBarContainer,
  ProgressBarComponent,
  Bar,
  HoverProgress,
} from "./Styling";
import { VideoButtons } from "./VideoButtons";
import movie from "../../../../staticfiles/test.MOV";

export const VideoPlayer = (props) => {
  const { noMiniSideBar } = props;

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

  // changes position of progress bar accordingly
  const handleTime = (time, duration) => {
    const prog = document.getElementById("progress-bar");
    handleVideoTimer(time, setVisualTime);
    setTime((time / duration) * 100);
    const hp = document.getElementById("hover-progress");
    hp.style.left = (time / duration) * prog.offsetWidth + "px";
    setHoverPos((time / duration) * prog.offsetWidth);
  };

  // changes the displayed video time as video plays
  const handleVideoTimer = (time, func) => {
    const hour = Math.floor(time / 3600);
    const min = Math.floor(time / 60);
    const sec = Math.floor(time);

    const hourStr = hour ? hour + ":" : "";
    const minStr = hour ? (min < 10 ? "0" + min : min) : min;
    const secStr = sec < 10 ? "0" + sec : sec;
    func(hourStr + minStr + ":" + secStr);
  };

  // tracking where the progress bar's left side is in terms of the window
  const [elLeft, setElLeft] = useState();

  // changes the progress bar to the location where user clicked progress bar
  const handleProgressChange = (el) => {
    const pos = el.clientX - elLeft.left;
    setTime((pos / el.target.offsetWidth) * 100);
    const video = document.getElementById("video");
    video.currentTime = (pos / el.target.offsetWidth) * video.duration;
  };

  // tracks position of where user mouse is hovering (when user not hovering state is where progress bar is)
  const [hoverPos, setHoverPos] = useState(0);

  // moves the hover progress bar according to user's mouse position
  const handleMouseMove = (el) => {
    const hp = document.getElementById("hover-progress");
    const pos = el.clientX - elLeft.left;
    const scaleVal =
      pos / el.target.offsetWidth - hoverPos / el.target.offsetWidth;
    hp.style.transform = "scaleX(" + scaleVal + ")";
  };

  // function that turns on/off display of hover progress bar
  const handleMouseEnter = (val) => {
    const hp = document.getElementById("hover-progress");
    hp.style.opacity = val;
  };

  // ref used to hold the resizeObserver that observes the progress bar
  const resizer = useRef(0);

  // changes value of elLeft when the window resizes
  const monitorResize = () => {
    const progressBar = document.getElementById("progress-bar");
    setElLeft(progressBar.getBoundingClientRect());
  };

  // used to initially set elLeft and to init the resizeObserver
  useEffect(() => {
    const progressBar = document.getElementById("progress-bar");
    setElLeft(progressBar.getBoundingClientRect());
    resizer.current = new ResizeObserver(monitorResize);
    resizer.current.observe(progressBar);
  }, [noMiniSideBar]);

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

  // setup for custom controls
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
                      <HoverProgress id="hover-progress" />
                      <Bar
                        variant="buffer"
                        value={time}
                        valueBuffer={time + 5}
                        onClick={(e) => handleProgressChange(e)}
                        onMouseMove={(e) => handleMouseMove(e)}
                        onMouseEnter={(e) => handleMouseEnter("1")}
                        onMouseLeave={(e) => handleMouseEnter("0")}
                        time={time}
                        id="progress-bar"
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

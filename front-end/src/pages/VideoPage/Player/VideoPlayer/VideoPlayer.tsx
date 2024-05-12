import {Dispatch, FC, SetStateAction, MouseEvent, useEffect, useRef, useState} from "react";
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

export const VideoPlayer: FC<{noMiniSideBar: boolean}> = (props) => {
  const { noMiniSideBar } = props;

  // play/pause controls
  const [play, setPlay] = useState<boolean>(false);

  const handlePlay = () => {
    const video = document.getElementById("video") as HTMLVideoElement;
    if (video.paused || video.ended) {
      video.play()
          .then(() => {
            setPlay(true);
          });
    } else {
      video.pause();
      setPlay(false);
    }
  };

  // volume controls
  const [volumeVal, setVolumeVal] = useState<number>(100);
  const [lastVol, setLastVol] = useState<number>(100);

  const handleVolumeChange = (_event: Event, value: number | number[], _activeThumb: number) => {
    setLastVol(volumeVal);
    setVolumeVal(value as number);
    const video = document.getElementById("video") as HTMLVideoElement;
    video.volume = volumeVal / 100;
  };

  const handleMute = () => {
    const video = document.getElementById("video") as HTMLVideoElement;
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
  const [time, setTime] = useState<number>(0);
  const [visualTime, setVisualTime] = useState<string>("0:00");
  const [visualDuration, setVisualDuration] = useState<string>("0:00");

  // tracks position of where user mouse is hovering (when user not hovering state is where progress bar is)
  const [hoverPos, setHoverPos] = useState<number>(0);

  // changes the displayed video time as video plays
  const handleVideoTimer = (time: number, func: Dispatch<SetStateAction<string>>) => {
    const hour = Math.floor(time / 3600);
    const min = Math.floor(time / 60);
    const sec = Math.floor(time);

    const hourStr = hour ? hour + ":" : "";
    const minStr = hour ? (min < 10 ? "0" + min : min) : min;
    const secStr = sec < 10 ? "0" + sec : sec;
    func(hourStr + minStr + ":" + secStr);
  };

  // changes position of progress bar accordingly
  const handleTime = (element: HTMLVideoElement) => {
    const time = element.currentTime;
    const duration = element.duration
    const prog = document.getElementById("progress-bar") as HTMLElement;
    handleVideoTimer(time, setVisualTime);
    setTime((time / duration) * 100);
    const hp = document.getElementById("hover-progress") as HTMLElement;
    hp.style.left = (time / duration) * prog.offsetWidth + "px";
    setHoverPos((time / duration) * prog.offsetWidth);
  };

  // tracking where the progress bar's left side is in terms of the window
  const [elLeft, setElLeft] = useState<DOMRect|undefined>();

  // changes the progress bar to the location where user clicked progress bar
  const handleProgressChange = (el: MouseEvent<HTMLSpanElement>) => {
    const progressBar = el.target as HTMLElement
    const pos = el.clientX - elLeft!.left;
    setTime((pos / progressBar.offsetWidth) * 100);
    const video = document.getElementById("video") as HTMLVideoElement;
    video.currentTime = (pos / progressBar.offsetWidth) * video.duration;
  };

  // moves the hover progress bar according to user's mouse position
  const handleMouseMove = (el: MouseEvent<HTMLSpanElement>) => {
    const progressBar = el.target as HTMLElement
    const hp = document.getElementById("hover-progress") as HTMLElement;
    const pos = el.clientX - elLeft!.left;
    const scaleVal =
      pos / progressBar.offsetWidth - hoverPos / progressBar.offsetWidth;
    hp.style.transform = "scaleX(" + scaleVal + ")";
  };

  // function that turns on/off display of hover progress bar
  const handleMouseEnter = (val: string) => {
    const hp = document.getElementById("hover-progress") as HTMLElement;
    hp.style.opacity = val;
  };

  // ref used to hold the resizeObserver that observes the progress bar
  const resizer = useRef<ResizeObserver>();

  // changes value of elLeft when the window resizes
  const monitorResize = () => {
    const progressBar = document.getElementById("progress-bar") as HTMLElement;
    setElLeft(progressBar.getBoundingClientRect());
  };

  // used to initially set elLeft and to init the resizeObserver
  useEffect(() => {
    const progressBar = document.getElementById("progress-bar") as HTMLElement;
    setElLeft(progressBar.getBoundingClientRect());
    resizer.current = new ResizeObserver(monitorResize);
    resizer.current.observe(progressBar);
  }, [noMiniSideBar]);

  // fullscreen controls
  const [inFullScreen, setInFullScreen] = useState<boolean>(false);

  const handleFullScreen = () => {
    const videoContainer = document.getElementById("videoContainer") as HTMLElement;
    if (document.fullscreenElement !== null) {
      document.exitFullscreen()
          .then(() => {
            videoContainer.setAttribute("data-fullscreen", 'false');
            setInFullScreen(false);
          } );
    } else {
      videoContainer.requestFullscreen()
          .then(() => {
            videoContainer.setAttribute("data-fullscreen", 'true');
            setInFullScreen(true);
          } );
    }
  };

  // setup for custom controls
  useEffect(() => {
    const videoControls = document.getElementById("videoControls") as HTMLElement;
    const video = document.getElementById("video") as HTMLVideoElement;
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
                    src=""
                    onTimeUpdate={(e) =>
                      handleTime(e.target as HTMLVideoElement)
                    }
                    inFullScreen={inFullScreen}
                    onLoadedMetadata={(e) => {
                      const element = e.target as HTMLVideoElement
                      handleVideoTimer(element.duration, setVisualDuration);
                    }
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
                        onMouseEnter={() => handleMouseEnter("1")}
                        onMouseLeave={() => handleMouseEnter("0")}
                        id="progress-bar"
                      />
                    </ProgressBarComponent>
                  </ProgressBarContainer>
                  <VideoButtons
                    volumeVal={volumeVal}
                    handleMute={handleMute}
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

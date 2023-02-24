import React from "react";
import { Stack, Box, styled } from "@mui/material";
import { ProgressBar } from "./ProgressBar";
import { VideoButtons } from "./VideoButtons";

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
`;

export const VideoPlayer = () => {
  return (
    <Player>
      <OuterPlayerContainer>
        <PlayerContainer>
          <InnerPlayerContainer>
            <VideoPlayerContainer>
              <VideoPlayerComponent>
                <VideoHolder>{/* video component */}</VideoHolder>
                <VideoMenu>
                  <ProgressBar />
                  <VideoButtons />
                </VideoMenu>
              </VideoPlayerComponent>
            </VideoPlayerContainer>
          </InnerPlayerContainer>
        </PlayerContainer>
      </OuterPlayerContainer>
    </Player>
  );
};

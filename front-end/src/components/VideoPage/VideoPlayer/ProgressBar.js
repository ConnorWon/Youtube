import React from "react";
import { Stack, styled } from "@mui/material";
import { colors } from "../../ColorThemes";

// Progress Bar
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

const ChaptersContainer = styled(Stack)`
  width: 100%;
  z-index: 32;
  position: relative;
  left: 0;
  height: 100%;
`;

const ChapterContainer = styled(Stack)`
  width: 100%;
  z-index: 32;
  position: relative;
  left: 0;
  height: 100%;
  float: left;
`;

const ChapterPadding = styled(Stack)`
  position: absolute;
  width: 100%;
  height: 16px;
  bottom: 0;
  z-index: 28;
`;

const ProgressTrackerContainer = styled(Stack)`
  z-index: 39;
  background: ${colors.borderColor};
  height: 100%;
  transform: scaleY(0.6);
  transition: transform 0.1s cubic-bezier(0.4, 0, 1, 1),
    -webkit-transform 0.1s cubic-bezier(0.4, 0, 1, 1);
  position: relative;
`;

const ProgressTracker = styled(Stack)`
  left: 0px;
  ${"" /* transform: scaleX(value) */}
  z-index: 34;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
  background-color: ${colors.youtubeRed};
`;

const LoadProgress = styled(Stack)`
  left: 0px;
  ${"" /* transform: scaleX(value) */}
  z-index: 33;
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
`;

const HoverProgress = styled(Stack)`
  ${"" /* left: value based on progress tracker position */}
  ${"" /* transform: scaleX(value) */}
  background: rgba(255, 255, 255, 0.5);
  z-index: 35;
  opacity: 0;
  transform: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
`;

export const ProgressBar = () => {
  return (
    <ProgressBarContainer>
      <ProgressBarComponent>
        <ChaptersContainer>
          <ChapterContainer>
            <ChapterPadding />
            <ProgressTrackerContainer>
              <ProgressTracker />
              <LoadProgress />
              <HoverProgress />
            </ProgressTrackerContainer>
          </ChapterContainer>
        </ChaptersContainer>
      </ProgressBarComponent>
    </ProgressBarContainer>
  );
};

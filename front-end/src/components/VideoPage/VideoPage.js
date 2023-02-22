import React from "react";
import { styled, Box, Stack } from "@mui/material";

// sidebar-width: 402px;
// sidebar-min-width: 300px;
// appbar-height: 56px;
// width-ratio: 16;
// height-ratio: 9;
// space-below-player: 136px;
// non-player-height: calc(appbar-height + margin-size + space-below-player);
// non-player-width: calc(sidebar-width + 3 * margin-size)
// min-player-height: 360px;
// min-player-width: calc(min-player-height * (width-ratio / height-ratio));
// max-player-height: calc(100vh - (appbar-height + margin-size + space-below-player));
// max-player-width: calc((100vh - (appbar-height + margin-size + space-below-player) * (width-ratio / height-ratio));
// scrollbar-width: 15px;
// panel-max-height: changing;
// chat-max-height: changing;
// description-max-height: changing;
// comments-panel-max-height: changing;
// margin-size: 24px;

const CSSValueProvider = styled("div")`
  --margin-size: 24px;
  --sidebar-width: 402px;
  --sidebar-min-width: 300px;
  --appbar-height: 56px;
  --width-ratio: 16;
  --height-ratio: 9;
  --space-below-player: 136px;
  --non-player-height: calc(
    var(--appbar-height) + var(--margin-size) + var(--space-below-player)
  );
  --non-player-width: calc(var(--sidebar-width) + 3 * var(--margin-size));
  --min-player-height: 360px;
  --min-player-width: calc(
    var(--min-player-height) * (var(--width-ratio) / var(--height-ratio))
  );
  --max-player-height: calc(
    100vh -
      (var(--appbar-height) + var(--margin-size) + var(--space-below-player))
  );
  --max-player-width: calc(
    (
      100vh -
        (var(--appbar-height) + var(--margin-size) + var(--space-below-player)) *
        (var(--width-ratio) / var(--height-ratio))
    )
  );
`;

const MainContainer = styled("div")`
  ${
    "" /* min-width styling is only present when video player and side video recommendation is on screen */
  }
  min-width: calc(
    var(--min-player-height) * (var(--width-ratio) / var(--height-ratio)) + 3 *
      var(--margin-size) + var(--sidebar-min-width)
  );

  justify-content: center;
  max-width: calc(1280px + var(--sidebar-width) + 3 * var(--margin-size));
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

// non-theater mode video player
const Primary = styled(Box)`
  ${
    "" /* max-width styling is only present when video player and side video recommendation is on screen */
  }
  max-width: var(--max-player-width);

  min-width: var(--min-player-width);
  padding-top: var(--margin-size);
  margin-left: var(--margin-size);
  flex: 1;
  flex-basis: 1e-9px;
  padding-right: var(--margin-size);
`;

const PrimaryInner = styled(Stack)``;

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

const VideoPlayer = styled(Stack)`
  postion: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  outline: 0;
  font-family: Roboto;
  color: #eee;
  text-align: left;
  direction: ltr;
  font-size: 11px;
  line-height: 1.3;
  -webkit-font-smoothing: antialiased;
`;

const VideoHolder = styled(Stack)`
  z-index: 10;
  position: relative;
`;

// non-theater video player ends here

export const VideoPage = () => {
  return (
    <CSSValueProvider>
      <MainContainer>hi</MainContainer>
    </CSSValueProvider>
  );
};

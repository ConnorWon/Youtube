import React, { useEffect } from "react";
import { styled, Box, Stack } from "@mui/material";
import { VideoPlayer } from "./VideoPlayer/VideoPlayer";
import { colors } from "../ColorThemes";
import { BelowPlayer } from "./VideoPlayer/BelowPlayer/BelowPlayer";
import { VideoPageSidebar } from "./Sidebar/VideoPageSidebar";

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
  background-color: ${colors.bgColorDark};
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

const Secondary = styled("div")`
  padding-top: var(--margin);
  position: relative;
  padding-right: var(--margin);
  width: var(--sidebar-width);
  min-width: var(--sidebar-min-width);
`;

const SecondaryInner = styled("div")``;

export const VideoPage = (props) => {
  const { setInVideoPage } = props;
  // setInVideoPage(true);

  useEffect(() => {
    setInVideoPage(true);

    return () => {
      setInVideoPage(false);
    };
  }, []);

  return (
    <CSSValueProvider>
      <MainContainer>
        <Primary>
          <PrimaryInner>
            <VideoPlayer />
            <BelowPlayer />
          </PrimaryInner>
        </Primary>
        <Secondary>
          <SecondaryInner>
            <VideoPageSidebar />
          </SecondaryInner>
        </Secondary>
      </MainContainer>
    </CSSValueProvider>
  );
};

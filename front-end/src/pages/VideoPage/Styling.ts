// noinspection CssUnknownUnit,CssUnresolvedCustomProperty

import { styled, Box, Stack } from "@mui/material";
import { colors } from "../../utils/ColorThemes";

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

export const CSSValueProvider = styled("div")`
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
  --min-player-height: 240px;
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
          (
            var(--appbar-height) + var(--margin-size) +
              var(--space-below-player)
          )
      ) * (var(--width-ratio) / var(--height-ratio))
  );
  background-color: ${colors.bgColorDark};

  @media only screen and (min-width: 1015px),
    (min-width: 672px) and (max-height: 629px) {
    --min-player-height: 360px;
  }
  @media only screen and (min-width: 1342px) and (min-height: 630px) {
    --min-player-height: 480px;
  }
`;

export const MainContainer = styled("div")`
  @media only screen and (min-width: 1015px) {
    min-width: calc(
      var(--min-player-height) * (var(--width-ratio) / var(--height-ratio)) + 3 *
        var(--margin-size) + var(--sidebar-min-width)
    );
  }

  justify-content: center;
  max-width: calc(1280px + var(--sidebar-width) + 3 * var(--margin-size));
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

// non-theater mode video player
export const Primary = styled(Box)`
  max-width: var(--max-player-width);
  min-width: var(--min-player-width);
  padding-top: var(--margin-size);
  margin-left: var(--margin-size);
  flex: 1;
  flex-basis: 1e-9px;
  padding-right: var(--margin-size);
`;

export const PrimaryInner = styled(Stack)``;

export const Secondary = styled("div")`
  padding-top: calc(var(--margin-size) - 8px);
  position: relative;
  padding-right: var(--margin-size);
  width: var(--sidebar-width);
  min-width: var(--sidebar-min-width);

  @media only screen and (max-width: 1014px) {
    display: none;
  }
`;

export const SecondaryInner = styled("div")``;

// noinspection CssInvalidPropertyValue,CssUnknownUnit

import {
  Box,
  Stack,
  styled,
  Button,
  Avatar,
  Typography,
  Link,
} from "@mui/material";
import { colors } from "../../../../utils/ColorThemes";
import {ComponentWithProps} from "../../../../types/types";

// VideosScroll Styling

export const VSMainContainer = styled("div")<ComponentWithProps>`
  border-top: ${({ hasDivider }) =>
    hasDivider ? "1px solid rgba(255, 255, 255, 0.2)" : "unset"};
`;

export const VSContentContainer = styled(Stack)`
  margin-top: 24px;
  display: block;
  position: relative;
`;

export const ScrollVideoContainer = styled(Box)`
  display: block;
  position: relative;
  max-width: auto;
  overflow: hidden;
`;

export const VideoOuterContainer = styled(Box)`
  padding-right: 4px;
  display: inline-block;
  vertical-align: top;
  white-space: normal;
  width: 210px;
  position: relative;
`;

export const ScrollButtonContainer = styled(Box)`
  position: absolute;
  top: 38px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ScrollButton = styled(Button)`
  width: 40px;
  height: 40px;
  border-radius: 24px;
  background-color: #212121;
  box-shadow: 0 4px 4px rgb(0 0 0 / 30%), 0 0 4px rgb(0 0 0 /20%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colors.textWhite};
  flex: 1;
  flex-basis: 1e-9px;
  min-width: 0;
  padding: 8px 8px;

  :hover {
    background-color: rgba(77, 77, 77, 1);
  }
`;

export const IconHolder = styled(Box)`
  width: 24px;
  height: 24px;
`;

export const ScrollVideoInnerContainer = styled(Box)`
  margin-bottom: 24px;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.05, 0, 0, 1);
  display: inline-block;
  white-space: nowrap;
`;

// ChannelContainer Styling

export const CCMainContainer = styled("div")`
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  flex-basis: 1e-9px;
`;

export const CCContentContainer = styled(Box)`
  max-width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const ChannelIcon = styled(Avatar)`
  width: 103px;
  height: 103px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ChannelName = styled(Typography)`
  color: ${colors.textWhite};
  margin: 4px 0;
  text-overflow: ellipsis;
  font-family: Roboto, serif;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  display: block;
  max-height: 20px;
  -webkit-line-clamp: 1;
`;

export const SubCount = styled(Typography)`
  color: ${colors.textWhite};
  font-family: Roboto, serif;
  font-size: 12px;
  font-weight: 400;
  overflow: hidden;
  display: block;
  max-height: 18px;
  -webkit-line-clamp: 1;
`;

export const SubscribeContainer = styled(Box)`
  margin-top: 16px;
`;

export const Subscribe = styled(Button)`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: none;
  color: ${colors.textWhite};
  background-color: rgba(255, 255, 255, 0.1);
  height: 32px;
  padding: 0 12px;
  font-size: 12px;
  line-height: 32px;
  border-radius: 16px;
  font-weight: 500;
  text-transform: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  :hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

// SectionLabel Styling

export const SubHeaderContainer = styled(Box)`
  padding-top: 24px;
`;

export const SubHeaderInner = styled(Stack)`
  color: ${colors.textWhite};
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SubHeaderTitle = styled(Link)`
  text-decoration: none;
  color: ${colors.textWhite};
  line-height: 22px;
  font-weight: 500;
  overflow: hidden;
  display: block;
  max-height: 22px;
  font-size: 16px;
  -webkit-line-clamp: 1;
`;

export const PlayButton = styled(Button)`
  text-transform: none;
  display: inline-block;
  padding: 0 16px 0 12px;
  height: 36px;
  font-size: 14px;
  line-height: 22px;
  border-radius: 18px;
  color: ${colors.textWhite};
  align-items: center;

  & .MuiButton-startIcon {
    margin-left: 0;
    position: relative;
    top: 6px;

    &.css-1d6wzja-MuiButton-startIcon > *:nth-of-type(1) {
      font-size: 25px;
    }
  }

  :hover {
    background-color: rgba(63, 63, 63, 1);
  }
`;

// noinspection CssUnresolvedCustomProperty

import { Stack, styled, Typography } from "@mui/material";
import { colors } from "../../../utils/ColorThemes";


// VideoPageSidebar Styling

export const VPSMainContainer = styled(Stack)``;

export const SidebarContainer = styled(Stack)``;

export const SidebarContents = styled("div")`
  --item-margin: 8px;
  --item-width: calc(var(--sidebar-width) / 3);
  --thumbnail-height: calc(var(--sidebar-width) / 3 / 9 * 16);
`;

// SidebarVideo Styling

export const SVMainContainer = styled(Stack)`
  position: relative;
  margin-top: var(--item-margin);
`;

export const VideoContainer = styled(Stack)`
  width: 100%;
`;

export const ThumbnailContainer = styled("div")`
  flex: none;
  position: relative;
  margin-right: 8px;
  height: 94px;
  width: 168px;
`;

export const Thumbnail = styled("a")`
  text-decoration: none;
  border-radius: 8px;
  overflow: hidden;
  margin-right: auto;
  margin-left: auto;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
`;

export const ThumbnailImage = styled("img")`
  min-height: 1px;
  min-width: 1px;
  height: 100%;
  width: 100%;
  background-color: transparent;
  object-fit: cover;
`;

export const InfoContainer = styled(Stack)`
  width: 100%;
  min-width: 0;
  padding-right: 24px;
  box-sizing: border-box;
`;

export const InfoAnchor = styled("a")`
  cursor: pointer;
  text-decoration: none;
  min-width: 0;
`;

export const Title = styled(Typography)`
  color: ${colors.textWhite};
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  overflow: hidden;
  max-height: 40px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
`;

export const Metadata = styled(Stack)`
  flex-wrap: wrap;
`;

export const ChannelNameContainer = styled(Stack)`
  max-width: 100%;
  align-items: center;
`;

export const MetadataText = styled(Typography)`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${colors.textGrey};
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
`;

export const VerifiedContainer = styled(Stack)`
  align-items: center;
  margin-right: 8px;
`;

export const VerifiedContainerInner = styled("div")`
  border-radius: 2px;
  padding-left: 4px;
  flex: none;
`;

import {
  styled,
  Box,
  Typography,
  Collapse,
  Button,
  Stack,
  Link,
} from "@mui/material";
import { colors } from "../ColorThemes";

// SearchPage Styling

export const MainContainer = styled("div")`
  flex: 1;
  flex-basis: 1e-9px;
  padding: 16px 24px;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  z-index: 0;
  background-color: ${colors.bgColorDark};
`;

export const OuterContainer = styled(Box)`
  min-width: 0px;
  flex: 1;
  flex-basis: 1e-9px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const OuterColumnContainer = styled(Box)`
  min-width: 0;
  flex: 1;
  flex-basis: 1e-9px;
  max-width: 1280px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const MainColumnContainer = styled(Box)`
  max-width: 1096px;
  min-width: 0;
  flex: 1 1 auto;
`;

export const InnerColumnContainer = styled(Box)`
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const FiltersMenu = styled(Box)`
  border-bottom: 1px solid ${colors.borderColor};
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FilterButton = styled(Button)`
  display: flex;
  flex: 1;
  flex-basis: 1e-9px;
  margin-left: -10px;
  color: ${colors.textWhite};
  padding: 0 16px;
  height: 36px;
  max-width: 95.16px;
  border-radius: 18px;
  text-decoration: none;
  text-transform: none;

  :hover {
    background-color: ${colors.borderColor};
  }
`;

export const IconContainer = styled(Box)`
  margin-right: 6px;
  margin-left: -6px;
  height: 24px;
  width: 24px;
`;

export const ButtonText = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  whitespace: nowrap;
  font-size: 14px;
  line-height: 36px;
  font-family: Roboto;
  letter-spacing: 0;
  font-weight: 500;
`;

export const FilterCollapsible = styled(Collapse)``;

export const MenuContent = styled(Stack)`
  margin-bottom: 32px;
`;

export const FilterGroup = styled(Stack)`
  padding: 0 32px 0 0;
  flex: 1;
  flex-basis: 1e-9px;
`;

export const FilterGroupHeader = styled(Typography)`
  color: ${colors.textWhite};
  border-bottom: 1px solid ${colors.borderColor};
  margin: 5px 0;
  text-transform: uppercase;
  padding: 15px 0;
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
`;

export const FilterType = styled(Link)`
  text-transform: none;
  text-decoration: none;
  padding: 15px 0 0;
  font-size: 14px;
  color: ${colors.textGrey};
  font-family: Roboto;
`;

export const ContentContainer = styled(Box)``;

// Horizontal Video Styling

export const VideosRender = styled(Box)`
  margin-top: 16px;
  display: block;
  position: relative;
  cursor: pointer;
`;

export const VideoContainer = styled(Stack)`
  position: relative;
  display: flex;
`;

export const ThumbnailContainer = styled(Box)`
  margin-right: 16px;
  max-width: 360px;
  min-width: 240px;
  flex: 1;
  flex-basis: 1e-9px;
  display: block;
  position: relative;
`;

export const Thumbnail = styled(Box)`
  width: -webkit-fill-available;
  height: auto;
  border-radius: 12px;
`;

export const InfoContainer = styled(Stack)`
  min-width: 0;
  cursor: pointer;
  color: ${colors.textWhite};
  flex: 1;
  flex-basis: 1e-9px;
  display: flex;
`;

export const TitleContainer = styled(Stack)`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled(Typography)`
  min-width: 0;
  color: ${colors.textWhite};
  margin-right: 8px;
  overflow: hidden;
  font-family: Roboto;
  font-size: 18px;
  line-height: 26px;
  font-weight: 400;
  max-height: 52px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  white-space: normal;
  pointer: cursor;
`;

export const ViewsAndDate = styled(Typography)`
  color: ${colors.textGrey};
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  white-space: normal;
  max-height: 36px;
  -webkit-line-clamp: 2;
`;

export const ChannelNameContainer = styled(Stack)`
  padding: 12px 0;
  display: flex;
  align-items: center;
`;

export const ChannelIcon = styled("div")`
  padding-right: 8px;
  height: 26.5px;
  border-radius: 50%;
`;

export const ChannelName = styled(Typography)`
  color: ${colors.textGrey};
  align-self: center;
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  overflow: hidden;
  max-height: 18px;
  -webkit-line-clamp: 1;
  display: flex;

  :hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const Description = styled(Typography)`
  margin-bottom: 8px;
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  line-height: 18px;
  font-weight: 400;
  overflow: hidden;
  max-height: 36px;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  white-space: normal;
`;

export const Verified = styled(Box)`
  width: 20px;
  align-items: center;
  display: flex;
  margin: 0 0 0 4px;
`;

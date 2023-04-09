import {
  styled,
  Typography,
  Avatar,
  Stack,
  Link,
  Button,
  ToggleButton,
  Collapse,
} from "@mui/material";
import { colors } from "../../../ColorThemes";

// BelowPlayer Styling

export const BPMainContainer = styled("div")`
  position: relative;
`;

export const VideoInfoContainer = styled("div")`
  margin-top: calc(var(--margin-size) / 3);
  margin-bottom: var(--margin-size);
  color: #fff;
`;

export const Title = styled(Typography)`
  word-break: break-word;
  font-family: Roboto;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  overflow: hidden;
  max-height: 56px;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  white-space: normal;
`;

export const RelatedVids = styled("div")`
  @media only screen and (min-width: 1015px) {
    display: none;
  }
`;

// ChannelButtons Styling

export const ChannelButtonsContainer = styled(Stack)`
  margin-top: -4px;
`;

export const ChannelOwnerContainer = styled(Stack)`
  min-width: calc(50% - 6px);
  align-items: center;
  box-sizing: border-box;
  margin-right: 12px;
  margin-top: 12px;
`;

export const ChannelContainer = styled(Stack)`
  min-width: 0;
`;

export const ChannelIconContainer = styled("a")`
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

export const ChannelIcon = styled(Avatar)`
  margin-right: 12px;
  width: 40px;
  height: 40px;
`;

export const OwnerInfoContainer = styled(Stack)`
  justify-content: center;
  flex: 1;
  flex-basis: 1e-9px;
  overflow: hidden;
  margin-right: 24px;
`;

export const ChannelNameContainer = styled(Stack)`
  z-index: 300;
  color: inherit;
  max-width: 100%;
  font-family: Roboto;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
`;

export const ChannelName = styled(Link)`
  word-wrap: none;
  word-break: none;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Verified = styled(Stack)`
  align-items: center;
  line-height: 12px;
  font-weight: 500;
  font-size: 12px;
  border-radius: 2px;
  margin-bottom: 1px;
  padding-left: 4px;
  flex: none;
`;

export const SubCount = styled(Typography)`
  font-family: Roboto;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  overflow: hidden;
  max-height: 18px;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  white-space: normal;
  color: ${colors.textGrey};
  margin-right: 4px;
`;

export const JoinSubBtn = styled(Button)`
  border-radius: 20px;
  background-color: white;
  color: black;
  text-transform: none;
  font-weight: 500;
  margin-left: 8px;
  :hover {
    background-color: #dad9d9;
  }
`;

export const ActionButtons = styled(Stack)`
  justify-content: flex-start;
  min-width: calc(50% - 6px);
  align-items: center;
  box-sizing: border-box;
  margin-top: 12px;
`;

export const ActionInner = styled(Stack)`
  width: 100%;
`;

export const BtnMenu = styled(Stack)`
  justify-content: flex-end;
  width: 100%;
  overflow-y: hidden;
  flex-wrap: wrap;
  max-height: 40px;
  --yt-button-icon-size: 36px;
`;

export const NonFlexButtons = styled(Stack)``;

export const LikeDislikeBtn = styled(ToggleButton)`
  white-space: nowrap;
  min-width: 0;
  text-transform: none;
  font-family: Roboto;
  font-weight: 500;
  border: none;
  cursor: pointer;
  outline-width: 0;
  box-sizing: border-box;
  background: none;
  text-decoration: none;
  flex: 1;
  flex-basis: 1e-9px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px 0 0 18px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  :hover {
    background-color: ${colors.borderColor};
  }

  .Mui-selected {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const ButtonText = styled(Typography)`
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  white-space: nowrap;
`;

export const MenuButtonContainer = styled("div")``;

export const MenuButton = styled(Button)`
  margin-left: 8px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px;
  height: 36px;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-transform: none;
  padding: 0 16px;
  letter-spacing: 0.5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 0;

  :hover {
    background-color: ${colors.borderColor};
  }
`;

export const FlexibleButtons = styled("div")``;

// Description Styling

export const DescriptionOuter = styled(Stack)`
  margin-right: -12px;
  flex-wrap: wrap;
`;

export const DescriptionContainer = styled(Stack)`
  box-sizing: border-box;
  margin-right: 12px;
  margin-top: 12px;
  flex: 1;
  flex-basis: 1e-9px;
  font-family: Roboto;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  min-width: max(381px, 50% - 12px);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  cursor: ${({ expandDesc }) => (expandDesc ? "default" : "pointer")};
  pointer-events: ${({ expandDesc }) => (expandDesc ? "none" : "auto")};

  :hover {
    background: ${({ expandDesc }) =>
      expandDesc ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)"};
  }
`;

export const DescriptionInner = styled("div")`
  margin: 12px;
`;

export const PostInfoContainer = styled("div")`
  overflow: hidden;
`;

export const PostInfo = styled(Typography)`
  white-space: pre;
  color: inherit;
  font-weight: 500;
  line-height: inherit;
  font-size: inherit;
  font-family: inherit;
  display: inline-block;
`;

export const PostHashTags = styled(Link)`
  color: #aaa;
  text-decoration: none;
  word-wrap: none;
  word-break: none;
  font-weight: 500;
  line-height: inherit;
  font-size: inherit;
  font-family: inherit;
  display: inline-block;
`;

export const DescriptionCollapse = styled(Collapse)`
  white-space: pre-wrap;
`;

export const DescriptionExpandable = styled("div")`
  position: relative;
  overflow: hidden;
  contain: content;
  color: ${colors.textWhite};
  font-weight: inherit;
  line-height: inherit;
  font-size: inherit;
  font-family: inherit;
`;

export const DescriptionText = styled("span")``;

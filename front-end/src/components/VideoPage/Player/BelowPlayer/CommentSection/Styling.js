import {
  styled,
  Typography,
  Avatar,
  Stack,
  Button,
  MenuItem,
  FormControl,
  Input,
  Menu,
  IconButton,
} from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { colors } from "../../../../ColorThemes";

// CommentSection Styling

export const BaseContainer = styled("div")``;

export const CSMainContainer = styled(Stack)`
  margin-top: 24px;
  margin-bottom: 32px;
`;

export const HeaderContainer = styled(Stack)`
  margin-bottom: 24px;
  align-items: center;
`;

export const CommentCount = styled(Typography)`
  vertical-align: middle;
  font-family: Roboto;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  color: ${colors.textWhite};
  margin-right: 32px;
`;

export const SortButton = styled(Stack)`
  cursor: pointer;
  align-items: center;
`;

export const SortText = styled(Typography)`
  color: ${colors.textWhite};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const SortMenu = styled(Menu)`
  margin-top: 10px;
  .MuiMenu-list {
    background-color: ${colors.dropDownMenu};
  }
  .MuiMenu-paper {
    border-radius: 12px;
    background-color: ${colors.dropDownMenu};
  }
`;

export const SortMenuItem = styled(MenuItem)`
  color: ${colors.textWhite};
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  font-weight: 300;
  padding: 12px 16px;
  font-size: 14px;
`;

export const CommentContainer = styled(Stack)`
  margin-right: 16px;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const UserIcon = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 16px;
  border-radius: 50%;
`;

export const CommentBox = styled("div")`
  flex: 1;
  flex-basis: 1e-9px;
  min-width: 0;
`;

export const CommentFormControl = styled(FormControl)`
  width: 100%;
`;

export const CommentInput = styled(Input)``;

export const BelowCommentField = styled(Stack)`
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const Emojis = styled(InsertEmoticonIcon)`
  color: ${colors.textWhite};
  cursor: pointer;
`;

export const Spacer = styled(Stack)`
  flex-grow: 1;
`;

export const CommentButton = styled(Button)`
  background-color: transparent;
  min-width: 0;
  border-radius: 18px;
  margin-left: 8px;
  color: ${colors.textWhite};
  text-transform: none;
  padding: 0 16px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  font-weight: 500;
  :hover {
    background-color: ${colors.borderColor};
  }
`;

export const Contents = styled("div")``;

// Comment Styling

export const CommentThread = styled("div")`
  margin-bottom: 16px;
`;

export const CommentBody = styled(Stack)`
  border-radius: 4px;
  position: relative;
  --display-action-menu: hidden;

  :hover {
    --display-action-menu: visible;
  }

  margin-bottom: ${({ reply }) => (reply ? "8px" : "0")};
`;

export const AuthorAvatarContainer = styled("div")``;

export const AuthorAvatar = styled(Avatar)`
  margin-right: 16px;
  width: ${({ reply }) => (reply ? "24px" : "40px")};
  height: ${({ reply }) => (reply ? "24px" : "40px")};
  cursor: pointer;
`;

export const BodyMain = styled(Stack)`
  min-width: 0;
  flex: 1;
  flex-basis: 1e-9px;
`;

export const AuthorContainer = styled(Stack)`
  margin-bottom: 2px;
  align-items: baseline;
`;

export const AuthorText = styled(Typography)`
  color: ${colors.textWhite};
  margin-right: 4px;
  margin-bottom: 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
`;

export const AuthorDate = styled(Typography)`
  color: ${colors.textGrey};
  white-space: nowrap;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;

export const CommentContentContainer = styled("div")`
  display: inline-flex;
  width: 100%;
`;

export const CommentContentInnerContainer = styled("div")`
  overflow: auto;
  width: 100%;
  --max-lines: ${({ expandText }) => (expandText ? "none" : "4")};
`;

export const CommentContent = styled(Typography)`
  color: ${colors.textWhite};
  overflow: hidden;
  max-height: none;
  -webkit-line-clamp: var(--max-lines);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

export const ReadMoreBtn = styled("div")`
  margin-top: 4px;
  user-select: none;
  cursor: pointer;
  border-radius: 3px;
  box-sizing: border-box;
  position: relative;
  word-wrap: break-word;
  min-width: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${colors.textGrey};
`;

export const CommentButtonsContainer = styled(Stack)`
  margin-top: 4px;
  min-height: 16px;
  align-items: center;
`;

export const LikeDislikeBtn = styled(Button)`
  color: ${colors.textWhite};
  width: 32px;
  height: 32px;
  min-width: 0;
  padding: 0;
  border-radius: 50%;

  :hover {
    background-color: ${colors.borderColor};
  }
`;

export const LikeNum = styled("span")`
  margin-right: 8px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  color: ${colors.textGrey};
  font-family: Roboto;
`;

export const ReplyBtn = styled(Button)`
  min-width: 0;
  margin-left: 8px;
  color: ${colors.textWhite};
  font-size: 12px;
  line-height: 32px;
  font-weight: 500;
  border-radius: 16px;
  padding: 0 12px;
  height: 32px;
  text-transform: none;

  :hover {
    background-color: ${colors.borderColor};
  }
`;

export const ActionMenuContainer = styled("div")``;

export const ActionMenuBtn = styled(IconButton)`
  visibility: var(--display-action-menu);
  color: ${colors.textWhite};
  :hover {
    background-color: unset;
  }
`;

export const ActionMenu = styled(Menu)`
  margin-top: 10px;
  .MuiMenu-list {
    background-color: ${colors.dropDownMenu};
  }
  .MuiMenu-paper {
    border-radius: 12px;
    background-color: ${colors.dropDownMenu};
  }
`;

export const ActionMenuItem = styled(MenuItem)`
  color: ${colors.textWhite};
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  font-weight: 300;
  font-size: 14px;
  padding: 0 12px 0 16px;
  height: 36px;
`;

export const ActionMenuItemText = styled("span")`
  margin-right: 24px;
`;

export const RepliesContainer = styled("div")`
  margin-left: 56px;
`;

export const RepliesButton = styled(Button)`
  display: flex;
  flex: 1;
  flex-basis: 1e-9px;
  margin-left: -10px;
  color: ${colors.ytdBlue};
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px;
  height: 36px;
  min-width: 0;
  padding: 0 16px;
  box-sizing: border-box;
  :hover {
    background-color: rgba(62, 165, 255, 0.2);
  }
`;

export const RepliesBtnText = styled("span")`
  text-transform: none;
`;

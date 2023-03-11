import {
  Typography,
  Stack,
  styled,
  Menu,
  MenuItem,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { colors } from "../../../ColorThemes";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const CommentThread = styled("div")`
  margin-bottom: 16px;
`;

const CommentBody = styled(Stack)`
  border-radius: 4px;
  position: relative;
  --display-action-menu: hidden;

  :hover {
    --display-action-menu: visible;
  }

  margin-bottom: ${({ reply }) => (reply ? "8px" : "0")};
`;

const AuthorAvatarContainer = styled("div")``;

const AuthorAvatar = styled(Avatar)`
  margin-right: 16px;
  width: ${({ reply }) => (reply ? "24px" : "40px")};
  height: ${({ reply }) => (reply ? "24px" : "40px")};
  cursor: pointer;
`;

const BodyMain = styled(Stack)`
  min-width: 0;
  flex: 1;
  flex-basis: 1e-9px;
`;

const AuthorContainer = styled(Stack)`
  margin-bottom: 2px;
  align-items: baseline;
`;

const AuthorText = styled(Typography)`
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

const AuthorDate = styled(Typography)`
  color: ${colors.textGrey};
  white-space: nowrap;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;

const CommentContentContainer = styled("div")`
  display: inline-flex;
  width: 100%;
`;

const CommentContentInnerContainer = styled("div")`
  overflow: auto;
  width: 100%;
  --max-lines: ${({ expandText }) => (expandText ? "none" : "4")};
`;

const CommentContent = styled(Typography)`
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

const ReadMoreBtn = styled("div")`
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

const CommentButtonsContainer = styled(Stack)`
  margin-top: 4px;
  min-height: 16px;
  align-items: center;
`;

const LikeDislikeBtn = styled(Button)`
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

const LikeNum = styled("span")`
  margin-right: 8px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  color: ${colors.textGrey};
  font-family: Roboto;
`;

const ReplyBtn = styled(Button)`
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

const ActionMenuContainer = styled("div")``;

const ActionMenuBtn = styled(IconButton)`
  visibility: var(--display-action-menu);
  color: ${colors.textWhite};
  :hover {
    background-color: unset;
  }
`;

const ActionMenu = styled(Menu)`
  margin-top: 10px;
  .MuiMenu-list {
    background-color: ${colors.dropDownMenu};
  }
  .MuiMenu-paper {
    border-radius: 12px;
    background-color: ${colors.dropDownMenu};
  }
`;

const ActionMenuItem = styled(MenuItem)`
  color: ${colors.textWhite};
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  font-weight: 300;
  font-size: 14px;
  padding: 0 12px 0 16px;
  height: 36px;
`;

const ActionMenuItemText = styled("span")`
  margin-right: 24px;
`;

const RepliesContainer = styled("div")`
  margin-left: 56px;
`;

const RepliesButton = styled(Button)`
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

const RepliesBtnText = styled("span")`
  text-transform: none;
`;

export const Comment = (props) => {
  const { reply } = props;

  // for expanding comment content
  const [expandText, setExpandText] = useState(false);
  const [readMoreBtn, setReadMoreBtn] = useState(false);
  useEffect(() => {
    const el = document.getElementById("1");
    const overflown = el.scrollHeight > el.clientHeight;
    if (overflown) {
      setReadMoreBtn(true);
    } else {
      // setReadMoreBtn(true);
    }
  }, []);

  // for clicking like/dislike button
  const [like, setLike] = useState("");
  const handleLike = (val) => {
    if (like === val) {
      setLike("");
    } else {
      setLike(val);
    }
  };

  // for opening action menu
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const openActionMenu = Boolean(actionMenuAnchor);
  const handleCloseActionMenu = () => {
    setActionMenuAnchor(null);
  };

  // expanding replies
  const [openReplies, setOpenReplies] = useState(false);

  return (
    <CommentThread>
      <CommentBody direction="row" reply={reply}>
        <AuthorAvatarContainer>
          <AuthorAvatar reply={reply} />
        </AuthorAvatarContainer>
        <BodyMain>
          <AuthorContainer direction="row">
            <AuthorText>@amperscore</AuthorText>
            <AuthorDate>2 weeks ago</AuthorDate>
          </AuthorContainer>
          <CommentContentContainer>
            <CommentContentInnerContainer expandText={expandText}>
              {/* id can be author of thread + num */}
              <CommentContent id="1">
                When I went to Japan for a student exchange trip, I already knew
                some Japanese from my high school classes but still kinda sucked
                with it. The best thing that helped me communicate was my host
              </CommentContent>
              {readMoreBtn && (
                <ReadMoreBtn onClick={() => setExpandText(!expandText)}>
                  {!expandText ? "Read more" : "Show less"}
                </ReadMoreBtn>
              )}
            </CommentContentInnerContainer>
          </CommentContentContainer>
          <CommentButtonsContainer direction="row">
            <LikeDislikeBtn sx={{ ml: "-6px" }} onClick={() => handleLike(1)}>
              {like === 1 ? (
                <ThumbUpAltIcon sx={{ width: "20px", height: "20px" }} />
              ) : (
                <ThumbUpAltOutlinedIcon
                  sx={{ width: "20px", height: "20px" }}
                />
              )}
            </LikeDislikeBtn>
            <LikeNum>240</LikeNum>
            <LikeDislikeBtn onClick={() => handleLike(2)}>
              {like === 2 ? (
                <ThumbDownIcon sx={{ width: "20px", height: "20px" }} />
              ) : (
                <ThumbDownAltOutlinedIcon
                  sx={{ width: "20px", height: "20px" }}
                />
              )}
            </LikeDislikeBtn>
            <ReplyBtn>Reply</ReplyBtn>
          </CommentButtonsContainer>
        </BodyMain>
        <ActionMenuContainer>
          <ActionMenuBtn onClick={(e) => setActionMenuAnchor(e.currentTarget)}>
            <MoreVertIcon sx={{ fontSize: "22px" }} />
          </ActionMenuBtn>
          <ActionMenu
            anchorEl={actionMenuAnchor}
            open={openActionMenu}
            onClose={handleCloseActionMenu}
          >
            <ActionMenuItem onClick={handleCloseActionMenu}>
              <FlagOutlinedIcon
                sx={{ width: "24px", height: "24px", mr: "16px" }}
              />
              <ActionMenuItemText>Report</ActionMenuItemText>
            </ActionMenuItem>
          </ActionMenu>
        </ActionMenuContainer>
      </CommentBody>
      {reply == null && (
        <RepliesContainer reply={reply}>
          <RepliesButton onClick={() => setOpenReplies(!openReplies)}>
            {openReplies ? (
              <ArrowDropUpIcon
                sx={{ width: "24px", height: "24px", mr: "6px", ml: "-6px" }}
              />
            ) : (
              <ArrowDropDownIcon
                sx={{ width: "24px", height: "24px", mr: "6px", ml: "-6px" }}
              />
            )}
            <RepliesBtnText>12 replies</RepliesBtnText>
          </RepliesButton>
          {openReplies && <Comment reply="true" />}
        </RepliesContainer>
      )}
    </CommentThread>
  );
};
